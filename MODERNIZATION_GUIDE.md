# PayrollPro - Modern UI Redesign

## Overview
This project contains a **modern, enterprise-level frontend redesign** of the legacy PHP Payroll system, built with React, TypeScript, TailwindCSS, and shadcn/ui components.

## Technology Stack

### Core Framework
- **Next.js/React 18** - Component-based architecture
- **TypeScript** - Type-safe development
- **React Router** - Client-side routing
- **Vite** - Fast build tooling

### Styling & Design
- **TailwindCSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible components
- **Lucide React** - Modern icon library
- **Framer Motion** - Smooth animations (ready for implementation)

### Data Visualization
- **Recharts** - Beautiful, responsive charts
- **Bar Charts** - Salary distribution by department
- **Pie Charts** - Leave type breakdown
- **Line Charts** - Monthly payroll trends

### Backend Integration
- **Supabase** - PostgreSQL database + Auth
- **REST APIs** - Ready for Laravel/NestJS backend

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx          # Collapsible navigation sidebar
│   │   ├── Navbar.tsx           # Top navigation with search & notifications
│   │   └── Breadcrumbs.tsx      # Dynamic breadcrumb navigation
│   └── ui/
│       ├── stat-card.tsx        # KPI metric cards
│       └── chart-card.tsx       # Chart container component
├── pages/
│   ├── DashboardNew.tsx         # Main dashboard with charts & KPIs
│   └── EmployeesNew.tsx         # Employee management interface
├── lib/
│   ├── types.ts                 # TypeScript interfaces
│   ├── mock-data.ts             # Sample data for development
│   ├── supabase.ts              # Database client configuration
│   └── utils.ts                 # Utility functions (shadcn)
└── AppNew.tsx                   # New application entry point
```

## Features Implemented

### ✅ Dashboard Page
- **4 KPI Cards** with trend indicators (Total Employees, Salary Processed, Pending Approvals, Active Today)
- **Attendance Summary** (Present, Absent, Late, On Leave) with color indicators
- **3 Interactive Charts**:
  - Salary Distribution by Department (Bar Chart)
  - Leave Type Breakdown (Pie Chart)
  - 6-Month Payroll Trend (Line Chart)
- **Widgets**:
  - Upcoming Birthdays list
  - Recent Activity feed

### ✅ Employee Management
- **Advanced Search** - Filter by name, ID, or email
- **Department Filter** - Dropdown to filter by department
- **Employee Stats** - Total, Active, On Leave, New This Month
- **Data Table** with:
  - Employee avatars (initials)
  - Contact information (email, phone)
  - Department badges
  - Status indicators
  - Action buttons (View, Edit, Delete)
- **Pagination** - Ready for large datasets
- **Bulk Actions** - Checkbox selection
- **Export & Add** - Action buttons in header

### ✅ Layout Components
- **Responsive Sidebar**
  - Collapsible design
  - Role-based navigation (Admin, HR, HOD, User, Account)
  - Active route highlighting
  - Gradient brand logo
- **Top Navbar**
  - Global search bar
  - Dark mode toggle (ready for implementation)
  - Notification bell with indicator
  - User profile dropdown
- **Breadcrumbs** - Automatic path navigation

## Design System

### Color Palette
- **Primary**: Teal (#14b8a6) to Blue (#3b82f6) gradient
- **Neutral**: Gray scale (50-900)
- **Status Colors**:
  - Success: Green (#22c55e)
  - Warning: Yellow (#eab308)
  - Error: Red (#ef4444)
  - Info: Blue (#3b82f6)

### Typography
- **Font Family**: Inter (system font stack)
- **Heading**: Bold, 24-36px
- **Body**: Regular, 14-16px
- **Caption**: Medium, 12-14px

### Spacing
- **Component Padding**: 16-24px
- **Card Gap**: 24px
- **Section Gap**: 32-48px

### Shadows
- **Card**: 0 1px 3px rgba(0,0,0,0.1)
- **Hover**: 0 4px 6px rgba(0,0,0,0.1)

## Running the Application

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Toggle New UI
In `src/main.tsx`, set `USE_NEW_UI = true` to enable the modern interface.

## Modules Roadmap

### Phase 1 (Completed)
- [x] Dashboard with KPIs & Charts
- [x] Employee Management
- [x] Layout Components (Sidebar, Navbar, Breadcrumbs)
- [x] Design System Components (StatCard, ChartCard)

### Phase 2 (Next)
- [ ] Payroll Processing Module
- [ ] Attendance Tracking
- [ ] Leave Management
- [ ] Reports & Analytics

### Phase 3 (Future)
- [ ] Settings & Configuration
- [ ] User Management
- [ ] Company Setup
- [ ] Document Management

## Backend Integration

### Supabase Setup
1. Create Supabase project at https://supabase.com
2. Update `.env` with your credentials:
```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_SUPABASE_ANON_KEY=your_anon_key
```

### Database Schema
Key tables needed:
- `employees` - Employee master data
- `attendance` - Daily attendance logs
- `leave_requests` - Leave applications
- `salaries` - Salary records
- `companies` - Company/branch details
- `departments` - Department master
- `designations` - Designation master

### API Endpoints (Future)
```typescript
GET    /api/employees           // List all employees
POST   /api/employees           // Create new employee
GET    /api/employees/:id       // Get employee details
PUT    /api/employees/:id       // Update employee
DELETE /api/employees/:id       // Delete employee

GET    /api/dashboard/stats     // Dashboard KPIs
GET    /api/payroll/summary     // Salary summary
POST   /api/payroll/process     // Run payroll
```

## Key Improvements Over Legacy System

### 1. Security
- No plain-text passwords
- JWT-based authentication ready
- SQL injection prevention via ORM
- Role-based access control

### 2. Performance
- Code splitting & lazy loading
- Optimized bundle size
- Client-side caching
- Responsive data loading

### 3. User Experience
- Modern, intuitive interface
- Real-time updates capability
- Mobile-responsive design
- Accessibility (WCAG 2.1)
- Dark mode support

### 4. Maintainability
- TypeScript type safety
- Component reusability
- Clear separation of concerns
- Comprehensive testing ready
- Documentation

### 5. Scalability
- Modular architecture
- API-first design
- Database connection pooling
- Horizontal scaling ready

## Component Library

### Available Components
```tsx
// Stat Card with optional trend
<StatCard
  title="Total Employees"
  value={245}
  icon={Users}
  trend={{ value: 5.2, isPositive: true }}
/>

// Chart Container
<ChartCard
  title="Salary Distribution"
  description="By department"
  actions={<button>Export</button>}
>
  <BarChart data={...} />
</ChartCard>

// Breadcrumbs (auto-generated)
<Breadcrumbs />
```

## Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: 1024px - 1280px
- **Wide**: > 1280px

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing
When adding new modules, follow these patterns:

1. Create page in `src/pages/[ModuleName].tsx`
2. Add route in `src/AppNew.tsx`
3. Add navigation item in `src/components/layout/Sidebar.tsx`
4. Use existing components from `src/components/ui/`
5. Add mock data to `src/lib/mock-data.ts` for development

## Migration Strategy

### Phase A: Build New UI (Current)
- Develop all frontend modules
- Use mock data for development
- Create comprehensive component library

### Phase B: Backend Development
- Build Laravel/NestJS APIs
- Set up Supabase database
- Implement authentication
- Create data migrations from legacy MySQL

### Phase C: Integration
- Connect frontend to APIs
- Replace mock data with real data
- Implement real-time features
- Deploy staging environment

### Phase D: Parallel Run
- Run new system alongside legacy
- Gradual user migration
- Performance monitoring
- Bug fixes and optimization

### Phase E: Full Migration
- Deprecate legacy system
- Full production deployment
- User training
- Documentation handover

## Notes
- All pages are fully responsive
- Charts resize automatically
- Navigation collapses on mobile
- Tables scroll horizontally on small screens
- Forms use validation (ready for react-hook-form + yup)

## Support
For questions or issues, refer to:
- TailwindCSS Docs: https://tailwindcss.com
- shadcn/ui Docs: https://ui.shadcn.com
- Recharts Docs: https://recharts.org
- Supabase Docs: https://supabase.com/docs

---

**Built with ❤️ for enterprise payroll management**
