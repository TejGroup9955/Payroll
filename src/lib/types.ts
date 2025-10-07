export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'HR' | 'HOD' | 'User' | 'Account';
  avatar?: string;
  company_id: string;
  department_id?: string;
}

export interface Employee {
  id: string;
  employee_id: string;
  name: string;
  email: string;
  mobile: string;
  designation: string;
  department: string;
  date_of_join: string;
  salary: number;
  status: 'active' | 'inactive';
  avatar?: string;
}

export interface Attendance {
  id: string;
  employee_id: string;
  date: string;
  in_time: string;
  out_time: string;
  status: 'present' | 'absent' | 'late' | 'half_day' | 'leave';
  working_hours: number;
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  employee_name: string;
  leave_type: string;
  from_date: string;
  to_date: string;
  total_days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  applied_date: string;
}

export interface Salary {
  id: string;
  employee_id: string;
  month: string;
  year: number;
  basic: number;
  hra: number;
  allowances: number;
  gross_salary: number;
  deductions: number;
  net_salary: number;
  status: 'pending' | 'processed' | 'paid';
}

export interface DashboardStats {
  total_employees: number;
  active_employees: number;
  pending_approvals: number;
  salary_processed: number;
  attendance_today: {
    present: number;
    absent: number;
    late: number;
    leave: number;
  };
}
