import { create } from 'zustand';
import {
  Employee,
  Salary,
  AttendanceLog,
  LeaveRequest,
  LeaveType,
  LeaveBalance,
  Document,
  DocumentType,
  KRA,
  Company,
  Department,
  Designation,
  Expense,
  Task,
  CRMLead,
  Asset,
  Holiday,
} from '../types';

import employeesData from '../static/employees.json';
import salariesData from '../static/salaries.json';
import attendanceLogsData from '../static/attendance_logs.json';
import leaveRequestsData from '../static/leave_requests.json';
import leaveTypesData from '../static/leave_types.json';
import leaveBalancesData from '../static/leave_balances.json';
import documentsData from '../static/documents.json';
import documentTypesData from '../static/document_types.json';
import kraData from '../static/kra.json';
import companiesData from '../static/companies.json';
import departmentsData from '../static/departments.json';
import designationsData from '../static/designations.json';
import expensesData from '../static/expenses.json';
import tasksData from '../static/tasks.json';
import crmLeadsData from '../static/crm_leads.json';
import assetsData from '../static/assets.json';
import holidaysData from '../static/holidays.json';

interface DataState {
  employees: Employee[];
  salaries: Salary[];
  attendanceLogs: AttendanceLog[];
  leaveRequests: LeaveRequest[];
  leaveTypes: LeaveType[];
  leaveBalances: LeaveBalance[];
  documents: Document[];
  documentTypes: DocumentType[];
  kras: KRA[];
  companies: Company[];
  departments: Department[];
  designations: Designation[];
  expenses: Expense[];
  tasks: Task[];
  crmLeads: CRMLead[];
  assets: Asset[];
  holidays: Holiday[];

  updateLeaveRequest: (leaveId: number, status: string, approvedBy: number) => void;
  updateExpense: (expenseId: number, status: string, approvedBy: number) => void;
  updateTask: (taskId: number, updates: Partial<Task>) => void;
  addLeaveRequest: (request: LeaveRequest) => void;
  addExpense: (expense: Expense) => void;
  addEmployee: (employee: Employee) => void;
}

export const useDataStore = create<DataState>((set) => ({
  employees: employeesData as Employee[],
  salaries: salariesData as Salary[],
  attendanceLogs: attendanceLogsData as AttendanceLog[],
  leaveRequests: leaveRequestsData as LeaveRequest[],
  leaveTypes: leaveTypesData as LeaveType[],
  leaveBalances: leaveBalancesData as LeaveBalance[],
  documents: documentsData as Document[],
  documentTypes: documentTypesData as DocumentType[],
  kras: kraData as KRA[],
  companies: companiesData as Company[],
  departments: departmentsData as Department[],
  designations: designationsData as Designation[],
  expenses: expensesData as Expense[],
  tasks: tasksData as Task[],
  crmLeads: crmLeadsData as CRMLead[],
  assets: assetsData as Asset[],
  holidays: holidaysData as Holiday[],

  updateLeaveRequest: (leaveId, status, approvedBy) => {
    set((state) => ({
      leaveRequests: state.leaveRequests.map((req) =>
        req.leave_id === leaveId
          ? { ...req, status: status as any, approved_by: approvedBy, approved_at: new Date().toISOString() }
          : req
      ),
    }));
  },

  updateExpense: (expenseId, status, approvedBy) => {
    set((state) => ({
      expenses: state.expenses.map((exp) =>
        exp.expense_id === expenseId
          ? { ...exp, status: status as any, approved_by: approvedBy }
          : exp
      ),
    }));
  },

  updateTask: (taskId, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.task_id === taskId ? { ...task, ...updates } : task
      ),
    }));
  },

  addLeaveRequest: (request) => {
    set((state) => ({
      leaveRequests: [...state.leaveRequests, request],
    }));
  },

  addExpense: (expense) => {
    set((state) => ({
      expenses: [...state.expenses, expense],
    }));
  },

  addEmployee: (employee) => {
    set((state) => ({
      employees: [...state.employees, employee],
    }));
  },
}));
