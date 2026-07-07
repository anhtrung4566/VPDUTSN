import { useState, DragEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UploadCloud, FileText, CheckCircle2, Sparkles, HelpCircle, Send, AlertTriangle, 
  Trash2, FileCode, Landmark, Tag, Calendar, User, ShieldCheck, Link2
} from 'lucide-react';
import { UnitUpdate } from '../types';

interface UpdateFormProps {
  onAddUpdate: (update: UnitUpdate) => void;
  isDarkMode: boolean;
}

export default function UpdateForm({ onAddUpdate, isDarkMode }: UpdateFormProps) {
  const [unitName, setUnitName] = useState('');
  const [updater, setUpdater] = useState('Trần Hoàng Minh');
  const [role, setRole] = useState('Phó Trưởng ban');
  const [updatedAt, setUpdatedAt] = useState(new Date().toISOString().split('T')[0]);
  const [updateType, setUpdateType] = useState<UnitUpdate['type']>('Hằng tuần');
  const [priority, setPriority] = useState<UnitUpdate['priority']>('Quan trọng');
  const [category, setCategory] = useState<UnitUpdate['category']>('Cải cách hành chính');
  
  // Form Text Areas
  const [completedWork, setCompletedWork] = useState('');
  const [outstandingResult, setOutstandingResult] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [standingReviewNeeded, setStandingReviewNeeded] = useState('Có');
  const [nextPlan, setNextPlan] = useState('');
  
  // Structured suggestions
  const [keywords, setKeywords] = useState<string[]>(['Số hóa hồ sơ', 'Cải cách hành chính', 'Đất đai']);
  const [newKeyword, setNewKeyword] = useState('');
  const [deadline, setDeadline] = useState('2026-07-15');
  const [needsCooperation, setNeedsCooperation] = useState(false);
  const [cooperationUnit, setCooperationUnit] = useState('');

  // File Upload State
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; type: string; size: string }[]>([]);
  const [isProcessingAi, setIsProcessingAi] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const files = Array.from(e.dataTransfer.files).map((file: any) => ({
        name: file.name,
        type: file.name.split('.').pop() || 'unknown',
        size: (file.size / 1024).toFixed(1) + ' KB'
      }));
      setUploadedFiles(prev => [...prev, ...files]);
    }
  };

  const triggerMockUpload = () => {
    const mockFiles = [
      { name: 'Báo_cáo_tiến_độ_số_hóa_tài_liệu_Q2.docx', type: 'docx', size: '142.5 KB' },
      { name: 'Phụ_lục_số_liệu_giải_quyết_hồ_sơ.xlsx', type: 'xlsx', size: '89.2 KB' }
    ];
    setUploadedFiles(prev => [...prev, ...mockFiles]);
  };

  const removeFile = (idx: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const handleAddKeyword = (e: FormEvent) => {
    e.preventDefault();
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (kw: string) => {
    setKeywords(keywords.filter(k => k !== kw));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!unitName.trim()) {
      alert('Vui lòng nhập tên đơn vị báo cáo');
      return;
    }
    if (!completedWork.trim()) {
      alert('Vui lòng điền nội dung công việc đã thực hiện');
      return;
    }

    // Trigger AI pipeline animation simulation before saving
    setIsProcessingAi(true);
    setProcessingStep(1);

    const timer1 = setTimeout(() => setProcessingStep(2), 1200);
    const timer2 = setTimeout(() => setProcessingStep(3), 2400);
    const timer3 = setTimeout(() => setProcessingStep(4), 3600);
    const timer4 = setTimeout(() => {
      // Build the final update model
      const newUpdate: UnitUpdate = {
        id: 'up_' + Date.now(),
        unitName,
        updater,
        role,
        updatedAt,
        type: updateType,
        priority,
        category,
        completedWork,
        outstandingResult: outstandingResult || 'Hoàn thành tốt các nhiệm vụ phân công trong kỳ.',
        difficulty: difficulty || 'Không phát sinh khó khăn lớn.',
        suggestion: suggestion || 'Không đề xuất bổ sung.',
        standingReviewNeeded,
        nextPlan: nextPlan || 'Tiếp tục triển khai kế hoạch đã định.',
        attachments: uploadedFiles,
        hasAttachment: uploadedFiles.length > 0,
        keywords,
        isReviewedByStanding: false,
        needsCooperation,
        cooperationUnit: needsCooperation ? cooperationUnit : undefined
      };

      onAddUpdate(newUpdate);
      setIsProcessingAi(false);
      setProcessingStep(0);
      setShowSuccessToast(true);

      // Clear main fields
      setCompletedWork('');
      setOutstandingResult('');
      setDifficulty('');
      setSuggestion('');
      setNextPlan('');
      setUploadedFiles([]);

      setTimeout(() => setShowSuccessToast(false), 4000);
    }, 4800);
  };

  const autoFillExample = () => {
    setUnitName("Ban Địa chính - Xây dựng");
    setCompletedWork("Đã hoàn tất kiểm tra hồ sơ đất đai tồn đọng của 15 hộ dân trên địa bàn đường lớn; số hóa thành công 420 trang tài liệu lưu trữ cũ.");
    setOutstandingResult("Mô hình 'Ngày thứ Sáu không hẹn trước' hoạt động hiệu quả, giải quyết được 45 lượt thủ tục hành chính lấy ngay trong tuần.");
    setDifficulty("Trang thiết bị máy tính quét tài liệu (scanner) tại bộ phận Một cửa bị cũ hỏng, tốc độ chậm gây ảnh hưởng trực tiếp đến hiệu suất làm việc.");
    setSuggestion("Đề xuất Thường trực Đảng ủy xem xét duyệt ngân sách cấp mới 02 máy scan tốc độ cao phục vụ chuyển đổi số lưu trữ.");
    setNextPlan("Tiếp tục rà soát các hộ dân còn vướng mắc về đo đạc đất đai, mở rộng mô hình cải cách hành chính số.");
  };

  return (
    <section id="update-form-section" className="py-16 px-4 md:px-8 max-w-5xl mx-auto relative">
      <div className="absolute top-1/2 left-0 w-80 h-80 gold-glow -z-10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-crimson-500/10 dark:bg-crimson-500/20 text-crimson-700 dark:text-crimson-300 rounded-full border border-crimson-500/20 text-xs font-semibold mb-3">
          <UploadCloud className="w-4 h-4 text-crimson-700 dark:text-gold-500" />
          Nhiệm Vụ Cốt Lõi Hệ Thống
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          5. Chức năng "Cập nhật tình hình"
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-crimson-600 via-gold-500 to-crimson-600 mx-auto rounded-full mt-3" />
        <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
          Giao diện cập nhật nhanh tinh giản cho các đơn vị trực thuộc. Chỉ mất từ 3-5 phút thay thế hoàn toàn báo cáo Word truyền thống.
        </p>
      </div>

      <div className="luxury-card overflow-hidden">
        {/* Banner header of card */}
        <div className="bg-gradient-to-r from-crimson-900 to-crimson-950 p-6 text-white border-b border-gold-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold-500/20 rounded-xl border border-gold-500/40">
              <Sparkles className="w-6 h-6 text-gold-400 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-gold-200">Báo Cáo Công Tác Điện Tử Thông Minh</h3>
              <p className="text-xxs text-neutral-300">Dữ liệu thô sẽ được AI tự động phân loại, tóm tắt và đưa lên Dashboard của Thường trực</p>
            </div>
          </div>
          <button
            type="button"
            onClick={autoFillExample}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-600 hover:bg-gold-500 text-zinc-950 text-xxs font-extrabold transition-all duration-300 shadow-md"
          >
            💡 Điền Mẫu Nhanh (Demo)
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 text-left">
          
          {/* INFORMATIONS CHUNG */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 rounded-xl bg-neutral-50 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800">
            <div>
              <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Landmark className="w-3.5 h-3.5 text-crimson-600" /> Đơn vị báo cáo
              </label>
              <input
                type="text"
                required
                value={unitName}
                onChange={(e) => setUnitName(e.target.value)}
                placeholder="Nhập tên đơn vị báo cáo..."
                className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <User className="w-3.5 h-3.5 text-crimson-600" /> Người cập nhật & Chức vụ
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  required
                  value={updater}
                  onChange={(e) => setUpdater(e.target.value)}
                  placeholder="Họ tên người báo cáo"
                  className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500"
                />
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Chức vụ"
                  className="w-full text-xs p-2.5 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5 text-crimson-600" /> Ngày & Lĩnh vực cập nhật
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  required
                  value={updatedAt}
                  onChange={(e) => setUpdatedAt(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as UnitUpdate['category'])}
                  className="w-full text-xs p-2 rounded-lg border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-zinc-100 focus:outline-none"
                >
                  <option value="Xây dựng Đảng">Xây dựng Đảng</option>
                  <option value="Kinh tế">Kinh tế</option>
                  <option value="Văn hóa">Văn hóa</option>
                  <option value="Giáo dục">Giáo dục</option>
                  <option value="Y tế">Y tế</option>
                  <option value="Quốc phòng">Quốc phòng</option>
                  <option value="An ninh">An ninh</option>
                  <option value="Môi trường">Môi trường</option>
                  <option value="Cải cách hành chính">Cải cách hành chính</option>
                  <option value="Chuyển đổi số">Chuyển đổi số</option>
                </select>
              </div>
            </div>
          </div>

          {/* LOẠI CẬP NHẬT & MỨC ĐỘ ƯU TIÊN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase block mb-2">Tần suất báo cáo</label>
              <div className="grid grid-cols-4 gap-2">
                {(['Hằng ngày', 'Hằng tuần', 'Hằng tháng', 'Đột xuất'] as UnitUpdate['type'][]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setUpdateType(t)}
                    className={`p-2.5 rounded-lg text-xs font-bold transition-all ${
                      updateType === t 
                        ? 'bg-crimson-800 text-white shadow-xs' 
                        : 'bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xxs font-bold text-neutral-500 dark:text-neutral-400 uppercase block mb-2">Mức độ ưu tiên của thông tin</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Bình thường', 'Quan trọng', 'Khẩn'] as UnitUpdate['priority'][]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`p-2.5 rounded-lg text-xs font-bold transition-all border ${
                      priority === p 
                        ? p === 'Khẩn' ? 'bg-rose-600 border-rose-500 text-white animate-pulse' :
                          p === 'Quan trọng' ? 'bg-amber-600 border-amber-500 text-white' :
                          'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 border-transparent'
                    }`}
                  >
                    {p === 'Khẩn' ? '🔴 Khẩn' : p === 'Quan trọng' ? '🟠 Quan trọng' : '🟢 Bình thường'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-neutral-200 dark:bg-zinc-800" />

          {/* TEXT AREA FIELDS */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Nội dung công việc đã thực hiện <span className="text-rose-500">*</span>
                </label>
                <span className="text-xxs text-neutral-400">Ô nhập liệu lớn</span>
              </div>
              <textarea
                required
                value={completedWork}
                onChange={(e) => setCompletedWork(e.target.value)}
                placeholder="Mô tả ngắn gọn các công việc đã triển khai trong kỳ báo cáo, các hoạt động nổi bật, kết quả cụ thể đạt được..."
                rows={4}
                className="w-full text-xs p-3.5 rounded-xl border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-1.5">Kết quả nổi bật</label>
                <textarea
                  value={outstandingResult}
                  onChange={(e) => setOutstandingResult(e.target.value)}
                  placeholder="Các mô hình hay, cách làm sáng tạo, đột phá đem lại hiệu quả thực tế hoặc thành tích nổi bật của đơn vị..."
                  rows={3}
                  className="w-full text-xs p-3.5 rounded-xl border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-1.5">Khó khăn, vướng mắc</label>
                <textarea
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  placeholder="Nêu rõ các nguyên nhân, yếu tố ảnh hưởng gián tiếp hoặc trực tiếp đến tiến độ, chất lượng thực hiện nhiệm vụ..."
                  rows={3}
                  className="w-full text-xs p-3.5 rounded-xl border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-1.5">Kiến nghị, đề xuất</label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="Đề xuất các cơ chế chính sách, nguồn nhân lực hoặc kiến nghị hỗ trợ tháo gỡ vướng mắc..."
                  rows={3}
                  className="w-full text-xs p-3.5 rounded-xl border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-crimson-800 dark:text-crimson-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-gold-500" />
                    Nội dung đề xuất Thường trực xem xét
                  </label>
                  <span className="text-[10px] bg-crimson-500/10 text-crimson-700 dark:text-crimson-300 px-1.5 py-0.5 rounded-md font-bold uppercase">Mục ưu tiên</span>
                </div>
                <textarea
                  value={standingReviewNeeded}
                  onChange={(e) => setStandingReviewNeeded(e.target.value)}
                  placeholder="Xin chủ trương trực tiếp, chỉ đạo các ban ngành phối hợp giải quyết vụ việc phức tạp..."
                  rows={3}
                  className="w-full text-xs p-3.5 rounded-xl border border-crimson-500/20 bg-crimson-500/5 dark:bg-crimson-950/15 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-crimson-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-1.5">Kế hoạch thời gian tới</label>
              <textarea
                value={nextPlan}
                onChange={(e) => setNextPlan(e.target.value)}
                placeholder="Mô tả các trọng tâm công tác cốt lõi sẽ triển khai trong kỳ tiếp theo..."
                rows={2}
                className="w-full text-xs p-3.5 rounded-xl border border-neutral-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div className="h-px bg-neutral-200 dark:bg-zinc-800" />

          {/* FILE UPLOAD DRAG-AND-DROP */}
          <div>
            <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 block mb-2">Tệp tài liệu đính kèm (Word, Excel, PDF, Hình ảnh)</label>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                dragActive 
                  ? 'border-gold-500 bg-gold-500/10' 
                  : 'border-neutral-300 dark:border-zinc-800 bg-neutral-50/50 dark:bg-zinc-950/20 hover:border-gold-500/50'
              }`}
              onClick={triggerMockUpload}
            >
              <UploadCloud className="w-10 h-10 text-neutral-400 dark:text-neutral-500 mb-3 animate-pulse-slow" />
              <p className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Kéo và thả tệp báo cáo vào đây, hoặc nhấn để tải lên</p>
              <p className="text-xxs text-neutral-400 mt-1">Định dạng hỗ trợ: docx, xlsx, pdf, png, jpg. Kích thước tối đa 25MB.</p>
              <p className="text-xxs text-crimson-700 dark:text-gold-400 font-bold mt-2 bg-crimson-500/10 dark:bg-gold-500/10 px-2.5 py-1 rounded-md">
                ✨ Trí tuệ nhân tạo (AI) sẽ tự động quét, đọc và tóm tắt văn bản đính kèm
              </p>
            </div>

            {uploadedFiles.length > 0 && (
              <div className="mt-4 p-3 bg-neutral-100 dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-900 rounded-xl space-y-2">
                <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Tệp đã đính kèm:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-lg text-xs">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className="w-4 h-4 text-crimson-700 shrink-0" />
                        <div className="truncate">
                          <p className="font-bold text-neutral-800 dark:text-neutral-100 truncate">{file.name}</p>
                          <p className="text-[9px] text-neutral-400">{file.size} • {file.type.toUpperCase()}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(idx);
                        }}
                        className="p-1 text-neutral-400 hover:text-rose-500 rounded-md hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ACTION BUTTON */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <span className="text-[10px] text-neutral-400 italic">
              (*) Dữ liệu lưu nháp tự động liên tục bảo toàn thông tin.
            </span>
            <button
              type="submit"
              disabled={isProcessingAi}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-crimson-800 to-crimson-750 text-white hover:from-crimson-900 hover:to-crimson-800 text-xs font-bold flex items-center gap-2 shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 text-gold-400" />
              {isProcessingAi ? 'AI Đang Xử Lý Dữ Liệu...' : 'Gửi Báo Cáo Lên Thường Trực'}
            </button>
          </div>

        </form>
      </div>

      {/* AI PROCESSING PIPELINE ANIMATION (SIMULATION OVERLAY) */}
      <AnimatePresence>
        {isProcessingAi && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-zinc-950 border border-gold-500/30 max-w-lg w-full rounded-2xl p-8 text-center space-y-6 shadow-2xl relative overflow-hidden text-left"
            >
              {/* Background glowing particles */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-gold-500/20 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-44 h-44 bg-gradient-to-tr from-crimson-500/10 to-transparent rounded-tr-full pointer-events-none" />

              <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
                <div className="p-3 bg-gold-500/15 rounded-xl border border-gold-500/30">
                  <Sparkles className="w-6 h-6 text-gold-400 animate-spin" />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-white uppercase tracking-wide">Trình Phân Tích Trực Giác AI</h3>
                  <p className="text-[10px] text-neutral-400">Đang đọc, kiểm thử cấu trúc và gom cụm báo cáo gửi lên...</p>
                </div>
              </div>

              {/* Step Process list with live state */}
              <div className="space-y-4">
                {[
                  '1. Tiến hành đọc toàn bộ nội dung & bóc tách tệp đính kèm...',
                  '2. Tự động phân loại chủ đề chuyên biệt (Xây dựng Đảng, Kinh tế...)',
                  '3. Xác định mức độ ưu tiên & Đánh giá rủi ro ảnh hưởng...',
                  '4. Kiểm tra trùng lặp, gom nhóm nội dung tương tự và kết nạp lên Dashboard...'
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border text-[10px] font-bold ${
                      processingStep > idx 
                        ? 'bg-emerald-500 border-emerald-400 text-white' 
                        : processingStep === idx 
                          ? 'bg-gold-500 border-gold-400 text-zinc-950 animate-pulse' 
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                    }`}>
                      {processingStep > idx ? '✓' : idx + 1}
                    </div>
                    <p className={`text-xs font-medium ${
                      processingStep > idx ? 'text-emerald-400' :
                      processingStep === idx ? 'text-gold-400 animate-pulse font-semibold' : 'text-zinc-500'
                    }`}>
                      {step}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xxs font-mono text-zinc-500">
                <span>AI MODEL: GEMINI-3.5-FLASH</span>
                <span className="animate-pulse text-gold-400">ĐANG XỬ LÝ...</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST NOTIFICATION ON SUCCESS */}
      <AnimatePresence>
        {showSuccessToast && (
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              className="flex items-center gap-3 bg-emerald-600 border border-emerald-500 text-white p-4 rounded-xl shadow-2xl max-w-md"
            >
              <div className="p-1.5 bg-white/20 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div className="text-left text-xs">
                <p className="font-bold">Gửi báo cáo thành công!</p>
                <p className="text-[10px] text-emerald-100">AI đã đồng bộ dữ liệu lên Dashboard của Thường trực.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
