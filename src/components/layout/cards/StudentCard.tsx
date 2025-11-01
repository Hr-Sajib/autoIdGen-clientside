

// "use client";
// import React from "react";
// import Image from "next/image";
// import { QRCodeCanvas } from "qrcode.react";
// import background from "@/../public/image/shapes/studentId/landscape_id_card_bg.svg";

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
//   bgColor?: string;
//   whoseSign?: string;
//   customLabels?: {
//     department: string;
//     rollNumber: string;
//     bloodGroup: string;
//     dateOfBirth: string;
//     phone: string;
//   };
//   orientation?: string
// }

// const StudentCard: React.FC<StudentCardProps> = ({
//   instituteName,
//   address,
//   idCardType,
//   logoUrl,
//   signatureUrl,
//   profileUrl,
//   studentName,
//   department,
//   roll,
//   bloodGroup,
//   dob,
//   phone,
//   qrData,
//   bgColor,
//   whoseSign,
//   customLabels = {
//     department: "Department",
//     rollNumber: "Roll Number",
//     bloodGroup: "Blood Group",
//     dateOfBirth: "Date of Birth",
//     phone: "Phone"
//   }
// }) => {
//   // Effective sources to handle empty strings (fallback to defaults)
//   const effectiveLogo = logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif";
//   const effectiveSignature = signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png";

//   // console.log("bgColor", bgColor)
//   return (
//     <div
//       className="calibri relative w-[350px] h-[600px] rounded-lg overflow-hidden shadow-lg font-sans"
//       style={{
//         backgroundImage: `url(${background.src})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0"></div>

//       {/* Content */}
//       <div className="relative z-10 h-full w-full px-3">
//         {/* Institution Info */}
//         <div className="mt-4 flex flex-col items-center">
//           <Image
//             src={effectiveLogo}
//             alt="School Logo"
//             width={60}
//             height={60}
//             className="rounded-md object-cover w-[60px] h-[60px] bg-white shadow-md"
//           />
//           <div className="absolute top-[62px] flex flex-col items-center justify-center">

//           <p className="text-center  pt-1 text-[15px] font-bold text-white max-w-[300px]">
//             {instituteName}
//           </p>
//           <p className="mt-1 text-center text-[12px] text-gray-200">
//             {address}
//           </p>
//           </div>

//           {/* ID Type
//           <p className="absolute top-[140px] rounded border border-gray-300 px-2 py-[2px] text-[11px] text-gray-100 bg-black/30">
//             {idCardType}
//           </p> */}
//         </div>

//         {/* Student Photo */}
//         <div
//           className={`absolute top-[145px] left-1/2 -translate-x-1/2 w-[160px] h-[160px] rounded-full border-[6px] border-[#2E9DA6] overflow-hidden`}
//           style={{ backgroundColor: bgColor || "#ffffff" }} // fallback if null
//         >
//           <Image
//             src={profileUrl || "https://i.ibb.co.com/kgtgSzxt/avatar.png"}
//             alt="Student"
//             fill
//             className="object-cover object-center"
//           />
//         </div>

//         {/* Name */}
//         <p className="absolute top-[318px] font-[900] w-full text-center text-[18px]  text-blue-700">
//           {studentName}
//         </p>

//         {/* Student Info */}
//         <div className="absolute top-[345px] left-1/2 -translate-x-1/2 w-[260px] text-[12.5px] text-black">
//           <div className="flex gap-1">
//             {/* Labels */}
//             <div className="w-[90px] font-medium text-gray-700">
//               <p className="my-1.5">{customLabels.department}</p>
//               <p className="my-1.5">{customLabels.rollNumber}</p>
//               <p className="my-1.5">{customLabels.bloodGroup}</p>
//               <p className="my-1.5">{customLabels.dateOfBirth}</p>
//               <p className="my-1.5">{customLabels.phone}</p>
//             </div>
//             {/* Values */}
//             <div className="ml-1 w-[160px]">
//               <p className="my-1.5">:&nbsp;{department}</p>
//               <p className="my-1.5">:&nbsp;{roll}</p>
//               <p className="my-1.5">:&nbsp;{bloodGroup}</p>
//               {dob && <p className="my-1.5">:&nbsp;{dob}</p>}
//               {phone && <p className="my-1.5">:&nbsp;{phone}</p>}
//             </div>
//           </div>
//         </div>

//         {/* ID Type */}
//         <p className="absolute bottom-[30px] rounded border border-gray-300 px-2 py-[2px] text-[11px] text-gray-100 bg-black/30">
//           {idCardType} ID
//         </p>

//         {/* QR Code */}
//         <div className="absolute bottom-[60px] left-1/2 -translate-x-1/2">
//           <QRCodeCanvas
//             value={qrData}
//             size={55}
//             bgColor="#fff"
//             fgColor="#000"
//             level="H"
//           />
//         </div>

//         {/* Principal Signature */}
//         <div className="absolute bottom-[55px] right-[20px] text-center">
//           <Image
//             src={effectiveSignature}
//             alt="-"
//             width={75}
//             height={45}
//             className="object-contain"
//           />
//           <p className="text-[9px] text-black">{whoseSign} Signature</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentCard;



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
  department?: string;
  roll?: string;
  bloodGroup?: string;
  dob?: string;
  phone?: string;
  qrData: string;
  bgColor?: string;
  whoseSign?: string;
  customLabels?: {
    department: string;
    rollNumber: string;
    bloodGroup: string;
    dateOfBirth: string;
    phone: string;
  };
  dynamicFields?: Array<{ label: string; value: string }>;
  orientation?: string;
}

const StudentCard: React.FC<StudentCardProps> = ({
  instituteName,
  address,
  idCardType,
  logoUrl,
  signatureUrl,
  profileUrl,
  studentName,
  qrData,
  bgColor,
  whoseSign,
  dynamicFields = [],
  orientation
}) => {
  const effectiveLogo = logoUrl || "https://i.postimg.cc/hthwhxwy/uni-logo.avif";
  const effectiveSignature = signatureUrl || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png";

  return (
    <div
      className="calibri relative w-[350px] h-[600px] rounded-lg overflow-hidden shadow-lg font-sans"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative z-10 h-full w-full px-3">
        {/* Institution Info */}
        <div className="mt-4 flex flex-col items-center">
          <Image
            src={effectiveLogo}
            alt="School Logo"
            loading="lazy"
            width={60}
            height={60}
            className="rounded-md object-cover w-[60px] h-[60px] bg-white shadow-md"
          />
          <div className="absolute top-[62px] flex flex-col items-center justify-center">
            <p className="text-center pt-1 text-[15px] font-bold text-white max-w-[300px]">
              {instituteName}
            </p>
            <p className="mt-1 text-center text-[12px] text-gray-200">
              {address}
            </p>
          </div>
        </div>

        {/* Student Photo */}
        <div
          className="absolute top-[145px] left-1/2 -translate-x-1/2 w-[160px] h-[160px] rounded-full border-[6px] border-[#2E9DA6] overflow-hidden"
          style={{ backgroundColor: bgColor || "#ffffff" }}
        >
          <Image
            src={profileUrl || "https://i.ibb.co.com/kgtgSzxt/avatar.png"}
            alt="Student"
            fill
            loading="lazy"
            className="object-cover object-center"
          />
        </div>

        {/* Name */}
        <p className="absolute top-[318px] font-[900] w-full text-center text-[18px] text-blue-700">
          {studentName}
        </p>

        {/* Dynamic Student Info */}
        <div className="absolute top-[345px] left-1/2 -translate-x-1/2 w-[260px] text-[12.5px] text-black">
          <div className="flex gap-1">
            {/* Labels */}
            <div className="w-[90px] font-medium text-gray-700">
              {dynamicFields.map((field, index) => (
                <p key={`label-${index}`} className="my-1.5">
                  {field.label}
                </p>
              ))}
            </div>
            {/* Values */}
            <div className="ml-1 w-[160px]">
              {dynamicFields.map((field, index) => (
                <p key={`value-${index}`} className="my-1.5">
                  :&nbsp;{field.value || ""}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* ID Type */}
        <p className="absolute bottom-[30px] rounded border border-gray-300 px-2 py-[2px] text-[11px] text-gray-100 bg-black/30">
          {idCardType} ID
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
        <div className="absolute bottom-[55px] right-[20px] text-center">
          <Image
            src={effectiveSignature}
            alt={`  ${whoseSign} Signature`}
            width={75}
            loading="lazy"
            height={45}
            className="object-contain"
          />
          <p className="text-[9px] text-black">{whoseSign} Signature</p>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;