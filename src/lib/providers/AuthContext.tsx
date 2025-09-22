"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

type AuthContextType = {
  user: string | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [authData] = useState<AuthContextType>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    // setAuthData({ user, isAuthenticated });
  }, [user, isAuthenticated]);

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy use
export const useAuthContext = () => useContext(AuthContext);
