import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export default function ProtectedRoute({ component: Component }) {
  const location = useLocation();
  const [isAuth, setIsAuth] = React.useState(null);

  React.useEffect(() => {
    // Check if user is authenticated by making a request to a protected route
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/check', {
          credentials: 'include',
        });
        setIsAuth(res.ok);
      } catch (err) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <div className="bg-bone min-h-screen" />;

  return isAuth ? <Component /> : <Navigate to="/admin/login" state={{ from: location }} />;
}
