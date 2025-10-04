# Enterprise Payroll Management System

A fully functional React-based enterprise payroll system with role-based access control (RBAC), featuring comprehensive modules for employee management, payroll processing, attendance tracking, leave management, and more.

## Features

### Role-Based Dashboards
- **Super Admin**: Full system access, company management, global settings
- **Admin**: Company-level access, user management, all modules
- **HR**: Employee, attendance, leave, document, and expense management
- **HOD**: Team-level access, leave/KRA approvals, team reports
- **User**: Personal data access (profile, pay slips, leave requests, documents)

### Modules
1. **Employee Management**: View and manage employee records
2. **Payroll & Salary**: Process salaries, generate pay slips
3. **Attendance Management**: Track employee attendance logs
4. **Leave Management**: Submit and approve leave requests
5. **Document Management**: Upload and manage employee documents
6. **Reporting System**: Generate various reports (attendance, payroll, statutory)
7. **KRA Management**: Track Key Result Areas and performance goals
8. **Company & Organization**: Manage companies, departments, designations
9. **User Management**: RBAC user accounts and permissions
10. **Expense Tracking**: Submit and approve employee expenses
11. **Task Management**: Assign and track tasks
12. **CRM**: Manage customer leads and opportunities
13. **Asset Management**: Track company assets and assignments

## Technology Stack

- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI)
- **State Management**: Zustand
- **Routing**: React Router v6
- **Data Grid**: MUI X Data Grid
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Demo Accounts

The system comes with 5 pre-configured demo accounts:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| Super Admin | superadmin@payroll.com | Super123! | Full system access |
| Admin | admin@company1.com | Admin123! | Company-level access |
| HR | hr@company1.com | Hr123! | HR modules |
| HOD | hod@company1.com | Hod123! | Team-level access |
| User | employee1@company1.com | User123! | Personal data only |

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main application layout with sidebar
│   └── ProtectedRoute.tsx
├── pages/              # Page components for each module
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Employees.tsx
│   ├── Payroll.tsx
│   ├── Attendance.tsx
│   ├── Leave.tsx
│   ├── Documents.tsx
│   ├── Reports.tsx
│   ├── KRA.tsx
│   ├── Company.tsx
│   ├── Users.tsx
│   ├── Expenses.tsx
│   ├── Tasks.tsx
│   ├── CRM.tsx
│   └── Assets.tsx
├── store/              # Zustand state management
│   ├── authStore.ts    # Authentication and user state
│   └── dataStore.ts    # Application data state
├── static/             # Static JSON data files
│   ├── users.json
│   ├── roles.json
│   ├── employees.json
│   ├── salaries.json
│   ├── attendance_logs.json
│   ├── leave_requests.json
│   └── ... (other data files)
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── permissions.ts
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## RBAC Implementation

The system implements comprehensive role-based access control:

### Permission Levels
- **view**: Can view data
- **create**: Can create new records
- **edit**: Can modify existing records
- **delete**: Can delete records
- **approve**: Can approve requests (leaves, expenses, KRAs)
- **export**: Can export reports

### How It Works
1. User logs in with credentials
2. System loads user role and permissions from static data
3. UI dynamically renders based on permissions
4. Menu items are filtered by module access
5. Action buttons (Create, Edit, Delete, Approve) appear only if permitted

### Permission Utility
```typescript
import { usePermission } from '../utils/permissions';

const { canView, canCreate, canEdit, canApprove } = usePermission();

if (canCreate('employee')) {
  // Show "Add Employee" button
}
```

## Static Data

All data is stored in JSON files in the `src/static` directory. This includes:

- **10 employees** across different departments
- **Salary records** for multiple months
- **Attendance logs** with various statuses
- **Leave requests** (pending, approved, rejected)
- **Documents** with different types
- **KRA records** with performance goals
- **Companies, departments, and designations**
- **Expenses, tasks, CRM leads, and assets**

## Adding New Data

To add new static data:

1. Locate the appropriate JSON file in `src/static`
2. Follow the existing data structure
3. Add your new records with unique IDs
4. The changes will be reflected immediately

Example - Adding a new employee:

```json
{
  "emp_id": 11,
  "name": "New Employee",
  "email": "new@company1.com",
  "phone": "+91-9876543220",
  "company_id": 1,
  "dept_id": 1,
  "designation_id": 5,
  "date_of_joining": "2024-10-01",
  "date_of_birth": "1995-05-15",
  "gender": "male",
  "address": "Address here",
  "pan_number": "ABCDE1234F",
  "aadhar_number": "1234-5678-9012",
  "bank_account": "12345678901234",
  "ifsc_code": "HDFC0001234",
  "salary_components": {
    "basic": 40000,
    "hra": 16000,
    "da": 4000,
    "conveyance": 1600,
    "medical": 1250,
    "special_allowance": 3150
  },
  "status": "active"
}
```

## Features Demonstration

### Dashboard
- Role-specific widgets and statistics
- Recent activities feed
- Pending tasks and approvals
- Quick access to common actions

### Employee Management
- Complete employee records with DataGrid
- Search and filter capabilities
- Export functionality
- Responsive design for mobile/tablet

### Payroll Processing
- View salary details
- Download pay slips (as JSON)
- Filter by month/year
- Payment status tracking

### Leave Management
- Submit leave requests
- View leave balances (for users)
- Approve/reject requests (for HOD/HR)
- Leave type management

### Attendance Tracking
- Daily attendance logs
- In/out time tracking
- Total hours calculation
- Status indicators (present, absent, half-day)

### Document Management
- Upload documents by type
- View document history
- Track mandatory vs. optional documents
- Secure file management

### Reports
- Generate various report types
- Download as JSON (simulated)
- Filter by date ranges
- Export capabilities

## Security Features

1. **Authentication**: Password-based login with session management
2. **Authorization**: Fine-grained RBAC permissions
3. **Data Isolation**: Users can only view permitted data
4. **Protected Routes**: Automatic redirect to login if not authenticated
5. **Session Storage**: JWT simulation with localStorage

## Responsive Design

The application is fully responsive with:
- Mobile-friendly navigation (collapsible sidebar)
- Responsive data grids with horizontal scrolling
- Touch-friendly buttons and controls
- Adaptive layouts for tablet and desktop

## Future Enhancements

To connect to a Laravel backend:

1. Replace static JSON imports with API calls
2. Update Zustand stores to fetch from endpoints
3. Implement proper JWT token management
4. Add form submission handlers
5. Implement real-time updates with WebSockets

Example API integration:

```typescript
// Instead of:
import employeesData from '../static/employees.json';

// Use:
const fetchEmployees = async () => {
  const response = await axios.get('/api/employees');
  return response.data;
};
```

## License

This is a demonstration project for educational purposes.

## Support

For issues or questions, please refer to the codebase documentation or contact the development team.
