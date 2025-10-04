import { useAuthStore } from '../store/authStore';

export const usePermission = () => {
  const hasPermission = useAuthStore((state) => state.hasPermission);
  const role = useAuthStore((state) => state.role);

  return {
    hasPermission,
    canView: (module: string) => hasPermission(module, 'view'),
    canCreate: (module: string) => hasPermission(module, 'create'),
    canEdit: (module: string) => hasPermission(module, 'edit'),
    canDelete: (module: string) => hasPermission(module, 'delete'),
    canApprove: (module: string) => hasPermission(module, 'approve'),
    canExport: (module: string) => hasPermission(module, 'export'),
    isSuperAdmin: () => role?.role_id === 1,
    isAdmin: () => role?.role_id === 2,
    isHR: () => role?.role_id === 3,
    isHOD: () => role?.role_id === 4,
    isUser: () => role?.role_id === 5,
  };
};
