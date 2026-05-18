import React, {
  createContext,
  useContext,
  useState,
  useCallback
} from 'react';
const MOCK_USERS = [
  {
    id: 'c1',
    role: 'customer',
    name: 'Arjun Mehta',
    email: 'arjun@email.com',
    password: 'customer123',
    avatar: 'AM',
    phone: '+91 98765 43210',
  },
  {
    id: 'p1',
    role: 'provider',
    name: 'Ravi Kumar',
    email: 'ravi@email.com',
    password: 'provider123',
    avatar: 'RK',
    phone: '+91 87654 32109',
    service: 'Plumbing',
    license: 'PLB-2021-TN-4521',
    verified: true,
  },
  {
    id: 'a1',
    role: 'admin',
    name: 'Priya Nair',
    email: 'admin@handyserve.com',
    password: 'admin123',
    avatar: 'PN',
    phone: '+91 99887 76655',
  },
];
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem('hs_user')
      );
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('hs_token');
  });

  const [pendingUser, setPendingUser] = useState(() => {
    try {
      return JSON.parse(
        sessionStorage.getItem('hs_pending')
      );
    } catch {
      return null;
    }
  });
    const login = useCallback((email, password) => {
    if (!email || !email.includes('@')) {
      throw new Error(
        'Please enter a valid email address.'
      );
    }
    if (!password || password.length < 6) {
      throw new Error(
        'Password must be at least 6 characters.'
      );
    }

    const found = MOCK_USERS.find(u =>
      u.email.toLowerCase() === 
      email.toLowerCase() && 
      u.password === password
    );

    if (!found) {
      throw new Error(
        'Invalid email or password.'
      );
    }

    const payload = {
      id: found.id,
      email: found.email,
      allowedRole: found.role,
      iat: Date.now(),
    };

    const jwt = `eyJhbGciOiJIUzI1NiJ9.
${btoa(JSON.stringify(payload))}.hs_mock_sig`;

    setToken(jwt);
    setPendingUser(found);
    localStorage.setItem('hs_token', jwt);
    sessionStorage.setItem(
      'hs_pending', 
      JSON.stringify(found)
    );

    return { allowedRole: found.role };
  }, []);
   const selectRole = useCallback((selectedRole) => {
    if (!pendingUser) {
      throw new Error(
        'Session expired. Please login again.'
      );
    }

    if (pendingUser.role !== selectedRole) {
      throw new Error(
        `Access denied. Your account is not 
         authorised as "${selectedRole}".`
      );
    }

    const storedToken = 
      localStorage.getItem('hs_token');

    if (!storedToken) {
      throw new Error(
        'Token missing. Please login again.'
      );
    }

    try {
      const decoded = JSON.parse(
        atob(storedToken.split('.')[1])
      );
      if (decoded.allowedRole !== selectedRole) {
        throw new Error(
          'Token role mismatch. Unauthorised.'
        );
      }
    } catch (e) {
      if (
        e.message.includes('Unauthorised') ||
        e.message.includes('denied')
      ) {
        throw e;
      }
      throw new Error(
        'Invalid token. Please login again.'
      );
    }

    const confirmedUser = { ...pendingUser };
    setUser(confirmedUser);
    setPendingUser(null);
    localStorage.setItem(
      'hs_user',
      JSON.stringify(confirmedUser)
    );
    sessionStorage.removeItem('hs_pending');
    return confirmedUser;
  }, [pendingUser]);
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setPendingUser(null);
    localStorage.removeItem('hs_user');
    localStorage.removeItem('hs_token');
    sessionStorage.removeItem('hs_pending');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      pendingUser,
      login,
      selectRole,
      logout,
      isAuthenticated: !!user,
      isPending: !!pendingUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }
  return ctx;
};