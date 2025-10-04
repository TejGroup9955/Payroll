import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Download, FileText, Users, DollarSign, Calendar } from 'lucide-react';

export default function Reports() {
  const reports = [
    { title: 'Attendance Report', description: 'Monthly attendance summary', icon: Calendar },
    { title: 'Payroll Report', description: 'Salary and deductions report', icon: DollarSign },
    { title: 'Employee Report', description: 'Employee details and statistics', icon: Users },
    { title: 'Leave Report', description: 'Leave balance and history', icon: FileText },
  ];

  const handleDownload = (reportName: string) => {
    const data = { report: reportName, generated: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportName.toLowerCase().replace(' ', '_')}.json`;
    a.click();
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Reports
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Generate and download various reports
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {reports.map((report) => {
          const Icon = report.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={report.title}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 1,
                        bgcolor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                      }}
                    >
                      <Icon size={24} />
                    </Box>
                    <Box>
                      <Typography variant="h6">{report.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {report.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Download size={20} />}
                    onClick={() => handleDownload(report.title)}
                  >
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
