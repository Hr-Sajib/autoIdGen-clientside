"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

type Props = {
  children: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login"); // redirect
    }
  }, [isAuthenticated, router]);

  // Redirect হওয়ার আগে blank না দেখানোর জন্য
  if (!isAuthenticated) {
    return null; // বা spinner দেখাতে পারো
  }

  return <>{children}</>;
};

export default PrivateRoute;
