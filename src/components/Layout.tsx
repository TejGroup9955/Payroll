import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Users,
  DollarSign,
  Clock,
  Calendar,
  FileText,
  BarChart3,
  Target,
  Building2,
  Settings,
  Receipt,
  CheckSquare,
  Briefcase,
  Package,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { usePermission } from '../utils/permissions';

const drawerWidth = 260;

interface MenuItem {
  title: string;
  icon: any;
  path: string;
  permission?: string;
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', icon: BarChart3, path: '/dashboard' },
  { title: 'Employees', icon: Users, path: '/employees', permission: 'employee' },
  { title: 'Payroll', icon: DollarSign, path: '/payroll', permission: 'payroll' },
  { title: 'Attendance', icon: Clock, path: '/attendance', permission: 'attendance' },
  { title: 'Leave', icon: Calendar, path: '/leave', permission: 'leave' },
  { title: 'Documents', icon: FileText, path: '/documents', permission: 'document' },
  { title: 'Reports', icon: BarChart3, path: '/reports', permission: 'reporting' },
  { title: 'KRA', icon: Target, path: '/kra', permission: 'kra' },
  { title: 'Company', icon: Building2, path: '/company', permission: 'company' },
  { title: 'Users', icon: Settings, path: '/users', permission: 'user_management' },
  { title: 'Expenses', icon: Receipt, path: '/expenses', permission: 'expense' },
  { title: 'Tasks', icon: CheckSquare, path: '/tasks', permission: 'task' },
  { title: 'CRM', icon: Briefcase, path: '/crm', permission: 'crm' },
  { title: 'Assets', icon: Package, path: '/assets', permission: 'asset' },
];

export default function Layout() {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);
  const logout = useAuthStore((state) => state.logout);
  const { canView } = usePermission();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.title === 'Dashboard') return true;
    if (!item.permission) return true;
    return canView(item.permission);
  });

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Payroll Management System
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="body2" fontWeight="medium">
                {role?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.email}
              </Typography>
            </Box>
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main' }}>
                {user?.email.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogOut size={20} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: 1 }}>
          <List>
            {filteredMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton onClick={() => navigate(item.path)}>
                    <ListItemIcon>
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: open ? 0 : `-${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
