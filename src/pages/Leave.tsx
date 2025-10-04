import { Box, Typography, Paper, Chip, Button, Grid, Card, CardContent } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Plus, Check, X } from 'lucide-react';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import { usePermission } from '../utils/permissions';

export default function Leave() {
  const leaveRequests = useDataStore((state) => state.leaveRequests);
  const leaveBalances = useDataStore((state) => state.leaveBalances);
  const leaveTypes = useDataStore((state) => state.leaveTypes);
  const employees = useDataStore((state) => state.employees);
  const updateLeaveRequest = useDataStore((state) => state.updateLeaveRequest);
  const user = useAuthStore((state) => state.user);
  const { canCreate, canApprove, isUser } = usePermission();

  const userBalances = leaveBalances.filter(lb => lb.emp_id === user?.emp_id);

  const filteredRequests = isUser()
    ? leaveRequests.filter(lr => lr.emp_id === user?.emp_id)
    : leaveRequests;

  const handleApprove = (leaveId: number) => {
    updateLeaveRequest(leaveId, 'approved', user?.emp_id || 0);
  };

  const handleReject = (leaveId: number) => {
    updateLeaveRequest(leaveId, 'rejected', user?.emp_id || 0);
  };

  const columns: GridColDef[] = [
    { field: 'leave_id', headerName: 'ID', width: 80 },
    {
      field: 'emp_id',
      headerName: 'Employee',
      width: 180,
      valueGetter: (params) => {
        const emp = employees.find(e => e.emp_id === params);
        return emp?.name || '-';
      },
    },
    {
      field: 'leave_type_id',
      headerName: 'Leave Type',
      width: 140,
      valueGetter: (params) => {
        const type = leaveTypes.find(lt => lt.leave_type_id === params);
        return type?.name || '-';
      },
    },
    { field: 'start_date', headerName: 'From', width: 120 },
    { field: 'end_date', headerName: 'To', width: 120 },
    { field: 'days', headerName: 'Days', width: 80 },
    { field: 'reason', headerName: 'Reason', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        const colorMap: any = {
          approved: 'success',
          pending: 'warning',
          rejected: 'error',
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
        if (!canApprove('leave') || params.row.status !== 'pending') return null;
        return (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              color="success"
              startIcon={<Check size={16} />}
              onClick={() => handleApprove(params.row.leave_id)}
            >
              Approve
            </Button>
            <Button
              size="small"
              color="error"
              startIcon={<X size={16} />}
              onClick={() => handleReject(params.row.leave_id)}
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
            Leave Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage leave requests and balances
          </Typography>
        </Box>
        {canCreate('leave') && (
          <Button variant="contained" startIcon={<Plus size={20} />}>
            Apply Leave
          </Button>
        )}
      </Box>

      {isUser() && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {userBalances.map((balance) => {
            const type = leaveTypes.find(lt => lt.leave_type_id === balance.leave_type_id);
            return (
              <Grid item xs={12} sm={6} md={3} key={balance.leave_type_id}>
                <Card>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {type?.name}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold">
                      {balance.remaining_days}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      of {balance.total_days} days available
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Paper sx={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filteredRequests}
          columns={columns}
          getRowId={(row) => row.leave_id}
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
