
"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiIdCard } from "react-icons/bi";
import { useLogInMutation } from "@/lib/feature/Auth/authApi";
import {jwtDecode} from "jwt-decode"; // ✅ correct import
import { TUser } from "@/types/inedx";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/lib/slice/Auth/authSlice";

const AutoIDGenLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [logIn, { isLoading }] = useLogInMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 🔹 API call
      const res = await logIn({ email, password }).unwrap();

      // 🔹 Access token extract করা
      const accessToken = res?.data?.accessToken || res?.accessToken;
      if (!accessToken) {
        toast.error("Login failed: Token missing.");
        return;
      }

      // 🔹 Token localStorage এ save করা
      // localStorage.setItem("token", accessToken);
      // console.log("📌 Saved Token:", accessToken);

      // 🔹 JWT decode করে user info পাওয়া
      const decoded = jwtDecode<TUser>(accessToken);

      // 🔹 Redux এ dispatch করা
      dispatch(setUser({ user: decoded, accessToken }));

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);

      // 🔹 safer error handling
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: { message?: string } }).data?.message ===
          "string"
      ) {
        toast.error(
          (error as { data?: { message?: string } }).data?.message
        );
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex space-x-2 mb-5 self-center text-[#4A61E4] font-bold text-lg"
        >
          <span>
            <BiIdCard size={30} />
          </span>
          <Link href="/" className="text-[20px]">AutoIDGen</Link>
        </Link>

        <h1 className="text-[34px] font-bold text-center mb-12 text-gray-900">
          Log In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Your Email"
              className="h-12 px-4 bg-gray-100/80 rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-black">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type Password"
                className="h-12 px-4 pr-12 bg-gray-100/80 rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg text-base"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="text-center mt-6">
          Don&apos;t have any account?{" "}
          <Link href="/sign-up" className="text-[#4A61E4] font-semibold">
            create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AutoIDGenLogin;
