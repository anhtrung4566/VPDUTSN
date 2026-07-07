import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, FileSearch, Tag, ShieldAlert, Merge, AlertTriangle, FileText, ChevronRight, CheckCircle2,
  BookmarkCheck, HelpCircle
} from 'lucide-react';

interface AiProcessingProps {
  isDarkMode: boolean;
}

export default function AiProcessing({ isDarkMode }: AiProcessingProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  const processingSteps = [
    {
      step: 'Bước 1',
      title: 'Đọc & bóc tách dữ liệu',
      icon: <FileSearch className="w-5 h-5 text-crimson-600 dark:text-crimson-400" />,
      tagline: 'Quét toàn bộ văn bản & file đính kèm',
      desc: 'AI tiến hành đọc thông tin nhập liệu thô từ biểu mẫu điện tử kết hợp bóc tách sâu dữ liệu cấu trúc bên trong các tệp đính kèm Word, Excel, PDF hoặc bóc chữ từ Hình ảnh (OCR).',
      demoTitle: 'Bản mô phỏng AI trích xuất (OCR & NLP):',
      demoContent: {
        raw: 'Tệp tải lên: "Kehoach_cangthang_Khupho2.pdf" \nNội dung: "...gặp vướng mắc mặt bằng tại hẻm 245 Đất Mới khiến tiến độ trải nhựa chậm 10 ngày so với lịch bàn giao..."',
        processed: '✓ Trích xuất thành công: "Vướng mặt bằng trải nhựa hẻm 245 Đất Mới" \n✓ Đơn vị: "Chi bộ Khu phố 2"\n✓ Thời gian trễ dự kiến: "10 ngày"'
      }
    },
    {
      step: 'Bước 2',
      title: 'Phân loại chủ đề tự động',
      icon: <Tag className="w-5 h-5 text-gold-500" />,
      tagline: 'Gán nhãn thông minh vào 10 lĩnh vực cốt lõi',
      desc: 'Hệ thống tự động nhận diện ngôn ngữ và phân phối nội dung vào 10 chủ đề quản lý nhà nước độc lập để lưu trữ và xây dựng biểu đồ tương thích.',
      demoTitle: '10 Lĩnh vực hệ thống tự động gán nhãn:',
      demoContent: {
        categories: [
          'Xây dựng Đảng', 'Kinh tế', 'Văn hóa', 'Giáo dục', 'Y tế',
          'Quốc phòng', 'An ninh', 'Môi trường', 'Cải cách hành chính', 'Chuyển đổi số'
        ],
        example: 'Đầu vào: "Tổ chức học tập nghị quyết Đại hội" -> Phân loại AI: 🏷️ "Xây dựng Đảng" (Độ tin cậy 98%)'
      }
    },
    {
      step: 'Bước 3',
      title: 'Xác định mức độ ưu tiên',
      icon: <ShieldAlert className="w-5 h-5 text-rose-500" />,
      tagline: 'Phân tầng rủi ro để đưa ra cảnh báo',
      desc: 'Dựa trên mức độ nghiêm trọng và tính cấp bách của từ ngữ báo cáo (vụ việc phức tạp, khiếu kiện đông người, đình trệ hồ sơ...), AI chấm điểm rủi ro và gắn nhãn màu phù hợp.',
      demoTitle: '4 Cấp độ ưu tiên hệ thống giám sát:',
      demoContent: {
        priorities: [
          { name: '🟢 Bình thường', desc: 'Công tác thường nhật, ổn định.' },
          { name: '🟡 Cần theo dõi', desc: 'Có vướng mắc nhỏ nhưng đơn vị tự chủ trì được.' },
          { name: '🟠 Cần chỉ đạo', desc: 'Yêu cầu sự can thiệp phối hợp từ Thường trực.' },
          { name: '🔴 Khẩn cấp', desc: 'Sự cố phát sinh nghiêm trọng, cần xử lý ngay.' }
        ]
      }
    },
    {
      step: 'Bước 4',
      title: 'Gom nhóm nội dung tương tự',
      icon: <Merge className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      tagline: 'Hợp nhất trùng lặp để giảm nhiễu thông tin',
      desc: 'Khi có nhiều đơn vị cùng phản ánh một sự vụ hoặc một khó khăn phát sinh trên địa bàn, AI sẽ thông minh hợp nhất thành một nội dung tổng hợp duy nhất, tránh tình trạng chồng chéo dữ liệu.',
      demoTitle: 'Cơ chế loại bỏ trùng lặp dữ liệu thô:',
      demoContent: {
        rawInput: '👉 Chi bộ Tổ 3: "Dân phản ánh rác ùn ứ ở cầu sắt"\n👉 Đoàn Thanh niên: "Có bãi rác tự phát dưới chân cầu sắt gây ô nhiễm"',
        merged: '✨ AI Hợp nhất trên Dashboard: "Rác thải ùn ứ tự phát tại khu vực cầu sắt gây bức xúc trong nhân dân (Ghi nhận từ 02 đơn vị cơ sở)."'
      }
    },
    {
      step: 'Bước 5',
      title: 'Phát hiện vấn đề nổi bật',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      tagline: 'Sàng lọc sự kiện nóng đưa lên trang chủ',
      desc: 'AI tự động tính toán tần suất từ khóa xuất hiện nhiều lần hoặc phân tích trọng số ảnh hưởng xã hội để kéo thông tin quan trọng trực tiếp hiển thị lên trung tâm Dashboard cảnh báo.',
      demoTitle: 'Công nghệ phát hiện xu hướng (Trend Detection):',
      demoContent: {
        trend: 'Phát hiện sự gia tăng đột biến 150% từ khóa "vệ sinh an toàn thực phẩm" trong các trường mầm non trên địa bàn phường tuần qua -> Tự động đưa lên mục "Nội dung nổi bật cần Thường trực lưu ý".'
      }
    },
    {
      step: 'Bước 6',
      title: 'Sinh báo cáo điều hành',
      icon: <FileText className="w-5 h-5 text-indigo-500" />,
      tagline: 'Tự động biên soạn dự thảo báo cáo văn phòng',
      desc: 'Sau khi kết tinh toàn bộ dữ liệu sạch, AI tự tạo lập các mẫu báo cáo hoàn chỉnh với bố cục quy chuẩn, sẵn sàng để Văn phòng kiểm duyệt và xuất bản ra các định dạng Word, PDF.',
      demoTitle: 'Cấu trúc báo cáo điều hành tự động do AI sinh ra:',
      demoContent: {
        structure: [
          '1. Tình hình chung toàn phường',
          '2. Kết quả nổi bật tiêu biểu',
          '3. Khó khăn, vướng mắc phát sinh',
          '4. Các kiến nghị đề xuất từ cơ sở',
          '5. Danh mục nội dung cần xin ý kiến chỉ đạo',
          '6. Đề xuất danh sách nhiệm vụ trọng tâm tuần tới'
        ]
      }
    }
  ];

  return (
    <section id="ai-processing-section" className="py-16 px-4 md:px-8 max-w-7xl mx-auto bg-zinc-50 dark:bg-zinc-950/40 border-y border-neutral-200 dark:border-zinc-900 transition-colors">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson-500/10 dark:bg-crimson-500/20 text-crimson-700 dark:text-crimson-300 rounded-full border border-crimson-500/20 text-xs font-semibold mb-3">
          <Cpu className="w-4 h-4 text-crimson-700 dark:text-gold-500 animate-spin" />
          Công nghệ xử lý dữ liệu lõi
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
          6. Trực giác nhân tạo AI xử lý dữ liệu thế nào?
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto rounded-full" />
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Tìm hiểu quy trình 6 bước xử lý dữ liệu thông minh tự động hóa, chuyển hóa báo cáo định kỳ thô sơ thành tri thức điều hành chính xác cho Đảng ủy phường.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Steps Cards List (Bento-like Grid Selector) */}
        <div className="lg:col-span-5 space-y-3">
          {processingSteps.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`w-full p-4 rounded-xl border text-left transition-all duration-300 flex items-start gap-4 ${
                activeTab === idx
                  ? 'bg-white dark:bg-zinc-900 border-gold-500/40 shadow-md translate-x-2'
                  : 'bg-white/50 dark:bg-zinc-900/40 border-neutral-200/60 dark:border-zinc-800/60 hover:bg-white hover:border-gold-500/20'
              }`}
            >
              <div className={`p-2.5 rounded-xl border shrink-0 transition-all ${
                activeTab === idx
                  ? 'bg-gradient-to-br from-crimson-700 to-crimson-800 border-gold-500/30 text-white'
                  : 'bg-neutral-100 dark:bg-zinc-800 border-neutral-200 dark:border-zinc-700 text-neutral-500'
              }`}>
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                    activeTab === idx ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400' : 'bg-neutral-200 dark:bg-zinc-800 text-neutral-500'
                  }`}>
                    {item.step}
                  </span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">{item.tagline}</span>
                </div>
                <h4 className={`text-sm font-bold truncate ${activeTab === idx ? 'text-crimson-800 dark:text-gold-400' : 'text-neutral-700 dark:text-neutral-300'}`}>
                  {item.title}
                </h4>
              </div>
            </button>
          ))}
        </div>

        {/* Right Side: Step Interactive Live Simulation Details */}
        <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl border border-gold-500/20 bg-white dark:bg-zinc-900 shadow-md relative overflow-hidden min-h-[420px]">
          {/* Visual watermark */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gradient-to-tr from-gold-500/5 to-transparent rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-crimson-500/10 rounded-xl border border-crimson-500/20">
                    {processingSteps[activeTab].icon}
                  </div>
                  <div>
                    <span className="text-xxs font-mono font-semibold text-gold-600 dark:text-gold-400 uppercase tracking-wider block">
                      QUY TRÌNH HỆ THỐNG • {processingSteps[activeTab].step}
                    </span>
                    <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50">
                      {processingSteps[activeTab].title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium mb-6">
                  {processingSteps[activeTab].desc}
                </p>

                {/* Sub layout details specifically designed per step */}
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 space-y-3">
                  <h5 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    {processingSteps[activeTab].demoTitle}
                  </h5>

                  {/* Step 1 custom text */}
                  {activeTab === 0 && (
                    <div className="space-y-2 text-xxs font-mono">
                      <div className="p-2.5 rounded bg-zinc-100 dark:bg-zinc-900 text-neutral-500 border border-neutral-200 dark:border-zinc-800">
                        <span className="font-bold text-neutral-400 uppercase block mb-1">Dữ liệu thô từ cơ sở:</span>
                        {processingSteps[0].demoContent.raw}
                      </div>
                      <div className="p-2.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 whitespace-pre-line">
                        <span className="font-bold uppercase block mb-1">AI Phân tích sâu & Lưu trữ:</span>
                        {processingSteps[0].demoContent.processed}
                      </div>
                    </div>
                  )}

                  {/* Step 2 custom text */}
                  {activeTab === 1 && (
                    <div className="space-y-3 text-xs">
                      <div className="flex flex-wrap gap-1">
                        {processingSteps[1].demoContent.categories?.map((cat) => (
                          <span key={cat} className="text-[10px] px-2 py-0.5 rounded-md bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-neutral-600 dark:text-neutral-300 font-medium">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <div className="p-2.5 rounded bg-gold-500/10 text-gold-700 dark:text-gold-400 border border-gold-500/20 font-mono text-xxs">
                        {processingSteps[1].demoContent.example}
                      </div>
                    </div>
                  )}

                  {/* Step 3 custom text */}
                  {activeTab === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xxs">
                      {processingSteps[2].demoContent.priorities?.map((prio, pIdx) => (
                        <div key={pIdx} className="p-2 rounded bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800">
                          <span className="font-bold text-neutral-800 dark:text-neutral-100 block mb-0.5">{prio.name}</span>
                          <span className="text-neutral-500 dark:text-neutral-400">{prio.desc}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Step 4 custom text */}
                  {activeTab === 3 && (
                    <div className="space-y-2 text-xxs font-mono">
                      <div className="p-2.5 rounded bg-zinc-100 dark:bg-zinc-900 text-neutral-500 border border-neutral-200 dark:border-zinc-800 whitespace-pre-line">
                        <span className="font-bold text-neutral-400 uppercase block mb-1">Nhận 02 Báo cáo trùng ý:</span>
                        {processingSteps[3].demoContent.rawInput}
                      </div>
                      <div className="p-2.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
                        <span className="font-bold uppercase block mb-1">AI Tự động hợp nhất loại nhiễu:</span>
                        {processingSteps[3].demoContent.merged}
                      </div>
                    </div>
                  )}

                  {/* Step 5 custom text */}
                  {activeTab === 4 && (
                    <div className="p-2.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-mono text-xxs">
                      {processingSteps[4].demoContent.trend}
                    </div>
                  )}

                  {/* Step 6 custom text */}
                  {activeTab === 5 && (
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-medium text-neutral-600 dark:text-neutral-300">
                      {processingSteps[5].demoContent.structure?.map((item, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-1 bg-white dark:bg-zinc-900 p-1.5 rounded border border-neutral-200 dark:border-zinc-800/60">
                          <BookmarkCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-zinc-800/60 flex items-center justify-between text-xxs font-mono text-neutral-400">
                <span>HỌC MÁY LỚN CHUYÊN BIỆT</span>
                <span className="text-gold-600 dark:text-gold-400 font-bold">100% HOÀN TOÀN TỰ ĐỘNG</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
