import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Bot, Shield, FileText, LayoutDashboard, Landmark, Menu, X, Sun, Moon,
  Building, ChevronUp, Bell, Target, ArrowRight, HelpCircle
} from 'lucide-react';

import Introduction from './components/Introduction';
import Workflow from './components/Workflow';
import DashboardView from './components/DashboardView';
import UpdateForm from './components/UpdateForm';
import AiProcessing from './components/AiProcessing';
import AiAssistant from './components/AiAssistant';
import FollowUp from './components/FollowUp';
import FooterGoal from './components/FooterGoal';
import { Task, UnitUpdate } from './types';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('isDarkMode');
    return stored !== null ? stored === 'true' : true;
  });
  const [userRole, setUserRole] = useState<'unit' | 'admin'>(() => {
    return (localStorage.getItem('userRole') as 'unit' | 'admin') || 'unit';
  });
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem('adminPassword') || 'admin123';
  });
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  
  // States for Changing Admin Password
  const [showChangePasswordModal, setShowChangePasswordModal] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [changePasswordError, setChangePasswordError] = useState<string>('');
  const [changePasswordSuccess, setChangePasswordSuccess] = useState<string>('');

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Seed initial task list monitored by the Standing Committee
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing tasks from localStorage', e);
      }
    }
    return [
      {
        id: 'task_1',
        name: 'Khắc phục dứt điểm 14 hồ sơ đất đai tồn đọng trễ hạn',
        unit: 'Ban Địa chính - Xây dựng',
        assignee: 'Nguyễn Văn A',
        assignedDate: '2026-07-01',
        dueDate: '2026-07-15',
        progress: 30,
        status: 'Đang thực hiện'
      },
      {
        id: 'task_2',
        name: 'Bố trí điều động công chức hỗ trợ thay thế bộ phận Một cửa',
        unit: 'Văn phòng UBND Phường',
        assignee: 'Lê Thị Vân',
        assignedDate: '2026-07-03',
        dueDate: '2026-07-12',
        progress: 80,
        status: 'Đang thực hiện'
      },
      {
        id: 'task_3',
        name: 'Thỏa thuận địa điểm tập kết cát đá tu sửa Nhà văn hóa Tổ 5',
        unit: 'Ban điều hành Khu phố 3',
        assignee: 'Trần Văn C',
        assignedDate: '2026-07-04',
        dueDate: '2026-07-10',
        progress: 100,
        status: 'Hoàn thành',
        result: 'Đã mượn được đất trống kề bên của hộ dân để chứa vật tư tạm thời.'
      }
    ];
  });

  // Seed initial high-quality unit updates so the dashboard charts look realistic right away
  const [updates, setUpdates] = useState<UnitUpdate[]>(() => {
    const stored = localStorage.getItem('updates');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing updates from localStorage', e);
      }
    }
    return [
      {
        id: 'init_up_1',
        unitName: 'Chi bộ Khu phố 1',
        updater: 'Nguyễn Hải Đăng',
        role: 'Bí thư Chi bộ',
        updatedAt: '2026-07-05',
        type: 'Hằng tuần',
        priority: 'Bình thường',
        category: 'Xây dựng Đảng',
        completedWork: 'Đã tổ chức sinh hoạt chi bộ chuyên đề Quý II về chủ đề học tập Di chúc của Chủ tịch Hồ Chí Minh; hoàn thiện hồ sơ xét duyệt kết nạp Đảng viên mới cho 02 quần chúng ưu tú ở tổ dân phố.',
        outstandingResult: '100% Đảng viên trong chi bộ tham dự sinh hoạt nghiêm túc, phát biểu thảo luận sâu sắc.',
        difficulty: 'Công tác quản lý Đảng viên đi làm ăn xa ngoài địa bàn còn gặp khó khăn trong liên lạc sinh hoạt định kỳ.',
        suggestion: 'Đề xuất Văn phòng Đảng ủy mở cổng đăng ký sinh hoạt trực tuyến cho Đảng viên đi xa.',
        standingReviewNeeded: 'Không',
        nextPlan: 'Rà soát danh sách chuẩn bị đề án nhân sự Ban điều hành Chi bộ cho nhiệm kỳ Đại hội mới.',
        attachments: [],
        hasAttachment: false,
        keywords: ['Sinh hoạt chi bộ', 'Học tập chuyên đề', 'Đảng viên đi xa'],
        isReviewedByStanding: true
      },
      {
        id: 'init_up_2',
        unitName: 'Bộ phận Một cửa',
        updater: 'Lê Thị Vân',
        role: 'Phó Chánh Văn phòng UBND',
        updatedAt: '2026-07-06',
        type: 'Hằng tuần',
        priority: 'Quan trọng',
        category: 'Cải cách hành chính',
        completedWork: 'Hoàn tất quét số hóa, lưu trữ 1,500 trang hồ sơ sổ hộ tịch cũ từ năm 2015 trở về trước; lắp đặt chạy thử nghiệm bảng hiển thị mã QR hướng dẫn thủ tục hành chính liên quan đất đai.',
        outstandingResult: 'Giảm thời gian trả kết quả hồ sơ hành chính hộ tịch trung bình xuống dưới 10 phút.',
        difficulty: 'Trang thiết bị máy quét (scanner) phòng Một cửa bị cũ hỏng, thường xuyên kẹt giấy ảnh hưởng tiến độ số hóa chung.',
        suggestion: 'Đề xuất Thường trực xem xét duyệt ngân sách khẩn cấp mua 02 máy scan tốc độ cao mới.',
        standingReviewNeeded: 'Có',
        nextPlan: 'Tổ chức tập huấn sử dụng hệ thống số hóa mới cho 100% công chức trực ban Một cửa.',
        attachments: [{ name: 'De_xuat_mua_sam_may_quet.pdf', type: 'pdf', size: '124 KB' }],
        hasAttachment: true,
        keywords: ['Số hóa sổ hộ tịch', 'Cải cách một cửa', 'Thiết bị scan'],
        isReviewedByStanding: false,
        needsCooperation: true,
        cooperationUnit: 'Văn phòng UBND Phường'
      }
    ];
  });

  // Effect to apply/remove theme class and persist theme selection
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('isDarkMode', String(isDarkMode));
  }, [isDarkMode]);

  // Persist tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Persist updates to localStorage
  useEffect(() => {
    localStorage.setItem('updates', JSON.stringify(updates));
  }, [updates]);

  // Persist userRole to localStorage
  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === 'admin' && loginPassword === adminPassword) {
      setUserRole('admin');
      setShowLoginModal(false);
      setLoginUsername('');
      setLoginPassword('');
      setLoginError('');
    } else {
      setLoginError('Tên đăng nhập hoặc mật khẩu quản trị không chính xác!');
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPassword !== adminPassword) {
      setChangePasswordError('Mật khẩu hiện tại không chính xác!');
      setChangePasswordSuccess('');
      return;
    }
    if (newPassword.length < 6) {
      setChangePasswordError('Mật khẩu mới phải có ít nhất 6 ký tự!');
      setChangePasswordSuccess('');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setChangePasswordError('Xác nhận mật khẩu mới không trùng khớp!');
      setChangePasswordSuccess('');
      return;
    }
    
    // Save to state and localStorage
    setAdminPassword(newPassword);
    localStorage.setItem('adminPassword', newPassword);
    setChangePasswordSuccess('Thay đổi mật khẩu quản trị thành công!');
    setChangePasswordError('');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    
    // Auto-close after short delay
    setTimeout(() => {
      setShowChangePasswordModal(false);
      setChangePasswordSuccess('');
    }, 1500);
  };

  const handleLogout = () => {
    setUserRole('unit');
  };

  // Scroll to top visibility
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleAddTask = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const handleAddUpdate = (newUpdate: UnitUpdate) => {
    setUpdates(prev => [newUpdate, ...prev]);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navItems = [
    { label: 'Giới thiệu', target: 'introduction-section' },
    { label: 'Quy trình', target: 'workflow-section' },
    { label: 'Dashboard', target: 'dashboard-section' },
    { label: 'Cập nhật tình hình', target: 'update-form-section' },
    { label: 'AI xử lý', target: 'ai-processing-section' },
    { label: 'Trợ lý AI', target: 'ai-assistant-section' },
    { label: 'Báo cáo & Cảnh báo', target: 'followup-reports-notifications-section' }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-neutral-800 dark:bg-[#0B0F19] dark:text-zinc-100 transition-colors duration-300">
      
      {/* LUXURY GOLD/RED HIGHLIGHT HEADER LINE */}
      <div className="w-full h-1.5 bg-gradient-to-r from-crimson-800 via-gold-500 to-crimson-800 sticky top-0 z-50" />

      {/* STICKY NAVIGATION BAR */}
      <header className="sticky top-1.5 z-40 bg-[#FAF9F5]/90 dark:bg-[#0B0F19]/90 backdrop-blur-md border-b border-neutral-200/60 dark:border-zinc-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between">
          
          {/* LOGO TITLE BLOCK */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-crimson-700 to-crimson-800 flex items-center justify-center border border-gold-500/30 shadow-md">
              <Landmark className="w-5 h-5 text-gold-400" />
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-crimson-800 dark:text-gold-400 tracking-wider block uppercase">VĂN PHÒNG ĐẢNG ỦY PHƯỜNG</span>
              <h1 className="text-sm font-display font-bold text-neutral-900 dark:text-white leading-tight uppercase">AI SMART DASHBOARD</h1>
            </div>
          </div>

          {/* DESKTOP NAV ITEMS */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg text-neutral-600 dark:text-neutral-400 hover:text-crimson-800 dark:hover:text-gold-400 hover:bg-neutral-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* LIGHT / DARK & HAMBURGER */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl border border-neutral-200 dark:border-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-900 text-neutral-500 dark:text-neutral-400 transition-all shrink-0 cursor-pointer"
              title="Đổi chủ đề Sáng / Tối"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4 text-crimson-800" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-neutral-200 dark:border-zinc-800 hover:bg-neutral-100 dark:hover:bg-zinc-900 text-neutral-600 dark:text-neutral-400 transition-all shrink-0 cursor-pointer"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden border-t border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden"
            >
              <div className="p-4 space-y-2 text-left">
                {navItems.map((item) => (
                  <button
                    key={item.target}
                    onClick={() => scrollToSection(item.target)}
                    className="w-full text-left text-xs font-bold p-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-zinc-900 block transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ROLE CONTROLLER BANNER */}
      <div className="w-full bg-neutral-100 dark:bg-zinc-950 border-b border-neutral-200/50 dark:border-zinc-900/50 py-2.5 px-4 md:px-8 text-xs flex flex-wrap items-center justify-between gap-3 font-sans transition-colors sticky top-[60px] z-30">
        <div className="flex items-center gap-2">
          {userRole === 'admin' ? (
            <>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-neutral-500 dark:text-zinc-400 text-xxs">Cơ chế bảo mật:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 uppercase font-bold text-xxs tracking-wider">🛡️ THƯỜNG TRỰC ĐẢNG ỦY (TÀI KHOẢN QUẢN TRỊ)</strong>
            </>
          ) : (
            <>
              <span className="flex h-2 w-2 relative">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span className="text-neutral-500 dark:text-zinc-400 text-xxs">Cơ chế bảo mật:</span>
              <strong className="text-amber-600 dark:text-amber-500 uppercase font-bold text-xxs tracking-wider">🔓 ĐƠN VỊ CƠ SỞ (TỰ DO NHẬP BÁO CÁO • KHÔNG CẦN ĐĂNG NHẬP)</strong>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {userRole === 'admin' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowChangePasswordModal(true)}
                className="px-2.5 py-1 text-xxs font-bold text-neutral-600 dark:text-zinc-400 hover:text-gold-600 dark:hover:text-gold-400 hover:bg-neutral-200/50 dark:hover:bg-zinc-900 rounded-md transition-all cursor-pointer border border-neutral-200 dark:border-zinc-800"
              >
                ⚙️ Đổi mật khẩu
              </button>
              <button
                onClick={handleLogout}
                className="px-2.5 py-1 text-xxs font-bold text-neutral-600 dark:text-zinc-400 hover:text-crimson-800 dark:hover:text-gold-400 hover:bg-neutral-200/50 dark:hover:bg-zinc-900 rounded-md transition-all cursor-pointer border border-neutral-200 dark:border-zinc-800"
              >
                🚪 Đăng xuất
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="px-2.5 py-1 text-xxs font-extrabold bg-gradient-to-r from-gold-600 to-gold-500 text-zinc-950 hover:from-gold-500 hover:to-gold-400 rounded-md transition-all cursor-pointer shadow-xs"
            >
              🔑 Đăng nhập Quản trị viên
            </button>
          )}
        </div>
      </div>

      {/* LUXURIOUS HERO SECTION */}
      <section className="relative py-20 px-4 md:px-8 text-center max-w-7xl mx-auto overflow-hidden">
        
        {/* Background glow graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-crimson-500/10 via-gold-500/5 to-transparent blur-3xl -z-10 rounded-full" />
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-radial from-gold-500/5 to-transparent blur-2xl -z-10" />

        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-crimson-800/10 dark:bg-crimson-500/10 border border-crimson-500/20 text-crimson-800 dark:text-gold-400 text-xs font-bold uppercase tracking-wider mx-auto"
          >
            <Sparkles className="w-4 h-4 text-gold-500 animate-spin-slow" />
            Nền tảng chính quyền số văn phòng thông minh
          </motion.div>

          {/* Main Title Group */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white"
            >
              HỆ THỐNG TỔNG HỢP THÔNG TIN <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-crimson-700 via-gold-500 to-crimson-800 dark:from-gold-400 dark:via-gold-300 dark:to-gold-500 uppercase">
                Điều Hành Thông Minh
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm md:text-lg font-display font-bold text-crimson-800 dark:text-gold-400 uppercase tracking-widest"
            >
              AI SMART DASHBOARD - VĂN PHÒNG ĐẢNG ỦY PHƯỜNG
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed"
          >
            Tự động hóa số liệu công tác, chuyển tải báo cáo định kỳ thô của các đơn vị cơ sở thành tri thức chỉ đạo điều hành trực quan hóa bằng sức mạnh Trí Tuệ Nhân Tạo. Hỗ trợ Thường trực Đảng ủy ra quyết định nhanh, thống nhất và khoa học.
          </motion.p>

          {/* Interactive CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection('dashboard-section')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-800 to-crimson-750 text-white hover:from-crimson-900 hover:to-crimson-800 text-xs font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-4 h-4 text-gold-400" />
              Xem Dashboard Tổng Hợp
            </button>
            <button
              onClick={() => scrollToSection('update-form-section')}
              className="px-6 py-3 rounded-xl border border-gold-500/30 text-neutral-800 dark:text-gold-400 hover:bg-gold-500/10 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-crimson-700 dark:text-gold-500" />
              Cập nhật tình hình cơ sở
            </button>
          </motion.div>

        </div>

        {/* MOCK HARDWARE PREVIEW BOARD SCREEN */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 relative rounded-2xl border border-gold-500/25 bg-white dark:bg-zinc-900 p-3 shadow-2xl max-w-5xl mx-auto overflow-hidden group"
        >
          {/* Decorative frame elements */}
          <div className="absolute top-3 left-4 flex gap-1.5 z-10">
            <span className="w-3 h-3 rounded-full bg-rose-500 block" />
            <span className="w-3 h-3 rounded-full bg-amber-500 block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
          </div>
          <div className="absolute top-3 right-4 font-mono text-[9px] text-neutral-400 dark:text-neutral-500 z-10">
            SECURE VPN CONSOLE • PARTYSYSTEM_ONLINE
          </div>

          <div className="w-full bg-neutral-100 dark:bg-zinc-950/80 rounded-xl p-4 md:p-8 border border-neutral-200 dark:border-zinc-800 overflow-hidden relative min-h-[180px] flex flex-col justify-center items-center">
            {/* Ambient vector digital lines background inside monitor */}
            <div className="absolute inset-0 bg-radial from-crimson-950/15 via-transparent to-transparent pointer-events-none" />
            
            <div className="max-w-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-500 animate-pulse">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-base md:text-xl font-display font-extrabold text-neutral-900 dark:text-white uppercase tracking-wide">
                Hệ Thống Phân Tích Thông Tin Tự Động Định Hình Quyết Sách
              </h3>
              <p className="text-xxs md:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-medium">
                "Nhận thông tin thô bất kể định dạng từ cơ sở, tự động phân phối chuyên mục, chuẩn hóa dữ liệu, xếp tầng rủi ro và khởi tạo dự thảo các văn bản hành chính điều hành chỉ trong nháy mắt."
              </p>
              <div className="pt-2 flex items-center justify-center gap-6 text-[10px] text-neutral-400 font-mono">
                <span className="flex items-center gap-1.5 text-emerald-500"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> HỆ THỐNG AN TOÀN CHÍNH THỨC</span>
                <span>•</span>
                <span>Xác thực SSL Mã hóa đầu cuối</span>
              </div>
            </div>
          </div>
        </motion.div>

      </section>

      {/* CORE MODULAR SECTIONS COMPILED */}
      <main className="relative">
        
        {/* Sections 1 & 2 */}
        <Introduction isDarkMode={isDarkMode} />
        
        {/* Section 3 */}
        <Workflow isDarkMode={isDarkMode} />
        
        {/* Section 4 */}
        {userRole === 'admin' ? (
          <DashboardView 
            updates={updates} 
            tasks={tasks} 
            onAddTask={handleAddTask} 
            onUpdateTask={handleUpdateTask} 
            isDarkMode={isDarkMode} 
          />
        ) : (
          <LockedSection onUnlock={() => setShowLoginModal(true)} title="Bảng điều hành thông minh" />
        )}
        
        {/* Section 5 */}
        <UpdateForm 
          onAddUpdate={handleAddUpdate} 
          isDarkMode={isDarkMode} 
        />
        
        {/* Section 6 */}
        {userRole === 'admin' ? (
          <AiProcessing isDarkMode={isDarkMode} />
        ) : (
          <LockedSection onUnlock={() => setShowLoginModal(true)} title="Hệ thống AI phân tích dữ liệu" />
        )}
        
        {/* Section 7 */}
        {userRole === 'admin' ? (
          <AiAssistant isDarkMode={isDarkMode} />
        ) : (
          <LockedSection onUnlock={() => setShowLoginModal(true)} title="Trợ lý ảo Thường trực" />
        )}
        
        {/* Sections 8, 9, 10 */}
        {userRole === 'admin' ? (
          <FollowUp 
            tasks={tasks} 
            onUpdateTask={handleUpdateTask} 
            isDarkMode={isDarkMode} 
          />
        ) : (
          <LockedSection onUnlock={() => setShowLoginModal(true)} title="Tác vụ giám sát & Cảnh báo" />
        )}

      </main>

      {/* Sections 11 & 12 + Footer */}
      <FooterGoal 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />

      {/* FLOATING ACTION TO TOP */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-full bg-crimson-800 text-white hover:bg-crimson-900 border border-gold-500/30 shadow-2xl transition-all cursor-pointer"
            title="Lên đầu trang"
          >
            <ChevronUp className="w-5 h-5 text-gold-400" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* BEAUTIFUL GLASSMORPHISM ADMIN LOGIN MODAL */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md p-6 md:p-8 rounded-2xl border border-gold-500/30 bg-[#FAF9F5] dark:bg-[#0E1424] text-neutral-800 dark:text-zinc-100 shadow-2xl space-y-6 animate-fade-in"
            >
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setLoginError('');
                }}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-crimson-700 to-crimson-800 flex items-center justify-center border border-gold-500/30 shadow-md mx-auto">
                  <Shield className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-lg font-display font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">
                  XÁC THỰC QUẢN TRỊ VIÊN
                </h3>
                <p className="text-xxs text-neutral-500 dark:text-neutral-400">
                  Cung cấp thông tin tài khoản được cấp để mở khóa Dashboard & Trợ lý AI
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    required
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Tài khoản quản trị (mẫu: admin)"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Mật khẩu truy cập
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Mật khẩu (mẫu: admin123)"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                {loginError && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xxs font-bold">
                    ⚠️ {loginError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-crimson-800 to-crimson-750 text-white font-bold text-xs hover:from-crimson-900 hover:to-crimson-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-gold-400" />
                    Xác thực đăng nhập
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* BEAUTIFUL GLASSMORPHISM ADMIN CHANGE PASSWORD MODAL */}
      <AnimatePresence>
        {showChangePasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md p-6 md:p-8 rounded-2xl border border-gold-500/30 bg-[#FAF9F5] dark:bg-[#0E1424] text-neutral-800 dark:text-zinc-100 shadow-2xl space-y-6"
            >
              <button
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setChangePasswordError('');
                  setChangePasswordSuccess('');
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmNewPassword('');
                }}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-crimson-700 to-crimson-800 flex items-center justify-center border border-gold-500/30 shadow-md mx-auto">
                  <Shield className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-lg font-display font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">
                  THAY ĐỔI MẬT KHẨU
                </h3>
                <p className="text-xxs text-neutral-500 dark:text-neutral-400">
                  Cập nhật mật khẩu mới cho tài khoản quản trị viên "admin"
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 text-left">
                <div>
                  <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Xác nhận mật khẩu mới
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="w-full text-xs p-3 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500"
                  />
                </div>

                {changePasswordError && (
                  <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xxs font-bold">
                    ⚠️ {changePasswordError}
                  </div>
                )}

                {changePasswordSuccess && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xxs font-bold">
                    ✅ {changePasswordSuccess}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-crimson-800 to-crimson-750 text-white font-bold text-xs hover:from-crimson-900 hover:to-crimson-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Lưu thay đổi
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

// BEAUTIFUL LOCK WRAPPER FOR GUEST SESSIONS
interface LockedSectionProps {
  onUnlock: () => void;
  title: string;
}

function LockedSection({ onUnlock, title }: LockedSectionProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 text-left">
      <div className="p-8 md:p-12 rounded-2xl border border-dashed border-neutral-300 dark:border-zinc-850 bg-neutral-100/50 dark:bg-zinc-950/20 text-center space-y-6 max-w-2xl mx-auto shadow-sm">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/10 to-crimson-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-500 animate-pulse">
          <Shield className="w-8 h-8 text-gold-500" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm md:text-base font-display font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">
            🔒 {title} • ĐÃ KHÓA BẢO MẬT
          </h3>
          <p className="text-xxs md:text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md mx-auto">
            Chỉ có Thường trực Đảng ủy và lãnh đạo có tài khoản xác thực mới được phép truy cập và xem chi tiết nội dung báo cáo của các đơn vị gửi lên. Khách vãng lai và các đơn vị khác tuyệt đối không có quyền xem thông tin này nhằm bảo đảm an toàn chính trị và thông tin nội bộ.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onUnlock}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-crimson-800 to-crimson-750 text-white hover:from-crimson-900 hover:to-crimson-800 text-xs font-bold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Shield className="w-4 h-4 text-gold-400" />
            Đăng nhập tài khoản Quản trị viên
          </button>
        </div>
      </div>
    </div>
  );
}
