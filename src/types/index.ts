export interface User {
  user_id: number;
  email: string;
  password_hash: string;
  role_id: number;
  emp_id?: number;
  company_id?: number;
  created_at: string;
  status: 'active' | 'inactive';
}

export interface Role {
  role_id: number;
  name: string;
  permissions: Permissions;
}

export interface Permissions {
  employee?: ModulePermission;
  payroll?: ModulePermission;
  attendance?: ModulePermission;
  leave?: ModulePermission;
  document?: ModulePermission;
  reporting?: ModulePermission;
  kra?: ModulePermission;
  user_management?: ModulePermission;
  company?: ModulePermission;
  expense?: ModulePermission;
  task?: ModulePermission;
  crm?: ModulePermission;
  asset?: ModulePermission;
}

export interface ModulePermission {
  view: boolean;
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
  approve?: boolean;
  export?: boolean;
}

export interface Employee {
  emp_id: number;
  name: string;
  email: string;
  phone: string;
  company_id: number;
  dept_id: number;
  designation_id: number;
  date_of_joining: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  pan_number: string;
  aadhar_number: string;
  bank_account: string;
  ifsc_code: string;
  salary_components: SalaryComponents;
  status: 'active' | 'inactive' | 'terminated';
  profile_image?: string;
}

export interface SalaryComponents {
  basic: number;
  hra: number;
  da?: number;
  conveyance?: number;
  medical?: number;
  special_allowance?: number;
}

export interface Salary {
  salary_id: number;
  emp_id: number;
  month: string;
  year: number;
  gross_salary: number;
  deductions: Deductions;
  net_salary: number;
  payment_status: 'pending' | 'processed' | 'paid';
  payment_date?: string;
}

export interface Deductions {
  pf: number;
  esi: number;
  tax: number;
  other?: number;
}

export interface AttendanceLog {
  log_id: number;
  emp_id: number;
  date: string;
  in_time: string;
  out_time: string;
  total_hours: number;
  status: 'present' | 'absent' | 'half_day' | 'leave';
  remarks?: string;
}

export interface AttendanceRequest {
  request_id: number;
  emp_id: number;
  date: string;
  requested_in_time: string;
  requested_out_time: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: number;
  approved_at?: string;
}

export interface LeaveRequest {
  leave_id: number;
  emp_id: number;
  leave_type_id: number;
  start_date: string;
  end_date: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  approved_by?: number;
  approved_at?: string;
}

export interface LeaveType {
  leave_type_id: number;
  name: string;
  days_per_year: number;
  is_paid: boolean;
}

export interface LeaveBalance {
  emp_id: number;
  leave_type_id: number;
  total_days: number;
  used_days: number;
  remaining_days: number;
}

export interface Document {
  doc_id: number;
  emp_id: number;
  doc_type_id: number;
  file_name: string;
  s3_path: string;
  uploaded_by: number;
  uploaded_at: string;
  status: 'active' | 'archived';
}

export interface DocumentType {
  doc_type_id: number;
  name: string;
  description: string;
  is_mandatory: boolean;
}

export interface KRA {
  kra_id: number;
  emp_id: number;
  quarter: string;
  year: number;
  goals: Goal[];
  status: 'draft' | 'submitted' | 'approved' | 'locked';
  approved_by?: number;
  approved_at?: string;
}

export interface Goal {
  goal_id: number;
  description: string;
  target: string;
  achievement: string;
  score?: number;
}

export interface Company {
  company_id: number;
  name: string;
  address: string;
  contact_email: string;
  contact_phone: string;
  pan_number: string;
  tan_number: string;
  pf_number: string;
  esi_number: string;
  status: 'active' | 'inactive';
}

export interface Department {
  dept_id: number;
  company_id: number;
  name: string;
  hod_id?: number;
  status: 'active' | 'inactive';
}

export interface Designation {
  designation_id: number;
  company_id: number;
  name: string;
  level: number;
  status: 'active' | 'inactive';
}

export interface Expense {
  expense_id: number;
  emp_id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
  receipt_path?: string;
  status: 'pending' | 'approved' | 'rejected' | 'reimbursed';
  approved_by?: number;
}

export interface Task {
  task_id: number;
  title: string;
  description: string;
  assigned_to: number;
  assigned_by: number;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
}

export interface CRMLead {
  lead_id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  assigned_to: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  created_at: string;
}

export interface Asset {
  asset_id: number;
  name: string;
  category: string;
  serial_number: string;
  assigned_to?: number;
  purchase_date: string;
  warranty_expiry?: string;
  status: 'available' | 'assigned' | 'maintenance' | 'disposed';
}

export interface Holiday {
  holiday_id: number;
  company_id: number;
  name: string;
  date: string;
  is_optional: boolean;
}

export interface Report {
  report_id: number;
  name: string;
  type: 'attendance' | 'payroll' | 'leave' | 'statutory';
  generated_by: number;
  generated_at: string;
  data: any;
}
