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
  department = "Sales",
  employeeId = "1233",
  bloodGroup = "B+",
  dob = "12-12-2000",
  phone = "+65-2131-XXXX",
  companyName = "ABC Group of Industries",
  // companyAddress = "Dummy address 21A/B mine union point, Singapore",
  personImage = "https://i.ibb.co.com/C3Dg8jpt/avatar5.jpg",
  logo = "https://i.postimg.cc/hthwhxwy/uni-logo.avif",
  signature = "https://i.postimg.cc/TYfbfv1Q/principal-Sign.png",
  whoseSign,
  idCardType,
  address,
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
          {idCardType} ID
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
        <p className="absolute top-[33%] md:top-[41%] left-[4%] md:left-[5%] right-0 text-center font-bold
                      text-[10px] md:text-[17px] lg:text-[22px] xl:text-[26px] text-cyan-400">
          {"Name"}
        </p>

        {/* Details */}
        <div className="absolute top-[46%] md:top-[52%] left-[37%] md:left-[38%] w-[50%] flex justify-center text-white text-[6px] md:text-[8px] lg:text-[14px] xl:text-[16px]">
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