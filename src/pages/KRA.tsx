import { Box, Typography, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import { usePermission } from '../utils/permissions';

export default function KRA() {
  const kras = useDataStore((state) => state.kras);
  const employees = useDataStore((state) => state.employees);
  const user = useAuthStore((state) => state.user);
  const { isUser } = usePermission();

  const filteredKRAs = isUser()
    ? kras.filter(k => k.emp_id === user?.emp_id)
    : kras;

  const columns: GridColDef[] = [
    { field: 'kra_id', headerName: 'ID', width: 80 },
    {
      field: 'emp_id',
      headerName: 'Employee',
      width: 200,
      valueGetter: (params) => {
        const emp = employees.find(e => e.emp_id === params);
        return emp?.name || '-';
      },
    },
    { field: 'quarter', headerName: 'Quarter', width: 100 },
    { field: 'year', headerName: 'Year', width: 100 },
    {
      field: 'goals',
      headerName: 'Goals',
      width: 100,
      valueGetter: (params) => params.length,
    },
    { field: 'status', headerName: 'Status', width: 130 },
    { field: 'approved_at', headerName: 'Approved At', width: 180 },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          KRA Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Key Result Areas and performance tracking
        </Typography>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredKRAs}
          columns={columns}
          getRowId={(row) => row.kra_id}
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
