
import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateUniqueUserId } from '../utils/idGenerator';
import { validateDataIntegrity } from '../utils/cvStorage';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('cv_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        console.log('Restored user session:', parsedUser.id, parsedUser.name);
      }
      
      // Run data integrity check on app load
      validateDataIntegrity();
    } catch (error) {
      console.error('Error restoring user session:', error);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('cv_users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const userWithoutPassword = { id: foundUser.id, email: foundUser.email, name: foundUser.name };
        setUser(userWithoutPassword);
        localStorage.setItem('cv_user', JSON.stringify(userWithoutPassword));
        console.log('User logged in:', foundUser.id, foundUser.name);
        
        // Run data integrity check after login
        validateDataIntegrity();
        return true;
      }
      console.log('Login failed for email:', email);
      return false;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('cv_users') || '[]');
      
      if (users.find((u: any) => u.email === email)) {
        console.log('Registration failed - user already exists:', email);
        return false; // User already exists
      }

      const newUserId = generateUniqueUserId();
      const newUser = {
        id: newUserId,
        email,
        password,
        name
      };

      users.push(newUser);
      localStorage.setItem('cv_users', JSON.stringify(users));
      console.log('New user registered:', newUserId, name);
      
      const userWithoutPassword = { id: newUser.id, email: newUser.email, name: newUser.name };
      setUser(userWithoutPassword);
      localStorage.setItem('cv_user', JSON.stringify(userWithoutPassword));
      
      // Run data integrity check after registration
      validateDataIntegrity();
      return true;
    } catch (error) {
      console.error('Error during registration:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cv_user');
    console.log('User logged out');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
