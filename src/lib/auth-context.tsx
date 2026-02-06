import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiClient, User } from './api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // Function to check auth state
  const checkAuthState = async () => {
    // For static hosting (GitHub Pages), skip auth check if API is not available
    const isStaticHost = window.location.hostname.includes('github.io');
    
    if (isStaticHost) {
      setUser(null);
      setLoading(false);
      return;
    }
    
    if (apiClient.isAuthenticated()) {
      try {
        const response = await apiClient.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error('Auth check failed:', error);
        apiClient.clearToken();
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuthState();

    // Listen for storage events (token changes)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'auth_token') {
        checkAuthState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = async (email: string, password: string) => {
    const isStaticHost = window.location.hostname.includes('github.io');
    if (isStaticHost) {
      throw new Error('Authentication is not available on static hosting. Please visit the demo page.');
    }
    const response = await apiClient.login(email, password);
    setUser(response.user);
  };

  const register = async (email: string, password: string, name: string) => {
    const isStaticHost = window.location.hostname.includes('github.io');
    if (isStaticHost) {
      throw new Error('Registration is not available on static hosting. Please visit the demo page.');
    }
    const response = await apiClient.register(email, password, name);
    setUser(response.user);
  };

  const logout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    // Always clear local state
    apiClient.clearToken();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 