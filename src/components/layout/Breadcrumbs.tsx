import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { label: 'Home', path: '/dashboard' },
    ...paths.map((path, index) => ({
      label: path.charAt(0).toUpperCase() + path.slice(1),
      path: `/${paths.slice(0, index + 1).join('/')}`,
    })),
  ];

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600">
      <Link
        to="/dashboard"
        className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-900"
      >
        <Home className="h-4 w-4" />
      </Link>
      {breadcrumbs.slice(1).map((crumb, index) => (
        <div key={crumb.path} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4 text-gray-400" />
          {index === breadcrumbs.length - 2 ? (
            <span className="font-medium text-gray-900">{crumb.label}</span>
          ) : (
            <Link
              to={crumb.path}
              className="transition-colors hover:text-gray-900"
            >
              {crumb.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
