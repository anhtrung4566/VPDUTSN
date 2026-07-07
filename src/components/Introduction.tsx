import { motion } from 'motion/react';
import { Target, Shield, Users, Award, Landmark, LayoutDashboard, Send, FileCheck } from 'lucide-react';

interface IntroductionProps {
  isDarkMode: boolean;
}

export default function Introduction({ isDarkMode }: IntroductionProps) {
  const userRoles = [
    {
      title: 'Thường trực Đảng ủy',
      icon: <Landmark className="w-6 h-6 text-gold-500" />,
      desc: 'Người sử dụng cấp cao, nắm giữ quyền chỉ đạo toàn diện phường.',
      actions: [
        'Xem Dashboard tổng hợp toàn diện thời gian thực.',
        'Đọc báo cáo thông minh tự động do AI tổng hợp.',
        'Theo dõi và giám sát các cảnh báo khẩn cấp/quan trọng.',
        'Giám sát tiến độ thực hiện các chỉ tiêu, nhiệm vụ được giao.',
        'Trực tiếp giao nhiệm vụ, chỉ đạo xử lý khó khăn vướng mắc.',
        'Đánh giá kết quả thực hiện nhiệm vụ của từng đơn vị trực thuộc.'
      ]
    },
    {
      title: 'Văn phòng Đảng ủy',
      icon: <LayoutDashboard className="w-6 h-6 text-crimson-600 dark:text-crimson-400" />,
      desc: 'Bộ phận đầu mối, vận hành và điều phối toàn bộ luồng thông tin hệ thống.',
      actions: [
        'Quản lý danh sách tài khoản người dùng và thông tin bảo mật.',
        'Quản lý danh mục các đơn vị trực thuộc tham gia hệ thống.',
        'Kiểm duyệt và biên tập thông tin cập nhật từ các đơn vị.',
        'Theo dõi tiến độ thực hiện nhiệm vụ, nhắc nhở định kỳ.',
        'Xuất báo cáo định kỳ (ngày, tuần, tháng) ra file Word/PDF.',
        'Quản lý bảng thông báo chung, lịch họp và lịch công tác.'
      ]
    },
    {
      title: 'Các đơn vị trực thuộc',
      icon: <Users className="w-6 h-6 text-gold-500" />,
      desc: 'Các chi bộ, tổ chức đoàn thể, bộ phận trực thuộc tham gia cập nhật số liệu.',
      actions: [
        'Cập nhật nhanh tình hình công tác định kỳ hoặc khi có phát sinh.',
        'Gửi kèm văn bản, tệp tài liệu liên quan để AI tự động trích xuất.',
        'Báo cáo nhanh các khó khăn, vướng mắc cần Thường trực hỗ trợ.',
        'Đề xuất các giải pháp tháo gỡ khó khăn hoặc phối hợp liên ngành.',
        'Không yêu cầu soạn báo cáo bằng file Word phức tạp theo mẫu cũ.',
        'Cập nhật tiến độ các nhiệm vụ cụ thể được Thường trực giao phó.'
      ]
    }
  ];

  return (
    <section id="introduction-section" className="relative py-16 px-4 md:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-1/4 w-96 h-96 gold-glow -z-10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 crimson-glow -z-10 rounded-full blur-3xl pointer-events-none" />

      {/* SECTION 1: GIỚI THIỆU */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crimson-500/10 dark:bg-crimson-500/20 text-crimson-700 dark:text-crimson-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-crimson-500/20"
          >
            <Award className="w-4 h-4 text-gold-500 animate-pulse-slow" />
            Vận hành thông minh - Chỉ đạo nhạy bén
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4"
          >
            1. Giới thiệu tổng quan
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl border border-gold-500/20 bg-gradient-to-br from-white to-gold-50/20 dark:from-zinc-900/90 dark:to-zinc-950/40 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-crimson-500/10 dark:bg-crimson-500/20 rounded-xl border border-crimson-500/20">
                  <Target className="w-6 h-6 text-crimson-600 dark:text-crimson-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 dark:text-neutral-50">
                  Mục tiêu hệ thống
                </h3>
              </div>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                Xây dựng một hệ thống nội bộ giúp các đơn vị trực thuộc cập nhật tình hình công tác định kỳ thông qua 
                biểu mẫu điện tử thông minh. Hệ thống sử dụng 
                <strong className="text-crimson-700 dark:text-crimson-400 font-semibold"> trí tuệ nhân tạo (AI) </strong> 
                để tự động tổng hợp dữ liệu, phân tích các xu hướng, phát hiện khó khăn và trình bày trực quan dưới dạng báo cáo 
                điều hành khoa học.
              </p>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                Hệ thống giúp <strong className="text-gold-600 dark:text-gold-400 font-semibold">Thường trực Đảng ủy</strong> nắm bắt 
                tình hình toàn diện cực kỳ nhanh chóng, kịp thời hỗ trợ công tác chỉ đạo, điều hành thống nhất và ra các quyết định 
                chính trị, kinh tế - xã hội chính xác nhất.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gold-500/10 grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                <div className="text-2xl font-bold font-mono text-crimson-700 dark:text-crimson-400">3-5p</div>
                <div className="text-xxs text-neutral-500 dark:text-neutral-400">Cập nhật nhanh</div>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                <div className="text-2xl font-bold font-mono text-gold-600 dark:text-gold-500">100%</div>
                <div className="text-xxs text-neutral-500 dark:text-neutral-400">Tự động hóa AI</div>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-500">24/7</div>
                <div className="text-xxs text-neutral-500 dark:text-neutral-400">Điều hành liên tục</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 flex flex-col justify-between p-8 rounded-2xl border border-crimson-500/20 bg-gradient-to-br from-white to-crimson-50/10 dark:from-zinc-900/90 dark:to-zinc-950/40 shadow-sm"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gold-500/10 dark:bg-gold-500/20 rounded-xl border border-gold-500/20">
                  <Shield className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                </div>
                <h3 className="text-xl font-display font-semibold text-neutral-900 dark:text-neutral-50">
                  Vai trò định vị thực tế
                </h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 dark:bg-amber-500/10">
                  <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-1 flex items-center gap-1.5">
                    🚫 Không thay thế Hệ thống Tác nghiệp
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Hệ thống không thay thế các Hệ điều hành tác nghiệp của Đảng, không thay thế phần mềm quản lý văn bản chính thống của các cơ quan nhà nước.
                  </p>
                </div>
                
                <div className="p-4 rounded-xl bg-crimson-500/5 border border-crimson-500/10 dark:bg-crimson-500/10">
                  <h4 className="text-sm font-semibold text-crimson-700 dark:text-crimson-400 mb-1 flex items-center gap-1.5">
                    🚀 Công cụ Tổng lực Hỗ trợ
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    Hệ thống đóng vai trò đắc lực như một trợ lý ảo phân tích, làm sạch, gom nhóm dữ liệu thô và trình bày trực quan giúp theo dõi chặt chẽ tiến trình thực hiện nhiệm vụ chính trị.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3 bg-gold-500/5 border border-gold-500/15 dark:bg-zinc-800/30 rounded-xl text-center text-xs italic text-neutral-600 dark:text-neutral-400">
              "Xử lý dữ liệu phức tạp chỉ trong nháy mắt, trả lại giao diện điều hành trực quan nhất cho Thường trực Đảng ủy"
            </div>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: ĐỐI TƯỢNG SỬ DỤNG */}
      <div className="mt-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4"
          >
            2. Đối tượng sử dụng hệ thống
          </motion.h2>
          <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto rounded-full" />
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            Mỗi bộ phận trong hệ thống được phân quyền chặt chẽ với giao diện và tác vụ tối ưu riêng biệt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userRoles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col justify-between p-6 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-xl hover:border-gold-500/30 dark:hover:border-gold-500/25 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-neutral-100 dark:bg-zinc-800 rounded-xl group-hover:bg-gold-500/10 group-hover:border-gold-500/30 border border-transparent transition-all duration-300">
                    {role.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold text-neutral-950 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {role.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6 leading-relaxed">
                  {role.desc}
                </p>

                <div className="h-px bg-neutral-100 dark:bg-zinc-800 mb-6" />

                <ul className="space-y-3">
                  {role.actions.map((act, actIdx) => (
                    <li key={actIdx} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-crimson-600 dark:bg-crimson-500 shrink-0 group-hover:bg-gold-500 transition-colors" />
                      <span className="leading-relaxed">{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-zinc-800/60 flex items-center justify-between text-xxs font-mono text-neutral-400 dark:text-neutral-500">
                <span>PHÂN QUYỀN CHÍNH THỨC</span>
                <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800 text-neutral-500 dark:text-neutral-400 font-bold">LV-{3 - idx}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
