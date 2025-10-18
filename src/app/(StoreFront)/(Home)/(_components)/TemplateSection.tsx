"use client";

import Image from 'next/image';
import React from 'react';
import studentIdCard from "@/../public/images/StudentIDCard.svg"
import portraitCard from "@/../public/images/EmployeeLandscape.svg"
import Link from 'next/link';

const TemplateSelection: React.FC = () => {
  // Using placeholder images - replace with your actual imports
  //   const studentIdCard = "/api/placeholder/320/200";
  //   const portraitCard = "/api/placeholder/320/200";

  return (
    <div className="pb-16">
      <div className="">
        {/* Section Header */}
        <div className="text-center pt-16 pb-10 relative">
          <h2 className="text-[clamp(25px,2.5vw,30px)] font-bold text-[#4A61E4] mb-2">
            Select Your Template
          </h2>
          <p className="text-[clamp(16px,2.5vw,18px)] text-gray-500">
            Choose A Proffessional Template To Get Started
          </p>
          <div className="absolute bottom-0 left-0 w-full h-2 shadow-lg"></div>
        </div>
        <div className='bg-gradient-to-b from-black/2 to-white'>
          {/* Template Cards */}
          <div className="flex max-w-7xl mx-auto flex-col lg:flex-row relative items-center justify-center overflow-hidden gap-16 lg:gap-24 h-[220px] md:h-[450px] lg:h-[800px] ">

            <div className="flex flex-col absolute -top-2 lg:-top-15 left-10 md:left-20 items-center cursor-pointer transition-transform hover:scale-105">
              <Link href="/dashboard">
                <div className="relative group">
                  <Image
                    src={studentIdCard}
                    alt="Student ID Card Template"
                    // width={320}
                    // height={200}
                    className="w-[clamp(80px,24vw,340px)] h-auto transition-shadow"
                  />
                </div>
              </Link>
            </div>

            <div className="flex flex-col absolute -top-3 lg:-top-15 right-10 md:right-20 items-center cursor-pointer transition-transform hover:scale-105">
              <Link href="/dashboard">
                <div className="relative group">
                  <Image
                    src={portraitCard}
                    alt="Employee Portrait Card Template"
                    // className="w-30 md:w-120 h-auto rounded-lg transition-shadow"
                    className="w-[clamp(120px,35vw,580px)] h-auto  transition-shadow"
                  />
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div >
  );
};

export default TemplateSelection;