import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, fetchMe } from '../api/authApi.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('kc_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('kc_auth_token') || null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = await fetchMe();
        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem('kc_user', JSON.stringify(data.user));
        }
      } catch {
        // Cookie expired or invalid
        setUser(null);
        setToken(null);
        localStorage.removeItem('kc_user');
        localStorage.removeItem('kc_auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser({ email, password });
    if (res.success && res.user) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('kc_user', JSON.stringify(res.user));
      if (res.token) localStorage.setItem('kc_auth_token', res.token);
    }
    return res;
  };

  const register = async (formData) => {
    const res = await registerUser(formData);
    if (res.success && res.user) {
      setUser(res.user);
      setToken(res.token);
      localStorage.setItem('kc_user', JSON.stringify(res.user));
      if (res.token) localStorage.setItem('kc_auth_token', res.token);
    }
    return res;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Continue client cleanup even if request fails
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('kc_user');
      localStorage.removeItem('kc_auth_token');
    }
  };

  const refreshUser = async () => {
    try {
      const res = await fetchMe();
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('kc_user', JSON.stringify(res.user));
      }
    } catch {
      // Ignored
    }
  };

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
