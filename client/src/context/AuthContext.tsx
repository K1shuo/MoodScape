// client/src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";

// 1. 定义 Context 类型
interface AuthContextType {
  isLoggedIn: boolean;
  login: (token?: string) => void;
  logout: () => void;
}

// 2. 创建 Context
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

// 3. 导出自定义 Hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// 4. 导出 Provider 组件
// 注意这里的变化：使用 React.ReactNode 代替直接的 ReactNode
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return document.cookie.includes("jwt=");
  });

  const login = (token?: string) => {
    setIsLoggedIn(true);
    console.log("User logged in", token ? "with token" : "");
  };

  const logout = () => {
    setIsLoggedIn(false);
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};