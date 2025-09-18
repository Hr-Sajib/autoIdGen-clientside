// // //? before dynamic 
// // // src/components/EmployeeCard.tsx
// "use client";
// import React from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg"; // ✅ imported bg
// import Image from "next/image";

// const EmployeeCard: React.FC = () => {
//   const qrData = `${"ABC Group of Industries"}/Sales/1233/B+/+65-2131-XXXX`;

//   return (
//     <div
//       className="relative w-[600px] h-[350px] rounded-lg overflow-hidden shadow-lg"
//       style={{
//         backgroundImage: `url(${background.src})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="relative z-10 w-full h-full flex flex-col justify-start">
//         {/* Institution Info */}
//         <div className="flex items-center ml-[200px] mt-6 w-[350px]">
//           <Image
//             src="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//             alt="Company Logo"
//             width={50}
//             height={50}
//             className="rounded-md object-contain bg-white"
//           />
//           <div className="w-full">
//             <p className="text-white text-[16px] font-bold text-center">
//               ABC Group of Industries
//             </p>
//             <p className="text-center text-gray-300 text-[10px] mt-1">
//               Dummy address 21A/B mine union point, Singapore
//             </p>
//           </div>
//         </div>

//         {/* Employee ID Label */}
//         <p className="absolute top-4 left-[80px] text-[9px] text-gray-500 border border-gray-500 px-1.5 py-0.5 rounded text-center">
//           Employee ID
//         </p>

//         {/* Person Image */}
//         <div className="absolute top-[70px] left-[28px]">
//           <Image
//             src="https://i.postimg.cc/Y0ydK27n/person.jpg"
//             alt="Employee Photo"
//             width={170}
//             height={170}
//             className="w-[170px] h-[170px] rounded-full border-[6px] border-white object-cover object-center"
//           />
//         </div>

//         {/* Name */}
//         <p className="absolute top-[110px] left-[35px] right-0 text-center text-[22px] font-bold text-cyan-400">
//           John Marshal
//         </p>

//         {/* Details */}
//         <div className="absolute top-[165px] left-[230px] w-[260px] text-[12.5px]  text-white flex justify-center">
//           <div className="w-4/12 space-y-0.5 pr-2">
//             <p>Department</p>
//             <p>Employee ID</p>
//             <p>Blood Group</p>
//                 <p>Date Of Birth</p>
//             <p>Phone</p>
//           </div>
//           <div className="w-7/12 space-y-0.5 pl-2 text-left">
//             <p>: Sales</p>
//             <p>: 1233</p>
//             <p>: B+</p>
//              <p>: 12-12-2000</p>
//             <p>: +65-2131-XXXX</p>
//           </div>
//         </div>

//         {/* Principal Signature */}
//         <div className="absolute bottom-[20px] left-[80px] text-center">
//           <Image
//             src="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//             alt="Chairman Signature"
//             width={80}
//             height={40}
//             className="object-contain"
//           />
//           <p className="m-0 text-[10px]">Chairman Signature</p>
//         </div>

//         {/* QR Code */}
//         <div className="absolute bottom-[50px] left-[530px] -translate-x-1/2 border-[3px] border-white rounded">
//           <QRCodeCanvas
//             value={qrData}
//             size={55}
//             bgColor="#ffffff"
//             fgColor="#000000"
//             level="H"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCard;



// src/components/EmployeeCard.tsx
// "use client";
// import React from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg";
// import Image from "next/image";

// const EmployeeCard: React.FC = () => {
//   const qrData = `${"ABC Group of Industries"}/Sales/1233/B+/+65-2131-XXXX`;

//   return (
//     <div className="w-full max-w-[700px] aspect-[600/350] rounded-lg overflow-hidden shadow-lg mx-auto relative"
//       style={{
//         backgroundImage: `url(${background.src})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0"></div>

//       {/* Card Content */}
//       <div className="relative w-full h-full flex flex-col justify-start">
        
//         {/* Institution Info */}
//         <div className="flex items-center absolute top-[6%] left-[33%] w-[58%]">
//           <Image
//             src="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//             alt="Company Logo"
//             width={0} // next/image requires width & height, but will scale with parent
//             height={0}
//             sizes="10vw"
//             className="w-[10%] h-auto rounded-md object-contain bg-white"
//           />
//           <div className="w-full ml-2">
//             <p className="text-white text-[1.5vw] font-bold text-center leading-tight">
//               ABC Group of Industries
//             </p>
//             <p className="text-center text-gray-300 text-[0.9vw] mt-1">
//               Dummy address 21A/B mine union point, Singapore
//             </p>
//           </div>
//         </div>

//         {/* Employee ID Label */}
//         <p className="absolute top-[2%] left-[13%] text-[0.8vw] text-gray-500 border border-gray-500 px-2 py-0.5 rounded text-center">
//           Employee ID
//         </p>

//         {/* Person Image */}
//         <div className="absolute top-[20%] left-[6%] w-[30%] aspect-square rounded-full border-[0.8vw] border-white overflow-hidden">
//           <Image
//             src="https://i.postimg.cc/Y0ydK27n/person.jpg"
//             alt="Employee Photo"
//             fill
//             className="object-cover object-center"
//           />
//         </div>

//         {/* Name */}
//         <p className="absolute top-[43%] left-[6%] right-0 text-center text-[3vw] font-bold text-cyan-400">
//           John Marshal
//         </p>

//         {/* Details */}
//         <div className="absolute top-[55%] left-[38%] w-[50%] text-[1.7vw] lg:text-[1vw] text-white flex justify-center">
//           <div className="w-3/12 md:4/12 space-y-0.5 pr-2">
//             <p>Department</p>
//             <p>Employee ID</p>
//             <p>Blood Group</p>
//             <p>Date Of Birth</p>
//             <p>Phone</p>
//           </div>
//           <div className="w-7/12 pl-2 text-left space-y-0.5">
//             <p>: Sales</p>
//             <p>: 1233</p>
//             <p>: B+</p>
//             <p>: 12-12-2000</p>
//             <p>: +65-2131-XXXX</p>
//           </div>
//         </div>

//         {/* Principal Signature */}
//         <div className="absolute bottom-[5%] left-[13%] text-center">
//           <Image
//             src="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//             alt="Chairman Signature"
//             width={0}
//             height={0}
//             sizes="8vw"
//             className="w-[8%] h-auto object-contain"
//           />
//           <p className="m-0 text-[0.8vw]">Chairman Signature</p>
//         </div>

//         {/* QR Code */}
//         <div className="absolute bottom-[12%] right-[2%] -translate-x-1/2 border-[0.4vw] border-white rounded">
//           <QRCodeCanvas
//             value={qrData}
//             size={50}
//             bgColor="#ffffff"
//             fgColor="#000000"
//             level="H"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCard;



// src/components/EmployeeCard.tsx
"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg";
import Image from "next/image";

interface EmployeeCardProps {
  companyName: string;
  address: string;
  idCardType: string;
  logoUrl?: string;
  signatureUrl?: string;
  profileUrl?: string;
  employeeName: string;
  department: string;
  employeeId: string;
  bloodGroup: string;
  dob: string;
  phone: string;
  qrData: string;
  bgColor?: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  companyName,
  address,
  idCardType,
  logoUrl,
  signatureUrl,
  profileUrl = "https://i.postimg.cc/Y0ydK27n/person.jpg",
  employeeName,
  department,
  employeeId,
  bloodGroup,
  dob,
  phone,
  qrData,
}) => {
  return (
    <div
      className="relative w-[600px] h-[350px] rounded-lg overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-start">
        {/* Company Info */}
        <div className="flex items-center ml-[200px] mt-6 w-[350px]">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Company Logo"
              width={50}
              height={50}
              className="rounded-md object-contain bg-white"
            />
          )}
          <div className="w-full">
            <p className="text-white text-[16px] font-bold text-center">{companyName}</p>
            <p className="text-center text-gray-300 text-[10px] mt-1">{address}</p>
          </div>
        </div>

        {/* Employee ID Label */}
        <p className="absolute top-4 left-[80px] text-[9px] text-gray-500 border border-gray-500 px-1.5 py-0.5 rounded text-center">
          {idCardType}
        </p>

        {/* Employee Photo */}
        <div className="absolute top-[70px] left-[28px]">
          <Image
            src={profileUrl}
            alt="Employee Photo"
            width={170}
            height={170}
            className="w-[170px] h-[170px] rounded-full border-[6px] border-white object-cover object-center"
          />
        </div>

        {/* Employee Name */}
        <p className="absolute top-[110px] left-[35px] right-0 text-center text-[22px] font-bold text-cyan-400">
          {employeeName}
        </p>

        {/* Details */}
        <div className="absolute top-[165px] left-[230px] w-[260px] text-[12.5px]  text-white flex justify-center">
          <div className="w-4/12 space-y-0.5 pr-2">
            <p>Department</p>
            <p>Employee ID</p>
            <p>Blood Group</p>
            <p>Date Of Birth</p>
            <p>Phone</p>
          </div>
          <div className="w-7/12 space-y-0.5 pl-2 text-left">
            <p>: {department}</p>
            <p>: {employeeId}</p>
            <p>: {bloodGroup}</p>
            <p>: {dob}</p>
            <p>: {phone}</p>
          </div>
        </div>

        {/* Signature */}
        {signatureUrl && (
          <div className="absolute bottom-[20px] left-[80px] text-center">
            <Image
              src={signatureUrl}
              alt="Chairman Signature"
              width={80}
              height={40}
              className="object-contain"
            />
            <p className="m-0 text-[10px]">Chairman Signature</p>
          </div>
        )}

        {/* QR Code */}
        <div className="absolute bottom-[50px] left-[530px] -translate-x-1/2 border-[3px] border-white rounded">
          <QRCodeCanvas value={qrData} size={55} bgColor="#ffffff" fgColor="#000000" level="H" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
