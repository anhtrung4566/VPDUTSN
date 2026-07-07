import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckSquare, FileText, Bell, ClipboardList, Calendar, Landmark, AlertTriangle, 
  Download, FileCheck, Eye, ArrowRight, Clock, HelpCircle, CheckCircle2, AlertCircle,
  FileSpreadsheet, Printer
} from 'lucide-react';
import { Task, NotificationItem } from '../types';

interface FollowUpProps {
  tasks: Task[];
  isDarkMode: boolean;
  onUpdateTask: (task: Task) => void;
}

export default function FollowUp({ tasks, isDarkMode, onUpdateTask }: FollowUpProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [notificationFilter, setNotificationFilter] = useState<string>('all');

  const notifications: NotificationItem[] = [
    {
      id: 'n1',
      type: 'Lịch họp',
      title: 'Hội nghị Giao ban Thường trực Đảng ủy tuần 28',
      time: 'Thứ Hai, 08:00',
      content: 'Nội dung: Đánh giá tình hình công tác tuần 27, duyệt chủ trương số hóa Một cửa, chỉ đạo tháo gỡ mặt bằng KP3.',
      priority: 'high'
    },
    {
      id: 'n2',
      type: 'Lịch công tác',
      title: 'Kiểm tra thực địa dự án nâng cấp Nhà văn hóa Tổ 5',
      time: 'Thứ Ba, 14:00',
      content: 'Thường trực cùng bộ phận Đô thị, Ban chỉ huy Khu phố kiểm tra vướng mắc mặt bằng tập kết vật liệu.',
      priority: 'medium'
    },
    {
      id: 'n3',
      type: 'Văn bản mới',
      title: 'Nghị quyết số 124-NQ/ĐU về Chuyển đổi số Đảng bộ phường',
      time: 'Hôm qua',
      content: 'Nội dung chỉ đạo: 100% chi bộ hoàn tất thiết lập số liệu liên thông trực tuyến trên hệ thống AI Smart Dashboard.',
      priority: 'high'
    },
    {
      id: 'n4',
      type: 'Thông báo nội bộ',
      title: 'Yêu cầu cập nhật thông tin tuần trước thềm Đại hội',
      time: 'Hôm nay',
      content: 'Nhắc nhở toàn bộ các đơn vị cơ sở cập nhật đầy đủ số liệu công tác xây dựng Đảng trước Thứ Sáu hằng tuần.',
      priority: 'medium'
    },
    {
      id: 'n5',
      type: 'Nhắc nhở',
      title: 'Nhắc nhở tự động: Nhiệm vụ "Kiểm tra 14 hồ sơ đất đai"',
      time: 'Vừa xong',
      content: '⚠️ Nhiệm vụ giao cho bộ phận Một cửa đã đạt 80% thời hạn nhưng tiến độ mới đạt 30%. Đề nghị rà soát đẩy nhanh.',
      priority: 'high'
    }
  ];

  const reportTypes = [
    {
      id: 'r_day',
      title: 'Báo cáo ngày',
      desc: 'Tự động tạo lúc 17:00 hằng ngày, cô đọng hoạt động khẩn và cập nhật nhanh cơ sở.',
      code: 'BC-HN',
      sampleTitle: 'BÁO CÁO NHANH TÌNH HÌNH TRONG NGÀY',
      sampleContent: 'Ghi nhận toàn bộ các đơn vị hoàn tất báo cáo ngày. Tình hình an ninh chính trị ổn định. Phát hiện 01 sự vụ rác thải tự phát chân cầu Sắt đang được đội Đô thị xử lý.'
    },
    {
      id: 'r_week',
      title: 'Báo cáo tuần',
      desc: 'Hợp nhất số liệu lúc 16:00 Thứ Sáu hằng tuần, phục vụ họp giao ban Thường trực Đảng ủy.',
      code: 'BC-T',
      sampleTitle: 'BÁO CÁO CÔNG TÁC ĐẢNG BỘ PHƯỜNG HẰNG TUẦN',
      sampleContent: 'Tổng hợp tình hình từ các chi bộ trực thuộc: Công tác chuẩn bị Đại hội đạt đúng 85% kế hoạch. Kinh tế thương mại duy trì đà tăng trưởng nhẹ 1.2%. Về trật tự đô thị, xử lý dứt điểm 02 vụ lấn chiếm vỉa hè đường chính. Kiến nghị Thường trực duyệt hỗ trợ kinh phí hoạt động hè.'
    },
    {
      id: 'r_month',
      title: 'Báo cáo tháng',
      desc: 'Tổng hợp dữ liệu toàn diện cuối tháng, so sánh chỉ tiêu tăng trưởng giữa các chi bộ.',
      code: 'BC-M',
      sampleTitle: 'BÁO CÁO ĐIỀU HÀNH CHÍNH TRỊ - XÃ HỘI HẰNG THÁNG',
      sampleContent: 'Đánh giá chỉ tiêu tháng: Đảng bộ phường kết nạp thêm 03 Đảng viên mới (đạt 105% chỉ tiêu tháng). Số hóa hồ sơ Một cửa đạt 78% (vượt kế hoạch 3%). Giải quyết khiếu nại đất đai tồn đọng đạt 90%. Bản báo cáo đính kèm phụ lục biểu đồ biến động xu hướng.'
    },
    {
      id: 'r_quarter',
      title: 'Báo cáo quý',
      desc: 'Đánh giá định kỳ hằng quý, đề xuất điều chỉnh chỉ tiêu phát triển kinh tế và Đảng vụ.',
      code: 'BC-Q',
      sampleTitle: 'BÁO CÁO ĐÁNH GIÁ CHỈ TIÊU PHÁT TRIỂN HẰNG QUÝ',
      sampleContent: 'Kết quả Quý II: Tình hình thu ngân sách đạt 52% kế hoạch năm. Công tác xây dựng hệ thống chính trị vững mạnh tiếp tục giữ vững danh hiệu đi đầu. AI đề xuất đẩy nhanh tiến độ 02 công trình trọng điểm chậm mặt bằng.'
    },
    {
      id: 'r_spec',
      title: 'Báo cáo chuyên đề',
      desc: 'Báo cáo sâu theo một lĩnh vực nóng phát sinh (Đất đai, Cải cách hành chính, Số hóa...).',
      code: 'BC-CD',
      sampleTitle: 'BÁO CÁO CHUYÊN ĐỀ CẢI CÁCH HÀNH CHÍNH & CHUYỂN ĐỔI SỐ',
      sampleContent: 'Rà soát chuyên đề: Bộ phận Một cửa số hóa sổ hộ tịch đạt 100%. Triển khai thành công ứng dụng phản ánh hiện trường cho người dân. Thời gian xử lý thủ tục hành chính trung bình giảm từ 3 ngày xuống còn 1.5 ngày.'
    },
    {
      id: 'r_sum',
      title: 'Báo cáo tổng kết',
      desc: 'Báo cáo niên độ tổng kết năm, phục vụ hội nghị BCH Đảng bộ và Đại hội Đảng bộ Phường.',
      code: 'BC-TK',
      sampleTitle: 'BÁO CÁO TỔNG KẾT TOÀN DIỆN NIÊN ĐỘ ĐẢNG BỘ PHƯỜNG',
      sampleContent: 'Khép lại niên độ công tác: Toàn bộ 24/24 chỉ tiêu chính trị, kinh tế, văn hóa xã hội đều đạt và vượt. Hệ thống AI Smart Dashboard vận hành ổn định giúp tiết kiệm 70% thời gian biên soạn văn bản hành chính của Văn phòng Đảng ủy.'
    }
  ];

  const filteredNotifications = notificationFilter === 'all'
    ? notifications
    : notifications.filter(n => n.type === notificationFilter);

  return (
    <section id="followup-reports-notifications-section" className="py-16 px-4 md:px-8 max-w-7xl mx-auto space-y-20 relative">
      
      {/* SECTION 8: THEO DÕI CHỈ ĐẠO */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson-500/10 dark:bg-crimson-500/20 text-crimson-700 dark:text-crimson-300 rounded-full border border-crimson-500/20 text-xs font-semibold mb-3">
            <ClipboardList className="w-4 h-4 text-crimson-700 dark:text-gold-500" />
            Vòng Lặp Chỉ Đạo Khép Kín
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            8. Giám sát & Theo dõi thực hiện chỉ đạo
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto mt-3 rounded-full" />
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Sau khi Thường trực ban hành chỉ đạo trực tiếp từ các báo cáo nổi bật, hệ thống tự động lập hồ sơ nhiệm vụ điện tử, theo dõi tiến độ sát sao qua Trí tuệ nhân tạo.
          </p>
        </div>

        {/* AI Reminder Warning Bar */}
        <div className="p-4 rounded-xl bg-rose-500/5 dark:bg-rose-950/10 border border-rose-500/20 flex flex-col sm:flex-row items-center gap-3 text-left">
          <div className="p-2 bg-rose-500/10 rounded-lg text-rose-600 animate-pulse shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-rose-800 dark:text-rose-400">🚨 Trực quan cảnh báo tự động thông minh bằng AI:</h4>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Trí tuệ nhân tạo sẽ tự động rà soát tiến độ của từng nhiệm vụ 24/24. Gửi nhắc nhở tự động qua tin nhắn hệ thống, SMS và Zalo cho người phụ trách khi nhiệm vụ còn 48h hết hạn hoặc đã quá hạn thực hiện.
            </p>
          </div>
          <div className="px-3 py-1 bg-rose-500/10 text-rose-700 dark:text-rose-300 rounded text-[10px] font-mono font-bold uppercase tracking-wider shrink-0">
            AI REMINDER ACTIVE
          </div>
        </div>

        {/* Dynamic Task Table */}
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-neutral-50 dark:bg-zinc-950 border-b border-neutral-200 dark:border-zinc-800 text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                <th className="p-4 font-semibold">Tên nhiệm vụ chỉ đạo</th>
                <th className="p-4 font-semibold">Đơn vị triển khai</th>
                <th className="p-4 font-semibold">Người phụ trách</th>
                <th className="p-4 font-semibold">Ngày giao & Hạn chót</th>
                <th className="p-4 font-semibold">Tiến độ thực tế</th>
                <th className="p-4 font-semibold">Trạng thái</th>
                <th className="p-4 font-semibold text-right">Tác vụ</th>
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-neutral-100 dark:divide-zinc-800/60 font-medium">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-neutral-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="p-4">
                    <div className="max-w-[280px]">
                      <p className="font-bold text-neutral-800 dark:text-neutral-100 leading-snug">{task.name}</p>
                      {task.result && <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1 italic font-normal">Kết quả: {task.result}</p>}
                    </div>
                  </td>
                  <td className="p-4 font-mono">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300 text-[10px]">
                      {task.unit}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300 font-sans">{task.assignee}</td>
                  <td className="p-4">
                    <div className="font-mono text-[10px] text-neutral-500">
                      <p>Giao: {task.assignedDate}</p>
                      <p className="text-crimson-700 dark:text-gold-500 font-bold">Hạn: {task.dueDate}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-[120px] space-y-1">
                      <div className="flex justify-between font-mono text-[9px] text-neutral-400">
                        <span>Đã thực hiện</span>
                        <span className="font-bold">{task.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-300 ${
                            task.status === 'Hoàn thành' ? 'bg-emerald-500' :
                            task.status === 'Quá hạn' ? 'bg-rose-500 animate-pulse' :
                            'bg-amber-500'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      task.status === 'Hoàn thành' ? 'bg-emerald-500/10 text-emerald-600' :
                      task.status === 'Đang thực hiện' ? 'bg-blue-500/10 text-blue-600' :
                      task.status === 'Quá hạn' ? 'bg-rose-500/10 text-rose-600 animate-pulse' :
                      'bg-amber-500/10 text-amber-600'
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        let nextProg = task.progress + 25;
                        let nextStat = task.status;
                        let resultText = task.result;
                        if (nextProg > 100) {
                          nextProg = 0;
                          nextStat = 'Chưa thực hiện';
                          resultText = undefined;
                        } else if (nextProg === 100) {
                          nextStat = 'Hoàn thành';
                          resultText = 'Đã hoàn thành rà soát thực địa bàn giao đúng thời hạn.';
                        } else {
                          nextStat = 'Đang thực hiện';
                        }
                        onUpdateTask({ ...task, progress: nextProg, status: nextStat, result: resultText });
                      }}
                      className="text-[10px] font-bold text-crimson-800 dark:text-gold-400 hover:underline px-2 py-1 bg-neutral-100 dark:bg-zinc-800 rounded transition-colors"
                      title="Click để giả lập cập nhật tiến độ"
                    >
                      Cập nhật tiến độ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 9: BÁO CÁO AI */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/10 dark:bg-gold-500/20 text-gold-700 dark:text-gold-300 rounded-full border border-gold-500/20 text-xs font-semibold mb-3">
            <FileText className="w-4 h-4 text-crimson-700 dark:text-gold-500" />
            Tự Động Hóa Hành Chính Công vụ
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            9. Trung tâm Báo cáo AI tự động hóa cao cấp
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto mt-3 rounded-full" />
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Hệ thống tự động biên dịch, hiệu đính và phân tích các dạng báo cáo hành chính theo đúng khuôn mẫu quy chuẩn của Văn phòng Đảng ủy. Xuất file tức thời.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              className="p-5 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex flex-col justify-between hover:border-gold-500/30 dark:hover:border-gold-500/25 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[10px] font-mono font-bold bg-neutral-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-neutral-500">
                    SỐ: {report.code}/BC-ĐU
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                  {report.title}
                </h3>
                <p className="text-xxs text-neutral-500 dark:text-neutral-400 mt-2 leading-relaxed">
                  {report.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-zinc-800/60 flex items-center gap-2">
                <button
                  onClick={() => setSelectedReport(report.id)}
                  className="flex-1 text-center py-2 bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700 text-[10px] font-bold rounded-lg text-neutral-700 dark:text-neutral-300 transition-colors flex items-center justify-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> Xem trước báo cáo
                </button>
                <button
                  onClick={() => alert(`Hệ thống đang xuất bản tệp Word ${report.title} đúng mẫu tiêu chuẩn văn phòng Đảng ủy...`)}
                  className="p-2 bg-crimson-800 hover:bg-crimson-900 rounded-lg text-white transition-colors"
                  title="Xuất file Word mẫu"
                >
                  <Download className="w-3.5 h-3.5 text-gold-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 10: THÔNG BÁO */}
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson-500/10 dark:bg-crimson-500/20 text-crimson-700 dark:text-crimson-300 rounded-full border border-crimson-500/20 text-xs font-semibold mb-3">
            <Bell className="w-4 h-4 text-crimson-700 dark:text-gold-500" />
            Nhịp Đập Điều Hành Cực Bộ
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            10. Hệ thống Thông báo & Thông tin nội bộ
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto mt-3 rounded-full" />
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Trung tâm kết nối thông báo toàn phường, đồng bộ hóa lịch công tác, lịch họp và các nghị quyết điều hành văn bản Đảng ủy mới nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Filters Rail */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col gap-1 overflow-x-auto bg-neutral-100 dark:bg-zinc-900/60 p-1.5 rounded-xl border border-neutral-200 dark:border-zinc-800 shrink-0">
            {['all', 'Lịch họp', 'Lịch công tác', 'Văn bản mới', 'Thông báo nội bộ', 'Nhắc nhở'].map((filter) => (
              <button
                key={filter}
                onClick={() => setNotificationFilter(filter)}
                className={`text-left text-xs font-bold px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  notificationFilter === filter
                    ? 'bg-crimson-800 text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-zinc-850'
                }`}
              >
                {filter === 'all' ? '🗂️ Tất cả thông báo' : filter === 'Lịch họp' ? '📅 Lịch họp Thường trực' : filter === 'Lịch công tác' ? '🏃 Lịch công tác' : filter === 'Văn bản mới' ? '📄 Văn bản mới ban hành' : filter === 'Thông báo nội bộ' ? '📢 Thông báo nội bộ' : '⚠️ Nhắc nhở, Cảnh báo'}
              </button>
            ))}
          </div>

          {/* Notifications Board */}
          <div className="lg:col-span-9 space-y-3.5 max-h-[480px] overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((notif) => (
                <motion.div
                  key={notif.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs flex items-start gap-4 text-left"
                >
                  <div className={`p-2.5 rounded-xl border shrink-0 ${
                    notif.type === 'Lịch họp' ? 'bg-amber-500/10 border-amber-500/20 text-amber-600' :
                    notif.type === 'Lịch công tác' ? 'bg-blue-500/10 border-blue-500/20 text-blue-600' :
                    notif.type === 'Văn bản mới' ? 'bg-purple-500/10 border-purple-500/20 text-purple-600' :
                    notif.type === 'Nhắc nhở' ? 'bg-rose-500/10 border-rose-500/20 text-rose-600 animate-pulse' :
                    'bg-emerald-500/10 border-emerald-500/20 text-emerald-600'
                  }`}>
                    {notif.type === 'Lịch họp' ? <Calendar className="w-5 h-5" /> :
                     notif.type === 'Lịch công tác' ? <Clock className="w-5 h-5" /> :
                     notif.type === 'Văn bản mới' ? <FileCheck className="w-5 h-5" /> :
                     notif.type === 'Nhắc nhở' ? <AlertTriangle className="w-5 h-5" /> :
                     <Bell className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-100 dark:bg-zinc-800 text-neutral-500 dark:text-neutral-400">
                        {notif.type.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-neutral-400 font-mono font-medium">{notif.time}</span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-50 leading-snug truncate">
                      {notif.title}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium">
                      {notif.content}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* DETAILED PARTY OFFICE STANDARD REPORT PREVIEW MODAL */}
      <AnimatePresence>
        {selectedReport && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white text-zinc-950 max-w-2xl w-full rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal controls */}
              <div className="bg-zinc-100 p-4 border-b border-zinc-200 flex items-center justify-between shrink-0">
                <span className="text-xs font-bold text-zinc-700 flex items-center gap-1.5 font-sans">
                  <Printer className="w-4 h-4 text-zinc-500" />
                  Mẫu xem trước báo cáo điện tử tiêu chuẩn Đảng bộ Phường
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert('Đang in ấn / Tải xuống tệp PDF chính thức...')}
                    className="p-1.5 text-xs font-bold bg-crimson-800 hover:bg-crimson-900 text-white rounded-lg flex items-center gap-1"
                  >
                    Tải PDF
                  </button>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="px-2.5 py-1 text-xs font-bold border border-zinc-300 text-zinc-600 hover:bg-zinc-200 rounded-lg"
                  >
                    Đóng
                  </button>
                </div>
              </div>

              {/* Party Standard Layout Inside Modal */}
              <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-6 text-left font-serif text-sm leading-relaxed max-w-full">
                
                {/* National Banner Block */}
                <div className="grid grid-cols-2 gap-4 items-start text-xs font-bold font-sans tracking-wide">
                  <div className="text-center space-y-1">
                    <p className="uppercase text-[11px]">ĐẢNG CỘNG SẢN VIỆT NAM</p>
                    <p className="uppercase underline underline-offset-4 text-[10px]">ĐẢNG ỦY PHƯỜNG TRUNG TÂM</p>
                    <p className="text-[9px] font-normal font-mono text-zinc-500">Số: {reportTypes.find(r => r.id === selectedReport)?.code || '00'}-BC/ĐU</p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="uppercase text-[11px] font-serif font-bold text-red-900">ĐẢNG BỘ PHƯỜNG TRUNG TÂM</p>
                    <p className="text-[10px] italic font-serif font-normal">Phường Trung Tâm, ngày 06 tháng 07 năm 2026</p>
                  </div>
                </div>

                <div className="w-1/3 h-px bg-zinc-300 mx-auto my-4" />

                {/* Report Title */}
                <div className="text-center space-y-2">
                  <h3 className="text-base font-bold font-serif uppercase tracking-wider text-red-950">
                    {reportTypes.find(r => r.id === selectedReport)?.sampleTitle}
                  </h3>
                  <p className="text-xxs font-sans font-bold text-zinc-500 uppercase tracking-widest text-center">
                    THỰC HIỆN TỰ ĐỘNG BẰNG TRÍ TUỆ NHÂN TẠO SMART SYSTEM
                  </p>
                </div>

                <div className="space-y-4 pt-4 text-xs font-sans text-zinc-800 leading-relaxed border-t border-dashed border-zinc-200">
                  <p><strong>Kính gửi:</strong> Thường trực Đảng ủy Phường Trung Tâm.</p>
                  
                  <div>
                    <h4 className="font-bold text-zinc-950 mb-1">I. TÌNH HÌNH TỔNG QUAN</h4>
                    <p className="text-zinc-600 pl-4">
                      Hệ thống tự động hóa AI Smart Dashboard ghi nhận toàn bộ số liệu cập nhật định kỳ từ các đơn vị cơ sở trực thuộc Đảng bộ phường. Lượng thông tin đồng bộ đầy đủ, đảm bảo an toàn bảo mật dữ liệu hành chính.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-bold text-zinc-950 mb-1">II. NỘI DUNG TỔNG HỢP (AI COMPILED)</h4>
                    <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl italic text-zinc-700 pl-4 whitespace-pre-line">
                      "{reportTypes.find(r => r.id === selectedReport)?.sampleContent}"
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-zinc-950 mb-1">III. ĐỀ XUẤT CHỈ ĐẠO CỦA VĂN PHÒNG ĐẢNG ỦY</h4>
                    <p className="text-zinc-600 pl-4">
                      Văn phòng Đảng ủy đã kiểm duyệt nội dung do AI đề xuất. Đề nghị Thường trực Đảng ủy chỉ đạo các đơn vị triển khai họp giao ban rà soát ngay tiến độ đối với các nội dung quá hạn, vướng mắc phát sinh ở cơ sở.
                    </p>
                  </div>
                </div>

                {/* Sign-off Block */}
                <div className="pt-8 grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <p className="font-bold uppercase text-zinc-400">Nơi nhận:</p>
                    <p className="text-[10px] text-zinc-500">- Thường trực Đảng ủy (để b/c);<br />- Ủy ban kiểm tra Đảng ủy;<br />- Lưu Văn phòng ĐU.</p>
                  </div>
                  <div className="text-center space-y-12">
                    <div>
                      <p className="font-bold uppercase">T/M VĂN PHÒNG ĐẢNG ỦY</p>
                      <p className="text-[10px] text-zinc-500">(Đã ký điện tử trên hệ thống)</p>
                    </div>
                    <p className="font-bold uppercase text-red-950">Chánh Văn phòng Đảng ủy</p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
