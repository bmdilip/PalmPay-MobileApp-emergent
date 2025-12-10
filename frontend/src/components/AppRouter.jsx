import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getInitialRoute } from '../utils/auth';

const AppRouter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect on app initial load (root path)
    if (location.pathname === '/') {
      const initialRoute = getInitialRoute();
      navigate(initialRoute, { replace: true });
    }
  }, []);

  return children;
};

export default AppRouter;
