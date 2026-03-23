import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  Settings, 
  HelpCircle, 
  LogOut,
  Search,
  Bell,
  MessageSquare,
  ChevronRight,
  TrendingUp,
  Car,
  AlertCircle,
  Download,
  Calendar,
  Plus,
  CheckCircle2,
  FileText,
  Database,
  ShieldCheck,
  MoreVertical,
  Lock,
  Unlock,
  Verified,
  Receipt,
  ArrowRight,
  Mail,
  Save,
  X,
  UserPlus,
  DollarSign,
  Eye
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// --- Types ---
type Page = 'dashboard' | 'drivers' | 'finance' | 'settings';

interface Stat {
  label: string;
  value: string;
  trend?: string;
  icon: React.ReactNode;
  variant?: 'default' | 'critical';
  capacity?: string;
}

interface Activity {
  time: string;
  user: string;
  userInitials: string;
  action: string;
  target: string;
  status: 'success' | 'warning' | 'info';
  statusText: string;
}

type DriverStatus = 'PENDING' | 'APPROVED' | 'PENDING_DEPOSIT' | 'ACTIVE' | 'APP_LOCKED' | 'INACTIVE' | 'REJECTED';

interface Driver {
  id: string;
  name: string;
  phone: string;
  htx: string;
  status: DriverStatus;
  wallet: number;
  deposit: number;
  expiry: string;
  xsm_driver_id?: string;
  registrationDate: string;
}

interface SalesPartner {
  id: string;
  name: string;
  type: 'F1' | 'F2';
  phone: string;
  region: string;
  activeCars: number;
  totalCommission: number;
  pendingCommission: number;
  status: 'ACTIVE' | 'INACTIVE';
}

interface CarSale {
  id: string;
  customerName: string;
  vin: string;
  model: string;
  partnerName: string;
  price: number;
  commission: number;
  paymentMethod: 'CASH' | 'BANK_LOAN';
  status: 'ORDERED' | 'RECEIVED' | 'HANDED_OVER' | 'APP_LINKED' | 'delivered';
  date: string;
}

interface WithdrawalRequest {
  id: string;
  driverName: string;
  driverId: string;
  amount: number;
  available: number;
  bank: string;
  account: string;
  date: string;
  status: 'pending' | 'approved' | 'paid' | 'rejected';
  reason?: string;
}

interface Permission {
  id: string;
  label: string;
  module: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

// --- Mock Data ---
const REVENUE_DATA = [
  { day: 'T2', actual: 24, plan: 32 },
  { day: 'T3', actual: 40, plan: 48 },
  { day: 'T4', actual: 16, plan: 24 },
  { day: 'T5', actual: 48, plan: 56 },
  { day: 'T6', actual: 32, plan: 40 },
  { day: 'T7', actual: 56, plan: 64 },
  { day: 'CN', actual: 44, plan: 52 },
];

const ACTIVITIES: Activity[] = [
  {
    time: '14:30 - 24/05/2024',
    user: 'Quách Thành Đạt',
    userInitials: 'QT',
    action: 'Xuất dữ liệu MISA',
    target: 'Kỳ đối soát 20/05 - 24/05',
    status: 'success',
    statusText: 'Thành công'
  },
  {
    time: '12:15 - 24/05/2024',
    user: 'Nguyễn Văn A',
    userInitials: 'NV',
    action: 'Cập nhật hồ sơ tài xế',
    target: 'TX-2041 (Trần Văn B)',
    status: 'success',
    statusText: 'Hoàn thành'
  },
  {
    time: '09:45 - 24/05/2024',
    user: 'Lê Thị C',
    userInitials: 'LT',
    action: 'Báo cáo công nợ quá hạn',
    target: 'Tài xế TX-5510',
    status: 'warning',
    statusText: 'Cảnh báo'
  }
];

const DRIVERS: Driver[] = [
  { id: 'TX-2940', name: 'Nguyễn Văn An', phone: '0901 234 567', htx: 'HTX Sài Gòn', status: 'ACTIVE', wallet: 1250000, deposit: 10000000, expiry: '15/08/2026', xsm_driver_id: 'XSM-SACO-001', registrationDate: '10/01/2024' },
  { id: 'TX-1102', name: 'Trần Hữu Hùng', phone: '0988 776 655', htx: 'HTX Thủ Đô', status: 'APP_LOCKED', wallet: -450000, deposit: 10000000, expiry: '12/11/2025', xsm_driver_id: 'XSM-SACO-002', registrationDate: '15/02/2024' },
  { id: 'TX-3334', name: 'Lê Minh Tâm', phone: '0912 333 444', htx: 'HTX Miền Tây', status: 'PENDING', wallet: 0, deposit: 5000000, expiry: '20/12/2027', registrationDate: '20/03/2024' },
  { id: 'TX-5556', name: 'Phạm Đức Huy', phone: '0944 555 666', htx: 'HTX Sài Gòn', status: 'INACTIVE', wallet: 2800000, deposit: 10000000, expiry: 'Đã hết hạn', xsm_driver_id: 'XSM-SACO-003', registrationDate: '05/12/2023' },
  { id: 'TX-6677', name: 'Hoàng Văn Nam', phone: '0977 111 222', htx: 'HTX Sài Gòn', status: 'APPROVED', wallet: 0, deposit: 0, expiry: '01/01/2027', registrationDate: '21/03/2024' },
  { id: 'TX-8899', name: 'Vũ Minh Tuấn', phone: '0966 333 444', htx: 'HTX Thủ Đô', status: 'PENDING_DEPOSIT', wallet: 0, deposit: 2000000, expiry: '15/05/2027', xsm_driver_id: 'XSM-SACO-005', registrationDate: '18/03/2024' },
];

const WITHDRAWAL_REQUESTS: WithdrawalRequest[] = [
  { id: 'REQ-001', driverName: 'Nguyễn Lam', driverId: '#DX2940', amount: 5200000, available: 8450000, bank: 'MB Bank', account: '0912345678 - NGUYEN LAM', date: '24/10/2023, 14:30', status: 'pending' },
  { id: 'REQ-002', driverName: 'Phạm Minh', driverId: '#DX1102', amount: 12000000, available: 14120000, bank: 'Vietcombank', account: '1029438291 - PHAM MINH', date: '24/10/2023, 10:15', status: 'approved' },
  { id: 'REQ-003', driverName: 'Hoàng Thuý', driverId: '#DX4481', amount: 2450000, available: 4100000, bank: 'Techcombank', account: '1903348122 - HOANG THUY', date: '23/10/2023, 16:45', status: 'paid' },
  { id: 'REQ-004', driverName: 'Trần Dũng', driverId: '#DX9923', amount: 8900000, available: 3200000, bank: 'Agribank', account: '4800205123 - TRAN DUNG', date: '23/10/2023, 09:12', status: 'rejected', reason: 'Số dư không đủ' },
];

const SALES_PARTNERS: SalesPartner[] = [
  { id: 'SP-001', name: 'Đại lý Saco Miền Đông', type: 'F1', phone: '0901234567', region: 'Đồng Nai', activeCars: 45, totalCommission: 125000000, pendingCommission: 12000000, status: 'ACTIVE' },
  { id: 'SP-002', name: 'Showroom Saco Thủ Đức', type: 'F1', phone: '0902345678', region: 'TP.HCM', activeCars: 32, totalCommission: 85000000, pendingCommission: 5000000, status: 'ACTIVE' },
  { id: 'SP-003', name: 'Cộng tác viên Trần Long', type: 'F2', phone: '0903456789', region: 'Bình Dương', activeCars: 12, totalCommission: 24000000, pendingCommission: 2000000, status: 'ACTIVE' },
];

const CAR_SALES: CarSale[] = [
  { id: 'SALE-1001', customerName: 'Lê Minh Tâm', vin: 'VF8-992831', model: 'VinFast VF8', partnerName: 'Đại lý Saco Miền Đông', price: 1200000000, commission: 15000000, paymentMethod: 'BANK_LOAN', status: 'HANDED_OVER', date: '20/03/2026' },
  { id: 'SALE-1002', customerName: 'Nguyễn Hoàng Nam', vin: 'VF9-112233', model: 'VinFast VF9', partnerName: 'Showroom Saco Thủ Đức', price: 2100000000, commission: 25000000, paymentMethod: 'CASH', status: 'RECEIVED', date: '21/03/2026' },
  { id: 'SALE-1003', customerName: 'Phạm Thanh Thảo', vin: 'VFe34-445566', model: 'VinFast VFe34', partnerName: 'Cộng tác viên Trần Long', price: 710000000, commission: 8000000, paymentMethod: 'CASH', status: 'APP_LINKED', date: '22/03/2026' },
];

const PERMISSIONS: Permission[] = [
  { id: 'view_dashboard', label: 'Xem Dashboard', module: 'Tổng quan' },
  { id: 'view_drivers', label: 'Xem danh sách tài xế', module: 'Tài xế' },
  { id: 'edit_drivers', label: 'Chỉnh sửa tài xế', module: 'Tài xế' },
  { id: 'approve_drivers', label: 'Phê duyệt hồ sơ', module: 'Tài xế' },
  { id: 'view_finance', label: 'Xem tài chính', module: 'Tài chính' },
  { id: 'approve_withdraw', label: 'Duyệt rút tiền', module: 'Tài chính' },
  { id: 'view_sales', label: 'Xem doanh thu bán xe', module: 'Bán xe' },
  { id: 'edit_settings', label: 'Cấu hình hệ thống', module: 'Cài đặt' },
];

const INITIAL_ROLES: Role[] = [
  { id: 'admin', name: 'Administrator', permissions: PERMISSIONS.map(p => p.id) },
  { id: 'accounting', name: 'Kế toán', permissions: ['view_dashboard', 'view_drivers', 'view_finance', 'approve_withdraw', 'view_sales'] },
  { id: 'operator', name: 'Vận hành', permissions: ['view_dashboard', 'view_drivers', 'edit_drivers', 'approve_drivers'] },
  { id: 'sales', name: 'Kinh doanh', permissions: ['view_dashboard', 'view_sales'] },
];

// --- Components ---

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-xl font-black text-slate-900 font-headline">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-all">
            <X size={24} className="text-slate-400" />
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
        <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex justify-end">
          <button onClick={onClose} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold text-sm hover:shadow-lg transition-all">
            Đóng
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Sidebar = ({ activePage, onPageChange, onLogout, onAction }: { activePage: Page, onPageChange: (page: Page) => void, onLogout: () => void, onAction: (title: string, content: React.ReactNode) => void }) => {
  const navItems = [
    { id: 'dashboard', label: 'Bảng điều khiển', icon: LayoutDashboard },
    { id: 'drivers', label: 'Quản lý tài xế', icon: Users },
    { id: 'finance', label: 'Quyết toán tài chính', icon: Wallet },
    { id: 'settings', label: 'Cài đặt', icon: Settings },
  ];

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50 flex flex-col py-6 px-4 gap-8 z-40 border-r border-slate-200">
      <div className="flex flex-col gap-1 px-2">
        <span className="text-xl font-bold text-sky-900 tracking-tighter font-headline">SACO Holdings</span>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Vận hành doanh nghiệp</span>
      </div>
      
      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id as Page)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 transition-all duration-200 font-headline text-sm tracking-tight rounded-lg text-left",
              activePage === item.id 
                ? "text-sky-700 font-bold border-r-4 border-sky-700 bg-sky-50" 
                : "text-slate-500 hover:text-sky-600 hover:bg-slate-100"
            )}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="flex flex-col gap-2 border-t border-slate-100 pt-6">
        <button 
          onClick={() => onAction('Trung tâm hỗ trợ', (
            <div className="space-y-6">
              <div className="p-6 bg-sky-50 rounded-3xl border border-sky-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-sky-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <p className="text-xl font-black text-sky-900">Bạn cần hỗ trợ?</p>
                  <p className="text-sm text-sky-600">Tổng đài hỗ trợ đối tác 24/7</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Hotline Kỹ thuật</span>
                  <span className="text-sm font-black text-sky-600">1900 6789</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Hotline Tài chính</span>
                  <span className="text-sm font-black text-sky-600">1900 6790</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">Email hỗ trợ</span>
                  <span className="text-sm font-black text-sky-600">support@saco.vn</span>
                </div>
              </div>
            </div>
          ))}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-sky-600 hover:bg-slate-100 transition-colors duration-200 font-headline text-sm tracking-tight text-left rounded-lg"
        >
          <HelpCircle size={20} />
          <span>Hỗ trợ</span>
        </button>
        <button 
          onClick={() => onAction('Xác nhận đăng xuất', (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <LogOut className="text-tertiary" size={32} />
                <div>
                  <p className="font-bold text-slate-900">Bạn muốn đăng xuất?</p>
                  <p className="text-xs text-slate-400">Phiên làm việc của bạn sẽ kết thúc.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl">Hủy</button>
                <button 
                  onClick={onLogout}
                  className="flex-1 py-4 bg-tertiary text-white font-black rounded-2xl shadow-xl shadow-tertiary/20"
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          ))}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-sky-600 hover:bg-slate-100 transition-colors duration-200 font-headline text-sm tracking-tight text-left rounded-lg"
        >
          <LogOut size={20} />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

const TopBar = ({ title, onAction }: { title: string, onAction: (title: string, content: React.ReactNode) => void }) => {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-30 glass-header flex justify-between items-center h-16 px-8 ml-64 shadow-sm border-b border-slate-100">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            className="w-full bg-surface-container-highest/50 border-none rounded-xl pl-10 py-2 text-sm focus:ring-2 focus:ring-primary/40 transition-all outline-none" 
            placeholder="Tìm kiếm tài liệu, đối soát..." 
            type="text" 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onAction('Kết quả tìm kiếm', (
                  <div className="space-y-4">
                    <p className="text-sm text-slate-500 italic">Hiển thị kết quả cho: "{(e.target as HTMLInputElement).value}"</p>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="font-bold text-slate-900">Tài xế: Nguyễn Lâm Nhật</p>
                      <p className="text-xs text-slate-400">Mã: SACO-TX-9921 • HTX Sài Gòn Xanh</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="font-bold text-slate-900">Chứng từ: #FT9921</p>
                      <p className="text-xs text-slate-400">Loại: Quyết toán tuần • Ngày: 22/03/2026</p>
                    </div>
                  </div>
                ));
              }
            }}
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={() => onAction('Thông báo', (
            <div className="space-y-4">
              {[
                { title: 'Yêu cầu rút tiền mới', time: '5 phút trước', desc: 'Tài xế Nguyễn Lâm vừa yêu cầu rút 5,200,000đ' },
                { title: 'Cảnh báo nợ quá hạn', time: '1 giờ trước', desc: 'Có 3 tài xế nợ quá hạn chốt sổ tuần này' },
                { title: 'Cập nhật hệ thống', time: 'Hôm qua', desc: 'Hệ thống đã cập nhật phiên bản v1.0.5' }
              ].map((n, i) => (
                <div key={i} className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{n.title}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{n.time}</p>
                    <p className="text-xs text-slate-500 mt-1">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          className="text-slate-500 hover:text-primary transition-colors relative"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-tertiary rounded-full border border-white"></span>
        </button>
        <button 
          onClick={() => onAction('Tin nhắn', (
            <div className="space-y-4">
              {[
                { user: 'Nguyễn Lâm', msg: 'Anh ơi duyệt giúp em yêu cầu rút tiền với ạ', time: '10:30' },
                { user: 'Trần Hoàng Anh', msg: 'Hồ sơ của em đã được duyệt chưa ạ?', time: '09:15' }
              ].map((m, i) => (
                <div key={i} className="flex gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-xs text-slate-500">{m.user.split(' ').map(n => n[0]).join('')}</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="text-sm font-bold text-slate-900">{m.user}</p>
                      <p className="text-[10px] text-slate-400">{m.time}</p>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{m.msg}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
          className="text-slate-500 hover:text-primary transition-colors"
        >
          <MessageSquare size={20} />
        </button>
        
        <div 
          onClick={() => onAction('Thông tin tài khoản', (
            <div className="text-center space-y-6">
              <img src="https://picsum.photos/seed/user/200/200" className="w-24 h-24 rounded-3xl mx-auto border-4 border-slate-100 shadow-lg" alt="Avatar" />
              <div>
                <p className="text-xl font-black text-slate-900">Quách Thành Đạt</p>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Administrator</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] text-slate-400 font-black uppercase">Quyền hạn</p>
                  <p className="text-sm font-bold text-sky-600">Toàn quyền</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] text-slate-400 font-black uppercase">Trạng thái</p>
                  <p className="text-sm font-bold text-emerald-600">Online</p>
                </div>
              </div>
            </div>
          ))}
          className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">Quách Thành Đạt</p>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Quản trị viên hệ thống</p>
          </div>
          <img 
            alt="User avatar" 
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-container group-hover:border-primary transition-all" 
            src="https://picsum.photos/seed/user/100/100" 
          />
        </div>
      </div>
    </header>
  );
};

const StatCard: React.FC<{ stat: Stat, onAction?: (title: string, content: React.ReactNode) => void }> = ({ stat, onAction }) => {
  const isCritical = stat.variant === 'critical';
  
  return (
    <div 
      onClick={() => onAction?.(stat.label, (
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className={cn("p-3 rounded-xl", isCritical ? "bg-tertiary-container text-on-tertiary" : "bg-primary-fixed text-primary")}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Chi tiết biến động</h4>
            <div className="h-32 bg-slate-50 rounded-xl flex items-end justify-between p-4 gap-2">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div key={i} className="w-full bg-primary/20 rounded-t-md relative group">
                  <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-primary rounded-t-md group-hover:bg-primary-dark transition-all"></div>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 italic leading-relaxed">Dữ liệu được tổng hợp từ các chuyến xe hoàn thành trong 24h qua. Tăng trưởng ổn định so với cùng kỳ tuần trước.</p>
          </div>
        </div>
      ))}
      className={cn(
      "p-6 rounded-xl flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm relative overflow-hidden cursor-pointer",
      isCritical 
        ? "bg-tertiary-container/5 border border-tertiary-container" 
        : "bg-surface-container-lowest hover:bg-surface-container-low"
    )}>
      {isCritical && (
        <div className="absolute -right-4 -top-4 opacity-10">
          <AlertCircle size={96} />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-2 rounded-lg",
          isCritical ? "bg-tertiary-container text-on-tertiary" : "bg-primary-fixed text-primary"
        )}>
          {stat.icon}
        </div>
        {stat.trend && (
          <span className="text-secondary text-xs font-bold bg-secondary-container px-2 py-1 rounded-full">
            {stat.trend}
          </span>
        )}
        {stat.capacity && (
          <span className="text-primary text-xs font-bold bg-primary-fixed px-2 py-1 rounded-full">
            {stat.capacity}
          </span>
        )}
        {isCritical && (
          <span className="text-tertiary text-[10px] font-extrabold bg-tertiary-fixed px-2 py-1 rounded-full uppercase">
            Cảnh báo cao
          </span>
        )}
      </div>
      
      <div>
        <p className={cn(
          "text-xs font-bold uppercase tracking-widest mb-1",
          isCritical ? "text-tertiary" : "text-slate-400"
        )}>
          {stat.label}
        </p>
        <p className={cn(
          "font-headline text-2xl font-extrabold tracking-tight",
          isCritical ? "text-tertiary" : "text-on-surface"
        )}>
          {stat.value}
        </p>
      </div>
    </div>
  );
};

const DashboardView: React.FC<{ onAction: (title: string, content: React.ReactNode) => void }> = ({ onAction }) => {
  const stats: Stat[] = [
    { label: 'Doanh thu Xanh Partner', value: '1.850.000.000 VNĐ', trend: '+8.2%', icon: <Car size={20} /> },
    { label: 'Doanh thu Saco Holdings', value: '600.000.000 VNĐ', trend: '+24.5%', icon: <Wallet size={20} /> },
    { label: 'Tổng ký quỹ tài xế', value: '15.820.000.000 VNĐ', icon: <Database size={20} /> },
    { label: 'Công nợ quá hạn', value: '84.200.000 VNĐ', icon: <AlertCircle size={20} />, variant: 'critical' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <section className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-surface tracking-tight mb-1">Dashboard Tổng Quan</h1>
          <p className="text-on-surface-variant text-sm">Cập nhật lúc: 14:32, 24 Tháng 5, 2024</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => onAction('Bộ lọc thời gian', (
              <div className="space-y-4">
                <p className="text-sm text-slate-500">Chọn khoảng thời gian để xem báo cáo:</p>
                <div className="grid grid-cols-2 gap-3">
                  {['Hôm nay', 'Tuần này', 'Tháng này', 'Quý này'].map(t => (
                    <button key={t} className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-900 hover:border-primary transition-all">{t}</button>
                  ))}
                </div>
              </div>
            ))}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low transition-colors flex items-center gap-2"
          >
            <Calendar size={18} />
            Tuần này
          </button>
          <button 
            onClick={() => onAction('Xuất báo cáo', (
              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                  <FileText className="text-emerald-600" size={32} />
                  <div>
                    <p className="font-bold text-emerald-900 text-lg">Báo cáo tổng hợp sẵn sàng</p>
                    <p className="text-xs text-emerald-600">Dữ liệu từ 18/05/2024 - 24/05/2024</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                    <Download size={18} /> Tải xuống Excel (.xlsx)
                  </button>
                  <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                    <Download size={18} /> Tải xuống PDF (.pdf)
                  </button>
                </div>
              </div>
            ))}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold primary-gradient text-on-primary flex items-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
          >
            <Download size={18} />
            Báo cáo tổng hợp
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => <StatCard key={i} stat={stat} onAction={onAction} />)}
      </section>

      <section className="grid grid-cols-12 gap-8 items-start">
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-headline text-xl font-bold text-on-surface">Xu hướng doanh thu</h3>
              <p className="text-sm text-on-surface-variant">Biến động doanh thu theo ngày trong tuần</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-primary"></span> THỰC TẾ</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-200"></span> KẾ HOẠCH</div>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="plan" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={40} />
                <Bar dataKey="actual" fill="#006497" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-surface-container/50 p-6 rounded-xl border border-surface-container shadow-sm">
            <h3 className="font-headline text-lg font-bold text-on-surface mb-6">Thao tác nhanh</h3>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Duyệt hồ sơ mới', sub: '12 hồ sơ đang chờ', icon: Users, color: 'bg-primary-fixed text-primary', detail: 'Hệ thống ghi nhận 12 hồ sơ đăng ký mới từ đối tác tài xế. Vui lòng kiểm tra chứng từ và phê duyệt để tài xế có thể bắt đầu hoạt động.' },
                { label: 'Chốt đối soát tuần', sub: 'Kỳ thanh toán 24/05', icon: CheckCircle2, color: 'bg-secondary-container text-on-secondary-container', detail: 'Dữ liệu đối soát tuần này đã sẵn sàng. Tổng số tiền cần quyết toán là 1.021.392.000 VNĐ cho 1.284 tài xế.' },
                { label: 'Xuất dữ liệu MISA', sub: 'Định dạng XML/Excel', icon: Database, color: 'bg-surface-container-highest text-on-surface', detail: 'Kết xuất dữ liệu tài chính sang phần mềm kế toán MISA. Đảm bảo tất cả các phiếu chi đã được xác nhận trạng thái "Đã chi".' },
              ].map((action, i) => (
                <button 
                  key={i} 
                  onClick={() => onAction(action.label, (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", action.color)}>
                          <action.icon size={24} />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg">{action.label}</p>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{action.sub}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{action.detail}</p>
                      <button className="w-full py-4 primary-gradient text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">Thực hiện ngay</button>
                    </div>
                  ))}
                  className="w-full flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", action.color)}>
                      <action.icon size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-on-surface">{action.label}</p>
                      <p className="text-[10px] text-on-surface-variant">{action.sub}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-tertiary-container/10 border border-tertiary-container p-6 rounded-xl text-on-surface relative overflow-hidden shadow-sm">
            <div className="absolute -right-4 -top-4 opacity-10">
              <AlertCircle size={64} className="text-tertiary" />
            </div>
            <h4 className="font-headline font-bold text-tertiary mb-2 flex items-center gap-2">
              <AlertCircle size={16} />
              Rà soát cấp đổi Phù hiệu
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Có 15 tài xế sắp hết hạn phù hiệu. Cần thực hiện rà soát để chuyển đổi sang <strong>Phù hiệu vận tải</strong> mới trước khi hết hạn.
            </p>
            <button 
              onClick={() => onAction('Rà soát phù hiệu', (
                <div className="space-y-6">
                  <p className="text-sm text-slate-600 leading-relaxed">Danh sách 15 tài xế có phù hiệu hết hạn trong 7 ngày tới. Vui lòng liên hệ và hướng dẫn tài xế hoàn tất thủ tục cấp đổi.</p>
                  <div className="space-y-3">
                    {[
                      { name: 'Nguyễn Văn A', plate: '51G-123.45', expiry: '28/05/2024' },
                      { name: 'Trần Văn B', plate: '51G-678.90', expiry: '29/05/2024' },
                      { name: 'Lê Văn C', plate: '51G-111.22', expiry: '30/05/2024' }
                    ].map((d, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{d.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase">{d.plate}</p>
                        </div>
                        <span className="text-[10px] font-black text-tertiary bg-tertiary/10 px-2 py-1 rounded-full">{d.expiry}</span>
                      </div>
                    ))}
                    <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">Và 12 tài xế khác...</p>
                  </div>
                  <button className="w-full py-4 bg-tertiary text-white font-black rounded-2xl shadow-xl shadow-tertiary/20 hover:scale-[1.02] transition-all">Gửi thông báo nhắc nhở</button>
                </div>
              ))}
              className="text-xs font-extrabold uppercase tracking-widest text-tertiary border border-tertiary px-3 py-2 rounded-lg hover:bg-tertiary hover:text-white transition-all"
            >
              Xử lý ngay
            </button>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center">
          <h3 className="font-headline text-xl font-bold text-on-surface">Nhật ký hoạt động (Audit Trail)</h3>
          <button 
            onClick={() => onAction('Nhật ký hoạt động', (
              <div className="space-y-6">
                <p className="text-sm text-slate-500">Lịch sử thao tác chi tiết trên hệ thống trong 24h qua:</p>
                <div className="space-y-4">
                  {ACTIVITIES.map((a, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-10 h-10 bg-primary-fixed-dim rounded-full flex items-center justify-center font-bold text-xs">{a.userInitials}</div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-bold text-slate-900">{a.user}</p>
                          <p className="text-[10px] text-slate-400">{a.time}</p>
                        </div>
                        <p className="text-xs text-slate-600 mt-1"><span className="font-bold text-primary">{a.action}</span> - {a.target}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Xem tất cả
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Thời gian</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Người thực hiện</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Hành động</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Đối tượng</th>
                <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {ACTIVITIES.map((activity, i) => (
                <tr 
                  key={i} 
                  onClick={() => onAction('Chi tiết nhật ký', (
                    <div className="space-y-6">
                      <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mã nhật ký</span>
                          <span className="text-sm font-bold text-sky-600">#LOG-20240524-{i}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thời gian</span>
                          <span className="text-sm font-bold text-slate-900">{activity.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Người thực hiện</span>
                          <span className="text-sm font-bold text-slate-900">{activity.user}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hành động</span>
                          <span className="text-sm font-bold text-primary">{activity.action}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Đối tượng</span>
                          <span className="text-sm font-bold text-slate-900">{activity.target}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trạng thái</span>
                          <span className={cn(
                            "px-2 py-1 rounded-full text-[10px] font-black uppercase",
                            activity.status === 'success' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          )}>
                            {activity.statusText}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 bg-slate-900 rounded-2xl">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Dữ liệu thô (JSON)</p>
                        <pre className="text-[10px] text-emerald-400 font-mono overflow-x-auto">
                          {JSON.stringify({
                            timestamp: activity.time,
                            actor: activity.user,
                            action: activity.action,
                            target: activity.target,
                            status: activity.status,
                            ip_address: '192.168.1.' + (10 + i)
                          }, null, 2)}
                        </pre>
                      </div>
                    </div>
                  ))}
                  className="hover:bg-surface-container-low/50 transition-colors cursor-pointer group"
                >
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{activity.time}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary-fixed-dim text-[10px] flex items-center justify-center font-bold">
                        {activity.userInitials}
                      </div>
                      <span className="text-sm font-semibold text-on-surface">{activity.user}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium">{activity.action}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{activity.target}</td>
                  <td className="px-8 py-5 text-right">
                    <span className={cn(
                      "inline-flex items-center px-2 py-1 rounded-full text-[10px] font-extrabold uppercase",
                      activity.status === 'success' ? "bg-secondary-container text-on-secondary-container" : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                    )}>
                      {activity.statusText}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
};

const DriverManagementView: React.FC<{ onAction: (title: string, content: React.ReactNode) => void }> = ({ onAction }) => {
  const [activeTab, setActiveTab] = React.useState<'drivers' | 'sales'>('drivers');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <section className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2">
            {activeTab === 'drivers' ? 'Quản Lý Tài Xế' : 'Đối Tác Kinh Doanh'}
          </h1>
          <p className="text-on-surface-variant max-w-lg">
            {activeTab === 'drivers' 
              ? 'Theo dõi hoạt động, trạng thái tài chính và phê duyệt hồ sơ đối tác vận hành của SACO Holdings.' 
              : 'Quản lý mạng lưới đại lý F1, F2 và cộng tác viên bán xe Saco Holdings.'}
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex bg-surface-container-low p-1 rounded-xl border border-slate-200 mr-4">
            <button 
              onClick={() => setActiveTab('drivers')}
              className={cn(
                "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                activeTab === 'drivers' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
              )}
            >
              Tài xế
            </button>
            <button 
              onClick={() => setActiveTab('sales')}
              className={cn(
                "px-4 py-2 text-xs font-bold rounded-lg transition-all",
                activeTab === 'sales' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
              )}
            >
              Đối tác Sales
            </button>
          </div>
          <button 
            onClick={() => onAction('Xuất báo cáo', (
              <div className="space-y-6">
                <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 flex items-center gap-4">
                  <FileText className="text-sky-600" size={32} />
                  <div>
                    <p className="font-bold text-sky-900 text-lg">Báo cáo danh sách tài xế</p>
                    <p className="text-xs text-sky-600">Tổng số 1,284 tài xế trong hệ thống</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold text-slate-900 flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                    <Download size={18} /> Tải xuống danh sách (.csv)
                  </button>
                </div>
              </div>
            ))}
            className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-lowest text-on-surface font-semibold rounded-xl shadow-sm hover:bg-surface-container-low transition-all"
          >
            <Download size={18} />
            Xuất Báo Cáo
          </button>
          <button 
            onClick={() => onAction('Thêm tài xế mới', (
              <div className="space-y-6">
                <p className="text-sm text-slate-500">Nhập thông tin cơ bản để bắt đầu quy trình đăng ký đối tác mới:</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Họ và tên</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nguyễn Văn A" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Số điện thoại</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="090x xxx xxx" />
                  </div>
                  <button className="w-full py-4 primary-gradient text-white font-black rounded-2xl shadow-xl shadow-primary/20 mt-4">Tiếp tục bước 2</button>
                </div>
              </div>
            ))}
            className="flex items-center gap-2 px-5 py-2.5 primary-gradient text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition-all"
          >
            <Plus size={18} />
            Thêm Tài Xế
          </button>
        </div>
      </section>

      {activeTab === 'drivers' ? (
        <>
          <section className="grid grid-cols-12 gap-6">
        <div 
          onClick={() => onAction('Tổng số tài xế', (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                  <p className="text-[10px] text-emerald-600 font-bold uppercase">Đang hoạt động</p>
                  <p className="text-2xl font-black text-emerald-900">1,050</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Ngoại tuyến</p>
                  <p className="text-2xl font-black text-slate-900">234</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Tỷ lệ tài xế hoạt động ổn định ở mức 82%. Đội ngũ vận hành đang hỗ trợ các tài xế mới làm quen với hệ thống.</p>
            </div>
          ))}
          className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-all"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng số tài xế</p>
            <h3 className="text-4xl font-extrabold text-primary">1,284</h3>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Car size={32} />
          </div>
        </div>
        <div 
          onClick={() => onAction('Hồ sơ chờ duyệt', (
            <div className="space-y-6">
              <p className="text-sm text-slate-500">Danh sách 42 hồ sơ đang trong quy trình thẩm định:</p>
              <div className="space-y-3">
                {[
                  { name: 'Lê Văn Tám', time: '2 giờ trước' },
                  { name: 'Hoàng Minh Đức', time: '5 giờ trước' },
                  { name: 'Nguyễn Thị Hoa', time: 'Hôm qua' }
                ].map((h, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-900 text-sm">{h.name}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{h.time}</span>
                  </div>
                ))}
              </div>
              <button className="w-full py-3 bg-primary text-white font-bold rounded-xl">Đi tới trang phê duyệt</button>
            </div>
          ))}
          className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between cursor-pointer hover:bg-surface-container-high transition-all"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Chờ Duyệt Hồ Sơ</p>
            <h3 className="text-4xl font-extrabold text-primary">42</h3>
          </div>
          <div className="w-16 h-16 bg-primary-fixed rounded-2xl flex items-center justify-center text-primary">
            <FileText size={32} />
          </div>
        </div>
        <div 
          onClick={() => onAction('Cảnh báo ví âm', (
            <div className="space-y-6">
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-4">
                <AlertCircle className="text-red-600" size={32} />
                <div>
                  <p className="font-bold text-red-900">15 tài xế nợ quá hạn</p>
                  <p className="text-xs text-red-600">Tổng nợ: 84.200.000 VNĐ</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">Hệ thống đã tự động gửi thông báo nhắc nợ. Cần rà soát và khóa tài khoản nếu không hoàn tất đối soát trong 24h tới.</p>
            </div>
          ))}
          className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between border-l-4 border-tertiary cursor-pointer hover:bg-surface-container-high transition-all"
        >
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cảnh Báo Ví Âm</p>
            <h3 className="text-4xl font-extrabold text-tertiary">15</h3>
          </div>
          <div className="w-16 h-16 bg-tertiary-fixed rounded-2xl flex items-center justify-center text-tertiary">
            <Wallet size={32} />
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 flex flex-wrap gap-4 items-center bg-surface-container-low/30 border-b border-surface-container">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">HTX Hợp Tác</label>
            <select className="w-full bg-surface-container-highest border-none rounded-lg text-sm font-medium py-2.5 focus:ring-2 focus:ring-primary/40 outline-none">
              <option>Tất cả HTX</option>
              <option>HTX Sài Gòn</option>
              <option>HTX Thủ Đô</option>
              <option>HTX Miền Tây</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">Trạng Thái</label>
            <select className="w-full bg-surface-container-highest border-none rounded-lg text-sm font-medium py-2.5 focus:ring-2 focus:ring-primary/40 outline-none">
              <option>Tất cả trạng thái</option>
              <option>PENDING - Chờ duyệt</option>
              <option>APPROVED - Đã duyệt</option>
              <option>PENDING_DEPOSIT - Chờ ký quỹ</option>
              <option>ACTIVE - Hoạt động</option>
              <option>APP_LOCKED - Khóa App (Ví âm)</option>
              <option>INACTIVE - Ngưng hoạt động</option>
              <option>REJECTED - Từ chối</option>
            </select>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1 px-1">Hết Hạn Phù Hiệu</label>
            <select className="w-full bg-surface-container-highest border-none rounded-lg text-sm font-medium py-2.5 focus:ring-2 focus:ring-primary/40 outline-none">
              <option>Tất cả</option>
              <option>Trong 30 ngày tới</option>
              <option>Đã hết hạn</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Họ Tên & Liên Hệ</th>
                <th className="px-6 py-4">HTX</th>
                <th className="px-6 py-4">Trạng Thái</th>
                <th className="px-6 py-4 text-right">Số Dư Ví (VNĐ)</th>
                <th className="px-6 py-4 text-right">Tiền Ký Quỹ (VNĐ)</th>
                <th className="px-6 py-4">Hết Hạn Phù Hiệu</th>
                <th className="px-6 py-4 text-center">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {DRIVERS.map((driver) => (
                <tr 
                  key={driver.id} 
                  onClick={() => onAction('Chi tiết tài xế', (
                    <div className="space-y-6">
                      <div className="flex items-center gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-3xl shadow-lg">
                          {driver.name.split(' ').map(n => n[0]).join('').slice(-2)}
                        </div>
                        <div>
                          <p className="text-2xl font-black text-slate-900">{driver.name}</p>
                          <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Mã đối tác: {driver.id}</p>
                          <div className="mt-2 flex gap-2">
                            <span className={cn(
                              "px-3 py-1 text-[10px] font-black uppercase rounded-full",
                              driver.status === 'ACTIVE' ? "bg-emerald-100 text-emerald-700" :
                              driver.status === 'PENDING' ? "bg-amber-100 text-amber-700" :
                              driver.status === 'APPROVED' ? "bg-blue-100 text-blue-700" :
                              driver.status === 'PENDING_DEPOSIT' ? "bg-orange-100 text-orange-700" :
                              driver.status === 'APP_LOCKED' ? "bg-red-100 text-red-700" :
                              driver.status === 'REJECTED' ? "bg-slate-200 text-slate-600" :
                              "bg-slate-100 text-slate-500"
                            )}>
                              {driver.status}
                            </span>
                            <span className="px-3 py-1 text-[10px] font-black uppercase rounded-full bg-slate-100 text-slate-500">
                              {driver.htx}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Số dư ví</p>
                          <p className={cn("text-xl font-black", driver.wallet < 0 ? "text-tertiary" : "text-primary")}>
                            {driver.wallet.toLocaleString()} VNĐ
                          </p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Tiền ký quỹ</p>
                          <p className="text-xl font-black text-slate-900">{driver.deposit.toLocaleString()} VNĐ</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Thông tin vận hành</h4>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-900">XSM Driver ID</span>
                            <span className="text-sm font-medium text-slate-600">{driver.xsm_driver_id || 'Chưa cập nhật'}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-900">Hết hạn phù hiệu</span>
                            <span className="text-sm font-medium text-slate-600">{driver.expiry}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-900">Ngày đăng ký</span>
                            <span className="text-sm font-medium text-slate-600">{driver.registrationDate}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Lịch sử chuyến đi gần đây</h4>
                        <div className="space-y-2">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-100">
                              <div>
                                <p className="text-xs font-bold text-slate-900">Chuyến xe #{8821 + i}</p>
                                <p className="text-[10px] text-slate-400">22/03/2026 • 14:2{i}</p>
                              </div>
                              <span className="text-xs font-black text-emerald-600">+{ (120000 + i * 5000).toLocaleString() }đ</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                  className="hover:bg-surface-container-low/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
                        {driver.name.split(' ').map(n => n[0]).join('').slice(-2)}
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{driver.name}</p>
                        <p className="text-xs text-slate-400">{driver.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium">{driver.htx}</td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-bold uppercase rounded-full",
                      driver.status === 'ACTIVE' ? "bg-emerald-100 text-emerald-700" :
                      driver.status === 'PENDING' ? "bg-amber-100 text-amber-700" :
                      driver.status === 'APPROVED' ? "bg-blue-100 text-blue-700" :
                      driver.status === 'PENDING_DEPOSIT' ? "bg-orange-100 text-orange-700" :
                      driver.status === 'APP_LOCKED' ? "bg-red-100 text-red-700" :
                      driver.status === 'REJECTED' ? "bg-slate-200 text-slate-600" :
                      "bg-slate-100 text-slate-500"
                    )}>
                      {driver.status}
                    </span>
                  </td>
                  <td className={cn(
                    "px-6 py-5 text-right font-bold",
                    driver.wallet < 0 ? "text-tertiary" : "text-on-surface"
                  )}>
                    {driver.wallet.toLocaleString()}
                  </td>
                  <td className="px-6 py-5 text-right font-medium text-on-surface-variant">
                    {driver.deposit.toLocaleString()}
                  </td>
                  <td className={cn(
                    "px-6 py-5 text-sm",
                    driver.expiry === 'Đã hết hạn' ? "text-tertiary font-semibold" : "text-on-surface-variant"
                  )}>
                    {driver.expiry}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-2">
                      {driver.status === 'PENDING' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAction('Phê duyệt hồ sơ', (
                              <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-lg">
                                    {driver.name.split(' ').map(n => n[0]).join('').slice(-2)}
                                  </div>
                                  <div>
                                    <p className="font-black text-slate-900 text-lg">{driver.name}</p>
                                    <p className="text-xs text-slate-400 font-bold">ID: {driver.id}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Bằng lái</p>
                                    <p className="text-sm font-bold text-emerald-600">Đã xác minh</p>
                                  </div>
                                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase">Lý lịch tư pháp</p>
                                    <p className="text-sm font-bold text-emerald-600">Đã xác minh</p>
                                  </div>
                                </div>
                                <div className="flex gap-3">
                                  <button className="flex-1 py-4 bg-slate-100 text-slate-400 font-black rounded-2xl">Từ chối</button>
                                  <button className="flex-1 py-4 primary-gradient text-white font-black rounded-2xl shadow-xl shadow-primary/20">Phê duyệt</button>
                                </div>
                              </div>
                            ));
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all"
                        >
                          <Verified size={14} />
                          Duyệt
                        </button>
                      )}
                      {driver.status === 'APPROVED' && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAction('Nhập mã Partner XanhSM', (
                              <div className="space-y-6">
                                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-4">
                                  <Database className="text-blue-600" size={32} />
                                  <div>
                                    <p className="font-bold text-blue-900">Liên kết tài khoản XanhSM</p>
                                    <p className="text-xs text-blue-600">Tài xế: {driver.name}</p>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Mã Partner XanhSM (xsm_driver_id)</label>
                                  <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="XSM-SACO-XXXX" />
                                  <p className="text-[10px] text-slate-400 italic">Sau khi nhập mã, trạng thái sẽ chuyển sang PENDING_DEPOSIT.</p>
                                  <button className="w-full py-4 primary-gradient text-white font-black rounded-2xl shadow-xl shadow-primary/20">Xác nhận liên kết</button>
                                </div>
                              </div>
                            ));
                          }}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:opacity-90 transition-all"
                        >
                          <Database size={14} />
                          Mã XSM
                        </button>
                      )}
                      <button 
                        onClick={() => onAction('Chi tiết tài xế', (
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-3xl bg-primary-fixed flex items-center justify-center text-primary font-black text-2xl">
                                {driver.name.split(' ').map(n => n[0]).join('').slice(-2)}
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-xl">{driver.name}</p>
                                <p className="text-sm text-slate-400 font-bold">{driver.phone} • {driver.htx}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Mã XanhSM</p>
                                <p className="text-sm font-black text-sky-600">{driver.xsm_driver_id || 'Chưa có'}</p>
                              </div>
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Ngày đăng ký</p>
                                <p className="text-sm font-black text-slate-900">{driver.registrationDate}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Ví tài khoản</p>
                                <p className="text-sm font-black text-primary">{driver.wallet.toLocaleString()} đ</p>
                              </div>
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Ký quỹ</p>
                                <p className="text-sm font-black text-slate-900">{driver.deposit.toLocaleString()} đ</p>
                              </div>
                              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Đánh giá</p>
                                <p className="text-sm font-black text-orange-500">4.9 ★</p>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Lịch sử chuyến xe gần nhất</h4>
                              {[
                                { id: 'TRIP-9921', from: 'Sân bay Tân Sơn Nhất', to: 'Quận 1', price: '245.000 đ' },
                                { id: 'TRIP-8842', from: 'Quận 7', to: 'Quận 3', price: '182.000 đ' }
                              ].map((t, i) => (
                                <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                                  <div>
                                    <p className="text-xs font-bold text-slate-900">{t.id}</p>
                                    <p className="text-[10px] text-slate-400">{t.from} → {t.to}</p>
                                  </div>
                                  <span className="text-xs font-black text-primary">{t.price}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                      >
                        <ArrowRight size={18} />
                      </button>
                      {(driver.status === 'ACTIVE' || driver.status === 'APP_LOCKED') && (
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAction(driver.status === 'APP_LOCKED' ? 'Mở khóa tài khoản' : 'Khóa tài khoản', (
                              <div className="space-y-6">
                                <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-4">
                                  <AlertCircle className="text-orange-600" size={32} />
                                  <div>
                                    <p className="font-bold text-orange-900">{driver.status === 'APP_LOCKED' ? 'Xác nhận mở khóa?' : 'Xác nhận khóa tài khoản?'}</p>
                                    <p className="text-xs text-orange-600">Tài xế: {driver.name}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">Hành động này sẽ thay đổi quyền truy cập của tài xế vào ứng dụng XanhSM. Vui lòng xác nhận lý do thay đổi trạng thái.</p>
                                <textarea className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nhập lý do..." />
                                <button className={cn("w-full py-4 font-black rounded-2xl text-white shadow-xl", driver.status === 'APP_LOCKED' ? "bg-emerald-600 shadow-emerald-100" : "bg-tertiary shadow-tertiary/20")}>
                                  Xác nhận {driver.status === 'APP_LOCKED' ? 'mở khóa' : 'khóa tài khoản'}
                                </button>
                              </div>
                            ));
                          }}
                          className="p-2 text-tertiary hover:bg-tertiary/10 rounded-lg transition-all"
                        >
                          {driver.status === 'APP_LOCKED' ? <Unlock size={18} /> : <Lock size={18} />}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
        </>
      ) : (
        <>
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tổng Đối Tác Sales</p>
                <h3 className="text-4xl font-extrabold text-primary">{SALES_PARTNERS.length}</h3>
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <Users size={32} />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Xe Đang Hoạt Động</p>
                <h3 className="text-4xl font-extrabold text-secondary">
                  {SALES_PARTNERS.reduce((acc, curr) => acc + curr.activeCars, 0)}
                </h3>
              </div>
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <Car size={32} />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hoa Hồng Chờ Chi</p>
                <h3 className="text-4xl font-extrabold text-tertiary">
                  {(SALES_PARTNERS.reduce((acc, curr) => acc + curr.pendingCommission, 0) / 1000000).toFixed(1)}M
                </h3>
              </div>
              <div className="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
                <DollarSign size={32} />
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Đối Tác Sales</th>
                    <th className="px-6 py-4">Loại</th>
                    <th className="px-6 py-4">Khu Vực</th>
                    <th className="px-6 py-4 text-right">Số Xe</th>
                    <th className="px-6 py-4 text-right">Tổng Hoa Hồng (VNĐ)</th>
                    <th className="px-6 py-4 text-right">Chờ Chi (VNĐ)</th>
                    <th className="px-6 py-4 text-center">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {SALES_PARTNERS.map((partner) => (
                    <tr key={partner.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">
                            {partner.name.split(' ').map(n => n[0]).join('').slice(-2)}
                          </div>
                          <div>
                            <p className="font-bold text-on-surface">{partner.name}</p>
                            <p className="text-xs text-slate-400">{partner.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase">
                          {partner.type}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium">{partner.region}</td>
                      <td className="px-6 py-5 text-right font-bold">{partner.activeCars}</td>
                      <td className="px-6 py-5 text-right font-medium">{partner.totalCommission.toLocaleString()}</td>
                      <td className="px-6 py-5 text-right font-bold text-primary">{partner.pendingCommission.toLocaleString()}</td>
                      <td className="px-6 py-5">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => onAction('Chi tiết đối tác sales', (
                              <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-white font-black text-2xl">
                                    {partner.name.split(' ').map(n => n[0]).join('').slice(-2)}
                                  </div>
                                  <div>
                                    <p className="font-black text-slate-900 text-xl">{partner.name}</p>
                                    <p className="text-sm text-slate-400 font-bold">{partner.type} • {partner.region}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Tổng hoa hồng</p>
                                    <p className="text-xl font-black text-slate-900">{partner.totalCommission.toLocaleString()} đ</p>
                                  </div>
                                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Chờ chi trả</p>
                                    <p className="text-xl font-black text-primary">{partner.pendingCommission.toLocaleString()} đ</p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Danh sách xe đã bán</h4>
                                  {CAR_SALES.filter(s => s.partnerName === partner.name).map((sale, i) => (
                                    <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                                      <div>
                                        <p className="text-xs font-bold text-slate-900">{sale.customerName}</p>
                                        <p className="text-[10px] text-slate-400">{sale.model} • {sale.vin}</p>
                                      </div>
                                      <span className="text-xs font-black text-emerald-600">+{sale.commission.toLocaleString()}đ</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
};

const FinanceView: React.FC<{ onAction: (title: string, content: React.ReactNode) => void }> = ({ onAction }) => {
  const [activeTab, setActiveTab] = React.useState<'withdraw' | 'reconcile' | 'sales'>('withdraw');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <section className="flex justify-between items-end">
        <div>
          <h1 className="font-headline text-3xl font-extrabold text-on-background tracking-tight">
            {activeTab === 'withdraw' ? 'Yêu Cầu Rút Tiền' : activeTab === 'reconcile' ? 'Đối Soát Tuần' : 'Doanh Thu Bán Xe'}
          </h1>
          <p className="text-on-surface-variant mt-1">
            {activeTab === 'withdraw' 
              ? 'Quản lý và phê duyệt các yêu cầu thanh toán từ tài xế đối tác.' 
              : activeTab === 'reconcile'
              ? 'Quản lý và phê duyệt quyết toán tài chính định kỳ hàng tuần.'
              : 'Theo dõi doanh thu, hoa hồng và trạng thái bàn giao xe từ Saco Holdings.'}
          </p>
        </div>
        <div className="flex bg-surface-container-low p-1 rounded-xl border border-slate-200">
          <button 
            onClick={() => setActiveTab('withdraw')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              activeTab === 'withdraw' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            )}
          >
            Rút tiền
          </button>
          <button 
            onClick={() => setActiveTab('reconcile')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              activeTab === 'reconcile' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            )}
          >
            Đối soát
          </button>
          <button 
            onClick={() => setActiveTab('sales')}
            className={cn(
              "px-4 py-2 text-xs font-bold rounded-lg transition-all",
              activeTab === 'sales' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-primary"
            )}
          >
            Bán xe
          </button>
        </div>
      </section>

      {activeTab === 'withdraw' ? (
        <>
          <section className="grid grid-cols-12 gap-6">
            <div 
              onClick={() => onAction('Tổng chờ duyệt', (
                <div className="space-y-6">
                  <p className="text-sm text-slate-500">Tổng số tiền đang chờ phê duyệt thanh toán cho tài xế:</p>
                  <div className="p-6 bg-primary rounded-3xl text-white shadow-xl">
                    <p className="text-white/70 text-[10px] font-black uppercase tracking-widest">Dòng tiền chờ chi</p>
                    <p className="text-4xl font-black mt-2">1,240.5 trđ</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-bold text-slate-900">Yêu cầu hôm nay</span>
                      <span className="text-xs font-black text-primary">420.0 trđ</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                      <span className="text-xs font-bold text-slate-900">Yêu cầu tồn đọng</span>
                      <span className="text-xs font-black text-primary">820.5 trđ</span>
                    </div>
                  </div>
                </div>
              ))}
              className="col-span-12 md:col-span-4 bg-primary rounded-xl p-6 text-white shadow-xl flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-all"
            >
              <div>
                <p className="text-white/80 text-sm font-medium uppercase tracking-widest">TỔNG CHỜ DUYỆT</p>
                <p className="font-headline text-4xl font-extrabold mt-2">1,240.5 <span className="text-xl font-normal opacity-70">trđ</span></p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-sm bg-white/10 w-fit px-3 py-1 rounded-full">
                <TrendingUp size={14} />
                <span>+12% so với hôm qua</span>
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { label: 'Đã chi trong tháng', value: '842.0 trđ', icon: CheckCircle2, color: 'text-secondary bg-secondary/10', detail: 'Tổng số tiền đã được chuyển khoản thành công cho tài xế trong tháng này.' },
                { label: 'Bị từ chối', value: '15 yêu cầu', icon: X, color: 'text-tertiary bg-tertiary/10', detail: 'Các yêu cầu rút tiền không hợp lệ hoặc sai thông tin ngân hàng.' },
                { label: 'Đang chờ xử lý', value: '32 yêu cầu', icon: TrendingUp, color: 'text-primary bg-primary/10', border: 'border-l-4 border-primary', detail: 'Các yêu cầu mới phát sinh đang chờ bộ phận tài chính phê duyệt.' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  onClick={() => onAction(item.label, (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", item.color)}>
                          <item.icon size={24} />
                        </div>
                        <div>
                          <p className="font-black text-slate-900 text-lg">{item.label}</p>
                          <p className="text-2xl font-black text-primary">{item.value}</p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{item.detail}</p>
                    </div>
                  ))}
                  className={cn("bg-surface-container-low p-6 rounded-xl cursor-pointer hover:bg-surface-container-high transition-all", item.border)}
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-4", item.color)}>
                    <item.icon size={20} />
                  </div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">{item.label}</p>
                  <p className="font-headline text-2xl font-bold mt-1 text-on-surface">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-surface-container">
            <div className="p-4 bg-surface-container-low/50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                {['Tất cả', 'Chờ xử lý', 'Đã duyệt', 'Đã chi', 'Bị từ chối'].map((tab, i) => (
                  <button 
                    key={tab} 
                    className={cn(
                      "px-4 py-2 text-xs font-bold rounded-full transition-all",
                      i === 0 ? "bg-primary text-white" : "hover:bg-surface-variant text-on-surface-variant"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 text-xs font-bold text-on-surface-variant px-4 py-2 rounded-lg hover:bg-surface-variant">
                  <Calendar size={14} />
                  7 ngày qua
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-on-surface-variant px-4 py-2 rounded-lg hover:bg-surface-variant border border-outline-variant/30">
                  <Search size={14} />
                  Lọc nâng cao
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-surface-container-low/30">
                    <th className="px-6 py-4">Tài xế</th>
                    <th className="px-6 py-4">Số tiền yêu cầu</th>
                    <th className="px-6 py-4">Số dư khả dụng</th>
                    <th className="px-6 py-4">Thông tin ngân hàng</th>
                    <th className="px-6 py-4">Ngày yêu cầu</th>
                    <th className="px-6 py-4">Trạng thái</th>
                    <th className="px-6 py-4 text-right">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  {WITHDRAWAL_REQUESTS.map((req) => (
                    <tr 
                      key={req.id} 
                      onClick={() => onAction('Chi tiết yêu cầu rút tiền', (
                        <div className="space-y-6">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary font-black text-lg">
                                {req.driverName.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <p className="text-lg font-black text-slate-900">{req.driverName}</p>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Mã đối tác: {req.driverId}</p>
                              </div>
                            </div>
                            <span className={cn(
                              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                              req.status === 'pending' ? "bg-primary-fixed text-primary" :
                              req.status === 'approved' ? "bg-secondary-container text-on-secondary-container" :
                              req.status === 'paid' ? "bg-surface-container-high text-on-surface-variant" : "bg-tertiary-container text-on-tertiary-container"
                            )}>
                              {req.status === 'pending' ? 'Chờ xử lý' : req.status === 'approved' ? 'Đã duyệt' : req.status === 'paid' ? 'Đã chi' : 'Bị từ chối'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Số tiền yêu cầu</p>
                              <p className="text-xl font-black text-primary">{req.amount.toLocaleString()} VNĐ</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Số dư khả dụng</p>
                              <p className="text-xl font-black text-slate-900">{req.available.toLocaleString()} VNĐ</p>
                            </div>
                          </div>

                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Thông tin ngân hàng</p>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-slate-900">Ngân hàng</span>
                              <span className="text-sm font-medium text-slate-600">{req.bank}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-bold text-slate-900">Số tài khoản</span>
                              <span className="text-sm font-medium text-slate-600">{req.account}</span>
                            </div>
                          </div>

                          <div className="text-[10px] text-slate-400 italic text-center">
                            Yêu cầu được tạo vào lúc {req.date} • IP: 113.161.x.x
                          </div>
                        </div>
                      ))}
                      className={cn("hover:bg-surface-container-low/20 transition-colors cursor-pointer", req.status === 'approved' && "bg-secondary-container/5")}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs">
                            {req.driverName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{req.driverName}</p>
                            <p className="text-xs text-on-surface-variant">ID: {req.driverId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-bold text-primary tracking-tight">{req.amount.toLocaleString()} VNĐ</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className={cn("text-sm", req.available < req.amount ? "text-tertiary font-bold" : "text-on-surface-variant")}>
                          {req.available.toLocaleString()} VNĐ
                        </p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-xs">
                          <p className="font-semibold">{req.bank}</p>
                          <p className="text-on-surface-variant mt-0.5">{req.account}</p>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-sm text-on-surface-variant">{req.date}</td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                          req.status === 'pending' ? "bg-primary-fixed text-primary" :
                          req.status === 'approved' ? "bg-secondary-container text-on-secondary-container" :
                          req.status === 'paid' ? "bg-surface-container-high text-on-surface-variant" : "bg-tertiary-container text-on-tertiary-container"
                        )}>
                          {req.status === 'pending' ? 'Chờ xử lý' : req.status === 'approved' ? 'Đã duyệt' : req.status === 'paid' ? 'Đã chi' : 'Bị từ chối'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        {req.status === 'pending' && (
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => onAction('Phê duyệt rút tiền', (
                                <div className="space-y-6">
                                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
                                    <CheckCircle2 className="text-emerald-600" size={32} />
                                    <div>
                                      <p className="font-bold text-emerald-900">Xác nhận phê duyệt?</p>
                                      <p className="text-xs text-emerald-600">Số tiền: {req.amount.toLocaleString()} VNĐ</p>
                                    </div>
                                  </div>
                                  <div className="space-y-3">
                                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Thông tin thụ hưởng</p>
                                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                      <p className="text-sm font-bold text-slate-900">{req.driverName}</p>
                                      <p className="text-xs text-slate-500">{req.bank} • {req.account}</p>
                                    </div>
                                  </div>
                                  <button className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-100">Phê duyệt & Chuyển sang "Đã duyệt"</button>
                                </div>
                              ))}
                              className="p-1.5 hover:bg-secondary-container/20 text-secondary rounded-lg transition-colors"
                            >
                              <CheckCircle2 size={18} />
                            </button>
                            <button 
                              onClick={() => onAction('Từ chối rút tiền', (
                                <div className="space-y-6">
                                  <div className="p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-4">
                                    <X className="text-red-600" size={32} />
                                    <div>
                                      <p className="font-bold text-red-900">Từ chối yêu cầu?</p>
                                      <p className="text-xs text-red-600">Tài xế: {req.driverName}</p>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Lý do từ chối</label>
                                    <select className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm outline-none">
                                      <option>Sai thông tin ngân hàng</option>
                                      <option>Số dư khả dụng không đủ</option>
                                      <option>Tài khoản đang bị khóa</option>
                                      <option>Lý do khác</option>
                                    </select>
                                  </div>
                                  <button className="w-full py-4 bg-tertiary text-white font-black rounded-2xl shadow-xl shadow-tertiary/20">Xác nhận từ chối</button>
                                </div>
                              ))}
                              className="p-1.5 hover:bg-tertiary-container/20 text-tertiary rounded-lg transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        )}
                        {req.status === 'approved' && (
                          <button 
                            onClick={() => onAction('Xác nhận đã chi', (
                              <div className="space-y-6">
                                <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
                                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full"></div>
                                  <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">Lệnh chuyển tiền</p>
                                  <p className="text-3xl font-black mt-2">{req.amount.toLocaleString()} đ</p>
                                  <div className="mt-8 pt-6 border-t border-white/10 space-y-2">
                                    <p className="text-xs font-bold">{req.driverName}</p>
                                    <p className="text-[10px] text-white/50">{req.bank} • {req.account}</p>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-500 italic text-center">Vui lòng chỉ xác nhận sau khi đã thực hiện chuyển khoản thành công trên ứng dụng ngân hàng hoặc MISA.</p>
                                <button className="w-full py-4 primary-gradient text-white font-black rounded-2xl shadow-xl shadow-primary/20">Xác nhận Đã chi</button>
                              </div>
                            ))}
                            className="bg-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 ml-auto hover:shadow-lg transition-all active:scale-[0.98]"
                          >
                            <Receipt size={14} />
                            Xác nhận đã chi
                          </button>
                        )}
                        {req.status === 'paid' && <div className="text-[10px] text-on-surface-variant italic font-medium">#FT29148821</div>}
                        {req.status === 'rejected' && <p className="text-[10px] text-tertiary font-medium">{req.reason}</p>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : activeTab === 'reconcile' ? (
        <>
          <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Doanh thu gộp', value: '1,245,600,000 VNĐ', sub: '+12.4% so với tuần trước', icon: Wallet, color: 'text-primary' },
              { label: 'Phí nền tảng XanhSM', value: '186,840,000 VNĐ', sub: 'Cố định 15% doanh thu gộp', icon: TrendingUp, color: 'text-tertiary' },
              { label: 'Phí HTX (3%)', value: '37,368,000 VNĐ', sub: 'Phí quản lý vận hành HTX', icon: Database, color: 'text-primary-container' },
              { label: 'Thu nhập ròng tài xế', value: '1,021,392,000 VNĐ', sub: 'Sẵn sàng quyết toán', icon: CheckCircle2, color: 'text-secondary', variant: 'highlight' },
            ].map((item, i) => (
              <div key={i} className={cn(
                "p-6 rounded-xl flex flex-col justify-between min-h-[160px] border border-slate-100 shadow-sm relative overflow-hidden",
                item.variant === 'highlight' ? "bg-secondary-container/20" : "bg-surface-container-lowest"
              )}>
                <div className="flex justify-between items-start">
                  <p className={cn("text-xs font-bold uppercase tracking-wider", item.variant === 'highlight' ? "text-on-secondary-container" : "text-slate-400")}>
                    {item.label}
                  </p>
                  <item.icon size={20} className={item.color} />
                </div>
                <div>
                  <h3 className={cn("text-2xl font-extrabold font-headline", item.variant === 'highlight' ? "text-on-secondary-container" : "text-on-surface")}>
                    {item.value.split(' ')[0]} <span className="text-sm font-medium opacity-60">VNĐ</span>
                  </h3>
                  <p className={cn("text-[10px] font-bold mt-1", item.variant === 'highlight' ? "text-on-secondary-container" : "text-slate-400")}>
                    {item.sub}
                  </p>
                </div>
                {item.variant === 'highlight' && (
                  <div className="absolute -right-4 -bottom-4 opacity-5">
                    <ShieldCheck size={120} />
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="bg-surface-container-low rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/50 border-b border-slate-100">
              <div className="flex gap-4">
                <button className="bg-surface-container-lowest text-on-surface border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-container-high transition-colors">
                  <Lock size={14} /> Khóa sổ dữ liệu
                </button>
                <button className="bg-surface-container-lowest text-on-surface border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-container-high transition-colors">
                  <FileText size={14} /> Kết xuất MISA
                </button>
              </div>
              <div className="flex gap-2">
                <div className="bg-white px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-2 text-xs font-medium text-slate-500 cursor-pointer hover:border-primary/30 transition-colors">
                  Lọc theo trạng thái: <span className="text-on-surface font-bold">Tất cả</span>
                  <ChevronRight size={14} className="rotate-90" />
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-high/50 text-slate-500">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest">Tài xế / Mã định danh</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Tổng chuyến</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Doanh thu gộp</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Phí hệ thống</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-right">Thu nhập ròng</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-center">Trạng thái</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    { name: 'Nguyễn Lâm Nhật', id: 'SACO-TX-9921', trips: 42, gross: 12450000, fee: 2241000, net: 10209000, status: 'valid' },
                    { name: 'Trần Hoàng Anh', id: 'SACO-TX-8842', trips: 38, gross: 10120000, fee: 1821600, net: 8298400, status: 'valid' },
                    { name: 'Phạm Văn Đồng', id: 'SACO-TX-7731', trips: 51, gross: 15600000, fee: 2808000, net: 12792000, status: 'check' },
                    { name: 'Lê Minh Tuấn', id: 'SACO-TX-6622', trips: 29, gross: 8900000, fee: 1602000, net: 7298000, status: 'valid' },
                  ].map((row, i) => (
                    <tr 
                      key={i} 
                      onClick={() => onAction('Chi tiết đối soát tuần', (
                        <div className="space-y-6">
                          <div className="flex items-center gap-4 p-4 bg-slate-900 rounded-3xl text-white">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-black text-lg">
                              {row.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="text-lg font-black">{row.name}</p>
                              <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">{row.id}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Tổng chuyến đi</p>
                              <p className="text-xl font-black text-slate-900">{row.trips} chuyến</p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Doanh thu gộp</p>
                              <p className="text-xl font-black text-slate-900">{row.gross.toLocaleString()} đ</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Phân bổ thu nhập</p>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-bold text-slate-900">Phí hệ thống (15%)</span>
                                <span className="text-sm font-black text-tertiary">-{row.fee.toLocaleString()} đ</span>
                              </div>
                              <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                                <span className="text-sm font-black text-slate-900">Thu nhập ròng</span>
                                <span className="text-sm font-black text-secondary">{row.net.toLocaleString()} đ</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                            <CheckCircle2 className="text-emerald-600" size={20} />
                            <p className="text-xs font-bold text-emerald-900">Dữ liệu đã được đối soát và khớp với hệ thống XanhSM.</p>
                          </div>
                        </div>
                      ))}
                      className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary font-bold text-xs">
                            {row.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">{row.name}</p>
                            <p className="text-[10px] text-slate-400">{row.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-medium text-sm text-on-surface">{row.trips}</td>
                      <td className="px-6 py-5 text-right font-medium text-sm text-on-surface">{row.gross.toLocaleString()}</td>
                      <td className="px-6 py-5 text-right font-medium text-sm text-tertiary">{row.fee.toLocaleString()}</td>
                      <td className="px-6 py-5 text-right font-bold text-sm text-secondary">{row.net.toLocaleString()}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-tight",
                          row.status === 'valid' ? "bg-secondary-container text-on-secondary-container" : "bg-tertiary-container text-on-tertiary-container"
                        )}>
                          {row.status === 'valid' ? 'Hợp lệ' : 'Cần kiểm tra'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-slate-300 group-hover:text-primary transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Doanh Thu Bán Xe</p>
                <h3 className="text-4xl font-extrabold text-primary">
                  {(CAR_SALES.reduce((acc, curr) => acc + curr.price, 0) / 1000000000).toFixed(1)}B
                </h3>
              </div>
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <TrendingUp size={32} />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Xe Đã Bàn Giao</p>
                <h3 className="text-4xl font-extrabold text-secondary">
                  {CAR_SALES.filter(s => s.status === 'delivered').length}
                </h3>
              </div>
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                <CheckCircle2 size={32} />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Hoa Hồng Phải Chi</p>
                <h3 className="text-4xl font-extrabold text-tertiary">
                  {(CAR_SALES.reduce((acc, curr) => acc + curr.commission, 0) / 1000000).toFixed(1)}M
                </h3>
              </div>
              <div className="w-16 h-16 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
                <DollarSign size={32} />
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-surface-container-low text-slate-400 text-[11px] font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Khách Hàng</th>
                    <th className="px-6 py-4">Mẫu Xe</th>
                    <th className="px-6 py-4">Đối Tác Sales</th>
                    <th className="px-6 py-4 text-right">Giá Trị (VNĐ)</th>
                    <th className="px-6 py-4 text-right">Hoa Hồng (VNĐ)</th>
                    <th className="px-6 py-4 text-center">Trạng Thái</th>
                    <th className="px-6 py-4 text-center">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  {CAR_SALES.map((sale) => (
                    <tr key={sale.id} className="hover:bg-surface-container-low/50 transition-colors">
                      <td className="px-6 py-5">
                        <p className="font-bold text-on-surface">{sale.customerName}</p>
                        <p className="text-[10px] text-slate-400">Hợp đồng: {sale.id}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium">{sale.model}</p>
                        <p className="text-[10px] text-slate-400">VIN: {sale.vin}</p>
                      </td>
                      <td className="px-6 py-5 text-sm font-medium">{sale.partnerName}</td>
                      <td className="px-6 py-5 text-right font-bold">{sale.price.toLocaleString()}</td>
                      <td className="px-6 py-5 text-right font-bold text-primary">{sale.commission.toLocaleString()}</td>
                      <td className="px-6 py-5 text-center">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-tight",
                          sale.status === 'delivered' ? "bg-secondary-container text-on-secondary-container" : "bg-primary-fixed text-primary"
                        )}>
                          {sale.status === 'delivered' ? 'Đã bàn giao' : 'Đang xử lý'}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button 
                          onClick={() => onAction('Chi tiết hợp đồng bán xe', (
                            <div className="space-y-6">
                              <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white">
                                <p className="text-white/50 text-[10px] font-black uppercase tracking-widest">Hợp đồng bán xe</p>
                                <p className="text-2xl font-black mt-2">{sale.customerName}</p>
                                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                  <div>
                                    <p className="text-[10px] text-white/50 uppercase font-bold">Mẫu xe</p>
                                    <p className="text-sm font-bold">{sale.model}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-white/50 uppercase font-bold">Số VIN</p>
                                    <p className="text-sm font-bold">{sale.vin}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Giá trị xe</p>
                                  <p className="text-xl font-black text-slate-900">{sale.price.toLocaleString()} đ</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Hoa hồng sales</p>
                                  <p className="text-xl font-black text-primary">{sale.commission.toLocaleString()} đ</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <Users className="text-primary" size={20} />
                                <div>
                                  <p className="text-xs font-bold text-slate-900">Đối tác: {sale.partnerName}</p>
                                  <p className="text-[10px] text-slate-400">Ngày bán: {sale.date}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </motion.div>
  );
};


const SettingsView: React.FC<{ onAction: (title: string, content: React.ReactNode) => void }> = ({ onAction }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-10"
    >
      <section className="flex justify-between items-center">
        <h2 className="font-headline text-2xl font-bold text-sky-900">Cấu hình hệ thống</h2>
      </section>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600">
                <Calendar size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-sky-900">Cấu hình Đối soát</h3>
                <p className="text-xs text-slate-400 font-medium">Thiết lập thời gian chốt dữ liệu tài chính</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div 
                onClick={() => onAction('Chu kỳ đối soát', (
                  <div className="space-y-6">
                    <p className="text-sm text-slate-500">Thiết lập ngày bắt đầu và kết thúc chu kỳ tính toán doanh thu:</p>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase">Ngày bắt đầu</span>
                        <span className="text-sm font-black text-sky-600">Thứ 4 hàng tuần</span>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase">Ngày kết thúc</span>
                        <span className="text-sm font-black text-sky-600">Thứ 3 tuần sau</span>
                      </div>
                    </div>
                  </div>
                ))}
                className="cursor-pointer group"
              >
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 group-hover:text-primary transition-colors">Chu kỳ đối soát tuần</label>
                <div className="flex items-center justify-between bg-slate-50/50 p-4 rounded-2xl border border-slate-100 group-hover:border-primary/30 transition-all">
                  <span className="text-sm font-bold text-sky-900">Thứ 4</span>
                  <ArrowRight size={16} className="text-slate-300" />
                  <span className="text-sm font-bold text-sky-600">Thứ 3</span>
                </div>
                <p className="mt-3 text-[11px] text-slate-400 italic leading-relaxed">Hệ thống tự động chốt dữ liệu vào cuối ngày Thứ 3 hàng tuần.</p>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Hạn chốt sổ (Deadline)</label>
                <div className="relative">
                  <input className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-sky-900 focus:ring-2 focus:ring-sky-100 focus:border-sky-200 outline-none" type="text" defaultValue="17:00 Thứ 5" />
                  <TrendingUp size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <Wallet size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-sky-900">Quản lý biểu phí dịch vụ</h3>
                <p className="text-xs text-slate-400 font-medium">Điều chỉnh % phí hoa hồng hệ thống</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: 'Phí HTX', value: 15, desc: 'Áp dụng cho tất cả chuyến xe thuộc các hợp tác xã liên kết.' },
                { label: 'Phí nền tảng', value: 5, desc: 'Phí duy trì hạ tầng SACO và dịch vụ hỗ trợ tài xế.' },
              ].map((fee, i) => (
                <div 
                  key={i} 
                  onClick={() => onAction('Điều chỉnh ' + fee.label, (
                    <div className="space-y-6">
                      <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                        <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">Biểu phí hiện tại</p>
                        <p className="text-4xl font-black text-emerald-900 mt-2">{fee.value}%</p>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phần trăm mới (%)</label>
                        <input type="number" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-2xl font-black text-sky-900 outline-none focus:ring-2 focus:ring-emerald-100" defaultValue={fee.value} />
                        <p className="text-xs text-slate-500 italic leading-relaxed">Lưu ý: Thay đổi biểu phí sẽ áp dụng cho tất cả các chuyến xe phát sinh sau thời điểm lưu cấu hình.</p>
                      </div>
                      <button className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-100">Lưu thay đổi biểu phí</button>
                    </div>
                  ))}
                  className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-emerald-200 transition-colors group cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm font-bold text-sky-900">{fee.label}</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold tracking-tight uppercase">Đang áp dụng</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-sky-900">{fee.value}</span>
                    <span className="text-2xl font-bold text-slate-300">%</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-4 leading-relaxed font-medium">{fee.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-12 lg:col-span-5">
          <section className="bg-white rounded-3xl h-full shadow-sm border border-slate-100 overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-50 bg-slate-50/30">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-sky-900">Danh mục Pháp nhân</h3>
                  <p className="text-xs text-slate-400 font-medium">Danh sách các đơn vị trong hệ sinh thái</p>
                </div>
                <button className="bg-sky-600 text-white text-[11px] font-bold px-5 py-2.5 rounded-xl hover:bg-sky-700 transition-colors shadow-lg shadow-sky-100 uppercase tracking-wider">Thêm mới</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <table className="w-full text-left">
                <thead className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-50">
                  <tr>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">Tên pháp nhân</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] text-right">Loại hình</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { name: 'Holdings Saco', id: '0312456789', type: 'Công ty mẹ', badge: true },
                    { name: 'Vận tải Saco', id: '0312456790', type: 'Đơn vị vận hành' },
                    { name: 'HTX Toàn Cầu', id: '0312456791', type: 'Thành viên' },
                    { name: 'HTX Sài Gòn', id: '-', type: 'Thành viên' },
                    { name: 'HTX Bình Dương', id: '-', type: 'Thành viên' },
                  ].map((entity, i) => (
                    <tr key={i} className="hover:bg-sky-50/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="font-bold text-sm text-sky-900 group-hover:text-sky-700">{entity.name}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">MST: {entity.id}</div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        {entity.badge ? (
                          <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-sky-100 text-sky-700 uppercase">{entity.type}</span>
                        ) : (
                          <span className="text-xs font-semibold text-slate-400">{entity.type}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Lock size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-sky-900">Ma trận phân quyền</h3>
            <p className="text-xs text-slate-400 font-medium">Thiết lập quyền truy cập cho các vai trò hệ thống</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="py-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quyền hạn / Chức năng</th>
                {INITIAL_ROLES.map(role => (
                  <th key={role.id} className="py-4 px-4 text-center">
                    <div className="text-[10px] font-black text-sky-900 uppercase tracking-widest">{role.name}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PERMISSIONS.map(permission => (
                <tr key={permission.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-4">
                    <div className="text-sm font-bold text-sky-900">{permission.label}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{permission.module}</div>
                  </td>
                  {INITIAL_ROLES.map(role => (
                    <td key={role.id} className="py-4 px-4 text-center">
                      <div className="flex justify-center">
                        <button 
                          className={cn(
                            "w-6 h-6 rounded-md flex items-center justify-center transition-all",
                            role.permissions.includes(permission.id) 
                              ? "bg-emerald-500 text-white shadow-sm" 
                              : "bg-slate-100 text-slate-300 hover:bg-slate-200"
                          )}
                        >
                          {role.permissions.includes(permission.id) ? <Verified size={14} /> : <Lock size={12} />}
                        </button>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-3xl p-10 shadow-sm border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-sky-50/50 to-transparent -mr-40 -mt-40 rounded-full"></div>
        <div className="relative z-10 max-w-5xl">
          <div className="flex items-center gap-5 mb-12">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
              <Mail size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-sky-900 tracking-tight">Thiết lập thông báo tự động</h3>
              <p className="text-sm text-slate-400 font-medium">Cấu hình luồng email phản hồi tự động cho đối tác tài xế</p>
            </div>
          </div>
          
          <div className="space-y-12">
            {[
              { 
                case: '01', 
                title: 'Tài xế bị khóa tài khoản', 
                desc: 'Kích hoạt khi hệ thống phát hiện vi phạm quy tắc an toàn hoặc nợ quá hạn chốt sổ.',
                template: 'LOCK_APP_NOTIFICATION',
                content: 'Chào Quý đối tác, Tài khoản của bạn đã tạm thời bị khóa do vi phạm chính sách của SACO Enterprise... Vui lòng liên hệ tổng đài để được hỗ trợ mở khóa và hướng dẫn chi tiết.'
              },
              { 
                case: '02', 
                title: 'Từ chối hồ sơ đăng ký', 
                desc: 'Gửi phản hồi khi hồ sơ không đạt yêu cầu về chứng từ hoặc kinh nghiệm vận tải.',
                template: 'REJECT_DOC_REASON',
                content: 'Rất tiếc, hồ sơ của bạn không đủ điều kiện xét duyệt tham gia đội ngũ đối tác SACO. Lý do: [Lý do từ chối]. Quý đối tác vui lòng cập nhật lại hồ sơ đúng chuẩn sau 30 ngày.'
              }
            ].map((item) => (
              <div key={item.case} className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
                <div className="md:col-span-4">
                  <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] block mb-3">Trường hợp {item.case}</span>
                  <h4 className="text-lg font-bold text-sky-900 mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
                <div className="md:col-span-8 space-y-4">
                  <div className="flex items-center justify-between px-6 py-3 bg-slate-50/80 rounded-t-2xl border-x border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mẫu: <span className="text-sky-600">{item.template}</span></span>
                    <div className="w-11 h-6 bg-sky-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <textarea 
                    className="w-full bg-white border border-slate-100 rounded-b-2xl p-6 text-sm text-slate-600 font-medium min-h-[140px] focus:ring-2 focus:ring-sky-50 focus:border-sky-200 outline-none leading-relaxed shadow-inner"
                    defaultValue={item.content}
                  />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 pt-10 border-t border-slate-50 flex justify-end items-center gap-6">
            <button className="px-8 py-3 rounded-2xl text-sm font-bold text-slate-400 hover:text-sky-900 hover:bg-slate-50 transition-all">Hủy thay đổi</button>
            <button className="px-10 py-3.5 rounded-2xl text-sm font-bold text-white bg-sky-600 shadow-xl shadow-sky-100 hover:bg-sky-700 hover:-translate-y-0.5 transition-all">Lưu cấu hình hệ thống</button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [activePage, setActivePage] = React.useState<Page>('dashboard');
  const [modal, setModal] = React.useState<{ isOpen: boolean, title: string, content: React.ReactNode }>({
    isOpen: false,
    title: '',
    content: null
  });

  const openModal = (title: string, content: React.ReactNode) => {
    setModal({ isOpen: true, title, content });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Immersive Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-sky-600/10 blur-[160px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-orange-500/5 blur-[160px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 w-full max-w-lg text-center"
        >
          <div className="flex justify-center mb-12">
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 12 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="w-24 h-24 bg-sky-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(2,132,199,0.3)]"
            >
              <ShieldCheck size={56} className="text-white -rotate-12" />
            </motion.div>
          </div>
          
          <h1 className="font-headline text-7xl font-black tracking-tighter mb-6 leading-none">
            SACO <span className="text-sky-500">SENTINEL</span>
          </h1>
          <p className="text-slate-400 text-xl mb-16 font-medium leading-relaxed max-w-md mx-auto">
            Hệ thống quản trị vận hành & tài chính tập trung cho đối tác chiến lược SACO Holdings.
          </p>

          <div className="space-y-6">
            <button 
              onClick={() => { console.log('Login clicked'); setIsLoggedIn(true); }}
              className="w-full bg-white text-black font-black text-lg py-5 rounded-3xl hover:bg-sky-500 hover:text-white transition-all transform active:scale-[0.98] shadow-2xl flex items-center justify-center gap-4 group overflow-hidden relative"
            >
              <span className="relative z-10">Bắt đầu trải nghiệm Demo</span>
              <ChevronRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <div className="flex items-center justify-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">
              <span className="w-8 h-[1px] bg-slate-800"></span>
              <span>Phiên bản Showcase v1.0.5</span>
              <span className="w-8 h-[1px] bg-slate-800"></span>
            </div>
          </div>
        </motion.div>

        <div className="absolute bottom-12 left-0 right-0 flex justify-center gap-12 text-[11px] font-black text-slate-700 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
            <span>Live System</span>
          </div>
          <span>•</span>
          <span>ISO 27001 Certified</span>
          <span>•</span>
          <span>MISA Integrated</span>
        </div>

        <div className="absolute bottom-4 right-4 text-[10px] font-black text-slate-800 uppercase tracking-widest">
          Copyright by thaoyin
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface selection-primary">
      <Sidebar activePage={activePage} onPageChange={setActivePage} onLogout={() => setIsLoggedIn(false)} onAction={openModal} />
      
      <main className="ml-64 min-h-screen relative">
        <TopBar title={activePage} onAction={openModal} />
        
        <div className="pt-24 pb-12 px-8">
          <AnimatePresence mode="wait">
            {activePage === 'dashboard' && <DashboardView key="dashboard" onAction={openModal} />}
            {activePage === 'drivers' && <DriverManagementView key="drivers" onAction={openModal} />}
            {activePage === 'finance' && <FinanceView key="finance" onAction={openModal} />}
            {activePage === 'settings' && <SettingsView key="settings" onAction={openModal} />}
          </AnimatePresence>
        </div>

        <div className="fixed bottom-4 right-4 text-[10px] font-black text-slate-300 uppercase tracking-widest pointer-events-none z-50">
          Copyright by thaoyin
        </div>
      </main>
      
      {/* Contextual FAB */}
      <button 
        onClick={() => {
          if (activePage === 'settings') {
            openModal('Lưu cấu hình', (
              <div className="space-y-6">
                <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center gap-6">
                  <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <Save size={32} />
                  </div>
                  <div>
                    <p className="text-xl font-black text-emerald-900">Xác nhận lưu?</p>
                    <p className="text-sm text-emerald-600">Các thay đổi sẽ có hiệu lực ngay lập tức.</p>
                  </div>
                </div>
                <button className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-100">Lưu thay đổi</button>
              </div>
            ));
          } else {
            openModal('Thao tác nhanh', (
              <div className="grid grid-cols-2 gap-4">
                <button className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-primary hover:text-white transition-all group text-left">
                  <UserPlus className="text-primary group-hover:text-white mb-3" size={32} />
                  <p className="font-black text-sm">Thêm tài xế</p>
                  <p className="text-[10px] opacity-60">Đăng ký đối tác mới</p>
                </button>
                <button className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-secondary hover:text-white transition-all group text-left">
                  <DollarSign className="text-secondary group-hover:text-white mb-3" size={32} />
                  <p className="font-black text-sm">Nạp tiền ví</p>
                  <p className="text-[10px] opacity-60">Nạp tiền cho đối tác</p>
                </button>
                <button className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-tertiary hover:text-white transition-all group text-left">
                  <FileText className="text-tertiary group-hover:text-white mb-3" size={32} />
                  <p className="font-black text-sm">Tạo báo cáo</p>
                  <p className="text-[10px] opacity-60">Xuất dữ liệu tùy chỉnh</p>
                </button>
                <button className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-sky-500 hover:text-white transition-all group text-left">
                  <Bell className="text-sky-500 group-hover:text-white mb-3" size={32} />
                  <p className="font-black text-sm">Gửi thông báo</p>
                  <p className="text-[10px] opacity-60">Thông báo cho toàn đội</p>
                </button>
              </div>
            ));
          }
        }}
        className="fixed bottom-8 right-8 w-14 h-14 primary-gradient text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        {activePage === 'settings' ? <Save size={24} /> : <Plus size={24} />}
      </button>

      <AnimatePresence>
        {modal.isOpen && (
          <Modal 
            isOpen={modal.isOpen} 
            onClose={() => setModal({ ...modal, isOpen: false })} 
            title={modal.title}
          >
            {modal.content}
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
