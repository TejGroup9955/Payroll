import { Box, Grid, Card, CardContent, Typography, Paper } from '@mui/material';
import { Users, DollarSign, Clock, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useDataStore } from '../store/dataStore';
import { usePermission } from '../utils/permissions';

export default function Dashboard() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const { canView } = usePermission();

  const employees = useDataStore((state) => state.employees);
  const salaries = useDataStore((state) => state.salaries);
  const leaveRequests = useDataStore((state) => state.leaveRequests);
  const expenses = useDataStore((state) => state.expenses);
  const tasks = useDataStore((state) => state.tasks);

  const pendingLeaves = leaveRequests.filter(l => l.status === 'pending').length;
  const pendingExpenses = expenses.filter(e => e.status === 'pending').length;
  const myTasks = tasks.filter(t => t.assigned_to === user?.emp_id).length;
  const totalEmployees = employees.length;
  const thisMonthSalaries = salaries.filter(s => s.month === '2024-10').length;

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {value}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              bgcolor: `${color}.100`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={28} color={color} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Welcome back, {role?.name}!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Here's what's happening with your organization today
      </Typography>

      <Grid container spacing={3}>
        {canView('employee') && (
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Employees"
              value={totalEmployees}
              icon={Users}
              color="#1976d2"
            />
          </Grid>
        )}

        {canView('payroll') && (
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Salaries This Month"
              value={thisMonthSalaries}
              icon={DollarSign}
              color="#2e7d32"
            />
          </Grid>
        )}

        {canView('leave') && (
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Leave Requests"
              value={pendingLeaves}
              icon={Calendar}
              color="#ed6c02"
            />
          </Grid>
        )}

        {canView('expense') && (
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Pending Expenses"
              value={pendingExpenses}
              icon={AlertCircle}
              color="#d32f2f"
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent Activities
            </Typography>
            <Box sx={{ mt: 2 }}>
              {leaveRequests.slice(0, 5).map((leave) => {
                const emp = employees.find(e => e.emp_id === leave.emp_id);
                return (
                  <Box
                    key={leave.leave_id}
                    sx={{
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 0 },
                    }}
                  >
                    <Typography variant="body2">
                      <strong>{emp?.name}</strong> requested leave
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {leave.start_date} to {leave.end_date} • {leave.status}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              My Tasks
            </Typography>
            <Box sx={{ mt: 2 }}>
              {tasks
                .filter(t => t.assigned_to === user?.emp_id)
                .slice(0, 5)
                .map((task) => (
                  <Box
                    key={task.task_id}
                    sx={{
                      py: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      '&:last-child': { borderBottom: 0 },
                    }}
                  >
                    <Typography variant="body2" fontWeight="medium">
                      {task.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Due: {task.due_date} • Priority: {task.priority} • {task.status}
                    </Typography>
                  </Box>
                ))}
              {myTasks === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No tasks assigned
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
