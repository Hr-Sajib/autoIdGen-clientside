// lib/hooks/useAuth.ts
"use client"; // ⚠️ Hooks that use useSelector must be client

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export const useAuth = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [auth, setAuth] = useState<boolean>(false);

  // Update state whenever Redux changes
  useEffect(() => {
    setAuth(isAuthenticated);
  }, [isAuthenticated]);

  return auth;
};
