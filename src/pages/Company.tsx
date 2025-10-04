import { useState } from 'react';
import { Box, Typography, Paper, Tabs, Tab } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useDataStore } from '../store/dataStore';

export default function Company() {
  const [tab, setTab] = useState(0);
  const companies = useDataStore((state) => state.companies);
  const departments = useDataStore((state) => state.departments);
  const designations = useDataStore((state) => state.designations);

  const companyColumns: GridColDef[] = [
    { field: 'company_id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'contact_email', headerName: 'Email', width: 220 },
    { field: 'contact_phone', headerName: 'Phone', width: 150 },
    { field: 'pan_number', headerName: 'PAN', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const deptColumns: GridColDef[] = [
    { field: 'dept_id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Department Name', width: 300 },
    {
      field: 'company_id',
      headerName: 'Company',
      width: 250,
      valueGetter: (params) => {
        const company = companies.find(c => c.company_id === params);
        return company?.name || '-';
      },
    },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  const designationColumns: GridColDef[] = [
    { field: 'designation_id', headerName: 'ID', width: 80 },
    { field: 'name', headerName: 'Designation', width: 300 },
    { field: 'level', headerName: 'Level', width: 100 },
    {
      field: 'company_id',
      headerName: 'Company',
      width: 250,
      valueGetter: (params) => {
        const company = companies.find(c => c.company_id === params);
        return company?.name || '-';
      },
    },
    { field: 'status', headerName: 'Status', width: 120 },
  ];

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Company & Organization
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage companies, departments, and designations
        </Typography>
      </Box>

      <Paper>
        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Companies" />
          <Tab label="Departments" />
          <Tab label="Designations" />
        </Tabs>
        <Box sx={{ p: 2 }}>
          {tab === 0 && (
            <Box sx={{ height: 500 }}>
              <DataGrid
                rows={companies}
                columns={companyColumns}
                getRowId={(row) => row.company_id}
                pageSizeOptions={[10, 25, 50]}
              />
            </Box>
          )}
          {tab === 1 && (
            <Box sx={{ height: 500 }}>
              <DataGrid
                rows={departments}
                columns={deptColumns}
                getRowId={(row) => row.dept_id}
                pageSizeOptions={[10, 25, 50]}
              />
            </Box>
          )}
          {tab === 2 && (
            <Box sx={{ height: 500 }}>
              <DataGrid
                rows={designations}
                columns={designationColumns}
                getRowId={(row) => row.designation_id}
                pageSizeOptions={[10, 25, 50]}
              />
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
