import { create } from 'zustand';
import { User, Role } from '../types';
import usersData from '../static/users.json';
import rolesData from '../static/roles.json';

interface AuthState {
  user: User | null;
  role: Role | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (module: string, action: string) => boolean;
}

const mockPasswordCheck = (password: string, hash: string): boolean => {
  const passwordMap: { [key: string]: string } = {
    'Super123!': '$2y$10$Super123!Hash',
    'Admin123!': '$2y$10$Admin123!Hash',
    'Hr123!': '$2y$10$Hr123!Hash',
    'Hod123!': '$2y$10$Hod123!Hash',
    'User123!': '$2y$10$User123!Hash',
  };
  return passwordMap[password] === hash;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  role: null,
  token: null,
  isAuthenticated: false,

  login: async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 200));

    const user = usersData.find(u => u.email === email);
    if (!user) {
      return false;
    }

    if (!mockPasswordCheck(password, user.password_hash)) {
      return false;
    }

    const role = rolesData.find(r => r.role_id === user.role_id);
    if (!role) {
      return false;
    }

    const mockToken = `mock-jwt-token-${Date.now()}`;

    set({
      user,
      role,
      token: mockToken,
      isAuthenticated: true,
    });

    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('user_data', JSON.stringify(user));
    localStorage.setItem('role_data', JSON.stringify(role));

    return true;
  },

  logout: () => {
    set({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false,
    });

    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('role_data');
  },

  hasPermission: (module: string, action: string): boolean => {
    const { role } = get();
    if (!role) return false;

    const modulePermissions = role.permissions[module as keyof typeof role.permissions];
    if (!modulePermissions) return false;

    return modulePermissions[action as keyof typeof modulePermissions] === true;
  },
}));
