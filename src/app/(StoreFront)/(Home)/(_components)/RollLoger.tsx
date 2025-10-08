// src/app/_components/RoleLogger.tsx
"use client";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RoleLogger() {
  const role = useSelector((state: RootState) => state.role.selected);

  useEffect(() => {
    // console.log("Selected role:", role);
  }, [role]);

  return null; // you don’t need to render anything
}
