import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Plus, Check, X } from 'lucide-react';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import { usePermission } from '../utils/permissions';

export default function Expenses() {
  const expenses = useDataStore((state) => state.expenses);
  const employees = useDataStore((state) => state.employees);
  const updateExpense = useDataStore((state) => state.updateExpense);
  const user = useAuthStore((state) => state.user);
  const { canCreate, canApprove, isUser } = usePermission();

  const filteredExpenses = isUser()
    ? expenses.filter(e => e.emp_id === user?.emp_id)
    : expenses;

  const handleApprove = (expenseId: number) => {
    updateExpense(expenseId, 'approved', user?.emp_id || 0);
  };

  const handleReject = (expenseId: number) => {
    updateExpense(expenseId, 'rejected', user?.emp_id || 0);
  };

  const columns: GridColDef[] = [
    { field: 'expense_id', headerName: 'ID', width: 80 },
    {
      field: 'emp_id',
      headerName: 'Employee',
      width: 180,
      valueGetter: (params) => {
        const emp = employees.find(e => e.emp_id === params);
        return emp?.name || '-';
      },
    },
    { field: 'category', headerName: 'Category', width: 140 },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 120,
      valueFormatter: (params) => `₹${params.toLocaleString()}`,
    },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'description', headerName: 'Description', width: 250 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const colorMap: any = {
          approved: 'success',
          pending: 'warning',
          rejected: 'error',
          reimbursed: 'info',
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
      field: 'actions',
      headerName: 'Actions',
      width: 140,
      renderCell: (params) => {
        if (!canApprove('expense') || params.row.status !== 'pending') return null;
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              color="success"
              startIcon={<Check size={16} />}
              onClick={() => handleApprove(params.row.expense_id)}
            >
              Approve
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<X size={16} />}
              onClick={() => handleReject(params.row.expense_id)}
            >
              Reject
            </Button>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Expense Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Track and approve employee expenses
          </Typography>
        </Box>
        {canCreate('expense') && (
          <Button variant="contained" startIcon={<Plus size={20} />}>
            Submit Expense
          </Button>
        )}
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredExpenses}
          columns={columns}
          getRowId={(row) => row.expense_id}
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
