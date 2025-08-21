"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import authService from "@/services/auth.service";

interface AuthContextType {
  user: any;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData.user);
      setToken(userData.token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (userData: any) => {
    const response = await authService.login(userData);
    setUser(response.user);
    setToken(response.token);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(response));
  };

  const register = async (userData: any) => {
    const response = await authService.register(userData);
    // Optionally log in the user after successful registration
    // setUser(response.user);
    // setToken(response.token);
    // setIsAuthenticated(true);
    // localStorage.setItem("user", JSON.stringify(response));
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
