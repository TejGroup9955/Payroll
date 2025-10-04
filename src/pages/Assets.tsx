import { Box, Typography, Paper, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDataStore } from '../store/dataStore';

export default function Assets() {
  const assets = useDataStore((state) => state.assets);
  const employees = useDataStore((state) => state.employees);

  const columns: GridColDef[] = [
    { field: 'asset_id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Asset Name', width: 250 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'serial_number', headerName: 'Serial Number', width: 180 },
    {
      field: 'assigned_to',
      headerName: 'Assigned To',
      width: 200,
      valueGetter: (params) => {
        if (!params) return 'Unassigned';
        const emp = employees.find(e => e.emp_id === params);
        return emp?.name || 'Unassigned';
      },
    },
    { field: 'purchase_date', headerName: 'Purchase Date', width: 140 },
    { field: 'warranty_expiry', headerName: 'Warranty Expiry', width: 140 },
    {
      field: 'status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const colorMap: any = {
          available: 'success',
          assigned: 'info',
          maintenance: 'warning',
          disposed: 'error',
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
          Asset Management
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track and manage company assets
        </Typography>
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={assets}
          columns={columns}
          getRowId={(row) => row.asset_id}
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
