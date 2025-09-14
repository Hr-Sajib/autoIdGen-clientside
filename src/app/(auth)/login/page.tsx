"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiIdCard } from "react-icons/bi";

const AutoIDGenLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(email, password);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
        {/* Logo */}
       
          <Link href="/" className="flex space-x-2 mb-5 self-center text-[#4A61E4] font-bold text-lg">
            <span><BiIdCard size={30} /></span>
            <span className="text-[20px]">AutoIDGen</span>
          </Link>

        {/* Title */}
        <h1 className="text-[34px] font-bold text-center mb-12 text-gray-900">
          Log In
        </h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-black"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Your Email"
              className="h-12 px-4 bg-gray-100/80 rounded-lg "
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-black"
            >
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

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg text-base"
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AutoIDGenLogin;
