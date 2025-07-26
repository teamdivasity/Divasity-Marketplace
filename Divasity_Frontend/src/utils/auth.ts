export const isAuthenticated = (): boolean => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');
  
  if (!token || !user) {
    return false;
  }
  
  try {
    JSON.parse(user);
    return true;
  } catch {
    return false;
  }
};

export const clearAuth = (): void => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};

export const getUser = () => {
  try {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const getToken = (): string | null => {
  return sessionStorage.getItem('token');
};