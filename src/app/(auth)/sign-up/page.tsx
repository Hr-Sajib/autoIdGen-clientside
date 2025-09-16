"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiIdCard } from "react-icons/bi";

const AutoIDGenSignup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const payload = { fullName, email, password, confirmPassword, agree };
//   console.log(payload);


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      {/* Card */}
      <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex space-x-2 mb-5 self-center text-[#4A61E4] font-bold text-lg"
        >
          <span>
            <BiIdCard size={30} />
          </span>
          <span className="text-[20px]">AutoIDGen</span>
        </Link>

        {/* Title */}
        <h1 className="text-[28px] md:text-[34px] font-bold text-center mb-10 text-gray-900">
          Create Account
        </h1>

        {/* Form */}
        <form className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-black">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Type your Full Name"
              className="h-12 px-4 bg-gray-100/80 rounded-lg"
            />
          </div>

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

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-black"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Type Confirm password"
                className="h-12 px-4 pr-12 bg-gray-100/80 rounded-lg"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300"
            />
            <Label htmlFor="terms" className="text-xs text-gray-600">
              I have read and agreed to the{" "}
                Terms of Service
and
                Privacy Policy
              
            </Label>
          </div>

          {/* Create Account Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg text-base"
          >
            Create Account
          </Button>
        </form>
        <p className="text-center mt-6">Already have an account? <Link href="/login" className="text-[#4A61E4] font-semibold">Log In</Link></p>
      </div>
    </div>
  );
};

export default AutoIDGenSignup;
