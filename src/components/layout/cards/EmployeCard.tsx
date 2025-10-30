

// "use client";
// import React from "react";
// // import { QRCodeCanvas } from "qrcode.react";
// import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg";
// import Image from "next/image";
// import qrCode from "@/../public/images/barcode image.png";

// interface EmployeeCardProps {
//   name?: string;
//   address?: string;
//   idCardType?: string;
//   employeeName?: string;
//   logoUrl?: string;
//   signatureUrl?: string;
//   profileUrl?: string;
//   bgColor?: string;
//   qrData?: string;
//   department?: string;
//   employeeId?: string;
//   bloodGroup?: string;
//   dob?: string;
//   phone?: string;
//   companyName?: string;
//   companyAddress?: string;
//   personImage?: string;
//   logo?: string;
//   signature?: string;
//   whoseSign?: string;
//   customLabels?: {
//     department: string;
//     rollNumber: string;
//     employeeId: string;
//     bloodGroup: string;
//     dateOfBirth: string;
//     phone: string;
//   };
//   orientation?: string
// }

// const EmployeeCard: React.FC<EmployeeCardProps> = ({
//   // name = "Name",
//   department = "",
//   employeeId = "",
//   bloodGroup = "",
//   dob = "",
//   phone = "",
//   companyName = "ABC Group of Industries",
//   companyAddress = "Dummy address 21A/B mine union point, Singapore",
//   address = "",
//   idCardType = "",
//   employeeName = "Name",
//   personImage = "https://i.ibb.co.com/kgtgSzxt/avatar.png",
//   logo = "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
//   signature = "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
//   whoseSign = "",
//   bgColor = "",
//   customLabels = {
//     studentName: "Name",
//     department: "Department",
//     rollNumber: "Roll Number",
//     employeeId: "Employee ID",
//     bloodGroup: "Blood Group",
//     dateOfBirth: "Date of Birth",
//     phone: "Phone"
//   },
// }) => {
//   const qrData = `${companyName}/${department}/${employeeId}/${bloodGroup}/${dob}/${phone}`;

//   return (
//     <div
//       className="calibri relative min-w-[300px] h-[180px]
                 
//                  md:min-w-[650px] md:h-[408px]
//                  lg:min-w-[560px] lg:h-[345px]
//                  xl:min-w-[650px] xl:h-[408px] rounded-[3px]
//                  md:rounded lg:rounded-md overflow-hidden shadow-lg"
//       style={{
//         backgroundImage: `url(${background.src})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="relative z-10 w-full h-full flex flex-col justify-start">
//         {/* Institution Info */}
//         <div className="flex items-center ml-[33%] mt-[5%] md:mt-[4%] w-[60%]">
//           <Image
//             src={logo}
//             alt="Company Logo"
//             width={50}
//             height={50}
//             className="object-contain bg-white rounded lg:rounded-lg w-[25px] h-[25px]
//                        md:w-[60px] md:h-[60px]
//                        lg:w-[45px] lg:h-[45px]
//                        xl:w-[60px] xl:h-[60px]"
//           />
//           <div className="w-full ml-2">
//             <p className="text-white text-[8px] font-bold md:text-[22px] lg:text-[18px] xl:text-[22px] text-center">
//               {companyName}
//             </p>
//             <p className="text-center text-gray-300 text-[5px] md:text-[14px] lg:text-[12px] xl:text-[14px] mt-1">
//               {address}
      
//             </p>
//           </div>
//         </div>

//         {/* Employee ID Label */}
//         <p className="absolute top-[4%] left-[12%] text-[4px] md:text-[12px] lg:text-[11px] xl:text-[12px] text-gray-500 border border-gray-300 px-1 md:rounded">
//           {idCardType} ID
//         </p>

//         {/* Person Image */}
//         <div className="absolute top-[20%] left-[5%] rounded-full"
//           style={{ backgroundColor: bgColor || "#ffffff" }} // fallback if null
//         >
//           <Image
//             src={personImage}
//             alt="Employee Photo"
//             width={100}
//             height={100}
//             className="w-[85px] h-[85px] md:w-[180px] md:h-[180px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px] rounded-full border-[3px] md:border-[6px] lg:border-[6px] xl:border-[6px] border-white object-cover object-center"
//           />
//         </div>

//         {/* Name */}
//         <p className="absolute top-[30%] -left-13 md:left-[2%] right-0 text-center font-bold
//                       text-[10px] md:text-[26px] lg:text-[22px] xl:text-[26px] text-cyan-400">
//           {employeeName}
//         </p>

//         {/* Details */}
//         <div className="absolute top-[42%] left-[29%] w-[50%] flex text-gray-200 text-[6.5px] md:text-[16px] lg:text-[13px] xl:text-[16px]">
//           <div className="flex w-max mx-auto">
//             <div className="w-max space-y-0.5 md:space-y-0">
//               <p>{customLabels.department}</p>
//               <p>{customLabels?.employeeId || customLabels.rollNumber}</p>
//               <p>{customLabels.bloodGroup}</p>
//               <p>{customLabels.dateOfBirth}</p>
//               <p>{customLabels.phone}</p>
//             </div>
//             <div className="w-max space-y-0.5 md:space-y-0">
//               <p className="pl-2"><span className="pr-2">:</span>{department}</p>
//               <p className="pl-2"><span className="pr-2">:</span>{employeeId}</p>
//               <p className="pl-2"><span className="pr-2">:</span>{bloodGroup}</p>
//               {dob && <p className="pl-2"><span className="pr-2">:</span>{dob}</p>}
//               {phone && <p className="pl-2"><span className="pr-2">:</span>{phone}</p>}
//             </div>
//           </div>
//         </div>

//         {/* Principal Signature */}
//         <div className="absolute bottom-[5%] left-[10%] text-center">
//           <Image
//             src={signature}
//             alt="Chairman Signature"
//             width={60}
//             height={30}
//             className="object-contain w-[60px] h-[30px] md:w-[90px] md:h-[45px] lg:w-[80px] lg:h-[40px] xl:w-[90px] xl:h-[45px]"
//           />
//           <p className="text-[5px] md:text-[12px] lg:text-[10px] xl:text-[12px] m-0">
//             {whoseSign} Signature
//           </p>
//         </div>

//         {/* QR Code */}
//         <div className="absolute bottom-[7%] -right-30 md:-right-50 lg:-right-45 xl:-right-50 md:bottom-[7%] lg:bottom-[7%] left-[90%] lg:left-[91%] -translate-x-1/2 ">
//           {/* <QRCodeCanvas
//             value={qrData}
//             size={30} // will scale proportionally below
//             className="!w-[20px] !h-[20px] md:!w-[35px] p-[1px] md:p-[2px] rounded-[2px] bg-white md:!h-[35px] lg:!w-[60px] lg:!h-[60px] xl:!w-[70px] xl:!h-[70px]"
//             bgColor="#ffffff"
//             fgColor="#000000"
//             level="H"
//           /> */}
//         <Image
//   src={qrCode}
//   alt="QR Code"
//   width={400}
//   height={50}
//   className="!w-[90px] !h-[25px] md:!w-[170px] md:!h-[50px] lg:!w-[140px] lg:!h-[50px] xl:!w-[160px] xl:!h-[50px] object-fill"
//   style={{ maxWidth: "none" }} // ✅ prevent Next.js intrinsic limit
// />


//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCard;



"use client";
import React from "react";
// import { QRCodeCanvas } from "qrcode.react";
import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg";
import Image from "next/image";
import qrCode from "@/../public/images/barcode image.png";

interface EmployeeCardProps {
  name?: string;
  address?: string;
  idCardType?: string;
  employeeName?: string;
  logoUrl?: string;
  signatureUrl?: string;
  profileUrl?: string;
  bgColor?: string;
  qrData?: string;
  department?: string;
  employeeId?: string;
  bloodGroup?: string;
  dob?: string;
  phone?: string;
  companyName?: string;
  companyAddress?: string;
  personImage?: string;
  logo?: string;
  signature?: string;
  whoseSign?: string;
  customLabels?: {
    department: string;
    rollNumber: string;
    employeeId: string;
    bloodGroup: string;
    dateOfBirth: string;
    phone: string;
  };
  orientation?: string
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  // name = "Name",
  department = "",
  employeeId = "",
  bloodGroup = "",
  dob = "",
  phone = "",
  companyName = "ABC Group of Industries",
  companyAddress = "Dummy address 21A/B mine union point, Singapore",
  address = "",
  idCardType = "",
  employeeName = "Name",
  personImage = "https://i.ibb.co.com/kgtgSzxt/avatar.png",
  logo = "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
  signature = "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
  whoseSign = "",
  bgColor = "",
  customLabels = {
    studentName: "Name",
    department: "Department",
    rollNumber: "Roll Number",
    employeeId: "Employee ID",
    bloodGroup: "Blood Group",
    dateOfBirth: "Date of Birth",
    phone: "Phone"
  },
}) => {
  // Effective sources to handle empty strings (fallback to defaults)
  const effectiveLogo = logo || "https://i.postimg.cc/hthwhxwy/uni-logo.avif";
  const effectiveSignature = signature || "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png";

  const qrData = `${companyName}/${department}/${employeeId}/${bloodGroup}/${dob}/${phone}`;

  return (
    <div
      className="calibri relative min-w-[300px] h-[180px]
                 
                 md:min-w-[650px] md:h-[408px]
                 lg:min-w-[560px] lg:h-[345px]
                 xl:min-w-[650px] xl:h-[408px] rounded-[3px]
                 md:rounded lg:rounded-md overflow-hidden shadow-lg"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 w-full h-full flex flex-col justify-start">
        {/* Institution Info */}
        <div className="flex items-center ml-[33%] mt-[5%] md:mt-[4%] w-[60%]">
          <Image
            src={effectiveLogo}
            alt="Company Logo"
            width={50}
            height={50}
            className="object-contain bg-white rounded lg:rounded-lg w-[25px] h-[25px]
                       md:w-[60px] md:h-[60px]
                       lg:w-[45px] lg:h-[45px]
                       xl:w-[60px] xl:h-[60px]"
          />
          <div className="w-full ml-2">
            <p className="text-white text-[8px] font-bold md:text-[22px] lg:text-[18px] xl:text-[22px] text-center">
              {companyName}
            </p>
            <p className="text-center text-gray-300 text-[5px] md:text-[14px] lg:text-[12px] xl:text-[14px] mt-1">
              {address}
      
            </p>
          </div>
        </div>

        {/* Employee ID Label */}
        <p className="absolute top-[4%] left-[12%] text-[4px] md:text-[12px] lg:text-[11px] xl:text-[12px] text-gray-500 border border-gray-300 px-1 md:rounded">
          {idCardType} ID
        </p>

        {/* Person Image */}
        <div className="absolute top-[20%] left-[5%] rounded-full"
          style={{ backgroundColor: bgColor || "#ffffff" }} // fallback if null
        >
          <Image
            src={personImage}
            alt="Employee Photo"
            width={100}
            height={100}
            className="w-[85px] h-[85px] md:w-[180px] md:h-[180px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px] rounded-full border-[3px] md:border-[6px] lg:border-[6px] xl:border-[6px] border-white object-cover object-center"
          />
        </div>

        {/* Name */}
        <p className="absolute top-[30%] -left-13 md:left-[2%] right-0 text-center font-bold
                      text-[10px] md:text-[26px] lg:text-[22px] xl:text-[26px] text-cyan-400">
          {employeeName}
        </p>

        {/* Details */}
        <div className="absolute top-[42%] left-[29%] w-[50%] flex text-gray-200 text-[6.8px] md:text-[16px] lg:text-[13px] xl:text-[16px]">
          <div className="flex w-max mx-auto">
            <div className="w-max space-y-1 md:space-y-0">
              <p>{customLabels.department}</p>
              <p>{customLabels?.employeeId || customLabels.rollNumber}</p>
              <p>{customLabels.bloodGroup}</p>
              <p>{customLabels.dateOfBirth}</p>
              <p>{customLabels.phone}</p>
            </div>
            <div className="w-max space-y-1 md:space-y-0">
              <p className="pl-2"><span className="pr-2">:</span>{department}</p>
              <p className="pl-2"><span className="pr-2">:</span>{employeeId}</p>
              <p className="pl-2"><span className="pr-2">:</span>{bloodGroup}</p>
              {dob && <p className="pl-2"><span className="pr-2">:</span>{dob}</p>}
              {phone && <p className="pl-2"><span className="pr-2">:</span>{phone}</p>}
            </div>
          </div>
        </div>

        {/* Principal Signature */}
        <div className="absolute bottom-[5%] left-[10%] text-center">
          <Image
            src={effectiveSignature}
            alt="Chairman Signature"
            width={60}
            height={30}
            className="object-contain w-[60px] h-[30px] md:w-[90px] md:h-[45px] lg:w-[80px] lg:h-[40px] xl:w-[90px] xl:h-[45px]"
          />
          <p className="text-[5px] md:text-[12px] lg:text-[10px] xl:text-[12px] m-0">
            {whoseSign} Signature
          </p>
        </div>

        {/* QR Code */}
        <div className="absolute bottom-[3%] left-[65%]  md:bottom-[7%] lg:bottom-[7%]  -translate-x-1/2 ">
          {/* <QRCodeCanvas
            value={qrData}
            size={30} // will scale proportionally below
            className="!w-[20px] !h-[20px] md:!w-[35px] p-[1px] md:p-[2px] rounded-[2px] bg-white md:!h-[35px] lg:!w-[60px] lg:!h-[60px] xl:!w-[70px] xl:!h-[70px]"
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          /> */}
        <Image
  src={qrCode}
  alt="QR Code"
  width={400}
  height={50}
  className="!w-[90px] !h-[22px] md:!w-[170px] md:!h-[50px] lg:!w-[140px] lg:!h-[50px] xl:!w-[160px] xl:!h-[50px] object-fill"
  style={{ maxWidth: "none" }} // ✅ prevent Next.js intrinsic limit
/>


        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;