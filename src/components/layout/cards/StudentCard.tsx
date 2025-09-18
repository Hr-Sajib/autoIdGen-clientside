// // src/components/StudentCard.tsx
// "use client";
// import React from "react";
// import Image from "next/image";
// import { QRCodeCanvas } from "qrcode.react";
// import background from "@/../public/image/shapes/studentId/landscape_id_card_bg.svg"; // single svg bg

// const StudentCard: React.FC = () => {
//   const qrData = "CSE/1233/B+/12122000/+65-2131-XXXX";

//   return (
//     <div
//       className="relative w-[350px] h-[600px] rounded-lg overflow-hidden shadow-lg font-sans"
//       style={{
//         backgroundImage: `url(${background.src})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay layer if needed */}
//       <div className="absolute inset-0"></div>

//       {/* Foreground Content */}
//       <div className="relative z-10 h-full w-full px-3">
//         {/* Institution Info */}
//         <div className="mt-5 flex flex-col items-center">
//           <Image
//             src="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//             alt="School Logo"
//             width={60}
//             height={60}
//             className="rounded-md bg-white object-contain shadow-md"
//           />
//           <p className="text-center pt-1 text-[15px] font-bold text-white max-w-[300px]">
//             Eastern Mine Awesome Beautiful School & College
//           </p>
//           <p className="mt-1 text-center text-[12px] text-gray-200">
//             Dummy address 21A/B mine union point, Singapore
//           </p>

//           {/* Student ID Label */}
//           <p className="absolute top-[140px] rounded border border-gray-300 px-2 py-[2px] text-[11px] text-gray-100 bg-black/30">
//             Student ID
//           </p>
//         </div>

//         {/* Student Photo */}
//         <div className="absolute top-[170px] left-1/2 -translate-x-1/2 w-[140px] h-[140px] rounded-full border-[6px] border-[#2E9DA6] bg-white overflow-hidden">
//           <Image
//             src="https://i.postimg.cc/Y0ydK27n/person.jpg"
//             alt="Student"
//             fill
//             className="object-cover object-center"
//           />
//         </div>

//         {/* Student Name */}
//         <p className="absolute top-[318px] w-full text-center text-[18px] font-bold text-blue-700">
//           Mark Marshal
//         </p>

//         {/* Student Info */}
//         <div className="absolute top-[345px] left-1/2 -translate-x-1/2 w-[260px] text-[12.5px] text-black">
//           <div className="flex gap-1">
//             {/* Labels */}
//             <div className="w-[90px] font-medium text-gray-700">
//               <p className="my-1.5">Department</p>
//               <p className="my-1.5">Roll</p>
//               <p className="my-1.5">Blood Group</p>
//               <p className="my-1.5">Date Of Birth</p>
//               <p className="my-1.5">Phone</p>
//             </div>
//             {/* Values */}
//             <div className="ml-1 w-[160px]">
//               <p className="my-1.5">:&nbsp;CSE</p>
//               <p className="my-1.5">:&nbsp;1233</p>
//               <p className="my-1.5">:&nbsp;B+</p>
//               <p className="my-1.5">:&nbsp;12-12-2000</p>
//               <p className="my-1.5">:&nbsp;+65-2131-XXXX</p>
//             </div>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2">
//           <QRCodeCanvas value={qrData} size={55} bgColor="#fff" fgColor="#000" level="H" />
//         </div>

//         {/* Principal Signature */}
//         <div className="absolute bottom-[55px] right-[20px] text-center">
//           <Image
//             src="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//             alt="Principal Signature"
//             width={75}
//             height={45}
//             className="object-contain"
//           />
//           <p className="text-[9px] text-black">Principal Signature</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentCard;



// src/components/StudentCard.tsx
"use client";
import React from "react";
import Image from "next/image";
import { QRCodeCanvas } from "qrcode.react";
import background from "@/../public/image/shapes/studentId/landscape_id_card_bg.svg";

interface StudentCardProps {
  instituteName: string;
  address: string;
  idCardType: string;
  logoUrl?: string;
  signatureUrl?: string;
  profileUrl?: string;
  studentName: string;
  department: string;
  roll: string;
  bloodGroup: string;
  dob: string;
  phone: string;
  qrData: string;
  bgColor?: string;
}

const StudentCard: React.FC<StudentCardProps> = ({
  instituteName,
  address,
  idCardType,
  logoUrl,
  signatureUrl,
  profileUrl,
  studentName,
  department,
  roll,
  bloodGroup,
  dob,
  phone,
  qrData,
  bgColor,
}) => {
  return (
    <div
      className="relative w-[350px] h-[600px] rounded-lg overflow-hidden shadow-lg font-sans"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 h-full w-full px-3">
        {/* Institution Info */}
        <div className="mt-5 flex flex-col items-center">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="School Logo"
              width={60}
              height={60}
              className="rounded-md bg-white object-contain shadow-md"
            />
          )}
          <p className="text-center pt-1 text-[15px] font-bold text-white max-w-[300px]">
            {instituteName}
          </p>
          <p className="mt-1 text-center text-[12px] text-gray-200">{address}</p>

          {/* ID Type */}
          <p className="absolute top-[140px] rounded border border-gray-300 px-2 py-[2px] text-[11px] text-gray-100 bg-black/30">
            {idCardType}
          </p>
        </div>

        {/* Student Photo */}
        <div className="absolute top-[170px] left-1/2 -translate-x-1/2 w-[140px] h-[140px] rounded-full border-[6px] border-[#2E9DA6] bg-white overflow-hidden">
          <Image
            src={profileUrl || "https://via.placeholder.com/100"}
            alt="Student"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Student Name */}
        <p className="absolute top-[318px] w-full text-center text-[18px] font-bold text-blue-700">
          {studentName}
        </p>

        {/* Student Info */}
        <div className="absolute top-[345px] left-1/2 -translate-x-1/2 w-[260px] text-[12.5px] text-black">
          <div className="flex gap-1">
            {/* Labels */}
            <div className="w-[90px] font-medium text-gray-700">
              <p className="my-1.5">Department</p>
              <p className="my-1.5">Roll</p>
              <p className="my-1.5">Blood Group</p>
              <p className="my-1.5">Date Of Birth</p>
              <p className="my-1.5">Phone</p>
            </div>
            {/* Values */}
            <div className="ml-1 w-[160px]">
              <p className="my-1.5">:&nbsp;{department}</p>
              <p className="my-1.5">:&nbsp;{roll}</p>
              <p className="my-1.5">:&nbsp;{bloodGroup}</p>
              <p className="my-1.5">:&nbsp;{dob}</p>
              <p className="my-1.5">:&nbsp;{phone}</p>
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2">
          <QRCodeCanvas value={qrData} size={55} bgColor="#fff" fgColor="#000" level="H" />
        </div>

        {/* Principal Signature */}
        {signatureUrl && (
          <div className="absolute bottom-[55px] right-[20px] text-center">
            <Image
              src={signatureUrl}
              alt="Principal Signature"
              width={75}
              height={45}
              className="object-contain"
            />
            <p className="text-[9px] text-black">Principal Signature</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
