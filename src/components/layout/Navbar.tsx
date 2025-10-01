"use client";
import Link from "next/link";
import { BiIdCard } from "react-icons/bi";

export default function Navbar() {
  return (
    <nav className="bg-[#4A61E4] text-white">
      <div className="max-w-7xl mx-auto 
     md:pt-6 pb-4 px-2">
        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-center h-16">
          {/* Left - Logo */}
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
            <span><BiIdCard size={30} /></span>
            <span className="text-[20px]">AutoIDGen</span>
          </Link>

          {/* Center - Links */}
          <div className="flex space-x-8 text-[18px]">
            <a href="#features" className="hover:opacity-80">Features</a>
            <a href="#how-it-works" className="hover:opacity-80">How It Works</a>
            <a href="/verify" className="hover:opacity-80">Verify ID Card</a>
          </div>

          {/* Right - Button */}
          <div>
            <Link href="/login" className="bg-white text-[#4A61E4] py-4 px-6 rounded-2xl font-medium hover:bg-gray-100 transition">
              Log In
            </Link>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col md:hidden py-4 space-y-4">
          {/* Top - Links */}
          <div className="flex justify-center space-x-8 text-[clamp(12px,2vw,14px)]">
            <a href="#features" className="hover:opacity-80">Features</a>
            <a href="#how-it-works" className="hover:opacity-80">How It Works</a>
            <a href="/verify" className="hover:opacity-80">Verify ID Card</a>
          </div>

          {/* Bottom - Logo + Button */}
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
              <span><BiIdCard size={30} /></span>
              <span className="text-[20px]">AutoIDGen</span>
            </Link>
            <Link href="/login" className="bg-white text-blue-600 px-4 py-1 rounded-lg font-medium hover:bg-gray-100 transition">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
