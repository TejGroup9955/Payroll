import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { UserPlus } from 'lucide-react';
import { useDataStore } from '../store/dataStore';
import { usePermission } from '../utils/permissions';

export default function Employees() {
  const employees = useDataStore((state) => state.employees);
  const departments = useDataStore((state) => state.departments);
  const designations = useDataStore((state) => state.designations);
  const { canCreate } = usePermission();

  const columns: GridColDef[] = [
    { field: 'emp_id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
      field: 'dept_id',
      headerName: 'Department',
      width: 150,
      valueGetter: (params) => {
        const dept = departments.find(d => d.dept_id === params);
        return dept?.name || '-';
      },
    },
    {
      field: 'designation_id',
      headerName: 'Designation',
      width: 180,
      valueGetter: (params) => {
        const desig = designations.find(d => d.designation_id === params);
        return desig?.name || '-';
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
    { field: 'date_of_joining', headerName: 'Joining Date', width: 130 },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Employee Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and view all employees
          </Typography>
        </Box>
        {canCreate('employee') && (
          <Button
            variant="contained"
            startIcon={<UserPlus size={20} />}
          >
            Add Employee
          </Button>
        )}
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={employees}
          columns={columns}
          getRowId={(row) => row.emp_id}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 25, 50]}
          checkboxSelection={canCreate('employee')}
          disableRowSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
