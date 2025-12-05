import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../lib/api'; // Adjust the import based on your API utility file

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/me'); // Adjust the endpoint as necessary
        setUser(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      setUser(response.data);
      router.push('/'); // Redirect to home after login
    } catch (err) {
      setError(err);
    }
  };

  const signup = async (userData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      setUser(response.data);
      router.push('/'); // Redirect to home after signup
    } catch (err) {
      setError(err);
    }
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
      setUser(null);
      router.push('/auth/login'); // Redirect to login after logout
    } catch (err) {
      setError(err);
    }
  };

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
  };
};