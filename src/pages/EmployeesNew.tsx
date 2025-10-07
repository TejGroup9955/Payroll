import { useState } from 'react';
import { Search, Filter, Plus, Download, Mail, Phone, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

// Mock data
const employees = [
  {
    id: '1',
    employee_id: 'EMP001',
    name: 'John Doe',
    email: 'john.doe@company.com',
    mobile: '+91 98765 43210',
    designation: 'Senior Software Engineer',
    department: 'Engineering',
    date_of_join: '2022-03-15',
    salary: 85000,
    status: 'active',
  },
  {
    id: '2',
    employee_id: 'EMP002',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    mobile: '+91 98765 43211',
    designation: 'Sales Manager',
    department: 'Sales',
    date_of_join: '2021-06-20',
    salary: 75000,
    status: 'active',
  },
  {
    id: '3',
    employee_id: 'EMP003',
    name: 'Mike Johnson',
    email: 'mike.j@company.com',
    mobile: '+91 98765 43212',
    designation: 'Marketing Specialist',
    department: 'Marketing',
    date_of_join: '2023-01-10',
    salary: 65000,
    status: 'active',
  },
];

export default function EmployeesNew() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.employee_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Breadcrumbs />
        <div className="mt-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employees</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your organization's employee database
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
              <Plus className="h-4 w-4" />
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search by name, ID, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 text-sm placeholder:text-gray-500 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="all">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="HR">HR</option>
          <option value="Finance">Finance</option>
        </select>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Employees', value: '245', color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: '238', color: 'from-green-500 to-green-600' },
          { label: 'On Leave', value: '7', color: 'from-yellow-500 to-yellow-600' },
          { label: 'New This Month', value: '12', color: 'from-purple-500 to-purple-600' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Employee Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Designation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Joining Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-blue-600 text-sm font-semibold text-white">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.employee_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        {employee.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                        {employee.mobile}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{employee.designation}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                      {employee.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(employee.date_of_join).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredEmployees.length}</span> of{' '}
            <span className="font-medium">{employees.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Previous
            </button>
            <button className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white">
              1
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              2
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              3
            </button>
            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
