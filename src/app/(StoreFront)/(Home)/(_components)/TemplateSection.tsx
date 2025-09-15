"use client";

import Image from 'next/image';
import React from 'react';
import studentIdCard from "@/../public/images/StudentIDCard.svg"
import portraitCard from "@/../public/images/EmployeeLandscape.svg"

const TemplateSelection: React.FC = () => {
  // Using placeholder images - replace with your actual imports
//   const studentIdCard = "/api/placeholder/320/200";
//   const portraitCard = "/api/placeholder/320/200";

  const handleTemplate1Click = () => {
    window.open("https://example.com/template/1", '_blank');
  };

  const handleTemplate2Click = () => {
    window.open("https://example.com/template/2", '_blank');
  };

  return (
    <div className="py-16 px-4">
      <div className="">
        {/* Section Header */}
        <div className="text-center pb-16 relative">
          <h2 className="text-[clamp(25px,2.5vw,30px)] font-medium text-[#4A61E4] mb-4 ">
            Select Your Template
          </h2>
          <div className="absolute bottom-0 left-0 w-full h-2 shadow-lg"></div>
        </div>
        <div className='bg-gradient-to-b from-black/2 to-white'>
        {/* Template Cards */}
        <div className="flex max-w-7xl mx-auto flex-col lg:flex-row relative items-center justify-center overflow-hidden gap-16 lg:gap-24 h-[220px] md:h-[450px] lg:h-[800px] ">
          
          {/* Template 1 */}
          <div className="flex flex-col absolute -top-2 lg:-top-15 left-10 md:left-20 items-center cursor-pointer transition-transform hover:scale-105" onClick={handleTemplate1Click}>
            {/* Chain/Keyring */}
            {/* <div className="flex items-center mb-4">
              <div className="w-8 h-3 bg-gray-800 rounded-sm"></div>
              <div className="w-1 h-12 bg-gray-600 mx-1"></div>
              <div className="w-4 h-4 border-2 border-gray-600 rounded-full bg-white"></div>
            </div> */}
            
            {/* ID Card Template */}
            <div className="relative group">
              <Image 
                src={studentIdCard}
                alt="Student ID Card Template"
                // width={320}
                // height={200}
                className="w-[clamp(80px,24vw,340px)] h-auto transition-shadow"
              />
              
              {/* Hover overlay */}
              {/* <div className="absolute ">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-lg">
                    Select Template
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Template 2 */}
          <div className="flex flex-col absolute -top-3 lg:-top-15 right-10 md:right-20 items-center cursor-pointer transition-transform hover:scale-105" onClick={handleTemplate2Click}>
            {/* Chain/Keyring */}
            {/* <div className="flex items-center mb-4">
              <div className="w-8 h-3 bg-gray-800 rounded-sm"></div>
              <div className="w-1 h-12 bg-gray-600 mx-1"></div>
              <div className="w-4 h-4 border-2 border-gray-600 rounded-full bg-white"></div>
            </div> */}
            
            {/* ID Card Template */}
            <div className="relative group">
              <Image 
                src={portraitCard}
                alt="Employee Portrait Card Template"
                // className="w-30 md:w-120 h-auto rounded-lg transition-shadow"
                className="w-[clamp(120px,35vw,580px)] h-auto  transition-shadow"
              />
              
              {/* Hover overlay */}
              {/* <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-lg">
                    Select Template
                  </div>
                </div>
              </div> */}
            </div>
          </div>

        </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;