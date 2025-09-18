"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/slice/Auth/authSlice";
import { RootState } from "@/lib/store";

const LogOutButton: React.FC = () => {
  const dispatch = useDispatch();

  // 🔹 এখানে আমরা redux থেকে user আর isAuthenticated নিচ্ছি
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // 🔹 যখন user বা isAuthenticated change হবে তখন console.log করবে
  useEffect(() => {
    console.log("👉 Current User:", user);
    console.log("👉 Is Authenticated:", isAuthenticated);
  }, [user, isAuthenticated]);

  // 🔹 Logout বাটনে ক্লিক করলে এই ফাংশন রান করবে
  const handleLogout = () => {
    dispatch(logout());
    console.log("🚪 User logged out!");
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Log Out
    </Button>
  );
};

export default LogOutButton;
