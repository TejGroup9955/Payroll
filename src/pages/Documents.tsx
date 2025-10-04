import { Box, Typography, Paper, Chip, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Upload } from 'lucide-react';
import { useDataStore } from '../store/dataStore';
import { useAuthStore } from '../store/authStore';
import { usePermission } from '../utils/permissions';

export default function Documents() {
  const documents = useDataStore((state) => state.documents);
  const documentTypes = useDataStore((state) => state.documentTypes);
  const employees = useDataStore((state) => state.employees);
  const user = useAuthStore((state) => state.user);
  const { canCreate, isUser } = usePermission();

  const filteredDocs = isUser()
    ? documents.filter(d => d.emp_id === user?.emp_id)
    : documents;

  const columns: GridColDef[] = [
    { field: 'doc_id', headerName: 'ID', width: 80 },
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
      field: 'doc_type_id',
      headerName: 'Document Type',
      width: 200,
      valueGetter: (params) => {
        const type = documentTypes.find(dt => dt.doc_type_id === params);
        return type?.name || '-';
      },
    },
    { field: 'file_name', headerName: 'File Name', width: 250 },
    { field: 'uploaded_at', headerName: 'Uploaded At', width: 180 },
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
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Document Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage employee documents and files
          </Typography>
        </Box>
        {canCreate('document') && (
          <Button variant="contained" startIcon={<Upload size={20} />}>
            Upload Document
          </Button>
        )}
      </Box>

      <Paper sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredDocs}
          columns={columns}
          getRowId={(row) => row.doc_id}
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
