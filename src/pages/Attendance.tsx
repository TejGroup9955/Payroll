import { Box, Typography, Paper, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import { usePermission } from '../utils/permissions';

export default function Attendance() {
  const attendanceLogs = useDataStore((state) => state.attendanceLogs);
  const employees = useDataStore((state) => state.employees);
  const user = useAuthStore((state) => state.user);
  const { isUser } = usePermission();

  const filteredLogs = isUser()
    ? attendanceLogs.filter(log => log.emp_id === user?.emp_id)
    : attendanceLogs;

  const columns: GridColDef[] = [
    { field: 'log_id', headerName: 'ID', width: 80 },
    {
      field: 'emp_id',
      headerName: 'Employee',
      width: 200,
      valueGetter: (params) => {
        const emp = employees.find(e => e.emp_id === params);
        return emp?.name || '-';
      },
    },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'in_time', headerName: 'In Time', width: 120 },
    { field: 'out_time', headerName: 'Out Time', width: 120 },
    {
      field: 'total_hours',
      headerName: 'Total Hours',
      width: 120,
      valueFormatter: (params) => `${params.toFixed(2)} hrs`,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const colorMap: any = {
          present: 'success',
          absent: 'error',
          half_day: 'warning',
          leave: 'info',
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
    { field: 'remarks', headerName: 'Remarks', width: 200 },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Attendance Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track and manage employee attendance
        </Typography>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredLogs}
          columns={columns}
          getRowId={(row) => row.log_id}
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
