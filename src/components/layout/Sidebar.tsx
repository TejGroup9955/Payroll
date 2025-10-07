import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  DollarSign,
  Clock,
  Calendar,
  FileText,
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['Admin', 'HR', 'HOD', 'User', 'Account'],
  },
  {
    title: 'Employees',
    href: '/employees',
    icon: Users,
    roles: ['Admin', 'HR', 'HOD'],
  },
  {
    title: 'Payroll',
    href: '/payroll',
    icon: DollarSign,
    roles: ['Admin', 'HR', 'Account'],
  },
  {
    title: 'Attendance',
    href: '/attendance',
    icon: Clock,
    roles: ['Admin', 'HR', 'HOD', 'User'],
  },
  {
    title: 'Leave',
    href: '/leave',
    icon: Calendar,
    roles: ['Admin', 'HR', 'HOD', 'User'],
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
    roles: ['Admin', 'HR', 'Account'],
  },
  {
    title: 'Company',
    href: '/company',
    icon: Building2,
    roles: ['Admin'],
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    roles: ['Admin', 'HR'],
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userRole = 'Admin'; // TODO: Get from auth context

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(userRole)
  );

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-blue-600">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gray-900">
                PayrollPro
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {filteredNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-gradient-to-r from-teal-50 to-blue-50 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                )}
                title={collapsed ? item.title : undefined}
              >
                <Icon className={cn('h-5 w-5 flex-shrink-0')} />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-gray-200 p-3">
          <button
            className={cn(
              'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900'
            )}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
