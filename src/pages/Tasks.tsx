import { Box, Typography, Paper, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import { usePermission } from '../utils/permissions';

export default function Tasks() {
  const tasks = useDataStore((state) => state.tasks);
  const employees = useDataStore((state) => state.employees);
  const user = useAuthStore((state) => state.user);
  const { isUser } = usePermission();

  const filteredTasks = isUser()
    ? tasks.filter(t => t.assigned_to === user?.emp_id)
    : tasks;

  const columns: GridColDef[] = [
    { field: 'task_id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'description', headerName: 'Description', width: 300 },
    {
      field: 'assigned_to',
      headerName: 'Assigned To',
      width: 180,
      valueGetter: (params) => {
        const emp = employees.find(e => e.emp_id === params);
        return emp?.name || '-';
      },
    },
    { field: 'due_date', headerName: 'Due Date', width: 120 },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 120,
      renderCell: (params) => {
        const colorMap: any = {
          high: 'error',
          medium: 'warning',
          low: 'info',
        };
        return (
          <Chip
            label={params.value}
            color={colorMap[params.value] || 'default'}
            size="small"
          />
        );
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const colorMap: any = {
          completed: 'success',
          in_progress: 'info',
          pending: 'warning',
        };
        return (
          <Chip
            label={params.value.replace('_', ' ')}
            color={colorMap[params.value] || 'default'}
            size="small"
          />
        );
      },
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Task Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          View and manage tasks
        </Typography>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredTasks}
          columns={columns}
          getRowId={(row) => row.task_id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
