import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Download } from 'lucide-react';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import { usePermission } from '../utils/permissions';

export default function Payroll() {
  const salaries = useDataStore((state) => state.salaries);
  const employees = useDataStore((state) => state.employees);
  const user = useAuthStore((state) => state.user);
  const { canView, isUser } = usePermission();

  const filteredSalaries = isUser()
    ? salaries.filter(s => s.emp_id === user?.emp_id)
    : salaries;

  const columns: GridColDef[] = [
    { field: 'salary_id', headerName: 'ID', width: 80 },
    {
      field: 'emp_id',
      headerName: 'Employee',
      width: 200,
      valueGetter: (params) => {
        const emp = employees.find(e => e.emp_id === params);
        return emp?.name || '-';
      },
    },
    { field: 'month', headerName: 'Month', width: 120 },
    {
      field: 'gross_salary',
      headerName: 'Gross Salary',
      width: 150,
      valueFormatter: (params) => `₹${params.toLocaleString()}`,
    },
    {
      field: 'net_salary',
      headerName: 'Net Salary',
      width: 150,
      valueFormatter: (params) => `₹${params.toLocaleString()}`,
    },
    {
      field: 'payment_status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const colorMap: any = {
          paid: 'success',
          processed: 'info',
          pending: 'warning',
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
    { field: 'payment_date', headerName: 'Payment Date', width: 140 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          size="small"
          startIcon={<Download size={16} />}
          onClick={() => {
            const data = JSON.stringify(params.row, null, 2);
            const blob = new Blob([data], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `payslip_${params.row.salary_id}.json`;
            a.click();
          }}
        >
          Download
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          {isUser() ? 'My Pay Slips' : 'Payroll Management'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isUser() ? 'View and download your pay slips' : 'Manage employee salaries and payments'}
        </Typography>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredSalaries}
          columns={columns}
          getRowId={(row) => row.salary_id}
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
