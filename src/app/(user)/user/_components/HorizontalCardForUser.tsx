// "use client";
// import React from "react";
// import Image from "next/image";
// import { QRCodeCanvas } from "qrcode.react";

// interface HorizontalCardForUserProps {
//   instituteName: string;
//   address: string;
//   idCardType: string;
//   logoUrl?: string;
//   signatureUrl?: string;
//   profileUrl?: string;
//   studentName: string;
//   qrData: string;
//   whoseSign?: string;
//   studentInfo: { [key: string]: string };
// }

// const HorizontalCardForUser: React.FC<HorizontalCardForUserProps> = ({
//   instituteName,
//   address,
//   idCardType,
//   logoUrl,
//   signatureUrl,
//   profileUrl,
//   studentName,
//   qrData,
//   whoseSign,
//   studentInfo,
// }) => {
//   return (
//     <div className="relative w-[500px] h-[280px] rounded-lg overflow-hidden shadow-lg bg-white border">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-2 bg-blue-700">
//         <div className="flex items-center gap-3">
//           {logoUrl && (
//             <Image
//               src={logoUrl}
//               alt="Logo"
//               width={45}
//               height={45}
//               className="rounded bg-white p-1"
//             />
//           )}
//           <div>
//             <p className="text-[16px] font-bold text-white">{instituteName}</p>
//             <p className="text-[12px] text-gray-200">{address}</p>
//           </div>
//         </div>
//         <p className="text-[11px] text-gray-200 bg-black/30 px-2 py-1 rounded">
//           {idCardType}
//         </p>
//       </div>

//       {/* Body */}
//       <div className="flex px-4 py-3">
//         {/* Profile */}
//         <div className="w-[120px] h-[120px] rounded-full border-4 border-blue-600 overflow-hidden flex-shrink-0">
//           <Image
//             src={profileUrl || "https://via.placeholder.com/120"}
//             alt="Student"
//             width={120}
//             height={120}
//             className="object-cover"
//           />
//         </div>

//         {/* Info */}
//         <div className="ml-5 flex-1">
//           <p className="text-[16px] font-bold text-blue-700 mb-2">
//             {studentName}
//           </p>

//           <div className="grid grid-cols-2 gap-x-2 text-[13px]">
//             {Object.entries(studentInfo).map(([key, value]) => (
//               <React.Fragment key={key}>
//                 <p className="font-medium capitalize text-gray-700">
//                   {key.replace(/([A-Z])/g, " $1")}
//                 </p>
//                 <p>: {value}</p>
//               </React.Fragment>
//             ))}
//           </div>
//         </div>

//         {/* QR */}
//         <div className="ml-4 flex flex-col items-center justify-center">
//           <QRCodeCanvas value={qrData} size={70} />
//         </div>
//       </div>

//       {/* Signature */}
//       {signatureUrl && (
//         <div className="absolute bottom-3 right-5 text-center">
//           <Image
//             src={signatureUrl}
//             alt="Signature"
//             width={80}
//             height={40}
//             className="object-contain"
//           />
//           <p className="text-[10px] text-gray-600">{whoseSign} Signature</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HorizontalCardForUser;



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
  qrData: string;
  whoseSign?: string;

  // backend থেকে পাওয়া fields
  fields: string[]; // যেমন ["fathersName", "mothersName", "class", "department", "parentsNumber"]
  values: { [key: string]: string }; // key অনুযায়ী values
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
  whoseSign,
  fields,
  values,
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
        </div>

        {/* Student Photo */}
        <div className="absolute top-[145px] left-1/2 -translate-x-1/2 w-[160px] h-[160px] rounded-full border-[6px] border-[#2E9DA6] bg-white overflow-hidden">
          <Image
            src={profileUrl || "https://via.placeholder.com/160"}
            alt="Student"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Student Name */}
        <p className="absolute top-[318px] font-[900] w-full text-center text-[18px] text-blue-700">
          {studentName}
        </p>

        {/* Dynamic Student Info */}
        <div className="absolute top-[345px] left-1/2 -translate-x-1/2 w-[260px] text-[12.5px] text-black">
          <div className="flex gap-1">
            {/* Labels */}
            <div className="w-[110px] font-medium text-gray-700">
              {fields.map((field) => (
                <p key={field} className="my-1.5 capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </p>
              ))}
            </div>
            {/* Values */}
            <div className="ml-1 w-[150px]">
              {fields.map((field) => (
                <p key={field} className="my-1.5">
                  :&nbsp;{values[field] || "-"}
                </p>
              ))}
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

        {/* Signature */}
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
