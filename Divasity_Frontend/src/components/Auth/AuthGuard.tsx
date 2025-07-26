import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const currentPath = location.pathname;
    const authenticated = isAuthenticated();
    
    // Public routes that don't require authentication
    const publicRoutes = ['/', '/onboarding', '/signin', '/register', '/verify', '/nextstep', '/updates', '/profile', '/notifications'];
    const isPublicRoute = publicRoutes.some(route => currentPath.startsWith(route));
    
    // If user is logged in and on auth routes, redirect to dashboard
    if (authenticated && (currentPath === '/signin' || currentPath === '/register')) {
      navigate('/dashboard', { replace: true });
      return;
    }
    
    // If user is not logged in and trying to access private route, redirect to signin
    if (!authenticated && !isPublicRoute) {
      navigate('/signin', { replace: true });
      return;
    }
  }, [navigate, location]);
  
  return <>{children}</>;
}