

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { QRCodeCanvas } from "qrcode.react";
// import cardBody from "@/../public/image/shapes/studentId/something body.svg";

// const IDCard: React.FC = () => {
//   const qrData = "CSE/1233/B+/12122000/+65-2131-XXXX";

//   // State for single color (both header and footer)
//   const [accentColor, setAccentColor] = useState("#000F30"); // Default dark blue

//   return (
//     <div className="flex flex-col items-center gap-4 p-4">
//       {/* Color Control - Single picker for both top and bottom */}
//       <div className="flex gap-4 mb-4">
//         <div className="flex flex-col items-center">
//           <label className="text-sm mb-1">Accent Color</label>
//           <input
//             type="color"
//             value={accentColor}
//             onChange={(e) => setAccentColor(e.target.value)}
//             className="w-12 h-8 rounded cursor-pointer"
//           />
//         </div>
//       </div>

//       <div className="relative w-[350px] h-[600px] overflow-hidden rounded-lg shadow-lg font-sans">
//         {/* Middle Section - PNG Image with z-index 0 */}
//         <div className="absolute top-0 left-0 w-full h-full z-0">
//           <Image
//             src={cardBody}
//             alt="Middle Layer"
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* Top Section - SVG with custom color */}
//         <div className="absolute top-0 left-0 w-full z-1">
        
//           <svg
//             width="220"
//             height="140"
//             viewBox="0 0 204 140"
//             className="w-full h-full"
//             preserveAspectRatio="none"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M204 0H0V108.586C111.5 197.865 204 84 204 84V0Z"
//               fill={accentColor}
//             />
//           </svg>
//         </div>

//         {/* Bottom Section - SVG with same custom color */}
//         <div className="absolute -bottom-5 left-0 w-full  z-1">
         
//           <svg
//             width="206"
//             height="70"
//             viewBox="0 0 204 73"
//             className="w-full h-full"
//             preserveAspectRatio="none"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M-2.32022e-06 74L204 74L204 44C204 44 32 56 -1.52588e-05 3.56685e-05L-2.32022e-06 74Z"
//               fill={accentColor}
//             />
//           </svg>
//         </div>

//         {/* Content Layer - z-index 10 (highest) */}
//         <div className="relative z-10 flex h-full w-full flex-col px-1">
//           {/* Institution Info */}
//           <div className="mt-4 flex flex-col items-center">
//             <Image
//               src="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//               alt="Logo"
//               width={50}
//               height={50}
//               className="rounded-md bg-white object-contain"
//             />
//             <div className="w-full">
//               <p className="text-center pt-1 text-[15px] font-semibold max-w-[313px] mx-auto text-white">
//                 Eastern Mine Awesome Beautiful school and college
//               </p>
//               <p className="mt-1 text-center text-[12px] text-gray-300">
//                 Dummy address 21A/B mine union point, Singapore
//               </p>
//             </div>
//             <p className="absolute top-[143px] rounded border border-gray-400 px-2 py-[2px] text-[11px] leading-tight text-gray-300">
//               Student ID
//             </p>
//           </div>

//           {/* Person Image */}
//           <div className="absolute top-[170px] left-1/2 -translate-x-1/2 h-[140px] w-[140px] overflow-hidden rounded-full border-[6px] border-[#2E9DA6] bg-white">
//             <Image
//               src="https://i.postimg.cc/Y0ydK27n/person.jpg"
//               alt="Student"
//               fill
//               className="object-cover"
//             />
//           </div>

//           {/* Name */}
//           <p className="absolute top-[320px] w-full text-[17px] text-center font-bold text-blue-700">
//             Mark Marshal
//           </p>

//           {/* Info Section */}
//           <div className="absolute top-[349px] ml-17 w-[250px] text-[12.5px] text-black">
//             <div className="flex gap-1">
//               {/* Labels */}
//               <div className="w-[75px]">
//                 <p className="my-1.5">Department</p>
//                 <p className="my-1.5">Roll</p>
//                 <p className="my-1.5">Blood Group</p>
//                 <p className="my-1.5">Date of Birth</p>
//                 <p className="my-1.5">Phone</p>
//               </div>
//               {/* Values */}
//               <div className="ml-1 w-[150px] overflow-hidden">
//                 <p className="my-1.5">:&nbsp;CSE</p>
//                 <p className="my-1.5">:&nbsp;1233</p>
//                 <p className="my-1.5">:&nbsp;B+</p>
//                 <p className="my-1.5">:&nbsp;12-12-2000</p>
//                 <p className="my-1.5">:&nbsp;+65-2131-XXXX </p>
//               </div>
//             </div>
//           </div>

//           {/* QR Code */}
//           <div className="absolute bottom-[42px] left-1/2 -translate-x-1/2">
//             <QRCodeCanvas value={qrData} size={50} />
//           </div>

//           {/* Principal Signature */}
//           <div className="mt-auto mb-8 mr-3 flex justify-end">
//             <div>
//               <Image
//                 src="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//                 alt="Principal Signature"
//                 width={80}
//                 height={50}
//                 className="object-contain"
//               />
//               <p className="m-0 text-center text-[9px] text-black">
//                 Principal Signature
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default IDCard;

import StudentCard from '@/components/layout/cards/StudentCard';
import EmpIDCard from '@/components/layout/cards/EmployeCard';
import React from 'react';

const page = () => {
  return (
    <div>
      {/* <StudentCard/>
      <EmpIDCard/> */}
    </div>
  );
};

export default page;