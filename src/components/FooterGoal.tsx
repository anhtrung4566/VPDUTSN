import { motion } from 'motion/react';
import { 
  Award, ShieldCheck, Smartphone, Zap, Sparkles, Moon, Sun, Flame, Landmark, CheckCircle 
} from 'lucide-react';

interface FooterGoalProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function FooterGoal({ isDarkMode, toggleDarkMode }: FooterGoalProps) {
  const uiSpecs = [
    {
      title: 'Thiết kế sang trọng, tối giản',
      icon: <Award className="w-5 h-5 text-gold-500" />,
      desc: 'Sử dụng tông màu đỏ thắm và vàng kim sang trọng, tối giản hóa các thành phần nhiễu để nâng cao độ trang trọng của cơ quan Đảng bộ.'
    },
    {
      title: 'Độ tương thích (Responsive) đa thiết bị',
      icon: <Smartphone className="w-5 h-5 text-crimson-600 dark:text-crimson-400" />,
      desc: 'Hiển thị hoàn hảo và linh hoạt trên tất cả nền tảng màn hình: Máy tính để bàn (Desktop), Máy tính bảng (Tablet) và Điện thoại di động (Mobile).'
    },
    {
      title: 'Dashboard trực quan sinh động',
      icon: <Sparkles className="w-5 h-5 text-gold-500" />,
      desc: 'Bản đồ chỉ số, các thẻ thống kê tổng hợp và biểu đồ tương tác hiện đại giúp lãnh đạo thấu hiểu dữ liệu chỉ trong vài giây.'
    },
    {
      title: 'Tối ưu tốc độ & Trải nghiệm vượt trội',
      icon: <Zap className="w-5 h-5 text-crimson-600 dark:text-crimson-400" />,
      desc: 'Ứng dụng ưu tiên tốc độ tải trang cực nhanh, tinh giản hóa mọi thao tác nhập liệu giúp việc đồng bộ hóa mượt mà nhất.'
    }
  ];

  return (
    <footer className="relative bg-zinc-900 text-neutral-300 overflow-hidden pt-16 border-t border-gold-500/30">
      
      {/* Background Gold Foil Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-gold-500/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16 pb-12">
        
        {/* SECTION 11: YÊU CẦU GIAO DIỆN */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded bg-gold-500/15 text-gold-400 border border-gold-500/30 uppercase tracking-widest">
              Section 11 • Giao Diện Chuẩn Quy Khách
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-white tracking-tight mt-3">
              11. Yêu cầu tiêu chuẩn giao diện người dùng
            </h2>
            <p className="text-xs text-neutral-400 mt-2">
              Các tiêu chuẩn khắt khe nhất được áp dụng để đảm bảo tính sẵn sàng, bảo mật, thẩm mỹ và khả năng tiếp cận rộng mở.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {uiSpecs.map((spec, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-zinc-950/50 border border-zinc-800/80 hover:border-gold-500/20 transition-all duration-300"
              >
                <div className="p-2.5 bg-zinc-900 rounded-xl border border-zinc-800 w-fit mb-4">
                  {spec.icon}
                </div>
                <h4 className="text-xs font-bold text-white mb-2">{spec.title}</h4>
                <p className="text-xxs text-neutral-400 leading-relaxed font-medium">{spec.desc}</p>
              </div>
            ))}
          </div>

          {/* SÁNG / TỐI TOGGLE DEMO BUTTON INSIDE UI REQ */}
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-left max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gold-500/10 rounded-lg text-gold-400">
                {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </div>
              <div>
                <h5 className="text-xs font-bold text-white">Chế độ giao diện Sáng / Tối (Light & Dark Mode)</h5>
                <p className="text-[10px] text-neutral-400">Đồng bộ chế độ ánh sáng phù hợp thị lực của lãnh đạo 24h</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-gradient-to-r from-gold-600 to-gold-500 text-zinc-950 text-xxs font-extrabold rounded-lg hover:from-gold-500 hover:to-gold-400 transition-all duration-200 shrink-0 shadow-md flex items-center gap-1.5"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDarkMode ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
            </button>
          </div>
        </div>

        <div className="h-px bg-zinc-800" />

        {/* SECTION 12: MỤC TIÊU CUỐI CÙNG & GỢI Ý QUAN TRỌNG */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left">
          
          {/* Main Ultimate Goal Column */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-crimson-950/40 to-transparent border border-crimson-500/20 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-crimson-500/10 rounded-xl border border-crimson-500/20">
                <Flame className="w-6 h-6 text-crimson-500 animate-pulse" />
              </div>
              <div>
                <span className="text-xxs font-mono font-bold text-gold-400 block uppercase tracking-wider">Tác động cốt lõi</span>
                <h3 className="text-lg font-display font-bold text-white">12. Mục tiêu cuối cùng của dự án</h3>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed font-medium">
              Thiết kế hướng tới tối ưu hóa hiệu quả thời gian công vụ vượt bậc: <strong className="text-gold-400 font-semibold">mỗi đơn vị chỉ mất 3–5 phút</strong> để cập nhật tình hình hoạt động định kỳ. Toàn bộ các công đoạn xử lý phức tạp sau đó sẽ do trí tuệ nhân tạo (AI) đảm nhiệm toàn diện:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xxs">
              <div className="flex items-center gap-2 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/80">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-neutral-300 font-semibold">Tổng hợp thông tin đa nguồn tự động</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/80">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-neutral-300 font-semibold">Phân tích dữ liệu, bóc tách tệp đính kèm</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/80">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-neutral-300 font-semibold">Phát hiện vấn đề khẩn, sàng lọc sự kiện nóng</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/80">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-neutral-300 font-semibold">Đề xuất kịp thời nội dung chỉ đạo thực tế</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/80">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-neutral-300 font-semibold">Soạn thảo văn bản báo cáo điều hành nháp</span>
              </div>
              <div className="flex items-center gap-2 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-800/80">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-neutral-300 font-semibold">Hỗ trợ Thường trực ra quyết định nhanh, tối ưu</span>
              </div>
            </div>
          </div>

          {/* Suggester Recap Column */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-950/50 border border-gold-500/15 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-gold-500" />
              <h4 className="text-xs font-bold uppercase text-white tracking-wider">Ý kiến tư vấn quan trọng từ Chuyên gia</h4>
            </div>
            
            <p className="text-xxs text-neutral-400 leading-relaxed font-medium">
              Để tránh việc dữ liệu bị mơ hồ khi người dùng nhập văn bản hoàn toàn tự do, hệ thống đã thông minh tích hợp thêm các cấu trúc trường đầu vào chuẩn hóa (đã cài đặt trong Biểu mẫu cập nhật ở Section 5):
            </p>

            <ul className="space-y-2 text-xxs font-medium text-neutral-300">
              <li className="flex items-start gap-1.5">
                <span className="text-gold-500 mt-0.5 shrink-0">⭐</span>
                <span>Từ khóa chính định vị vụ việc (AI tự động bóc tách & gợi ý).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gold-500 mt-0.5 shrink-0">⭐</span>
                <span>Chỉ định rõ Mức độ ưu tiên (Bình thường / Quan trọng / Khẩn).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gold-500 mt-0.5 shrink-0">⭐</span>
                <span>Gán thời hạn xử lý cụ thể (Hạn chót nếu có).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gold-500 mt-0.5 shrink-0">⭐</span>
                <span>Cấu trúc điều kiện: Có cần xin ý kiến Thường trực Đảng ủy hay không?</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-gold-500 mt-0.5 shrink-0">⭐</span>
                <span>Cấu trúc liên phối hợp: Có cần phối hợp liên ngành với đơn vị khác hay không?</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="h-px bg-zinc-800" />

        {/* Legal, copyrights and signature */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xxs text-neutral-500 font-mono">
          <div className="flex items-center gap-2">
            <Landmark className="w-4 h-4 text-crimson-600" />
            <span>© 2026 VĂN PHÒNG ĐẢNG ỦY PHƯỜNG TRUNG TÂM. BẢN QUYỀN HỆ THỐNG ĐÃ ĐƯỢC BẢO HỘ CHÍNH THỨC.</span>
          </div>
          <div className="flex items-center gap-2">
            <span>AI MODEL ENGINE: GEMINI 3.5 FLASH</span>
            <span>•</span>
            <span className="text-gold-500 font-bold">STATE SMART TECH PLATFORM</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
