

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
  whoseSign?: string;
  customLabels?: {
    studentName: string;
    department: string;
    rollNumber: string;
    bloodGroup: string;
    dateOfBirth: string;
    phone: string;
  };
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
  // bgColor,
  whoseSign,
  customLabels = {
    studentName: "Name",
    department: "Department",
    rollNumber: "Roll Number",
    bloodGroup: "Blood Group",
    dateOfBirth: "Date of Birth",
    phone: "Phone"
  }
}) => {
  return (
    <div
      className="calibri relative w-[350px] h-[600px] rounded-lg overflow-hidden shadow-lg font-sans"
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
        <div className="mt-4 flex flex-col items-center">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="School Logo"
              width={60}
              height={60}
              className="rounded-md object-cover w-[60px] h-[60px] bg-white shadow-md"
            />
          )}
          <p className="text-center absolute top-[62px] pt-1 text-[15px] font-bold text-white max-w-[300px]">
            {instituteName}
          </p>
          <p className="absolute top-[110px] mt-1 text-center text-[12px] text-gray-200">
            {address}
          </p>

          {/* ID Type
          <p className="absolute top-[140px] rounded border border-gray-300 px-2 py-[2px] text-[11px] text-gray-100 bg-black/30">
            {idCardType}
          </p> */}
        </div>

        {/* Student Photo */}
        <div className="absolute top-[145px] left-1/2 -translate-x-1/2 w-[160px] h-[160px] rounded-full border-[6px] border-[#2E9DA6] bg-white overflow-hidden">
          <Image
            src={profileUrl || "https://i.ibb.co.com/ZzcCMzNx/3.webp"}
            alt="Student"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Student Name */}
        <p className="absolute top-[318px] font-[900] w-full text-center text-[18px]  text-blue-700">
          {studentName}
        </p>

        {/* Student Info */}
        <div className="absolute top-[345px] left-1/2 -translate-x-1/2 w-[260px] text-[12.5px] text-black">
          <div className="flex gap-1">
            {/* Labels */}
            <div className="w-[90px] font-medium text-gray-700">
              <p className="my-1.5">{customLabels.department}</p>
              <p className="my-1.5">{customLabels.rollNumber}</p>
              <p className="my-1.5">{customLabels.bloodGroup}</p>
              <p className="my-1.5">{customLabels.dateOfBirth}</p>
              <p className="my-1.5">{customLabels.phone}</p>
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

                  {/* ID Type */}
          <p className="absolute bottom-[30px] rounded border border-gray-300 px-2 py-[2px] text-[11px] text-gray-100 bg-black/30">
            {idCardType}
          </p>

        {/* QR Code */}
        <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2">
          <QRCodeCanvas
            value={qrData}
            size={55}
            bgColor="#fff"
            fgColor="#000"
            level="H"
          />
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
            <p className="text-[9px] text-black">{whoseSign} Signature</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;


// "use client";
// import React from "react";
// import Image from "next/image";
// import { QRCodeCanvas } from "qrcode.react";
// import bgUrl from "@/../public/image/shapes/studentId/landscape_id_card_bg.svg";

// interface StudentCardProps {
//   instituteName: string;
//   address: string;
//   idCardType: string;
//   logoUrl?: string;
//   signatureUrl?: string;
//   profileUrl?: string;
//   studentName: string;
//   department: string;
//   roll: string;
//   bloodGroup: string;
//   dob: string;
//   phone: string;
//   qrData: string;
//   bgUrl?: string;
//   bgColor?: string;
//   whoseSign?: string;
//   customLabels?: {
//     studentName: string;
//     department: string;
//     rollNumber: string;
//     bloodGroup: string;
//     dateOfBirth: string;
//     phone: string;
//   };
// }

// const StudentCard: React.FC<StudentCardProps> = ({
//   instituteName,
//   address,
//   idCardType,
//   logoUrl,
//   signatureUrl,
//   profileUrl = "https://via.placeholder.com/100",
//   studentName,
//   department,
//   roll,
//   bloodGroup,
//   dob,
//   phone,
//   qrData,
//   bgColor,
//   // bgUrl,
//   whoseSign,
//   customLabels = {
//     studentName: "Name",
//     department: "Department",
//     rollNumber: "Roll Number",
//     bloodGroup: "Blood Group",
//     dateOfBirth: "Date of Birth",
//     phone: "Phone",
//   },
// }) => {
//   return (
//     <div
//       className="relative calibri  w-[644px] h-[1019px] bg-black rounded-lg overflow-hidden font-sans"
//       style={{
//         backgroundImage: `url(${bgUrl})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <Image
//         src={bgUrl}
//         alt="Background"
//         width={644}
//         height={1019}
//         className="absolute inset-0 top-0 z-0 object-cover"
//       />

//       {/* Overlay */}
//       <div className="absolute inset-0 z-0"></div>

//       {/* Content */}
//       <div className="relative z-10 w-full h-full px-3 box-border">
//         {/* Logo & Institution */}
//         <div className="flex flex-col items-center mt-[40px] relative">
//           {logoUrl && (
//             <Image
//               src={logoUrl}
//               alt="Logo"
//               width={80}
//               height={80}
//               className="rounded-lg object-contain bg-white"
//             />
//           )}
//           <div className="absolute top-[80px]">

//           <p className="mt-4 text-center text-[30px] font-bold text-white max-w-[520px]">
//             {instituteName}
//           </p>
//           <p className="mt-2 text-center text-[18px] text-gray-300">
//             {address}
//           </p>
//           </div>
//         </div>

//         {/* Student Photo */}
//         <div className="absolute top-[270px] left-1/2 -translate-x-1/2 w-[250px] h-[250px] rounded-full border-[10px] border-[#2E9DA6] overflow-hidden">
//           <Image
//             src={profileUrl || "https://via.placeholder.com/100"}
//             alt="Student"
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* Student Name */}
//         <p className="absolute top-[540px] w-full text-center text-[38px] font-extrabold text-blue-700">
//           {studentName}
//         </p>

//         {/* Student Info */}
//         <div className="absolute top-[605px] left-[140px] w-[460px] text-[19px] text-black flex gap-4">
//           <div className="w-[130px]">
//             <p className="my-2">{customLabels.department}</p>
//             <p className="my-2">{customLabels.rollNumber}</p>
//             <p className="my-2">{customLabels.bloodGroup}</p>
//             <p className="my-2">{customLabels.dateOfBirth}</p>
//             <p className="my-2">{customLabels.phone}</p>
//           </div>
//           <div className="w-[300px] ml-2">
//             <p className="my-2">:&nbsp;{department}</p>
//             <p className="my-2">:&nbsp;{roll}</p>
//             <p className="my-2">:&nbsp;{bloodGroup}</p>
//             <p className="my-2">:&nbsp;{dob}</p>
//             <p className="my-2">:&nbsp;{phone}</p>
//           </div>
//         </div>

//         {/* QR Code */}
//         <div className="absolute bottom-[130px] left-1/2 -translate-x-1/2">
//           {/* <QRCodeCanvas value={qrData} size={90} bgColor="#fff" fgColor="#000" level="H" /> */}
//           <Image
//             src="https://i.ibb.co.com/BH1yp93x/qr.webp"
//             alt="QR Code"
//             width={70}
//             height={60}
//             className="object-contain"
//           />
//         </div>

//         {/* Principal Signature */}
//         {signatureUrl && (
//           <div className="absolute bottom-[120px] right-[16px] text-center">
//             <Image
//               src={signatureUrl}
//               alt="Signature"
//               width={80}
//               height={80}
//               className="object-contain"
//             />
//             <p className="text-[14px] text-black">{whoseSign || "Principal"} Signature</p>
//           </div>
//         )}

//         {/* ID Type */}
//         <p className="absolute bottom-[60px] left-[12px] rounded border border-gray-500 px-2 py-[3px] text-[20px] text-gray-300 font-sans">
//           {idCardType} ID
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StudentCard;
