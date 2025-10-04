import { Box, Typography, Paper, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDataStore } from '../store/dataStore';

export default function CRM() {
  const crmLeads = useDataStore((state) => state.crmLeads);
  const employees = useDataStore((state) => state.employees);

  const columns: GridColDef[] = [
    { field: 'lead_id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 220 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'company', headerName: 'Company', width: 200 },
    { field: 'source', headerName: 'Source', width: 130 },
    {
      field: 'assigned_to',
      headerName: 'Assigned To',
      width: 180,
      valueGetter: (params) => {
        const emp = employees.find(e => e.emp_id === params);
        return emp?.name || '-';
      },
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const colorMap: any = {
          new: 'info',
          contacted: 'primary',
          qualified: 'success',
          converted: 'success',
          lost: 'error',
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
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          CRM - Leads
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage customer leads and opportunities
        </Typography>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={crmLeads}
          columns={columns}
          getRowId={(row) => row.lead_id}
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
