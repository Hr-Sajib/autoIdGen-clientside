"use client";
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";
import background from "@/../public/image/shapes/studentId/potrait_id_card_bg.svg";

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
      className="calibri relative min-w-[262px] h-[153px]
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
        {/* Institute Info */}
        <div className="flex items-center ml-[33%] mt-[3%] md:mt-[4%] w-[60%]">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Institute Logo"
              width={50}
              height={50}
              className="object-contain bg-white rounded w-[20px] h-[20px]
                         md:w-[35px] md:h-[35px]
                         lg:w-[60px] lg:h-[60px]
                         xl:w-[70px] xl:h-[70px]"
            />
          )}
          <div className="w-full ml-2">
            <p className="text-white md:font-bold text-[8px] md:text-[12px] lg:text-[18px] xl:text-[22px] text-center">
              {instituteName}
            </p>
            <p className="text-center text-gray-300 text-[5px] md:text-[7px] lg:text-[12px] xl:text-[14px] mt-1">
              {address}
            </p>
          </div>
        </div>

        {/* Card Type */}
        <p className="absolute top-[3%] left-[12%] text-[4px] md:text-[8px] lg:text-[11px] xl:text-[12px] text-gray-500 border border-gray-500 px-1 py-0.5 rounded">
          {idCardType}
        </p>

        {/* Profile Image */}
        <div className="absolute top-[20%] left-[6%]">
          <Image
            src={profileUrl || "https://via.placeholder.com/100"}
            alt="Profile Photo"
            width={100}
            height={100}
            className="w-[70px] h-[70px] md:w-[110px] md:h-[110px] lg:w-[160px] lg:h-[160px] xl:w-[190px] xl:h-[190px] rounded-full border-[3px] md:border-[5px] lg:border-[6px] xl:border-[7px] border-white object-cover"
          />
        </div>

        {/* Student Name */}
        <p className="absolute top-[30%] left-[2%] right-0 text-center font-bold text-[10px] md:text-[17px] lg:text-[22px] xl:text-[26px] text-cyan-400">
          {studentName || "Student Name"}
        </p>

        {/* Dynamic Student Info */}
        <div className="absolute top-[47%] left-[37%] w-[50%] flex text-white text-[6px] md:text-[8px] lg:text-[14px] xl:text-[16px]">
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
        </div>

        {/* Signature */}
        {signatureUrl && (
          <div className="absolute bottom-[3%] left-[10%] text-center">
            <Image
              src={signatureUrl}
              alt="Signature"
              width={60}
              height={30}
              className="object-contain w-[50px] h-[20px] md:w-[60px] md:h-[27px] lg:w-[80px] lg:h-[40px] xl:w-[90px] xl:h-[45px]"
            />
            <p className="text-[4px] md:text-[7px] lg:text-[10px] xl:text-[12px] m-0">
              {whoseSign || "Signature"} Signature
            </p>
          </div>
        )}

        {/* QR Code */}
        <div className="absolute bottom-[7%] left-[91%] -translate-x-1/2">
          <QRCodeCanvas
            value={qrData}
            size={40}
            className="!w-[20px] !h-[20px] md:!w-[35px] md:!h-[35px] lg:!w-[60px] lg:!h-[60px] xl:!w-[70px] xl:!h-[70px] bg-white rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default VerticalCardForUser;
