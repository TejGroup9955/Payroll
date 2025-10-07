import { DashboardStats } from './types';

export const dashboardStats: DashboardStats = {
  total_employees: 245,
  active_employees: 238,
  pending_approvals: 12,
  salary_processed: 2340000,
  attendance_today: {
    present: 215,
    absent: 8,
    late: 15,
    leave: 7,
  },
};

export const salaryByDepartment = [
  { department: 'Engineering', amount: 850000 },
  { department: 'Sales', amount: 620000 },
  { department: 'Marketing', amount: 420000 },
  { department: 'HR', amount: 280000 },
  { department: 'Finance', amount: 170000 },
];

export const leaveTypeBreakdown = [
  { name: 'Casual Leave', value: 45, fill: '#14b8a6' },
  { name: 'Sick Leave', value: 28, fill: '#3b82f6' },
  { name: 'Paid Leave', value: 62, fill: '#8b5cf6' },
  { name: 'Comp Off', value: 18, fill: '#f59e0b' },
];

export const monthlyPayrollTrend = [
  { month: 'Jan', amount: 2150000 },
  { month: 'Feb', amount: 2200000 },
  { month: 'Mar', amount: 2280000 },
  { month: 'Apr', amount: 2320000 },
  { month: 'May', amount: 2340000 },
  { month: 'Jun', amount: 2380000 },
];

export const upcomingBirthdays = [
  { id: '1', name: 'John Doe', department: 'Engineering', date: '2025-10-12', avatar: '' },
  { id: '2', name: 'Jane Smith', department: 'Sales', date: '2025-10-15', avatar: '' },
  { id: '3', name: 'Mike Johnson', department: 'Marketing', date: '2025-10-18', avatar: '' },
  { id: '4', name: 'Sarah Williams', department: 'HR', date: '2025-10-20', avatar: '' },
];

export const recentActivity = [
  { id: '1', action: 'Salary processed', user: 'Admin', time: '2 hours ago', type: 'success' },
  { id: '2', action: 'Leave approved', user: 'HR Manager', time: '3 hours ago', type: 'info' },
  { id: '3', action: 'New employee added', user: 'Admin', time: '5 hours ago', type: 'success' },
  { id: '4', action: 'Attendance marked', user: 'System', time: '6 hours ago', type: 'info' },
  { id: '5', action: 'Report generated', user: 'Account', time: '1 day ago', type: 'success' },
];
