/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { notifications } from '@mantine/notifications';
import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../lib/axios.config';
import { deleteCookie, setCookie } from '../lib/utils';
import { User } from '../types';

interface AuthContextType {
  user: User | null; // Current authenticated user
  login: (email: string, password: string) => void; // Function to log in with email and password
  loggingIn: boolean; // State indicating if login is in progress
  register: (name: string, email: string, password: string) => void; // Function to register a new user
  registering: boolean; // State indicating if registration is in progress
  logout: () => void; // Function to log out the current user
  loggingOut: boolean; // State indicating if logout is in progress
  initialLoading: boolean; // State indicating if initial loading is in progress
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggingIn, setLoggingIn] = useState(false); // State to manage login process
  const [registering, setRegistering] = useState(false); // State to manage registration process
  const [loggingOut, setLoggingOut] = useState(false); // State to manage logout process
  const [initialLoading, setInitialLoading] = useState(true); // State to manage initial loading
  const [user, setUser] = useState<User | null>(null); // State to store authenticated user data

  const navigate = useNavigate(); // Navigation utility from React Router
  const location = useLocation(); // Location utility from React Router

  useEffect(() => {
    if (user) {
      setInitialLoading(false); // Set initial loading state to false if user is already authenticated
      return;
    } else {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get('/auth/login-info'); // Fetch user data from server

          setUser(data.info); // Set user data in state
        } catch (error) {
          setUser(null); // Set user to null on error

          if (location.pathname.includes('/dashboard')) {
            navigate('/login'); // Redirect to login page if accessing dashboard without authentication
          }
        } finally {
          setInitialLoading(false); // Set initial loading state to false after fetching user data
        }
      };

      fetchUser();
    }
  }, [location.pathname, user]);

  const login = async (email: string, password: string) => {
    setLoggingIn(true); // Set logging in state to true during login process

    try {
      const { data } = await axios.post('/auth/generate-auth-token', {
        email,
        password,
      }); // Request authentication token from server

      setUser(data.user); // Set authenticated user data
      setCookie('token', data.token, 7); // Set authentication token in cookie for 7 days

      notifications.show({
        title: 'Success',
        message: 'Successfully logged in!',
        color: 'green',
        autoClose: 1500,
      }); // Show success notification

      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Invalid credentials',
        color: 'red',
        autoClose: 1500,
      }); // Show error notification for invalid credentials
    } finally {
      setLoggingIn(false); // Set logging in state to false after login attempt
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setRegistering(true); // Set registering state to true during registration process

    try {
      const { data } = await axios.post('/auth/register', {
        name,
        email,
        password,
      }); // Request to register new user

      notifications.show({
        title: 'Success',
        message: 'Successfully created an account!',
        color: 'green',
        autoClose: 1500,
      }); // Show success notification for successful registration

      setUser(data.user); // Set authenticated user data
      setCookie('token', data.token, 7); // Set authentication token in cookie for 7 days

      navigate('/dashboard'); // Redirect to dashboard after successful registration
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'An error occurred',
        color: 'red',
        autoClose: 1500,
      }); // Show error notification for registration error
    } finally {
      setRegistering(false); // Set registering state to false after registration attempt
    }
  };

  const logout = async () => {
    setLoggingOut(true); // Set logging out state to true during logout process

    try {
      deleteCookie('token'); // Delete authentication token from cookie
      setUser(null); // Set authenticated user data to null

      notifications.show({
        title: 'Success',
        message: 'Successfully logged out!',
        color: 'green',
        autoClose: 1500,
      }); // Show success notification for successful logout

      navigate('/login'); // Redirect to login page after successful logout
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'An error occurred',
        color: 'red',
        autoClose: 1500,
      }); // Show error notification for logout error
    } finally {
      setLoggingOut(false); // Set logging out state to false after logout attempt
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
