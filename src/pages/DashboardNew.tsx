import { Users, DollarSign, Clock, CheckCircle, Calendar, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { ChartCard } from '@/components/ui/chart-card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import {
  dashboardStats,
  salaryByDepartment,
  leaveTypeBreakdown,
  monthlyPayrollTrend,
  upcomingBirthdays,
  recentActivity,
} from '@/lib/mock-data';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function DashboardNew() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Breadcrumbs />
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back! Here's what's happening today.
            </p>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Employees"
          value={dashboardStats.total_employees}
          icon={Users}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Salary Processed"
          value={`₹${(dashboardStats.salary_processed / 100000).toFixed(1)}L`}
          icon={DollarSign}
          trend={{ value: 3.8, isPositive: true }}
        />
        <StatCard
          title="Pending Approvals"
          value={dashboardStats.pending_approvals}
          icon={Clock}
        />
        <StatCard
          title="Active Today"
          value={dashboardStats.attendance_today.present}
          icon={CheckCircle}
          trend={{ value: 2.1, isPositive: false }}
        />
      </div>

      {/* Attendance Summary */}
      <div className="grid gap-6 lg:grid-cols-4">
        {[
          { label: 'Present', value: dashboardStats.attendance_today.present, color: 'bg-green-500' },
          { label: 'Absent', value: dashboardStats.attendance_today.absent, color: 'bg-red-500' },
          { label: 'Late', value: dashboardStats.attendance_today.late, color: 'bg-yellow-500' },
          { label: 'On Leave', value: dashboardStats.attendance_today.leave, color: 'bg-blue-500' },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`h-3 w-3 rounded-full ${item.color}`} />
              <span className="text-sm font-medium text-gray-600">{item.label}</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Salary by Department */}
        <ChartCard
          title="Salary Distribution"
          description="By department for current month"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryByDepartment}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="department" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value: number) => `₹${(value / 1000).toFixed(0)}K`}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="amount" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Leave Type Breakdown */}
        <ChartCard title="Leave Type Distribution" description="Current month breakdown">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={leaveTypeBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                dataKey="value"
              >
                {leaveTypeBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Monthly Payroll Trend */}
      <ChartCard
        title="Payroll Trend"
        description="6-month overview"
        actions={
          <select className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>This year</option>
          </select>
        }
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyPayrollTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={(value: number) => `₹${(value / 100000).toFixed(1)}L`}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#14b8a6"
              strokeWidth={3}
              dot={{ fill: '#14b8a6', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Widgets Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Birthdays */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Birthdays</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingBirthdays.map((person) => (
              <div key={person.id} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-blue-600 text-sm font-semibold text-white">
                  {person.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{person.name}</p>
                  <p className="text-xs text-gray-500">{person.department}</p>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(person.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div
                  className={`mt-0.5 h-2 w-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">
                    by {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
