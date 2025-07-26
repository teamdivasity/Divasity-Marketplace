// API configuration
export const API_URL = import.meta.env.VITE_API_URL || 'https://divasitybackendtest.onrender.com/api';

// Other configuration
export const APP_CONFIG = {
  appName: 'Divasity',
  apiUrl: API_URL,
  apiDocsUrl: 'https://divasitybackendtest.onrender.com/api-docs',
  tokenKey: 'token',
  userKey: 'user',
  defaultRedirectAfterLogin: '/dashboard',
  defaultRedirectAfterLogout: '/signin',
};

export default APP_CONFIG;