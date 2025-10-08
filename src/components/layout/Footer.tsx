

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiIdCard } from "react-icons/bi";
import React from "react";

const AutoIDGenFooter: React.FC = () => {
  const pathname = usePathname();
  const isHomePath = pathname === "/";

  return (
    <footer className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo and Brand */}
        <div className="mb-6 flex flex-col items-center space-y-2">
          <Link
            href="/"
            className="flex space-x-2 text-[#4A61E4] font-bold text-lg"
          >
            <span>
              <BiIdCard size={30} />
            </span>
            <span className="text-[20px]">AutoIDGen</span>
          </Link>

          <p className="text-black/80 text-[clamp(10px,1.5vw,16px)] leading-relaxed max-w-2xl mx-auto">
            Automated bulk ID card generation for institutions, schools, and
            businesses.
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="mb-8">
          <ul className="flex justify-center space-x-4 lg:space-x-6 text-[clamp(12px,1.5vw,18px)]">
            <li>
              <Link
                href={isHomePath ? "#features" : "/"}
                className="hover:text-blue-500 transition-colors duration-200 font-medium"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href={isHomePath ? "#how-it-works" : "/"}
                className="hover:text-blue-500 transition-colors duration-200 font-medium"
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link
                href="/verify"
                className="hover:text-blue-500 transition-colors duration-200 font-medium"
              >
                Verify ID Card
              </Link>
            </li>
          </ul>
        </nav>

        {/* Decorative Line */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-1 bg-gradient-to-r from-transparent to-[#4A61E4] flex-1 max-w-48"></div>
          <div className="w-3 h-3 bg-[#4A61E4] rounded-full mx-2"></div>
          <div className="h-1 bg-gradient-to-l from-transparent to-[#4A61E4] flex-1 max-w-48"> </div>
        </div>

        {/* Copyright */}
        <p className="text-gray-400 text-sm">
          © 2025 AutoIDGen.com. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default AutoIDGenFooter;
