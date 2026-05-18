import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

function createPendingUser(email) {
  return {
    id: `pending_${Date.now()}`,
    name: 'Avery Smith',
    email,
    role: 'customer',
    avatar: 'AS',
    verified: true,
    phone: '+91 98765 43210',
    address: '12 Maple Lane, Bangalore',
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [pendingUser, setPendingUser] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('hs_user');
    const storedPending = localStorage.getItem('hs_pending_user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedPending) {
      setPendingUser(JSON.parse(storedPending));
      setIsPending(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('hs_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hs_user');
    }
  }, [user]);

  useEffect(() => {
    if (pendingUser) {
      localStorage.setItem('hs_pending_user', JSON.stringify(pendingUser));
    } else {
      localStorage.removeItem('hs_pending_user');
    }
  }, [pendingUser]);

  const login = (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required.');
    }
    setPendingUser(createPendingUser(email));
    setIsPending(true);
  };

  const selectRole = (role) => {
    if (!pendingUser) {
      throw new Error('No pending user found. Please login again.');
    }

    const selectedUser = { ...pendingUser, role };
    setUser(selectedUser);
    setPendingUser(null);
    setIsPending(false);
    return selectedUser;
  };

  const logout = () => {
    setUser(null);
    setPendingUser(null);
    setIsPending(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        pendingUser,
        isAuthenticated: Boolean(user),
        isPending,
        login,
        selectRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};