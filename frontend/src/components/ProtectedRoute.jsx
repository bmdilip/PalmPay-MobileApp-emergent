import React from 'react';
import { Navigate } from 'react-router-dom';
import { isUserLoggedIn, hasCompletedOnboarding } from '../utils/auth';

const ProtectedRoute = ({ children, requireAuth = true, requireOnboarding = true }) => {
  const onboardingDone = hasCompletedOnboarding();
  const loggedIn = isUserLoggedIn();

  // If onboarding is required but not completed
  if (requireOnboarding && !onboardingDone) {
    return <Navigate to="/onboarding" replace />;
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !loggedIn) {
    return <Navigate to="/auth" replace />;
  }

  // User meets all requirements, render the protected content
  return children;
};

export default ProtectedRoute;
