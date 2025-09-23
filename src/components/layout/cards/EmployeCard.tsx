
// //? before dynamic 

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





// ?working code but keys are not dynamic


// "use client";
// import React from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg";
// import Image from "next/image";

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
//   whoseSign?:string;


// }

// const EmployeeCard: React.FC<EmployeeCardProps> = ({
//   name = "John Marshal",
//   department = "Sales",
//   employeeId = "1233",
//   bloodGroup = "B+",
//   dob = "12-12-2000",
//   phone = "+65-2131-XXXX",
//   companyName = "ABC Group of Industries",
//   companyAddress = "Dummy address 21A/B mine union point, Singapore",
//   personImage = "https://i.postimg.cc/Y0ydK27n/person.jpg",
//   logo = "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
//   signature = "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
//   whoseSign,
//   idCardType,
//   address
// }) => {
//   const qrData = `${companyName}/${department}/${employeeId}/${bloodGroup}/${dob}/${phone}`;

//   return (
//     <div
//       className="relative min-w-[262px]  h-[153px]
//                  md:min-w-[370px] md:h-[210px]
//                  lg:min-w-[600px] lg:h-[350px]
//                  xl:min-w-[650px] xl:h-[408px] rounded
//                  md:rounded-lg overflow-hidden shadow-lg"
//       style={{
//         backgroundImage: `url(${background.src})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <div className="relative z-10 w-full h-full flex flex-col justify-start">


//         {/* Institution Info */}
//         <div className="flex items-center ml-[33%]  mt-[3%] md:mt-[4%] w-[60%]">
//           <Image
//             src={logo}
//             alt="Company Logo"
//             width={50}
//             height={50}
//             className="rounded lg:rounded-md object-contain bg-white
//                           w-[20px] h-[20px]
//                        md:w-[35px] md:h-[35px]
//                        lg:w-[60px] lg:h-[60px]
//                        xl:w-[70px] xl:h-[70px]"
//           />
//           <div className="w-full ml-2">
//             <p className="text-white md:font-bold text-[8px] md:text-[12px] lg:text-[18px] xl:text-[22px] text-center">
//               {companyName}
//             </p>
//             <p className="text-center text-gray-300 text-[5px] md:text-[7px] lg:text-[12px] xl:text-[14px] mt-1">
//               {address}
//             </p>

//           </div>
//         </div>

//         {/* Employee ID Label */}

//         <p className="absolute top-[3%] left-[12%] md:left-[10%] lg:left-[12%] text-[4px] md:text-[8px] lg:text-[11px] xl:text-[12px] text-gray-500 border border-gray-500 px-1 py-0.5 rounded text-center">
//           {idCardType}
//         </p>

//         {/* Person Image */}
//         <div className="absolute top-[20%] left-[6%] md:left-[4%] lg:left-[6%] xl:left-[5%]">
//           <Image
//             src={personImage}
//             alt="Employee Photo"
//             width={100}
//             height={100}
//             className="w-[70px] h-[70px] md:w-[110px] md:h-[110px] lg:w-[160px] lg:h-[160px] xl:w-[190px] xl:h-[190px] rounded-full border-[3px] md:border-[5px] lg:border-[6px] xl:border-[7px] border-white object-cover object-center"
//           />
//         </div>

//         {/* Name */}
//         <p className="absolute top-[28%] md:top-[30%] left-[2%] md:left-[7%] right-0 text-center font-bold
//                       text-[10px] md:text-[17px] lg:text-[22px] xl:text-[26px] text-cyan-400">
//           {name}
//         </p>

//         {/* Details */}
//         <div className="absolute top-[41%] md:top-[47%] left-[35%] md:left-[38%] w-[50%] flex justify-center text-white text-[6px] md:text-[8px] lg:text-[14px] xl:text-[16px]">
//           <div className="w-4/12 pr-1 md:pr-2 lg:pr-2 xl:pr-2 space-y-0.5">

//             <p>Department</p>
//             <p>Employee ID</p>
//             <p>Blood Group</p>
//             <p>Date Of Birth</p>
//             <p>Phone</p>
//           </div>

//           <div className="w-7/12 pl-1 md:pl-2 lg:pl-2 xl:pl-2 text-left space-y-0.5">
//             <p>: {department}</p>
//             <p>: {employeeId}</p>
//             <p>: {bloodGroup}</p>
//             <p>: {dob}</p>
//             <p>: {phone}</p>
//           </div>
//         </div>


//         {/* Principal Signature */}
//         <div className="absolute bottom-[3%] md:bottom-[3%] left-[10%] md:left-[9%] lg:left-[10%] text-center">
//           <Image
//             src={signature}
//             alt="Chairman Signature"
//             width={60}
//             height={30}
//             className="object-contain
//                        w-[50px] h-[20px]    
//                        md:w-[60px] md:h-[27px]
//                        lg:w-[80px] lg:h-[40px]
//                        xl:w-[90px] xl:h-[45px]"
//           />
//           <p className="text-[4px] md:text-[7px] lg:text-[10px] xl:text-[12px] m-0">
//             {whoseSign} Signature
//           </p>
//         </div>

//         {/* QR Code */}
//         <div className="absolute bottom-[5%] md:bottom-[5%] lg:bottom-[7%] left-[90%] lg:left-[91%] -translate-x-1/2">
//           <QRCodeCanvas
//             value={qrData}
//             size={30} // will scale proportionally below
//             className="!w-[20px] !h-[20px] md:!w-[35px] p-[1px] md:p-[2px] rounded-[2px] bg-white md:!h-[35px] lg:!w-[60px] lg:!h-[60px] xl:!w-[70px] xl:!h-[70px]"
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


//? working card but change for sajib vai 
"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg";
import Image from "next/image";

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
    studentName: string;
    department: string;
    rollNumber: string;
    employeeId: string;  
    bloodGroup: string;
    dateOfBirth: string;
    phone: string;
  };
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name = "John Marshal",
  department = "Sales",
  employeeId = "1233",
  bloodGroup = "B+",
  dob = "12-12-2000",
  phone = "+65-2131-XXXX",
  companyName = "ABC Group of Industries",
  // companyAddress = "Dummy address 21A/B mine union point, Singapore",
  personImage = "https://i.ibb.co.com/ZzcCMzNx/3.webp",
  logo = "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
  signature = "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
  whoseSign,
  idCardType,
  address,
  customLabels = {
    studentName: "Name",
    department: "Department",
    rollNumber: "Employee ID",
    employeeId: "Employee ID",
    bloodGroup: "Blood Group",
    dateOfBirth: "Date of Birth",
    phone: "Phone"
  }
}) => {
  const qrData = `${companyName}/${department}/${employeeId}/${bloodGroup}/${dob}/${phone}`;

  return (
    <div
      className="calibri relative min-w-[262px]  h-[153px]
                 sm:min-w-[290px] sm:h-[180px]
                 md:min-w-[370px] md:h-[210px]
                 lg:min-w-[600px] lg:h-[350px]
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
        <div className="flex items-center ml-[33%]  mt-[3%] md:mt-[4%] w-[60%]">
          <Image
            src={logo}
            alt="Company Logo"
            width={50}
            height={50}
            className="rounded lg:rounded-md object-contain bg-white
                          w-[20px] h-[20px]
                       md:w-[35px] md:h-[35px]
                       lg:w-[60px] lg:h-[60px]
                       xl:w-[70px] xl:h-[70px]"
          />
          <div className="w-full ml-2">
            <p className="text-white md:font-bold text-[8px] md:text-[12px] lg:text-[18px] xl:text-[22px] text-center">
              {companyName}
            </p>
            <p className="text-center text-gray-300 text-[5px] md:text-[7px] lg:text-[12px] xl:text-[14px] mt-1">
              {address}
            </p>
          </div>
        </div>

        {/* Employee ID Label */}
        <p className="absolute top-[3%] left-[12%] md:left-[12%] lg:left-[12%] text-[4px] md:text-[8px] lg:text-[11px] xl:text-[12px] text-gray-500 border border-gray-500 px-1 py-0.5 rounded-[3px] md:rounded text-center">
          {idCardType}
        </p>

        {/* Person Image */}
        <div className="absolute top-[20%] left-[6%] md:left-[4%] lg:left-[6%] xl:left-[5%]">
          <Image
            src={personImage}
            alt="Employee Photo"
            width={100}
            height={100}
            className="w-[70px] h-[70px] md:w-[110px] md:h-[110px] lg:w-[160px] lg:h-[160px] xl:w-[190px] xl:h-[190px] rounded-full border-[3px] md:border-[5px] lg:border-[6px] xl:border-[7px] border-white object-cover object-center"
          />
        </div>

        {/* Name */}
        <p className="absolute top-[28%] md:top-[30%] left-[2%] md:left-[7%] right-0 text-center font-bold
                      text-[10px] md:text-[17px] lg:text-[22px] xl:text-[26px] text-cyan-400">
          {name|| customLabels.studentName || "John Marshal"}
        </p>

        {/* Details */}
        <div className="absolute top-[41%] md:top-[47%] left-[37%] md:left-[38%] w-[50%] flex justify-center text-white text-[6px] md:text-[8px] lg:text-[14px] xl:text-[16px]">
          <div className="w-4/12 pr-1 md:pr-2 lg:pr-2 xl:pr-2 space-y-0.5">
            <p>{customLabels.department}</p>
            <p>{customLabels?.employeeId || customLabels.rollNumber}</p>
            <p>{customLabels.bloodGroup}</p>
            <p>{customLabels.dateOfBirth}</p>
            <p>{customLabels.phone}</p>
          </div>

          <div className="w-7/12 pl-1 md:pl-2 lg:pl-2 xl:pl-2 text-left space-y-0.5">
            <p>: {department}</p>
            <p>: {employeeId}</p>
            <p>: {bloodGroup}</p>
            <p>: {dob}</p>
            <p>: {phone}</p>
          </div>
        </div>

        {/* Principal Signature */}
        <div className="absolute bottom-[3%] md:bottom-[3%] left-[10%] md:left-[9%] lg:left-[10%] text-center">
          <Image
            src={signature}
            alt="Chairman Signature"
            width={60}
            height={30}
            className="object-contain
                       w-[50px] h-[20px]    
                       md:w-[60px] md:h-[27px]
                       lg:w-[80px] lg:h-[40px]
                       xl:w-[90px] xl:h-[45px]"
          />
          <p className="text-[4px] md:text-[7px] lg:text-[10px] xl:text-[12px] m-0">
            {whoseSign} Signature
          </p>
        </div>

        {/* QR Code */}
        <div className="absolute bottom-[5%] md:bottom-[5%] lg:bottom-[7%] left-[90%] lg:left-[91%] -translate-x-1/2">
          <QRCodeCanvas
            value={qrData}
            size={30} // will scale proportionally below
            className="!w-[20px] !h-[20px] md:!w-[35px] p-[1px] md:p-[2px] rounded-[2px] bg-white md:!h-[35px] lg:!w-[60px] lg:!h-[60px] xl:!w-[70px] xl:!h-[70px]"
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;






// "use client";
// import React from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg";
// import Image from "next/image";

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
//     studentName: string;
//     department: string;
//     rollNumber: string;
//     employeeId: string;  
//     bloodGroup: string;
//     dateOfBirth: string;
//     phone: string;
//   };
// }

// const EmployeeCard: React.FC<EmployeeCardProps> = ({
//   name = "John Marshal",
//   department = "Sales",
//   employeeId = "1233",
//   bloodGroup = "B+",
//   dob = "12-12-2000",
//   phone = "+65-2131-XXXX",
//   companyName = "ABC Group of Industries",
//   companyAddress = "Dummy address 21A/B mine union point, Singapore",
//   personImage = "https://i.postimg.cc/Y0ydK27n/person.jpg",
//   logo = "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
//   signature = "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
//   whoseSign = "Principal",
//   idCardType = "Employee",
//   address,
//   customLabels = {
//     studentName: "Name",
//     department: "Department",
//     rollNumber: "Employee ID",
//     employeeId: "Employee ID",
//     bloodGroup: "Blood Group",
//     dateOfBirth: "Date of Birth",
//     phone: "Phone"
//   }
// }) => {
//   const qrData = `${companyName}/${department}/${employeeId}/${bloodGroup}/${dob}/${phone}`;

//   return (
//     <div
//       className="relative overflow-hidden shadow-lg"
//       style={{
//         width: '1018px',
//         height: '644px',
//         fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
//         background: '#f0f0f0',
//         margin: 0,
//         padding: 0
//       }}
//     >
//       <div style={{ margin: '3px' }}>
//         <div
//           className="relative overflow-hidden"
//           style={{
//             width: '1012px',
//             height: '638px',
//             borderRadius: '12px',
//             boxShadow: '0 4px 12px rgba(0,0,0,0.25)'
//           }}
//         >
//           {/* Background Image */}
//           <Image
//             src={background}
//             alt="Background"
//             fill
//             style={{
//               objectFit: 'cover',
//               zIndex: 0
//             }}
//           />
          
//           {/* Content Container */}
//           <div
//             className="relative flex flex-col justify-start"
//             style={{
//               zIndex: 1,
//               padding: '10px',
//               width: '100%',
//               height: '100%',
//               boxSizing: 'border-box'
//             }}
//           >
//             {/* Institution Info */}
//             <div
//               className="flex items-center"
//               style={{
//                 marginLeft: '340px',
//                 marginTop: '50px',
//                 width: '600px'
//               }}
//             >
//               <Image
//                 src={logo}
//                 alt="Company Logo"
//                 width={80}
//                 height={80}
//                 className="object-contain bg-white"
//                 style={{
//                   width: '80px',
//                   borderRadius: '10px'
//                 }}
//               />
//               <div style={{ width: '100%' }}>
//                 <p
//                   style={{
//                     width: '90%',
//                     color: 'white',
//                     fontSize: '26px',
//                     margin: 0,
//                     fontWeight: 'bold',
//                     textAlign: 'center'
//                   }}
//                 >
//                   {companyName}
//                 </p>
//                 <p
//                   style={{
//                     textAlign: 'center',
//                     color: 'rgb(180,180,180)',
//                     fontSize: '16px',
//                     margin: '10px 0'
//                   }}
//                 >
//                   {address || companyAddress}
//                 </p>
//               </div>
//             </div>

//             {/* ID Card Type Label */}
//             <p
//               style={{
//                 position: 'absolute',
//                 left: '135px',
//                 fontSize: '14px',
//                 width: '100px',
//                 color: '#8a8c8d',
//                 border: '1px solid #8a8c8d',
//                 padding: '2px 6px',
//                 borderRadius: '4px',
//                 textAlign: 'center',
//                 margin: 0
//               }}
//             >
//               {idCardType} ID
//             </p>

//             {/* Person Image */}
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '130px',
//                 left: '36px'
//               }}
//             >
//               <Image
//                 src={personImage}
//                 alt="Employee Photo"
//                 width={300}
//                 height={300}
//                 className="object-cover"
//                 style={{
//                   height: '300px',
//                   width: '300px',
//                   borderRadius: '100%',
//                   border: '10px solid white'
//                 }}
//               />
//             </div>

//             {/* Name */}
//             <p
//               style={{
//                 position: 'absolute',
//                 top: '200px',
//                 left: '60px',
//                 right: '0px',
//                 textAlign: 'center',
//                 fontWeight: 900,
//                 fontSize: '40px',
//                 color: '#08ebf3',
//                 margin: 0
//               }}
//             >
//               {name}
//             </p>

//             {/* Details Section */}
//             <div
//               style={{
//                 position: 'absolute',
//                 top: '300px',
//                 left: '400px',
//                 width: '400px',
//                 fontSize: '20px',
//                 color: 'white',
//                 display: 'flex',
//                 justifyContent: 'center'
//               }}
//             >
//               {/* Labels Column */}
//               <div style={{ width: '30%', paddingRight: '8px' }}>
//                 <p style={{ margin: '0 0 8px 0' }}>{customLabels.department}</p>
//                 <p style={{ margin: '0 0 8px 0' }}>{customLabels?.employeeId || customLabels.rollNumber}</p>
//                 <p style={{ margin: '0 0 8px 0' }}>{customLabels.bloodGroup}</p>
//                 <p style={{ margin: '0 0 8px 0' }}>{customLabels.dateOfBirth}</p>
//                 <p style={{ margin: '0 0 8px 0' }}>{customLabels.phone}</p>
//               </div>

//               {/* Values Column */}
//               <div style={{ width: '60%', textAlign: 'left', paddingLeft: '8px' }}>
//                 <p style={{ margin: '0 0 8px 0' }}>:&nbsp;&nbsp;&nbsp;{department}</p>
//                 <p style={{ margin: '0 0 8px 0' }}>:&nbsp;&nbsp;&nbsp;{employeeId}</p>
//                 <p style={{ margin: '0 0 8px 0' }}>:&nbsp;&nbsp;&nbsp;{bloodGroup}</p>
//                 <p style={{ margin: '0 0 8px 0' }}>:&nbsp;&nbsp;&nbsp;{dob}</p>
//                 <p style={{ margin: '0 0 8px 0' }}>:&nbsp;&nbsp;&nbsp;{phone}</p>
//               </div>
//             </div>

//             {/* Signature */}
//             <div
//               style={{
//                 position: 'absolute',
//                 bottom: '30px',
//                 left: '95px',
//                 textAlign: 'center',
//                 width: '190px'
//               }}
//             >
//               <Image
//                 src={signature}
//                 alt="Signature"
//                 width={190}
//                 height={70}
//                 className="object-contain"
//                 style={{
//                   height: '70px',
//                   width: '100%'
//                 }}
//               />
//               <p
//                 style={{
//                   margin: 0,
//                   width: '100%',
//                   fontSize: '14px',
//                   color: 'white'
//                 }}
//               >
//                 {whoseSign} Signature
//               </p>
//             </div>

//             {/* QR Code */}
//             <div
//               style={{
//                 position: 'absolute',
//                 bottom: '65px',
//                 left: '900px',
//                 borderRadius: '5px',
//                 border: '5px solid white',
//                 transform: 'translateX(-50%)'
//               }}
//             >
//               <QRCodeCanvas
//                 value={qrData}
//                 size={90}
//                 className="block"
//                 style={{
//                   width: '90px',
//                   height: '90px'
//                 }}
//                 bgColor="#ffffff"
//                 fgColor="#000000"
//                 level="H"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployeeCard;