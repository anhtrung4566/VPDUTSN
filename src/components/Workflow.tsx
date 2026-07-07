import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogIn, Edit3, Save, Cpu, Layers, RefreshCw, Eye, Landmark, FileText, CheckCircle, ArrowRight, ArrowDown 
} from 'lucide-react';

interface WorkflowProps {
  isDarkMode: boolean;
}

export default function Workflow({ isDarkMode }: WorkflowProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      title: 'Truy cập hệ thống',
      role: 'Đơn vị trực thuộc',
      icon: <LogIn className="w-5 h-5 text-crimson-600 dark:text-crimson-400" />,
      desc: 'Đại diện chi bộ, tổ chức đoàn thể truy cập trực tiếp hệ thống để gửi báo cáo không cần tài khoản.',
      detail: 'Cơ chế thông minh hỗ trợ gửi báo cáo tức thì, giảm thiểu rào cản thao tác nhưng vẫn đảm bảo định danh đúng cơ quan đơn vị.'
    },
    {
      title: 'Chọn "Cập nhật tình hình"',
      role: 'Đơn vị trực thuộc',
      icon: <FileText className="w-5 h-5 text-gold-500" />,
      desc: 'Nhấp chọn nút tác vụ cập nhật tình hình công tác định kỳ hoặc báo cáo đột xuất trên thanh điều hướng.',
      detail: 'Giao diện thân thiện tối giản, lược bỏ tối đa các thao tác rườm rà giúp người dùng định vị chức năng tức thì.'
    },
    {
      title: 'Nhập thông tin',
      role: 'Đơn vị trực thuộc',
      icon: <Edit3 className="w-5 h-5 text-crimson-600 dark:text-crimson-400" />,
      desc: 'Nhập tóm tắt công việc, kết quả, khó khăn và đính kèm văn bản, hình ảnh hỗ trợ nếu có.',
      detail: 'Hỗ trợ các trường thông tin có cấu trúc (từ khóa, hạn xử lý, mức độ ưu tiên) và các ô nhập liệu văn bản lớn tự do.'
    },
    {
      title: 'Lưu dữ liệu & gửi',
      role: 'Đơn vị trực thuộc',
      icon: <Save className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Hệ thống tự động lưu nháp dữ liệu liên tục để tránh mất mát và gửi lên máy chủ khi người dùng xác nhận.',
      detail: 'Dữ liệu được mã hóa truyền tải và ngay lập tức kích hoạt bộ lập lịch phân tích dữ liệu thời gian thực.'
    },
    {
      title: 'AI tự động phân tích',
      role: 'Trí tuệ nhân tạo (AI)',
      icon: <Cpu className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      desc: 'Trực giác nhân tạo AI đọc toàn bộ biểu mẫu và file đính kèm để tự động bóc tách từ khóa, phân nhóm lĩnh vực.',
      detail: 'Phân loại chủ đề tự động (Xây dựng Đảng, Kinh tế...) và nhận diện mức độ ưu tiên dựa trên mô hình ngôn ngữ lớn chuyên sâu.'
    },
    {
      title: 'AI tổng hợp dữ liệu',
      role: 'Trí tuệ nhân tạo (AI)',
      icon: <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      desc: 'AI tiến hành loại bỏ trùng lặp, gom cụm các báo cáo cùng phản ánh chung một vấn đề, sinh dự thảo báo cáo.',
      detail: 'Tự động trích xuất các ý chính, kiến nghị và đề xuất nội dung cần lãnh đạo xem xét để tiết kiệm thời gian đọc.'
    },
    {
      title: 'Dashboard cập nhật',
      role: 'Hệ thống trung tâm',
      icon: <RefreshCw className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      desc: 'Bảng số liệu thống kê, biểu đồ xu hướng và cảnh báo đỏ/cam/vàng lập tức làm mới theo dữ liệu vừa xử lý.',
      detail: 'Giúp chuyển đổi dữ liệu thô từ nhiều đơn vị thành các chỉ số số hóa sống động chỉ trong vài giây.'
    },
    {
      title: 'Thường trực theo dõi',
      role: 'Thường trực Đảng ủy',
      icon: <Eye className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      desc: 'Lãnh đạo truy cập Dashboard, nghe AI tóm tắt tình hình nổi bật hôm nay và phát hiện vấn đề cần tháo gỡ.',
      detail: 'Giúp Thường trực nắm bắt nhanh trạng thái phường mà không cần đọc hàng xấp văn bản Word dày cộp.'
    },
    {
      title: 'Ban hành chỉ đạo',
      role: 'Thường trực Đảng ủy',
      icon: <Landmark className="w-5 h-5 text-gold-500" />,
      desc: 'Ban hành trực tiếp kết luận chỉ đạo trên phần mềm, gán thời hạn và chỉ định cụ thể đơn vị phối hợp xử lý.',
      detail: 'Hệ thống tự động biên soạn nháp văn bản kết luận và chuyển hóa thành các nhiệm vụ giám sát điện tử.'
    },
    {
      title: 'Theo dõi kết quả thực hiện',
      role: 'Toàn hệ thống',
      icon: <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      desc: 'Giám sát tiến độ hoàn thành, hiển thị cảnh báo quá hạn tự động qua AI và lưu trữ lịch sử chỉ đạo điều hành.',
      detail: 'Tạo vòng lặp quản lý khép kín từ lúc phát sinh vấn đề cho đến khi giải quyết triệt để khó khăn ở cơ sở.'
    }
  ];

  return (
    <section id="workflow-section" className="py-16 px-4 md:px-8 bg-zinc-50 dark:bg-zinc-950/60 transition-colors border-y border-neutral-200 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50 mb-4">
            3. Quy trình hoạt động của hệ thống
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto rounded-full" />
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
            Quy trình vận hành khép kín, tối ưu hóa thời gian xử lý thông tin từ cấp cơ sở đến Thường trực thông qua trí tuệ nhân tạo. Click từng bước để xem cơ chế vận hành chi tiết.
          </p>
        </div>

        {/* Step Navigation Dots for desktop */}
        <div className="hidden lg:flex items-center justify-between gap-1 mb-12 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-gold-500/15 shadow-sm overflow-x-auto">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center flex-1 last:flex-initial">
              <button
                onClick={() => setActiveStep(idx)}
                className={`relative flex flex-col items-center gap-2 group transition-all duration-300 focus:outline-none flex-1`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  activeStep === idx 
                    ? 'bg-gradient-to-br from-crimson-700 to-crimson-800 border-gold-500 shadow-md scale-110 text-white' 
                    : 'bg-neutral-50 dark:bg-zinc-800 border-neutral-200 dark:border-zinc-700 text-neutral-500 dark:text-neutral-400 group-hover:border-gold-500/50 group-hover:text-gold-500'
                }`}>
                  {step.icon}
                </div>
                <span className={`text-[10px] font-bold text-center tracking-tight transition-colors duration-300 max-w-[85px] line-clamp-2 ${
                  activeStep === idx ? 'text-crimson-800 dark:text-gold-400' : 'text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300'
                }`}>
                  {idx + 1}. {step.title}
                </span>

                {activeStep === idx && (
                  <motion.div 
                    layoutId="activeStepUnderline" 
                    className="absolute -bottom-4 w-12 h-1 bg-crimson-600 dark:bg-gold-500 rounded-full" 
                  />
                )}
              </button>
              
              {idx < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-neutral-300 dark:text-zinc-700 mx-1 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile vertical layout / Details Pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Timeline side - interactive for vertical/mobile */}
          <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {steps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                  activeStep === idx
                    ? 'bg-white dark:bg-zinc-900 border-gold-500/40 shadow-sm pl-5'
                    : 'bg-white/60 dark:bg-zinc-900/40 border-neutral-200/60 dark:border-zinc-800/60 opacity-70 hover:opacity-100 hover:bg-white dark:hover:bg-zinc-900'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                  activeStep === idx
                    ? 'bg-crimson-700 text-gold-200'
                    : 'bg-neutral-100 dark:bg-zinc-800 text-neutral-500'
                }`}>
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className={`text-xs font-bold truncate ${activeStep === idx ? 'text-crimson-800 dark:text-gold-400' : 'text-neutral-700 dark:text-neutral-300'}`}>
                      {step.title}
                    </h4>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-500 dark:text-neutral-400 shrink-0 font-medium">
                      {step.role}
                    </span>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${activeStep === idx ? 'translate-x-1 text-gold-500' : 'text-neutral-300'}`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>

          {/* Expanded Step Detail Box */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl border border-gold-500/20 bg-white dark:bg-zinc-900 shadow-md relative overflow-hidden min-h-[350px]">
            {/* Visual corner decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/10 to-transparent pointer-events-none rounded-bl-full" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-4 bg-crimson-500/10 dark:bg-crimson-500/20 rounded-2xl border border-crimson-500/20">
                      {steps[activeStep].icon}
                    </div>
                    <div>
                      <span className="text-xxs font-mono font-bold text-gold-600 dark:text-gold-400 tracking-wider block uppercase">
                        BƯỚC {(activeStep + 1).toString().padStart(2, '0')} • {steps[activeStep].role}
                      </span>
                      <h3 className="text-xl font-display font-bold text-neutral-900 dark:text-neutral-50">
                        {steps[activeStep].title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-neutral-700 dark:text-neutral-200 leading-relaxed font-medium mb-4">
                    {steps[activeStep].desc}
                  </p>

                  <div className="p-4 rounded-xl bg-gold-500/5 dark:bg-zinc-800/40 border border-gold-500/15">
                    <h5 className="text-xs font-bold text-gold-700 dark:text-gold-400 mb-1">Cơ chế tự động hóa & chi tiết kỹ thuật:</h5>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {steps[activeStep].detail}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-zinc-800/60 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      disabled={activeStep === 0}
                      onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                      className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-zinc-700 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-neutral-700 dark:text-neutral-300 transition-colors"
                    >
                      Trước đó
                    </button>
                    <button
                      disabled={activeStep === steps.length - 1}
                      onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
                      className="px-3 py-1.5 rounded-lg bg-crimson-700 dark:bg-gold-600 text-white dark:text-zinc-950 text-xs font-bold hover:bg-crimson-800 dark:hover:bg-gold-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      Bước tiếp theo
                    </button>
                  </div>
                  <span className="text-xxs font-mono text-neutral-400">
                    TIẾN TRÌNH: {Math.round(((activeStep + 1) / steps.length) * 100)}% HOÀN TẤT
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
