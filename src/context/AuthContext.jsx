import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

import { API_URL } from '../config';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('bw_admin_token'));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => {
          if (!res.ok) throw new Error('Invalid token');
          return res.json();
        })
        .then(data => {
          setAdmin(data);
          setLoading(false);
        })
        .catch(() => {
          logout();
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (username, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || 'Login failed');
    }

    const data = await res.json();
    localStorage.setItem('bw_admin_token', data.token);
    setToken(data.token);
    setAdmin({ username, name: data.name });
    return data;
  };

  const logout = () => {
    localStorage.removeItem('bw_admin_token');
    setToken(null);
    setAdmin(null);
  };

  const value = { token, admin, loading, login, logout, isAuthenticated: !!token && !!admin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
