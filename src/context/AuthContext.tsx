// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserType, Certificate } from '../components/types';

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
  department?: string;
  createdAt?: string;
  certificates: Certificate[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        // In a real app, you would verify the token with your backend
        const token = localStorage.getItem('token');
        if (token) {
          // Mock user data - replace with actual API call
          const mockUser: User = {
            id: '123',
            name: 'John Doe',
            email: 'john@example.com',
            type: 'student',
            department: 'Computer Science',
            createdAt: new Date().toISOString(),
            certificates: [
              {
                id: 1,
                title: 'Web Development Workshop',
                issuedDate: '2023-10-15',
                eventId: 101,
                userId: 123
              },
              {
                id: 2,
                title: 'AI Fundamentals',
                issuedDate: '2023-11-20',
                eventId: 205,
                userId: 123
              }
            ]
          };
          setUser(mockUser);
        }
      } catch (err) {
        setError('Failed to check authentication');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock login - replace with actual API call
      if (email === 'student@example.com' && password === 'password') {
        const mockUser: User = {
          id: '123',
          name: 'Student User',
          email: 'student@example.com',
          type: 'student',
          department: 'Computer Science',
          createdAt: new Date().toISOString(),
          certificates: [
            {
              id: 1,
              title: 'Web Development Workshop',
              issuedDate: '2023-10-15',
              eventId: 101,
              userId: 123
            }
          ]
        };
        localStorage.setItem('token', 'mock-token');
        setUser(mockUser);
      } else if (email === 'organizer@example.com' && password === 'password') {
        const mockUser: User = {
          id: '456',
          name: 'Organizer User',
          email: 'organizer@example.com',
          type: 'organizer',
          createdAt: new Date().toISOString(),
          certificates: []
        };
        localStorage.setItem('token', 'mock-token');
        setUser(mockUser);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};