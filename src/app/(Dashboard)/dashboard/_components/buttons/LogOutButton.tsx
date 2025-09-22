"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/slice/Auth/authSlice";
import { RootState } from "@/lib/store";
import { cn } from "@/lib/utils";
// import { LogOutButtonProps } from "@/components/layout/Dashboard/Sidebar";
export interface LogOutButtonProps {
    isDesktopCollapsed?: boolean;
}

const LogOutButton: React.FC = ({ isDesktopCollapsed }: LogOutButtonProps) => {
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
      <Button
      onClick={handleLogout}
                                variant="ghost"
                                className={cn(
                                    "w-full text-gray-600 hover:text-gray-900 transition-all duration-200",
                                    isDesktopCollapsed ? "md:justify-center md:px-2" : "justify-start gap-3",
                                )}
                            >
                                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span className={cn("transition-opacity duration-200", isDesktopCollapsed ? "md:hidden" : "block")}>
                                    Sign Out
                                </span>
                            </Button>
  );
};

export default LogOutButton;
