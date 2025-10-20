// "use client";

// import Image from 'next/image';
// import React from 'react';
// import studentIdCard from "@/../public/images/StudentIDCard.svg"
// import portraitCard from "@/../public/images/EmployeeLandscape.svg"
// import Link from 'next/link';

// const TemplateSelection: React.FC = () => {
//   // Using placeholder images - replace with your actual imports
//   //   const studentIdCard = "/api/placeholder/320/200";
//   //   const portraitCard = "/api/placeholder/320/200";

//   return (
//     <div className="pb-16">
//       <div className="">
//         {/* Section Header */}
//         <div className="text-center pt-16 pb-10 relative">
//           <h2 className="text-[clamp(25px,2.5vw,30px)] font-bold text-[#4A61E4] mb-2">
//             Select Your Template
//           </h2>
//           <p className="text-[clamp(16px,2.5vw,18px)] text-gray-500">
//             Choose A Professional Template To Get Started
//           </p>
//           <div className="absolute bottom-0 left-0 w-full h-2 shadow-lg"></div>
//         </div>
//         <div className='bg-gradient-to-b from-black/2 to-white'>
//           {/* Template Cards */}
//           <div className="flex max-w-7xl mx-auto flex-col lg:flex-row relative items-center justify-center overflow-hidden gap-16 lg:gap-24 h-[220px] md:h-[450px] lg:h-[800px] ">

//             <div className="flex flex-col absolute -top-2 lg:-top-15 left-10 md:left-20 items-center cursor-pointer transition-transform hover:scale-105">
//               <Link href="/dashboard">
//                 <div className="relative group">
//                   <Image
//                     src={studentIdCard}
//                     alt="Student ID Card Template"
//                     // width={320}
//                     // height={200}
//                     className="w-[clamp(80px,24vw,340px)] h-auto transition-shadow"
//                   />
//                 </div>
//               </Link>
//             </div>

//             <div className="flex flex-col absolute -top-3 lg:-top-15 right-10 md:right-20 items-center cursor-pointer transition-transform hover:scale-105">
//               <Link href="/dashboard">
//                 <div className="relative group">
//                   <Image
//                     src={portraitCard}
//                     alt="Employee Portrait Card Template"
//                     // className="w-30 md:w-120 h-auto rounded-lg transition-shadow"
//                     className="w-[clamp(120px,35vw,580px)] h-auto  transition-shadow"
//                   />
//                 </div>
//               </Link>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div >
//   );
// };

// export default TemplateSelection;









// "use client";

// import Image from 'next/image';
// import React, { useState, useEffect } from 'react';
// import studentIdCard from "@/../public/images/StudentIDCard.svg"
// import portraitCard from "@/../public/images/EmployeeLandscape.svg"

// const TemplateSelection: React.FC = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStyle, setSelectedStyle] = useState('');
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     if (showModal) {
//       document.body.classList.add('overflow-hidden');
//     } else {
//       document.body.classList.remove('overflow-hidden');
//     }

//     return () => {
//       document.body.classList.remove('overflow-hidden');
//     };
//   }, [showModal]);

//   const openModal = ( style: string) => {

//     setSelectedStyle(style);
//     setInputValue('');
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setInputValue('');
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Input value:', inputValue);
//     console.log('Style:', selectedStyle);
//   };

//   // Using placeholder images - replace with your actual imports
//   //   const studentIdCard = "/api/placeholder/320/200";
//   //   const portraitCard = "/api/placeholder/320/200";

//   return (
//     <div className="pb-16">
//       <div className="">
//         {/* Section Header */}
//         <div className="text-center pt-16 pb-10 relative">
//           <h2 className="text-[clamp(25px,2.5vw,30px)] font-bold text-[#4A61E4] mb-2">
//             Select Your Template
//           </h2>
//           <p className="text-[clamp(16px,2.5vw,18px)] text-gray-500">
//             Choose A Professional Template To Get Started
//           </p>
//           <div className="absolute bottom-0 left-0 w-full h-2 shadow-lg"></div>
//         </div>
//         <div className='bg-gradient-to-b from-black/2 to-white'>
//           {/* Template Cards */}
//           <div className="flex max-w-7xl mx-auto flex-col lg:flex-row relative items-center justify-center overflow-hidden gap-16 lg:gap-24 h-[220px] md:h-[450px] lg:h-[800px] ">

//             <div className="flex flex-col absolute -top-2 lg:-top-15 left-10 md:left-20 items-center cursor-pointer transition-transform hover:scale-105">
//               <div 
//                 className="relative group"
//                 onClick={() => openModal( "horizontal")}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     openModal( "horizontal");
//                   }
//                 }}
//               >
//                 <Image
//                   src={studentIdCard}
//                   alt="Student ID Card Template"
//                   // width={320}
//                   // height={200}
//                   className="w-[clamp(80px,24vw,340px)] h-auto transition-shadow"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col absolute -top-3 lg:-top-15 right-10 md:right-20 items-center cursor-pointer transition-transform hover:scale-105">
//               <div 
//                 className="relative group"
//                 onClick={() => openModal( "vertical")}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' || e.key === ' ') {
//                     openModal( "vertical");
//                   }
//                 }}
//               >
//                 <Image
//                   src={portraitCard}
//                   alt="Employee Portrait Card Template"
//                   // className="w-30 md:w-120 h-auto rounded-lg transition-shadow"
//                   className="w-[clamp(120px,35vw,580px)] h-auto  transition-shadow"
//                 />
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div 
//           className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
//           onClick={closeModal}
//         >
//           <div 
//             className="bg-white p-4 rounded-lg max-w-md mx-4 relative"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//               <input
//                 type="text"
//                 value={inputValue}
//                 onChange={(e) => setInputValue(e.target.value)}
//                 placeholder="Enter some value..."
//                 className="w-full p-2 border border-gray-300 rounded-md"
//               />
//               <div className="flex space-x-2">
//                 <button 
//                   type="submit"
//                   className="flex-1 bg-[#4A61E4] text-white px-4 py-2 rounded"
//                 >
//                   Submit
//                 </button>
//                 <button 
//                   type="button"
//                   onClick={closeModal}
//                   className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded"
//                 >
//                   Close
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div >
//   );
// };

// export default TemplateSelection;








"use client";

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import studentIdCard from "@/../public/images/StudentIDCard.svg"
import portraitCard from "@/../public/images/EmployeeLandscape.svg"

const TemplateSelection: React.FC = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [showModal]);

  const openModal = ( style: string) => {

    setSelectedStyle(style);
    setInputValue('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Input value:', inputValue);
    console.log('Style:', selectedStyle);
    router.push(`/dashboard/card-template-setup?project=${inputValue}&style=${selectedStyle}`);
  };

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
            Choose A Professional Template To Get Started
          </p>
          <div className="absolute bottom-0 left-0 w-full h-2 shadow-lg"></div>
        </div>
        <div className='bg-gradient-to-b from-black/2 to-white'>
          {/* Template Cards */}
          <div className="flex max-w-7xl mx-auto flex-col lg:flex-row relative items-center justify-center overflow-hidden gap-16 lg:gap-24 h-[220px] md:h-[450px] lg:h-[800px] ">

            <div className="flex flex-col absolute -top-2 lg:-top-15 left-10 md:left-20 items-center cursor-pointer transition-transform hover:scale-105">
              <div 
                className="relative group"
                onClick={() => openModal( "horizontal")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openModal( "horizontal");
                  }
                }}
              >
                <Image
                  loading="lazy"
                  src={studentIdCard}
                  alt="Student ID Card Template"
                  // width={320}
                  // height={200}
                  className="w-[clamp(80px,24vw,340px)] h-auto transition-shadow"
                />
              </div>
            </div>

            <div className="flex flex-col absolute -top-3 lg:-top-15 right-10 md:right-20 items-center cursor-pointer transition-transform hover:scale-105">
              <div 
                className="relative group"
                onClick={() => openModal( "vertical")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openModal( "vertical");
                  }
                }}
              >
                <Image
                  loading="lazy"
                  src={portraitCard}
                  alt="Employee Portrait Card Template"
                  // className="w-30 md:w-120 h-auto rounded-lg transition-shadow"
                  className="w-[clamp(120px,35vw,580px)] h-auto  transition-shadow"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white p-6 rounded-lg max-w-lg mx-4 relative w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl leading-none"
            >
              ×
            </button>
            <h1 className='text-center font-semibold'>Create New Project</h1>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <label className="block text-sm font-medium text-gray-700">Project Name</label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your project name..."
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <div className="flex space-x-2">
                <button 
                  type="submit"
                  className="flex-1 bg-[#4A61E4] text-white px-4 py-2 rounded"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div >
  );
};

export default TemplateSelection;