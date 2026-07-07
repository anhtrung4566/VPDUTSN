import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, User, Bot, HelpCircle, CornerDownLeft, RefreshCw, Bookmark, AlertCircle 
} from 'lucide-react';

interface AiAssistantProps {
  isDarkMode: boolean;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export default function AiAssistant({ isDarkMode }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Kính chào Thường trực Đảng ủy! Tôi là Trợ lý AI Smart Dashboard. Tôi đã tổng hợp toàn bộ dữ liệu báo cáo tuần này từ các đơn vị cơ sở trực thuộc. Thường trực cần tôi tóm tắt thông tin gì hôm nay ạ?',
      time: 'Vừa xong'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetQueries = [
    {
      q: 'Tóm tắt tình hình trong tuần.',
      a: 'Báo cáo tổng hợp tuần này ghi nhận phần lớn các đơn vị đã cập nhật đúng hạn. Tình hình an ninh chính trị và kinh tế - xã hội trên địa bàn phường ổn định. Lĩnh vực nổi bật là Cải cách hành chính có mô hình "Ngày thứ Sáu không hẹn trước" hoạt động hiệu quả. Tuy nhiên, ghi nhận sự chậm trễ giải quyết hồ sơ đất đai trễ hạn tại Ban Địa chính (14 hồ sơ quá hạn chưa xử lý).'
    },
    {
      q: 'Có những vấn đề nổi bật nào?',
      a: 'Ghi nhận 3 vấn đề nóng đáng lưu ý:\n1. Tiến độ giải quyết hồ sơ đất đai và hộ tịch tại Một cửa bị dồn ứ (do thiếu nhân sự thay thế công chức nghỉ thai sản).\n2. Dự án tu sửa Nhà văn hóa Tổ 5 (Khu phố 3) đang chậm tiến độ do vướng mặt bằng tập kết vật liệu xây dựng.\n3. Kiến nghị bổ sung ngân sách mua sắm trang thiết bị quét tài liệu phục vụ đề án số hóa văn phòng.'
    },
    {
      q: 'Tổng hợp các kiến nghị.',
      a: 'Tóm tắt 3 kiến nghị chính gửi Thường trực tuần này:\n- **Ban Địa chính**: Đề nghị chỉ đạo phối hợp lực lượng đô thị hỗ trợ đo đạc thực địa.\n- **UBND Phường**: Kiến nghị Thường trực phê duyệt ngân sách mua mới 02 máy scan tốc độ cao phục vụ bộ phận Một cửa.\n- **Khu phố 3**: Đề xuất chỉ đạo tháo gỡ mặt bằng tạm để nhà thầu chứa cát đá thi công Nhà văn hóa.'
    },
    {
      q: 'Có nhiệm vụ nào sắp đến hạn?',
      a: 'Hệ thống đang theo dõi 2 nhiệm vụ sắp tới hạn:\n- **"Giải quyết dứt điểm 14 hồ sơ trễ hạn"** - Bộ phận Một cửa phụ trách - Hạn chót: 15/07/2026. Tiến độ hiện tại: 30%.\n- **"Khảo sát địa điểm lắp đặt camera an ninh"** - Công an Phường chủ trì - Hạn chót: 18/07/2026. Tiến độ hiện tại: 50%.'
    },
    {
      q: 'Đơn vị nào chưa cập nhật thông tin?',
      a: 'Hiện tại có 02 đơn vị chưa hoàn tất cập nhật số liệu công tác định kỳ tuần này:\n1. **Hội Liên hiệp Phụ nữ Phường**\n2. **Chi bộ Khu phố 4**\nVăn phòng Đảng ủy đã gửi cảnh báo nhắc nhở tự động qua SMS và Zalo công việc.'
    },
    {
      q: 'Nội dung nào đưa vào giao ban tuần tới?',
      a: 'Đề xuất Thường trực đưa 3 chuyên đề trọng tâm sau vào chương trình họp giao ban tuần tới:\n1. **Giải pháp khắc phục tồn đọng Một cửa**: Phương án điều động nhân sự hỗ trợ công tác Một cửa.\n2. **Hỗ trợ tháo gỡ khó khăn cơ sở**: Chỉ đạo Đô thị bố trí địa điểm chứa vật liệu xây dựng cho Nhà văn hóa KP3.\n3. **Cải cách hành chính số**: Thống nhất chủ trương mua sắm thiết bị scan số hóa sổ sách.'
    },
    {
      q: 'Tạo dự thảo báo cáo tuần.',
      a: 'Tôi đã tạo dự thảo Báo cáo tuần số 45-BC/ĐU của Đảng ủy Phường. Báo cáo gồm 5 chương: Tình hình chung; Kết quả nổi bật lĩnh vực Xây dựng Đảng & KT-XH; Khó khăn vướng mắc; Các kiến nghị đề xuất; Phương hướng tuần tới. Thường trực có thể xem chi tiết hoặc nhấn nút Tải xuống Word ở phần Báo cáo AI bên dưới.'
    },
    {
      q: 'Tạo dự thảo kết luận cuộc họp.',
      a: 'Dự thảo Thông báo kết luận chỉ đạo Thường trực Đảng ủy tuần này:\n1. UBND chỉ đạo kiểm điểm, tháo gỡ dứt điểm 14 hồ sơ đất đai trước 15/07; bố trí công chức điều động bổ trợ Một cửa.\n2. Giao Ban điều hành Khu phố 3 chủ trì thỏa thuận mặt bằng tạm thi công Nhà văn hóa.\n3. Duyệt chủ trương trang bị máy quét tài liệu số hóa phòng Một cửa.'
    }
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const currentTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = {
      sender: 'user',
      text,
      time: currentTime
    };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking & reply
    setTimeout(() => {
      // Find matching preset answer or generate generic professional answer
      const match = presetQueries.find(q => q.q.toLowerCase().includes(text.toLowerCase()) || text.toLowerCase().includes(q.q.toLowerCase()));
      const replyText = match 
        ? match.a 
        : `Tôi đã ghi nhận câu hỏi: "${text}". Dựa trên phân tích toàn bộ báo cáo từ các chi bộ trực thuộc, thông tin này đang ở trạng thái ổn định và chưa phát sinh vụ việc khẩn cấp. Thường trực có muốn tôi trích xuất báo cáo chi tiết về đơn vị cụ thể nào liên quan không ạ?`;

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <section id="ai-assistant-section" className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 dark:bg-gold-500/20 text-gold-700 dark:text-gold-300 rounded-full border border-gold-500/20 text-xs font-semibold mb-3">
          <Bot className="w-4 h-4 text-crimson-700 dark:text-gold-500" />
          Tương Tác Trực Tiếp Lãnh Đạo
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          7. Trợ lý trí tuệ nhân tạo (AI Assistant)
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto rounded-full mt-3" />
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Thường trực Đảng ủy trao đổi trực tiếp với AI để tổng hợp nhanh thông tin nổi bật, truy vấn tiến độ, tạo dự thảo báo cáo hoặc soạn kết luận cuộc họp tức thời.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* PRESET PROMPTS PANELS */}
        <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-4 text-neutral-800 dark:text-neutral-200">
              <HelpCircle className="w-4 h-4 text-gold-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Bộ câu hỏi Thường trực</h4>
            </div>
            <p className="text-xxs text-neutral-400 dark:text-neutral-500 mb-4 leading-relaxed">
              Nhấp chọn câu hỏi gợi ý bên dưới để gửi lệnh truy vấn nhanh tới mô hình AI tổng hợp:
            </p>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {presetQueries.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(item.q)}
                  className="w-full text-left p-2.5 rounded-xl border border-neutral-100 dark:border-zinc-800/80 bg-neutral-50/50 dark:bg-zinc-950/30 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-gold-500/10 hover:border-gold-500/20 hover:text-gold-700 dark:hover:text-gold-400 font-medium transition-all duration-200"
                >
                  💬 {item.q}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 bg-crimson-500/5 dark:bg-crimson-500/10 border border-crimson-500/15 rounded-xl text-xxs text-neutral-500 dark:text-neutral-400 flex items-start gap-1.5 leading-relaxed">
            <AlertCircle className="w-3.5 h-3.5 text-crimson-600 shrink-0 mt-0.5" />
            <span>AI tóm tắt dựa trên toàn bộ dữ liệu thực tế tại phường được cập nhật tới thời điểm hiện tại.</span>
          </div>
        </div>

        {/* CHAT CHASSIS */}
        <div className="lg:col-span-8 flex flex-col h-[520px] rounded-2xl border border-gold-500/25 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-crimson-900 to-crimson-950 p-4 border-b border-gold-500/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gold-500/15 border border-gold-500/40 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-gold-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-zinc-950 animate-ping" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-zinc-950" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1">
                  Trợ Lý Điều Hành Đảng Ủy Phường
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-500/20 font-mono font-bold">V1.2</span>
                </h4>
                <p className="text-[9px] text-neutral-300">Hệ thống xử lý tóm tắt & phân tích thông tin Đảng bộ</p>
              </div>
            </div>

            <button
              onClick={() => setMessages([
                {
                  sender: 'bot',
                  text: 'Đã xóa lịch sử trò chuyện. Thường trực cần tôi tóm tắt thông tin gì mới hôm nay ạ?',
                  time: 'Vừa xong'
                }
              ])}
              className="text-[10px] text-neutral-300 hover:text-white bg-white/10 px-2 py-1 rounded border border-white/10 transition-colors"
            >
              Làm mới
            </button>
          </div>

          {/* Messages body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/50 dark:bg-zinc-950/20">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center border ${
                  msg.sender === 'user' 
                    ? 'bg-neutral-200 border-neutral-300 text-neutral-700' 
                    : 'bg-gold-500/15 border-gold-500/30 text-gold-600 dark:text-gold-400'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line text-left ${
                    msg.sender === 'user' 
                      ? 'bg-crimson-800 text-white rounded-tr-none font-medium' 
                      : 'bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-tl-none text-neutral-800 dark:text-neutral-100 shadow-xs'
                  }`}>
                    {msg.text}
                  </div>
                  <p className={`text-[8px] text-neutral-400 font-mono ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <div className="flex gap-3 mr-auto max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-600 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 p-3 rounded-2xl rounded-tl-none shadow-xs">
                  <div className="flex gap-1 text-gold-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Panel */}
          <div className="p-3 bg-white dark:bg-zinc-900 border-t border-neutral-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 bg-neutral-50 dark:bg-zinc-950 rounded-xl border border-neutral-200 dark:border-zinc-800 px-3 py-1.5">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSend(inputValue);
                  }
                }}
                placeholder="Trao đổi, đặt câu hỏi về tình hình Đảng bộ hoặc soạn thảo kết luận..."
                className="flex-1 text-xs bg-transparent border-none outline-none text-neutral-800 dark:text-zinc-100 placeholder-neutral-400 dark:placeholder-zinc-500 py-1"
              />
              <button
                onClick={() => handleSend(inputValue)}
                className="p-1.5 rounded-lg bg-crimson-800 text-white hover:bg-crimson-900 transition-colors shrink-0"
              >
                <Send className="w-4 h-4 text-gold-400" />
              </button>
            </div>
            <div className="hidden sm:flex items-center justify-between text-[9px] text-neutral-400 mt-1.5 px-1">
              <span>Được hỗ trợ bởi mô hình ngôn ngữ lớn chuyên biệt</span>
              <span className="flex items-center gap-0.5">Nhấn Enter <CornerDownLeft className="w-2.5 h-2.5" /> để gửi câu hỏi</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
