import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON bodies
app.use(express.json());

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } else {
    console.warn('CẢNH BÁO: Chưa cấu hình GEMINI_API_KEY trong biến môi trường.');
  }
} catch (error) {
  console.error('Lỗi khởi tạo GoogleGenAI:', error);
}

// AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history = [], tasks = [], updates = [] } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Nội dung câu hỏi không hợp lệ.' });
  }

  // Fallback if Gemini is not configured
  if (!ai) {
    return res.json({
      reply: `[Chế độ Offline] Tôi đã nhận được câu hỏi: "${message}". Hiện tại hệ thống chưa phát hiện khóa kết nối AI (GEMINI_API_KEY). Tuy nhiên, tôi vẫn ghi nhận ý kiến chỉ đạo này của Thường trực để tổng hợp vào phiên làm việc tiếp theo!`
    });
  }

  try {
    const formattedHistory = history.map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // System instruction containing real-time context about tasks and updates
    const systemInstruction = `Bạn là Trợ lý Điều hành Đảng Ủy Phường, một trợ lý ảo thông minh, chuyên nghiệp và tận tâm hỗ trợ Thường trực Đảng ủy Phường.
Nhiệm vụ của bạn:
1. Trả lời các câu hỏi về tình hình Đảng bộ, tiến độ công việc, khó khăn vướng mắc của các đơn vị trực thuộc dựa trên dữ liệu thực tế được cung cấp phía dưới.
2. Trả lời tất cả các câu hỏi bên ngoài, kiến thức tổng quát, nghiệp vụ hành chính, nghiệp vụ Đảng viên, soạn thảo văn bản, quy định luật pháp hoặc bất kỳ chủ đề nào khác một cách chuẩn xác, lịch sự, tôn nghiêm và đúng tác phong công sở.
3. Luôn xưng hô trang trọng là "Tôi" hoặc "Trợ lý AI" và gọi người dùng là "Thường trực" hoặc "Quý lãnh đạo".
4. Trả lời bằng tiếng Việt, cấu trúc mạch lạc, rõ ràng, phân dòng hợp lý để dễ đọc.

Dữ liệu thực tế hiện tại trên hệ thống dashboard (Sử dụng dữ liệu này nếu người dùng hỏi về tình hình tại địa phương hoặc các nhiệm vụ tại phường):
- Các nhiệm vụ đang theo dõi sát:
${JSON.stringify(tasks, null, 2)}

- Cập nhật báo cáo mới nhất từ các chi bộ/đơn vị trực thuộc:
${JSON.stringify(updates, null, 2)}

Hãy trả lời một cách thông minh, kết hợp khéo léo thông tin thực tế khi được hỏi về phường, và phát huy tối đa tri thức toàn diện khi được hỏi về các chủ đề bên ngoài khác.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        ...formattedHistory,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Tôi chưa nhận được phản hồi phù hợp từ mô hình AI.';
    res.json({ reply });
  } catch (error: any) {
    console.error('Lỗi khi gọi Gemini API:', error);
    res.status(500).json({
      error: 'Có lỗi xảy ra trong quá trình xử lý câu hỏi.',
      details: error.message
    });
  }
});

// Vite Middleware for Asset Serving & Single Page App Fallback
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
