import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import DashboardNew from './pages/DashboardNew';
import EmployeesNew from './pages/EmployeesNew';

function MainLayout() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden pl-64">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function AppNew() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardNew />} />
          <Route path="employees" element={<EmployeesNew />} />
          <Route path="payroll" element={<div className="text-gray-900">Payroll Page (Coming Soon)</div>} />
          <Route path="attendance" element={<div className="text-gray-900">Attendance Page (Coming Soon)</div>} />
          <Route path="leave" element={<div className="text-gray-900">Leave Page (Coming Soon)</div>} />
          <Route path="reports" element={<div className="text-gray-900">Reports Page (Coming Soon)</div>} />
          <Route path="company" element={<div className="text-gray-900">Company Page (Coming Soon)</div>} />
          <Route path="settings" element={<div className="text-gray-900">Settings Page (Coming Soon)</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppNew;
