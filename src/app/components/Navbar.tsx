"use client";
import { BiIdCard } from "react-icons/bi";

export default function Navbar() {
  return (
    <nav className="bg-[#4A61E4]/10 text-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-center h-16">
          {/* Left - Logo */}
          <div className="flex items-center space-x-2 font-bold text-lg">
            <span><BiIdCard size={30} /></span>
            <span className="text-[20px]">AutoIDGen</span>
          </div>

          {/* Center - Links */}
          <div className="flex space-x-8 text-[18px]">
            <a href="#features" className="hover:opacity-80">Features</a>
            <a href="#how-it-works" className="hover:opacity-80">How It Works</a>
            <a href="#contact" className="hover:opacity-80">Contact Us</a>
          </div>

          {/* Right - Button */}
          <div>
            <button className="bg-white text-[#4A61E4] px-4 py-1 rounded-lg font-medium hover:bg-gray-100 transition">
              Log In
            </button>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col md:hidden py-4 space-y-4">
          {/* Top - Links */}
          <div className="flex justify-center space-x-6 text-[18px]">
            <a href="#features" className="hover:opacity-80">Features</a>
            <a href="#how-it-works" className="hover:opacity-80">How It Works</a>
            <a href="#contact" className="hover:opacity-80">Contact Us</a>
          </div>

          {/* Bottom - Logo + Button */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 font-bold text-lg">
              <span><BiIdCard size={30} /></span>
              <span className="text-[20px]">AutoIDGen</span>
            </div>
            <button className="bg-white text-blue-600 px-4 py-1 rounded-lg font-medium hover:bg-gray-100 transition">
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
