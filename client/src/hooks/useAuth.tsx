/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { notifications } from '@mantine/notifications';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../lib/axios.config';
import { deleteCookie, setCookie } from '../lib/utils';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  loggingIn: boolean;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  registering: boolean;
  logout: () => void;
  loggingOut: boolean;
  initialLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      setInitialLoading(false);

      return;
    } else {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get('/auth/login-info');

          setUser(data.info);
        } catch (error) {
          setUser(null);

          if (location.pathname.includes('/dashboard')) {
            navigate('/login');
          }
        } finally {
          setInitialLoading(false);
        }
      };

      fetchUser();
    }
  }, [location.pathname, user]);

  const login = async (email: string, password: string) => {
    setLoggingIn(true);

    try {
      const { data } = await axios.post('/auth/generate-auth-token', {
        email,
        password,
      });

      setUser(data.user);
      setCookie('token', data.token, 7);

      notifications.show({
        title: 'Success',
        message: 'Successfully logged in!',
        color: 'green',
        autoClose: 1500,
      });

      navigate('/dashboard');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Invalid credentials',
        color: 'red',
        autoClose: 1500,
      });
    } finally {
      setLoggingIn(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setRegistering(true);

    try {
      const { data } = await axios.post('/auth/register', {
        name,
        email,
        password,
      });

      notifications.show({
        title: 'Success',
        message: 'Successfully created an account!',
        color: 'green',
        autoClose: 1500,
      });

      setUser(data.user);
      setCookie('token', data.token, 7);

      navigate('/dashboard');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'An error occurred',
        color: 'red',
        autoClose: 1500,
      });
    } finally {
      setRegistering(false);
    }
  };

  const logout = async () => {
    setLoggingOut(true);

    try {
      deleteCookie('token');
      setUser(null);

      notifications.show({
        title: 'Success',
        message: 'Successfully logged out!',
        color: 'green',
        autoClose: 1500,
      });

      navigate('/login');
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'An error occurred',
        color: 'red',
        autoClose: 1500,
      });
    } finally {
      setLoggingOut(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        loggingIn,
        register,
        registering,
        logout,
        loggingOut,
        initialLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth hook should be used within AuthProvider wrapper!');
  }

  return context;
}
