export interface Task {
  id: string;
  name: string;
  unit: string;
  assignee: string;
  assignedDate: string;
  dueDate: string;
  progress: number; // 0-100
  status: 'Chưa thực hiện' | 'Đang thực hiện' | 'Hoàn thành' | 'Quá hạn';
  result?: string;
}

export interface UnitUpdate {
  id: string;
  unitName: string;
  updater: string;
  role: string;
  updatedAt: string;
  type: 'Hằng ngày' | 'Hằng tuần' | 'Hằng tháng' | 'Đột xuất';
  priority: 'Bình thường' | 'Quan trọng' | 'Khẩn';
  completedWork: string;
  outstandingResult: string;
  difficulty: string;
  suggestion: string;
  standingReviewNeeded: string;
  nextPlan: string;
  attachments: { name: string; type: string; size: string }[];
  keywords: string[];
  hasAttachment: boolean;
  isReviewedByStanding: boolean;
  needsCooperation: boolean;
  cooperationUnit?: string;
  category: 'Xây dựng Đảng' | 'Kinh tế' | 'Văn hóa' | 'Giáo dục' | 'Y tế' | 'Quốc phòng' | 'An ninh' | 'Môi trường' | 'Cải cách hành chính' | 'Chuyển đổi số';
}

export interface NotificationItem {
  id: string;
  type: 'Lịch họp' | 'Lịch công tác' | 'Văn bản mới' | 'Thông báo nội bộ' | 'Nhắc nhở';
  title: string;
  time: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
}

export interface AlertItem {
  id: string;
  level: '🔴 Khẩn cấp' | '🟠 Quan trọng' | '🟡 Theo dõi' | '🟢 Bình thường';
  color: 'red' | 'orange' | 'yellow' | 'green';
  title: string;
  source: string;
  time: string;
  content: string;
}

export interface PresetAiQuery {
  question: string;
  answer: string;
}
