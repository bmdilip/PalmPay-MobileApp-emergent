// Authentication and User State Management

// Check if user has completed onboarding
export const hasCompletedOnboarding = () => {
  return localStorage.getItem('onboardingCompleted') === 'true';
};

// Mark onboarding as completed
export const setOnboardingCompleted = () => {
  localStorage.setItem('onboardingCompleted', 'true');
};

// Check if user is logged in
export const isUserLoggedIn = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Set user as logged in
export const setUserLoggedIn = (userData = {}) => {
  localStorage.setItem('isLoggedIn', 'true');
  if (userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
};

// Check if palm is registered
export const isPalmRegistered = () => {
  return localStorage.getItem('palmRegistered') === 'true';
};

// Set palm as registered
export const setPalmRegistered = () => {
  localStorage.setItem('palmRegistered', 'true');
};

// Get user data
export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Logout user - clear all data
export const logoutUser = () => {
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userData');
  localStorage.removeItem('palmRegistered');
  // Note: We keep onboardingCompleted so user doesn't see intro again
};

// Complete logout - clear everything including onboarding
export const completeLogout = () => {
  localStorage.clear();
};

// Get initial route based on user state
export const getInitialRoute = () => {
  // Check authentication state
  const onboardingDone = hasCompletedOnboarding();
  const loggedIn = isUserLoggedIn();
  const palmRegistered = isPalmRegistered();

  // Logic:
  // 1. If not onboarded -> show onboarding
  // 2. If onboarded but not logged in -> show login
  // 3. If logged in but palm not registered -> show palm registration
  // 4. If everything done -> show home

  if (!onboardingDone) {
    return '/onboarding';
  }

  if (!loggedIn) {
    return '/auth';
  }

  if (!palmRegistered) {
    return '/palm-register';
  }

  return '/home';
};
