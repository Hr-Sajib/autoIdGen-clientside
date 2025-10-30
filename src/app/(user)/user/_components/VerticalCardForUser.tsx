"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";
import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg";
import qrCode from "@/../public/images/barcode image.png";
interface VerticalCardProps {
  instituteName: string;
  address: string;
  idCardType: string;
  studentName: string;
  logoUrl?: string;
  profileUrl?: string;
  signatureUrl?: string;
  whoseSign?: string;
    qrData: string;
  fields: string[];
  values: { [key: string]: string };
}

const VerticalCardForUser: React.FC<VerticalCardProps> = ({
  instituteName,
  address,
  idCardType,
  studentName,
  logoUrl,
  profileUrl,
  signatureUrl,
  whoseSign,
  fields,
  qrData,
  values,
}) => {
  // dynamic QR data
//   const qrData = `${instituteName}/${fields.map(f => values[f] || "-").join("/")}`;

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
        {/* Institute Info */}
        <div className="flex items-center ml-[33%] mt-[5%] md:mt-[4%] w-[60%]">
          {logoUrl && (
            <Image
            unoptimized
              src={logoUrl}
              alt="Institute Logo"
              width={50}
              height={50}
              className="object-contain bg-white rounded lg:rounded-lg w-[25px] h-[25px]
                         md:w-[60px] md:h-[60px]
                         lg:w-[45px] lg:h-[45px]
                         xl:w-[60px] xl:h-[60px]"
            />
          )}
          <div className="w-full ml-2">
            <p className="text-white text-[8px] font-bold md:text-[22px] lg:text-[18px] xl:text-[22px] text-center">
              {instituteName}
            </p>
            <p className="text-center text-gray-300 text-[5px] md:text-[14px] lg:text-[12px] xl:text-[14px] mt-1">
              {address}
              
            </p>
          </div>
        </div>

        {/* Card Type */}
        <p className="absolute top-[4%] left-[12%] text-[4px] md:text-[12px] lg:text-[11px] xl:text-[12px] text-gray-500 border border-gray-300 px-1  md:rounded">
          {idCardType}
        </p>

        {/* Profile Image */}
        <div className="absolute top-[20%] left-[5%]">
          <Image
          unoptimized
            src={profileUrl || "https://via.placeholder.com/100"}
            alt="Profile Photo"
            width={100}
            height={100}
            className="w-[85px] h-[85px] md:w-[180px] md:h-[180px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px] rounded-full border-[3px] md:border-[6px] lg:border-[6px] xl:border-[6px] border-white object-cover"
          />
        </div>

        {/* Student Name */}
        <p className="absolute top-[29%] left-[40%] text-center font-bold text-[11px] md:text-[26px] lg:text-[22px] xl:text-[26px] text-cyan-400">
          {studentName || "Student Name"}
        </p>

        {/* Dynamic Student Info */}
        <div className="absolute top-[41%] left-[40%]  flex text-gray-200 text-[7px] md:text-[16px] lg:text-[13px] xl:text-[16px]">
          <div className="flex w-max mx-auto">
   <div className="w-max space-y-1 md:space-y-0">
    {fields.map((field) => (
    <div key={field} className="w-max">
      {/* Label */}
      <span className="flex-1 text-left">
        {field.replace(/([A-Z])/g, " $1")}
      </span>
     
    </div>
  ))}
  </div>
  <div className="w-max space-y-1 md:space-y-0">
     {fields.map((field) => (
              <p className="pl-1" key={field}><span className="pr-1">:</span>  {values[field] || "-"}</p>
            ))}
  </div>
 </div>
        </div>
        {/* <div className="absolute top-[47%] left-[37%] w-[50%] flex text-white text-[6px] md:text-[8px] lg:text-[14px] xl:text-[16px]">
          <div className="w-5/12 pr-2 space-y-0.5 ">
            {fields.map((field) => (
              <p key={field}>{field.replace(/([A-Z])/g, " $1")}</p>
            ))}
          </div>
          <div className="w-8/12 pl-2 space-y-0.5">
            {fields.map((field) => (
              <p key={field}>: {values[field] || "-"}</p>
            ))}
          </div>
        </div> */}

        {/* Signature */}
        {signatureUrl && (
          <div className="absolute bottom-[5%] left-[10%] text-center">
            <Image
            unoptimized
              src={signatureUrl}
              alt="Signature"
              width={60}
              height={30}
              className="object-contain w-[60px] h-[30px] md:w-[90px] md:h-[45px] lg:w-[80px] lg:h-[40px] xl:w-[90px] xl:h-[45px]"
            />
            <p className="text-[5px] md:text-[12px] lg:text-[10px] xl:text-[12px] m-0">
              {whoseSign || "Signature"} Signature
            </p>
          </div>
        )}

        {/* QR Code */}
         {/* QR Code */}
        {/* <div className="absolute bottom-[7%] -right-30 md:-right-50 lg:-right-45 xl:-right-50 md:bottom-[7%] lg:bottom-[7%] left-[90%] lg:left-[91%] -translate-x-1/2 ">
         */}
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
  className="!w-[90px] !h-[22px] md:!w-[170px] md:!h-[50px] lg:!w-[140px] lg:!h-50px] xl:!w-[160px] xl:!h-[50px] object-fill"
  style={{ maxWidth: "none" }} // ✅ prevent Next.js intrinsic limit
/>
        </div>
      </div>
    </div>
  );
};

export default VerticalCardForUser;
