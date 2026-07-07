import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, CheckCircle2, AlertTriangle, MessageSquareCode, ShieldAlert, Clock, 
  Sparkles, AlertCircle, PlayCircle, BarChart3, PieChart as PieIcon, LineChart as LineIcon, 
  TrendingUp, RefreshCw, Send, CheckSquare, Plus, ChevronRight,
  Search, Filter, FileText, Eye, Brain, X
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Task, UnitUpdate, AlertItem, NotificationItem } from '../types';

interface DashboardViewProps {
  updates: UnitUpdate[];
  tasks: Task[];
  onAddTask: (task: Task) => void;
  onUpdateTask: (task: Task) => void;
  isDarkMode: boolean;
}

export default function DashboardView({ updates, tasks, onAddTask, onUpdateTask, isDarkMode }: DashboardViewProps) {
  const [activeChart, setActiveChart] = useState<'day' | 'week' | 'field' | 'trend'>('field');
  const [selectedAlertLevel, setSelectedAlertLevel] = useState<string | null>(null);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    unit: 'Chi bộ Khu phố 1',
    assignee: 'Nguyễn Văn A',
    dueDate: '2026-07-15',
    progress: 0,
    status: 'Chưa thực hiện' as const
  });

  // States for Documents list and AI summaries
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [selectedUpdate, setSelectedUpdate] = useState<UnitUpdate | null>(null);
  const [aiSummarizingId, setAiSummarizingId] = useState<string | null>(null);
  const [aiSummaries, setAiSummaries] = useState<Record<string, { overview: string; points: string[] }>>({});

  const handleTriggerAiSummary = (updateId: string, update: UnitUpdate) => {
    if (aiSummaries[updateId] || aiSummarizingId === updateId) return;
    setAiSummarizingId(updateId);
    
    setTimeout(() => {
      const generated = {
        overview: `Báo cáo phân tích tự động thuộc lĩnh vực **${update.category}** của đơn vị **${update.unitName}** do đồng chí **${update.updater}** (${update.role}) lập ngày **${update.updatedAt}**.`,
        points: [
          `🎯 **Công việc cốt lõi hoàn thành**: ${update.completedWork}`,
          `🏆 **Kết quả / Thành tựu nổi bật**: ${update.outstandingResult || 'Nhiệm vụ được hoàn thành tốt.'}`,
          `⚠️ **Khó khăn, vướng mắc phát sinh**: ${update.difficulty || 'Không ghi nhận khó khăn lớn.'}`,
          `💡 **Ý kiến đề xuất của cơ sở**: ${update.suggestion || 'Không có đề xuất thêm.'}`,
          `📅 **Định hướng, kế hoạch tiếp theo**: ${update.nextPlan || 'Tiếp tục triển khai nhiệm vụ chính.'}`
        ]
      };
      setAiSummaries(prev => ({
        ...prev,
        [updateId]: generated
      }));
      setAiSummarizingId(null);
    }, 1500);
  };

  const handleCreateTaskSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddTask({
      id: `task_${Date.now()}`,
      name: newTask.name,
      unit: newTask.unit,
      assignee: newTask.assignee,
      assignedDate: new Date().toLocaleDateString('vi-VN'),
      dueDate: newTask.dueDate,
      progress: newTask.progress,
      status: newTask.status
    });
    setNewTask({
      name: '',
      unit: 'Chi bộ Khu phố 1',
      assignee: 'Nguyễn Văn A',
      dueDate: '2026-07-15',
      progress: 0,
      status: 'Chưa thực hiện' as const
    });
    setShowAddTaskModal(false);
  };

  // Calculate metrics based on actual updates + preset
  const updatedUnitsCount = updates.length;
  const highlightedIssuesCount = updates.filter(u => u.priority === 'Khẩn' || u.priority === 'Quan trọng').length;
  const pendingDirectionsCount = updates.filter(u => u.standingReviewNeeded === 'Có' || u.priority === 'Khẩn').length;
  const activeTasksCount = tasks.filter(t => t.status !== 'Hoàn thành').length;
  const overdueTasksCount = tasks.filter(t => t.status === 'Quá hạn').length;

  // Alerts array from user requirements
  const alerts: AlertItem[] = [
    {
      id: 'a1',
      level: '🔴 Khẩn cấp',
      color: 'red',
      title: 'Tiến độ xử lý hồ sơ trễ hạn diện rộng',
      source: 'Bộ phận Địa chính - Xây dựng',
      time: '10 phút trước',
      content: 'Báo cáo ghi nhận 14 hồ sơ đất đai quá hạn chưa được trả kết quả, cần Thường trực chỉ đạo kiểm điểm, tháo gỡ ách tắc thủ tục.'
    },
    {
      id: 'a2',
      level: '🟠 Quan trọng',
      color: 'orange',
      title: 'Thiếu nhân sự tại bộ phận Một cửa',
      source: 'Văn phòng UBND Phường',
      time: '1 giờ trước',
      content: 'Công chức Một cửa nghỉ thai sản chưa có nhân sự dự phòng thay thế, dẫn tới tình trạng dồn ứ hồ sơ hành chính vào giờ cao điểm.'
    },
    {
      id: 'a3',
      level: '🟡 Theo dõi',
      color: 'yellow',
      title: 'Dự án tu sửa Nhà văn hóa Tổ 5 chậm tiến độ',
      source: 'Ban điều hành Khu phố 3',
      time: '3 giờ trước',
      content: 'Đơn vị thi công phản ánh vướng mặt bằng tập kết vật tư. Hiện đang phối hợp tháo gỡ, cần giám sát chặt chẽ.'
    },
    {
      id: 'a4',
      level: '🟢 Bình thường',
      color: 'green',
      title: 'Hoạt động hè cho thanh thiếu niên',
      source: 'Đoàn Thanh niên Phường',
      time: 'Hôm nay',
      content: 'Kế hoạch khai mạc giải bóng đá thiếu nhi hè đã hoàn tất, thu hút 12 đội bóng tham gia, an toàn, lành mạnh.'
    }
  ];

  // AI highlighted summary points
  const aiHighlightsPreset = [
    "Nhiều đơn vị phản ánh tiến độ giải quyết hồ sơ còn chậm (tập trung lĩnh vực đất đai, tư pháp hộ tịch).",
    "Công tác chuẩn bị các hoạt động chính trị, đại hội chi bộ nhiệm kỳ được triển khai đúng kế hoạch.",
    "Tình hình an ninh chính trị, trật tự an toàn xã hội ổn định, không phát sinh vụ việc phức tạp về an ninh trật tự.",
    "Có kiến nghị về bổ sung nguồn lực, trang thiết bị máy tính phục vụ số hóa tài liệu tại bộ phận một cửa."
  ];

  // Combine AI highlighted suggestions from user updates + preset
  const aiHighlights = [
    ...updates.map(u => `${u.unitName}: ${u.completedWork.slice(0, 80)}... [Nổi bật: ${u.outstandingResult}]`),
    ...aiHighlightsPreset
  ].slice(0, 5);

  // Standing review items
  const standingReviewPreset = [
    "Xin chủ trương triển khai mô hình mới 'Camera an ninh tự động cảnh báo xâm nhập'.",
    "Đề nghị chỉ đạo phối hợp liên ngành giữa Công an và Đô thị để xử lý lấn chiếm vỉa hè trục chính.",
    "Đề nghị giải quyết dứt điểm các hồ sơ tồn đọng thuộc thẩm quyền cấp Quận.",
    "Kiến nghị điều chỉnh kế hoạch thực hiện nhiệm vụ văn hóa văn nghệ kỷ niệm ngày lễ lớn."
  ];

  const standingReviews = [
    ...updates.filter(u => u.standingReviewNeeded === 'Có').map(u => `Đơn vị ${u.unitName} xin ý kiến: "${u.suggestion || 'Cần Thường trực tháo gỡ vướng mắc'}"`),
    ...standingReviewPreset
  ].slice(0, 5);

  // CHARTS DATA PRESET
  // 1. Report counts by fields (AI Classified)
  const fieldData = [
    { name: 'Xây dựng Đảng', value: updates.filter(u => u.category === 'Xây dựng Đảng').length + 5, color: '#991b1b' },
    { name: 'Kinh tế', value: updates.filter(u => u.category === 'Kinh tế').length + 3, color: '#d97706' },
    { name: 'Văn hóa', value: updates.filter(u => u.category === 'Văn hóa').length + 4, color: '#b45309' },
    { name: 'Y tế - Giáo dục', value: updates.filter(u => u.category === 'Y tế' || u.category === 'Giáo dục').length + 3, color: '#ca942f' },
    { name: 'An ninh - QP', value: updates.filter(u => u.category === 'An ninh' || u.category === 'Quốc phòng').length + 6, color: '#7f1d1d' },
    { name: 'CCHC - CĐS', value: updates.filter(u => u.category === 'Cải cách hành chính' || u.category === 'Chuyển đổi số').length + 7, color: '#4c0d0d' },
  ];

  // 2. Report frequency by Day (Monday - Sunday)
  const dayData = [
    { name: 'Thứ 2', 'Báo cáo đã gửi': 12 },
    { name: 'Thứ 3', 'Báo cáo đã gửi': 16 },
    { name: 'Thứ 4', 'Báo cáo đã gửi': 19 },
    { name: 'Thứ 5', 'Báo cáo đã gửi': 21 },
    { name: 'Thứ 6', 'Báo cáo đã gửi': 23 },
    { name: 'Thứ 7', 'Báo cáo đã gửi': updates.length + 8 },
    { name: 'Chủ Nhật', 'Báo cáo đã gửi': updates.length + 2 },
  ];

  // 3. Weekly submission frequency
  const weekData = [
    { name: 'Tuần 1', 'Đạng ủy': 20, 'Đoàn thể': 15, 'Khu phố': 18 },
    { name: 'Tuần 2', 'Đạng ủy': 22, 'Đoàn thể': 17, 'Khu phố': 19 },
    { name: 'Tuần 3', 'Đạng ủy': 24, 'Đoàn thể': 22, 'Khu phố': 23 },
    { name: 'Tuần 4', 'Đạng ủy': updates.length + 15, 'Đoàn thể': updates.length + 12, 'Khu phố': updates.length + 14 },
  ];

  // 4. Highlighted issue trends
  const trendData = [
    { name: 'Tháng 1', 'Cần chỉ đạo': 4, 'Khẩn cấp': 2, 'Bình thường': 25 },
    { name: 'Tháng 2', 'Cần chỉ đạo': 6, 'Khẩn cấp': 1, 'Bình thường': 28 },
    { name: 'Tháng 3', 'Cần chỉ đạo': 8, 'Khẩn cấp': 4, 'Bình thường': 32 },
    { name: 'Tháng 4', 'Cần chỉ đạo': 5, 'Khẩn cấp': 3, 'Bình thường': 30 },
    { name: 'Tháng 5', 'Cần chỉ đạo': 7, 'Khẩn cấp': 2, 'Bình thường': 34 },
    { name: 'Tháng 6', 'Cần chỉ đạo': updates.filter(u => u.standingReviewNeeded === 'Có').length + 6, 'Khẩn cấp': updates.filter(u => u.priority === 'Khẩn').length + 3, 'Bình thường': updates.length + 25 },
  ];

  const toggleTaskStatus = (task: Task) => {
    let nextStatus: Task['status'] = 'Đang thực hiện';
    let nextProgress = 50;

    if (task.status === 'Chưa thực hiện') {
      nextStatus = 'Đang thực hiện';
      nextProgress = 50;
    } else if (task.status === 'Đang thực hiện') {
      nextStatus = 'Hoàn thành';
      nextProgress = 100;
    } else {
      nextStatus = 'Chưa thực hiện';
      nextProgress = 0;
    }

    onUpdateTask({
      ...task,
      status: nextStatus,
      progress: nextProgress
    });
  };

  return (
    <section id="dashboard-section" className="space-y-8 scroll-mt-24">
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          4. Bảng điều hành thông minh (AI Smart Dashboard)
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto rounded-full mt-3" />
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Tổng hợp tự động toàn diện hoạt động của các đơn vị cơ sở thông qua phân tích ngôn ngữ tự nhiên từ trí tuệ nhân tạo.
        </p>
      </div>

      {/* METRICS (CHỈ SỐ GÓC TRÊN) */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
        <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border border-neutral-200 dark:border-zinc-800 shadow-xs hover:border-gold-500/20 transition-colors">
          <div className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Tổng số báo cáo</div>
          <div className="text-2xl font-bold font-mono text-neutral-800 dark:text-neutral-50 mt-1">{updates.length}</div>
          <div className="text-[10px] text-neutral-400 mt-1">Đã được tiếp nhận</div>
        </div>
        <div className="p-4 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-xl border border-emerald-500/20 shadow-xs hover:border-emerald-500/40 transition-colors">
          <div className="text-xxs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Đơn vị đã gửi</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">{new Set(updates.map(u => u.unitName)).size}</div>
          <div className="text-[10px] text-emerald-500 mt-1">Đơn vị cơ sở</div>
        </div>
        <div className="p-4 bg-amber-500/5 dark:bg-amber-500/10 rounded-xl border border-amber-500/20 shadow-xs hover:border-amber-500/40 transition-colors">
          <div className="text-xxs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">Báo cáo quan trọng</div>
          <div className="text-2xl font-bold font-mono text-amber-600 dark:text-amber-500 mt-1">{updates.filter(u => u.priority === 'Khẩn' || u.priority === 'Quan trọng').length}</div>
          <div className="text-[10px] text-amber-500 mt-1">Sự kiện đáng lưu tâm</div>
        </div>
        <div className="p-4 bg-crimson-500/5 dark:bg-crimson-500/10 rounded-xl border border-crimson-500/20 shadow-xs hover:border-crimson-500/40 transition-colors">
          <div className="text-xxs font-bold text-crimson-800 dark:text-crimson-400 uppercase tracking-wider">Nổi bật (AI)</div>
          <div className="text-2xl font-bold font-mono text-crimson-600 dark:text-crimson-400 mt-1">{highlightedIssuesCount}</div>
          <div className="text-[10px] text-crimson-500 mt-1">Phát hiện tự động</div>
        </div>
        <div className="p-4 bg-purple-500/5 dark:bg-purple-500/10 rounded-xl border border-purple-500/20 shadow-xs hover:border-purple-500/40 transition-colors">
          <div className="text-xxs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider">Cần chỉ đạo</div>
          <div className="text-2xl font-bold font-mono text-purple-600 dark:text-purple-400 mt-1">{pendingDirectionsCount}</div>
          <div className="text-[10px] text-purple-500 mt-1">Đề xuất lên Thường trực</div>
        </div>
        <div className="p-4 bg-blue-500/5 dark:bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-xs hover:border-blue-500/40 transition-colors">
          <div className="text-xxs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider font-sans">N.Vụ đang theo dõi</div>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">{activeTasksCount}</div>
          <div className="text-[10px] text-blue-500 mt-1">Chưa hoàn tất</div>
        </div>
        <div className="p-4 bg-rose-500/5 dark:bg-rose-500/10 rounded-xl border border-rose-500/20 shadow-xs hover:border-rose-500/40 transition-colors">
          <div className="text-xxs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">N.Vụ quá hạn</div>
          <div className="text-2xl font-bold font-mono text-rose-600 dark:text-rose-400 mt-1">{overdueTasksCount}</div>
          <div className="text-[10px] text-rose-500 mt-1">🔴 Báo động khẩn</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN (AI SUMMARY, HIGHLIGHTS, REVIEW REQUESTS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* AI SUMMARY TODAY */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 rounded-2xl border border-gold-500/30 bg-gradient-to-br from-amber-500/5 via-crimson-500/5 to-transparent dark:from-zinc-900 dark:to-zinc-950 relative overflow-hidden shadow-xs"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gold-500/5 to-transparent rounded-bl-full" />
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-gold-500/15 rounded-lg border border-gold-500/30">
                  <Sparkles className="w-5 h-5 text-gold-600 dark:text-gold-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-50 text-base">
                    AI Tóm tắt hôm nay
                  </h3>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400">
                    Báo cáo phân tích tự động tức thì (Real-time AI Executive Summary)
                  </p>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-gold-500/10 dark:bg-gold-500/20 text-gold-700 dark:text-gold-300 border border-gold-500/20">
                THƯỜNG TRỰC DAILY
              </span>
            </div>

            <div className="p-4 bg-white/70 dark:bg-zinc-900/50 rounded-xl border border-gold-500/10 space-y-3 text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
              <p className="flex items-start gap-2">
                <span className="text-emerald-500 shrink-0">✔</span>
                <span>Hệ thống đã nhận thành công <strong className="font-semibold text-neutral-900 dark:text-white">{updates.length + 18} báo cáo</strong> từ các đơn vị trực thuộc.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-teal-500 shrink-0">✔</span>
                <span>Tình hình chung tại địa bàn phường <strong className="font-semibold text-emerald-600 dark:text-emerald-400">ổn định, đúng tiến độ đề ra</strong>.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-amber-500 shrink-0">✦</span>
                <span>Ghi nhận <strong className="font-semibold text-neutral-900 dark:text-white">04 nội dung nổi bật</strong> cần lưu ý trong công tác cải cách hành chính và giải quyết đất đai.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-rose-500 shrink-0">✦</span>
                <span>Có <strong className="font-semibold text-rose-600 dark:text-rose-400">02 kiến nghị khẩn</strong> cần xin ý kiến chỉ đạo trực tiếp của Thường trực Đảng ủy về phối hợp cơ sở.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">⚠️</span>
                <span>Phát hiện <strong className="font-semibold text-rose-600 dark:text-rose-400">01 nhiệm vụ quá hạn</strong> cần xử lý ngay tại bộ phận Một cửa.</span>
              </p>
            </div>
          </motion.div>

          {/* COLOR ALERTS */}
          <div>
            <h4 className="font-display font-bold text-neutral-900 dark:text-neutral-50 text-sm mb-3 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-crimson-600" />
              Các cảnh báo phân loại mức độ (AI Flagged Alerts)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlertLevel(selectedAlertLevel === alert.id ? null : alert.id)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                    alert.color === 'red' ? 'bg-rose-500/5 dark:bg-rose-950/10 border-rose-500/25 hover:bg-rose-500/10' :
                    alert.color === 'orange' ? 'bg-amber-500/5 dark:bg-amber-950/10 border-amber-500/25 hover:bg-amber-500/10' :
                    alert.color === 'yellow' ? 'bg-yellow-500/5 dark:bg-yellow-950/10 border-yellow-500/25 hover:bg-yellow-500/10' :
                    'bg-emerald-500/5 dark:bg-emerald-950/10 border-emerald-500/25 hover:bg-emerald-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xxs font-bold uppercase tracking-wider">{alert.level}</span>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">{alert.time}</span>
                  </div>
                  <h5 className="text-xs font-bold text-neutral-800 dark:text-neutral-200 truncate">{alert.title}</h5>
                  <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mb-2 font-medium">{alert.source}</p>
                  
                  <AnimatePresence>
                    {(selectedAlertLevel === alert.id || alert.color === 'red') && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xxs text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-dashed border-neutral-300 dark:border-neutral-700 pt-2 mt-2"
                      >
                        {alert.content}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* AI AUTOSUMMARIZED HIGHLIGHTS */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <h4 className="font-display font-bold text-neutral-900 dark:text-neutral-50 text-sm mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-crimson-600" />
              Nội dung nổi bật hôm nay (AI tự động đồng bộ & rút gọn)
            </h4>
            <div className="space-y-3">
              {aiHighlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50 dark:bg-zinc-950 border border-neutral-100 dark:border-zinc-900">
                  <div className="w-5 h-5 rounded bg-gold-500/10 dark:bg-gold-500/20 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 text-xxs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* STANDING COMMITTEE REVIEWS */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <h4 className="font-display font-bold text-neutral-900 dark:text-neutral-50 text-sm mb-4 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-gold-500" />
              Nội dung đề xuất Thường trực cho ý kiến (AI trích xuất khẩn)
            </h4>
            <div className="space-y-3">
              {standingReviews.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-crimson-500/5 dark:bg-crimson-500/10 border border-crimson-500/10">
                  <div className="w-5 h-5 rounded bg-crimson-500/10 dark:bg-crimson-500/20 text-crimson-600 dark:text-crimson-400 flex items-center justify-center shrink-0 text-xxs font-bold">
                    {index + 1}
                  </div>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (CHARTS, TASKS LIST) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* CHARTS CONTAINER */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-50 text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-gold-500" />
                  Biểu đồ trực quan hóa dữ liệu
                </h3>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Phân tích tần suất và chuyên đề thông tin</p>
              </div>

              {/* Chart selector */}
              <div className="flex flex-wrap gap-1 bg-neutral-100 dark:bg-zinc-950 p-1 rounded-lg border border-neutral-200 dark:border-zinc-800 shrink-0">
                <button
                  onClick={() => setActiveChart('field')}
                  className={`text-[9px] px-2 py-1 font-bold rounded-md transition-colors ${
                    activeChart === 'field' ? 'bg-crimson-700 text-white' : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Lĩnh vực
                </button>
                <button
                  onClick={() => setActiveChart('day')}
                  className={`text-[9px] px-2 py-1 font-bold rounded-md transition-colors ${
                    activeChart === 'day' ? 'bg-crimson-700 text-white' : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Theo ngày
                </button>
                <button
                  onClick={() => setActiveChart('week')}
                  className={`text-[9px] px-2 py-1 font-bold rounded-md transition-colors ${
                    activeChart === 'week' ? 'bg-crimson-700 text-white' : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Theo tuần
                </button>
                <button
                  onClick={() => setActiveChart('trend')}
                  className={`text-[9px] px-2 py-1 font-bold rounded-md transition-colors ${
                    activeChart === 'trend' ? 'bg-crimson-700 text-white' : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Xu hướng
                </button>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === 'field' ? (
                  <BarChart data={fieldData} margin={{ top: 10, right: 5, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#27272a' : '#f3f4f6'} />
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke={isDarkMode ? '#a1a1aa' : '#71717a'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={isDarkMode ? '#a1a1aa' : '#71717a'} />
                    <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#18181b' : '#ffffff', borderColor: '#ca942f', fontSize: '10px' }} />
                    <Bar dataKey="value" name="Số lượng báo cáo">
                      {fieldData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                ) : activeChart === 'day' ? (
                  <BarChart data={dayData} margin={{ top: 10, right: 5, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#27272a' : '#f3f4f6'} />
                    <XAxis dataKey="name" tick={{ fontSize: 9 }} stroke={isDarkMode ? '#a1a1aa' : '#71717a'} />
                    <YAxis tick={{ fontSize: 9 }} stroke={isDarkMode ? '#a1a1aa' : '#71717a'} />
                    <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#18181b' : '#ffffff', borderColor: '#ca942f', fontSize: '10px' }} />
                    <Legend wrapperStyle={{ fontSize: '9px' }} />
                    <Bar dataKey="Báo cáo đã gửi" fill="#b91c1c" />
                  </BarChart>
                ) : activeChart === 'week' ? (
                  <BarChart data={weekData} margin={{ top: 10, right: 5, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#27272a' : '#f3f4f6'} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke={isDarkMode ? '#a1a1aa' : '#71717a'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={isDarkMode ? '#a1a1aa' : '#71717a'} />
                    <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#18181b' : '#ffffff', borderColor: '#ca942f', fontSize: '10px' }} />
                    <Legend wrapperStyle={{ fontSize: '9px' }} />
                    <Bar dataKey="Đảng ủy" fill="#7f1d1d" />
                    <Bar dataKey="Đoàn thể" fill="#ca942f" />
                    <Bar dataKey="Khu phố" fill="#ab7521" />
                  </BarChart>
                ) : (
                  <LineChart data={trendData} margin={{ top: 10, right: 5, left: -25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#27272a' : '#f3f4f6'} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke={isDarkMode ? '#a1a1aa' : '#71717a'} />
                    <YAxis tick={{ fontSize: 10 }} stroke={isDarkMode ? '#a1a1aa' : '#71717a'} />
                    <Tooltip contentStyle={{ backgroundColor: isDarkMode ? '#18181b' : '#ffffff', borderColor: '#ca942f', fontSize: '10px' }} />
                    <Legend wrapperStyle={{ fontSize: '9px' }} />
                    <Line type="monotone" dataKey="Cần chỉ đạo" stroke="#d97706" strokeWidth={2} />
                    <Line type="monotone" dataKey="Khẩn cấp" stroke="#b91c1c" strokeWidth={2} />
                    <Line type="monotone" dataKey="Bình thường" stroke="#059669" strokeWidth={1} />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-center text-neutral-400 dark:text-neutral-500 italic mt-3">
              (*) Biểu đồ được AI phân loại nội dung tự động từ trường nhập liệu "Mức độ ưu tiên" và "Lĩnh vực cập nhật".
            </p>
          </div>

          {/* MONITORED TASKS (NHIỆM VỤ ĐANG THEO DÕI) */}
          <div className="p-6 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-neutral-900 dark:text-neutral-50 text-sm flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-crimson-700" />
                  Nhiệm vụ đang theo dõi sát
                </h3>
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500">Giám sát tiến độ chỉ đạo của Thường trực</p>
              </div>
              <button
                onClick={() => setShowAddTaskModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-crimson-800 text-white hover:bg-crimson-900 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Giao việc
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[380px] pr-1">
              {tasks.map((task) => (
                <div key={task.id} className="p-3 bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800/80 rounded-xl space-y-2">
                  <div className="flex items-start justify-between gap-1">
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-neutral-200 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300">
                      {task.unit}
                    </span>
                    <button
                      onClick={() => toggleTaskStatus(task)}
                      className={`text-[9px] px-2 py-0.5 font-bold rounded-md uppercase tracking-wider shrink-0 transition-colors ${
                        task.status === 'Hoàn thành' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                        task.status === 'Đang thực hiện' ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400' :
                        task.status === 'Quá hạn' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 animate-pulse' :
                        'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      }`}
                      title="Nhấn để đổi trạng thái giả định"
                    >
                      {task.status}
                    </button>
                  </div>
                  
                  <h4 className="text-xs font-bold text-neutral-800 dark:text-neutral-100 leading-snug">
                    {task.name}
                  </h4>
                  
                  <div className="flex items-center justify-between text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
                    <span>Phụ trách: <strong>{task.assignee}</strong></span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold-500" />
                      Hạn: {task.dueDate}
                    </span>
                  </div>

                  {/* PROGRESS BAR */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] text-neutral-400">
                      <span>Tiến độ thực tế</span>
                      <span className="font-mono font-bold text-neutral-700 dark:text-neutral-300">{task.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          task.status === 'Hoàn thành' ? 'bg-emerald-500' :
                          task.status === 'Quá hạn' ? 'bg-rose-500' :
                          'bg-amber-500'
                        }`} 
                        style={{ width: `${task.progress}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* NEW INTEGRATED SECTION: GRASSROOTS REPORTS LOG & AI SUMMARIES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm space-y-6 text-left"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 dark:border-zinc-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-crimson-800/10 text-crimson-800 dark:text-gold-400 rounded-full border border-crimson-800/20 text-xxs font-bold">
              <Brain className="w-3.5 h-3.5" />
              BỘ PHẬN TỔNG HỢP VĂN PHÒNG
            </div>
            <h3 className="font-display font-extrabold text-neutral-900 dark:text-neutral-50 text-xl tracking-tight">
              🗂️ SỔ NHẬN BÁO CÁO & TRUNG TÂM TÓM TẮT AI
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Lưu trữ toàn bộ các báo cáo tình hình của cơ sở. Thường trực có thể bấm "Tóm tắt AI" hoặc xem chi tiết tài liệu đính kèm.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {/* Search inputs */}
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Tìm kiếm đơn vị, người báo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-1.5 text-xs rounded-xl border border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500 w-52"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="p-1.5 text-[11px] rounded-lg border border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 focus:outline-none"
              >
                <option value="All">Tất cả lĩnh vực</option>
                <option value="Xây dựng Đảng">Xây dựng Đảng</option>
                <option value="Kinh tế">Kinh tế</option>
                <option value="Văn hóa">Văn hóa</option>
                <option value="Cải cách hành chính">Cải cách hành chính</option>
                <option value="Chuyển đổi số">Chuyển đổi số</option>
                <option value="An ninh">An ninh</option>
                <option value="Quốc phòng">Quốc phòng</option>
              </select>
            </div>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="p-1.5 text-[11px] rounded-lg border border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 focus:outline-none"
            >
              <option value="All">Tất cả mức độ</option>
              <option value="Khẩn">Khẩn</option>
              <option value="Quan trọng">Quan trọng</option>
              <option value="Bình thường">Bình thường</option>
            </select>
          </div>
        </div>

        {/* Reports Grid/List */}
        <div className="space-y-4">
          {updates
            .filter(u => {
              const matchesSearch = u.unitName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                    u.updater.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    (u.completedWork && u.completedWork.toLowerCase().includes(searchTerm.toLowerCase()));
              const matchesCategory = categoryFilter === 'All' || u.category === categoryFilter;
              const matchesPriority = priorityFilter === 'All' || u.priority === priorityFilter;
              return matchesSearch && matchesCategory && matchesPriority;
            })
            .map((update) => {
              const hasAiSummary = !!aiSummaries[update.id];
              const isSummarizing = aiSummarizingId === update.id;
              const summaryData = aiSummaries[update.id];

              return (
                <div
                  key={update.id}
                  className="p-5 rounded-xl border border-neutral-100 dark:border-zinc-800/80 bg-neutral-50/50 dark:bg-zinc-950/40 hover:border-gold-500/20 transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-crimson-800 to-crimson-900 border border-gold-500/20 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-gold-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-50 font-sans">
                            {update.unitName}
                          </h4>
                          <span className={`text-[9px] px-2 py-0.5 font-bold rounded-full ${
                            update.priority === 'Khẩn' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20' :
                            update.priority === 'Quan trọng' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20' :
                            'bg-neutral-200 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-400'
                          }`}>
                            {update.priority}
                          </span>
                          <span className="text-[9px] px-2 py-0.5 font-semibold bg-gold-500/10 text-gold-700 dark:text-gold-400 rounded-full border border-gold-500/20">
                            {update.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                          Đồng chí: <strong className="text-neutral-600 dark:text-neutral-300">{update.updater}</strong> ({update.role}) • Đã cập nhật {update.updatedAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                      <button
                        onClick={() => handleTriggerAiSummary(update.id, update)}
                        disabled={isSummarizing}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg transition-all border cursor-pointer ${
                          hasAiSummary 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' 
                            : 'bg-gold-500/15 text-gold-800 dark:text-gold-300 border-gold-500/30 hover:bg-gold-500/20'
                        }`}
                      >
                        <Brain className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400 animate-pulse" />
                        {isSummarizing ? 'AI đang tóm tắt...' : hasAiSummary ? 'Xem tóm tắt AI' : 'Tóm tắt nhanh AI'}
                      </button>

                      <button
                        onClick={() => setSelectedUpdate(update)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold rounded-lg bg-neutral-200 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-300 dark:hover:bg-zinc-750 transition-colors border border-neutral-300 dark:border-zinc-700 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-neutral-500" />
                        Xem chi tiết
                      </button>
                    </div>
                  </div>

                  {/* Attachment indicator if any */}
                  {update.hasAttachment && update.attachments && update.attachments.length > 0 && (
                    <div className="flex items-center gap-2 flex-wrap text-xxs bg-white dark:bg-zinc-950 p-2 rounded-lg border border-neutral-200 dark:border-zinc-800">
                      <span className="font-bold text-neutral-500 dark:text-neutral-400">Tài liệu đính kèm ({update.attachments.length}):</span>
                      {update.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-1 px-2 py-0.5 rounded bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-[10px] font-medium text-neutral-700 dark:text-zinc-300 font-mono">
                          📎 {file.name} ({file.size})
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Inline AI Summary section if loading or loaded */}
                  <AnimatePresence>
                    {(isSummarizing || hasAiSummary) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 p-4 rounded-xl border border-gold-500/20 bg-gold-500/5 dark:bg-gold-500/10 space-y-3 relative">
                          <div className="absolute top-3 right-3 flex items-center gap-1.5">
                            <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-gold-500/20 text-gold-700 dark:text-gold-400 uppercase tracking-widest">
                              AI Generated
                            </span>
                          </div>

                          {isSummarizing ? (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-[10px] text-gold-700 dark:text-gold-400 font-bold">
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                AI đang quét tài liệu và kết xuất dữ liệu tóm tắt...
                              </div>
                              <div className="w-full h-1 bg-neutral-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: "0%" }}
                                  animate={{ width: "100%" }}
                                  transition={{ duration: 1.4, ease: "easeInOut" }}
                                  className="h-full bg-gold-500"
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2.5">
                              <p className="text-[11px] font-medium text-neutral-800 dark:text-neutral-200" dangerouslySetInnerHTML={{
                                __html: (summaryData as any).overview
                                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-crimson-800 dark:text-gold-400 font-bold">$1</strong>')
                              }} />
                              
                              <ul className="space-y-1.5 text-xxs text-neutral-600 dark:text-neutral-300">
                                {(summaryData as any).points.map((point: string, idx: number) => {
                                  const formatted = point.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neutral-900 dark:text-white font-bold">$1</strong>');
                                  return (
                                    <li key={idx} className="flex items-start gap-1.5 leading-relaxed">
                                      <span className="text-gold-500 shrink-0 select-none">•</span>
                                      <span dangerouslySetInnerHTML={{ __html: formatted }} />
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

          {updates.filter(u => {
            const matchesSearch = u.unitName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  u.updater.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  (u.completedWork && u.completedWork.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = categoryFilter === 'All' || u.category === categoryFilter;
            const matchesPriority = priorityFilter === 'All' || u.priority === priorityFilter;
            return matchesSearch && matchesCategory && matchesPriority;
          }).length === 0 && (
            <div className="text-center py-10 text-neutral-400 dark:text-neutral-500 text-xs">
              🗂️ Không tìm thấy báo cáo hoặc tài liệu nào phù hợp với bộ lọc hiện tại.
            </div>
          )}
        </div>
      </motion.div>

      {/* TASK ASSIGNMENT MODAL (MOCKUP) */}
      <AnimatePresence>
        {showAddTaskModal && (
          <div className="fixed inset-0 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-zinc-900 border border-gold-500/20 max-w-md w-full rounded-2xl p-6 shadow-xl space-y-4 text-left"
            >
              <h3 className="text-lg font-display font-bold text-neutral-900 dark:text-neutral-50 flex items-center gap-2">
                <Plus className="w-5 h-5 text-gold-600" />
                Giao Nhiệm vụ Điều hành mới
              </h3>
              <p className="text-xs text-neutral-500">Thường trực ra thông báo phân công công tác tới đơn vị liên quan.</p>

              <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
                <div>
                  <label className="text-xxs font-bold text-neutral-400 dark:text-neutral-500 uppercase block mb-1">Nội dung chỉ đạo nhiệm vụ</label>
                  <input
                    type="text"
                    required
                    value={newTask.name}
                    onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                    placeholder="Ví dụ: Chỉ đạo kiểm điểm hồ sơ trễ hạn và bố trí bổ sung công chức..."
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xxs font-bold text-neutral-400 dark:text-neutral-500 uppercase block mb-1">Đơn vị thực hiện</label>
                    <select
                      value={newTask.unit}
                      onChange={(e) => setNewTask({ ...newTask, unit: e.target.value })}
                      className="w-full text-xs p-2 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 focus:outline-none"
                    >
                      <option value="Ban Địa chính - Xây dựng">Địa chính - Xây dựng</option>
                      <option value="Bộ phận Một cửa">Bộ phận Một cửa</option>
                      <option value="Chi bộ Khu phố 1">Chi bộ Khu phố 1</option>
                      <option value="Văn phòng UBND Phường">UBND Phường</option>
                      <option value="Công an Phường">Công an Phường</option>
                      <option value="Đoàn Thanh niên Phường">Đoàn Thanh niên</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xxs font-bold text-neutral-400 dark:text-neutral-500 uppercase block mb-1">Người phụ trách</label>
                    <input
                      type="text"
                      required
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                      placeholder="Tên công chức phụ trách..."
                      className="w-full text-xs p-2 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xxs font-bold text-neutral-400 dark:text-neutral-500 uppercase block mb-1">Thời hạn hoàn thành</label>
                  <input
                    type="date"
                    required
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    className="w-full text-xs p-2 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 text-neutral-800 dark:text-zinc-100 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddTaskModal(false)}
                    className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-zinc-800 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-zinc-800"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-crimson-800 text-white text-xs font-bold hover:bg-crimson-900 shadow-sm"
                  >
                    Giao việc ngay
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED DOCUMENT VIEWER MODAL */}
      <AnimatePresence>
        {selectedUpdate && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-white dark:bg-[#0E1424] border border-gold-500/30 max-w-2xl w-full rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 text-left max-h-[90vh] overflow-y-auto relative text-neutral-800 dark:text-zinc-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedUpdate(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>

              {/* Official Document Header */}
              <div className="border-b-2 border-double border-neutral-300 dark:border-zinc-800 pb-5 text-center space-y-3">
                <div className="flex justify-between items-start text-[10px] font-bold text-neutral-500 dark:text-neutral-400 font-sans">
                  <div>
                    <p className="uppercase tracking-wider">ĐẢNG BỘ PHƯỜNG TRUNG TÂM</p>
                    <p className="underline decoration-dotted mt-0.5">VĂN PHÒNG ĐẢNG ỦY</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-wider">ĐẢNG CỘNG SẢN VIỆT NAM</p>
                    <p className="mt-0.5 font-normal italic">Phường Trung Tâm, ngày {selectedUpdate.updatedAt}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <span className="text-[10px] font-bold px-3 py-1 bg-crimson-800/10 text-crimson-800 dark:text-gold-400 rounded-full border border-crimson-800/20 uppercase tracking-widest">
                    Văn bản báo cáo tình hình cơ sở
                  </span>
                  <h3 className="text-lg md:text-xl font-display font-extrabold text-neutral-900 dark:text-white mt-2 uppercase tracking-wide">
                    BÁO CÁO CHI TIẾT CÔNG TÁC {selectedUpdate.type.toUpperCase()}
                  </h3>
                  <p className="text-xxs text-neutral-400 mt-1 font-mono">
                    Mã số văn bản: BC-{selectedUpdate.id.toUpperCase()} • Chuyên đề: {selectedUpdate.category}
                  </p>
                </div>
              </div>

              {/* Document Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 bg-neutral-50 dark:bg-zinc-950 p-4 rounded-xl border border-neutral-100 dark:border-zinc-900 text-xs">
                <div>
                  <p className="text-xxs font-bold text-neutral-400 uppercase">Đơn vị trình báo</p>
                  <p className="font-extrabold text-neutral-800 dark:text-white mt-0.5">{selectedUpdate.unitName}</p>
                </div>
                <div>
                  <p className="text-xxs font-bold text-neutral-400 uppercase">Cán bộ phụ trách</p>
                  <p className="font-extrabold text-neutral-800 dark:text-white mt-0.5">
                    {selectedUpdate.updater} <span className="font-normal text-neutral-500">({selectedUpdate.role})</span>
                  </p>
                </div>
                <div>
                  <p className="text-xxs font-bold text-neutral-400 uppercase">Lĩnh vực quản lý</p>
                  <p className="font-bold text-gold-600 dark:text-gold-400 mt-0.5">{selectedUpdate.category}</p>
                </div>
                <div>
                  <p className="text-xxs font-bold text-neutral-400 uppercase">Mức độ ưu tiên</p>
                  <span className={`inline-block text-[10px] font-bold px-2 py-0.5 mt-0.5 rounded ${
                    selectedUpdate.priority === 'Khẩn' ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' :
                    selectedUpdate.priority === 'Quan trọng' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' :
                    'bg-neutral-200 dark:bg-zinc-800 text-neutral-600'
                  }`}>
                    {selectedUpdate.priority}
                  </span>
                </div>
              </div>

              {/* Main Text Content */}
              <div className="space-y-5 text-xs text-neutral-700 dark:text-zinc-300 leading-relaxed font-sans">
                
                {/* Completed work */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-neutral-900 dark:text-white border-l-2 border-crimson-850 pl-2 text-xxs uppercase tracking-wider">
                    I. Nội dung các công việc đã thực hiện trong kỳ
                  </h4>
                  <p className="bg-neutral-50/50 dark:bg-zinc-950/20 p-3 rounded-lg border border-neutral-100 dark:border-zinc-900/60">
                    {selectedUpdate.completedWork}
                  </p>
                </div>

                {/* Outstanding Result */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-neutral-900 dark:text-white border-l-2 border-emerald-600 pl-2 text-xxs uppercase tracking-wider">
                    II. Kết quả, thành tích nổi bật đạt được
                  </h4>
                  <p className="bg-emerald-500/5 dark:bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/10 text-emerald-800 dark:text-emerald-400">
                    {selectedUpdate.outstandingResult}
                  </p>
                </div>

                {/* Difficulties */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-neutral-900 dark:text-white border-l-2 border-rose-500 pl-2 text-xxs uppercase tracking-wider">
                    III. Những khó khăn, vướng mắc phát sinh tại cơ sở
                  </h4>
                  <p className="bg-rose-500/5 dark:bg-rose-500/10 p-3 rounded-lg border border-rose-500/10 text-rose-800 dark:text-rose-400">
                    {selectedUpdate.difficulty}
                  </p>
                </div>

                {/* Suggestions */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-neutral-900 dark:text-white border-l-2 border-gold-500 pl-2 text-xxs uppercase tracking-wider">
                    IV. Đề xuất, kiến nghị với Thường trực Đảng ủy
                  </h4>
                  <p className="bg-gold-500/5 dark:bg-gold-500/10 p-3 rounded-lg border border-gold-500/10 text-gold-800 dark:text-gold-400 font-semibold">
                    {selectedUpdate.suggestion}
                  </p>
                </div>

                {/* Next Plan */}
                <div className="space-y-1.5">
                  <h4 className="font-bold text-neutral-900 dark:text-white border-l-2 border-blue-500 pl-2 text-xxs uppercase tracking-wider">
                    V. Định hướng nhiệm vụ trọng tâm và kế hoạch tuần tới
                  </h4>
                  <p className="bg-neutral-50/50 dark:bg-zinc-950/20 p-3 rounded-lg border border-neutral-100 dark:border-zinc-900/60">
                    {selectedUpdate.nextPlan}
                  </p>
                </div>

                {/* Attachments if any */}
                {selectedUpdate.hasAttachment && selectedUpdate.attachments && selectedUpdate.attachments.length > 0 && (
                  <div className="space-y-2 border-t border-neutral-200 dark:border-zinc-800 pt-4">
                    <h5 className="font-bold text-neutral-900 dark:text-white text-xxs uppercase tracking-wider flex items-center gap-1.5">
                      📎 Danh sách tệp đính kèm chính thức ({selectedUpdate.attachments.length})
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedUpdate.attachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-200 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-950 text-[11px]">
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-xl">📄</span>
                            <div className="truncate">
                              <p className="font-bold text-neutral-800 dark:text-neutral-200 truncate">{file.name}</p>
                              <p className="text-[9px] text-neutral-400 dark:text-neutral-500 font-mono">{file.size} • {file.type.toUpperCase()}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => alert(`Bắt đầu tải tệp: ${file.name} (Bản dựng mô phỏng hoàn tất)`)}
                            className="px-2 py-1 text-[9px] font-extrabold bg-crimson-800 hover:bg-crimson-900 text-white rounded transition-colors cursor-pointer shrink-0"
                          >
                            Tải tệp
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 border-t border-neutral-200 dark:border-zinc-800 pt-5">
                <button
                  type="button"
                  onClick={() => setSelectedUpdate(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 dark:border-zinc-800 text-xs text-neutral-700 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 cursor-pointer font-bold transition-all"
                >
                  Đóng tài liệu
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`Đã phê duyệt báo cáo của đơn vị ${selectedUpdate.unitName} và lưu vào biên niên sử chỉ đạo.`);
                    setSelectedUpdate(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-crimson-850 to-crimson-900 text-white text-xs font-bold hover:from-crimson-900 hover:to-crimson-950 shadow-md transition-all cursor-pointer"
                >
                  Phê duyệt & Tiếp nhận báo cáo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
