import { Box, Typography, Paper, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import usersData from '../static/users.json';
import rolesData from '../static/roles.json';
import { useDataStore } from '../store/dataStore';

export default function Users() {
  const employees = useDataStore((state) => state.employees);

  const columns: GridColDef[] = [
    { field: 'user_id', headerName: 'ID', width: 80 },
    { field: 'email', headerName: 'Email', width: 280 },
    {
      field: 'role_id',
      headerName: 'Role',
      width: 150,
      valueGetter: (params) => {
        const role = rolesData.find(r => r.role_id === params);
        return role?.name || '-';
      },
    },
    {
      field: 'emp_id',
      headerName: 'Employee',
      width: 200,
      valueGetter: (params) => {
        if (!params) return '-';
        const emp = employees.find(e => e.emp_id === params);
        return emp?.name || '-';
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    { field: 'created_at', headerName: 'Created At', width: 180 },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          User Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage user accounts and roles
        </Typography>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={usersData}
          columns={columns}
          getRowId={(row) => row.user_id}
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
