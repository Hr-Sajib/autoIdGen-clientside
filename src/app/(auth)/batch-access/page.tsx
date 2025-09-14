"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { BiIdCard } from "react-icons/bi";
import Link from "next/link";

const AccessForm: React.FC = () => {
  const [batchCode, setBatchCode] = useState(["", "", "", ""]);
  const [rollSerial, setRollSerial] = useState("");

 console.log(batchCode, rollSerial);


  const handleBatchCodeChange = (index: number, value: string) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
    const newBatchCode = [...batchCode];
    newBatchCode[index] = numericValue.slice(0, 1); // Limit to 1 character
    setBatchCode(newBatchCode);

    // Move focus to next input
    if (numericValue && index < 3) {
      const nextInput = document.getElementById(`batchCode-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
        {/* <Link href="/" className="flex space-x-2 mb-5 self-center text-[#4A61E4] font-bold text-lg">
          <span><BiIdCard size={30} /></span>
          <span className="text-[20px]">AutoIDGen</span>
        </Link> */}
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="batchCode" className="text-sm font-medium text-black">
              Batch Code
            </Label>
            <div className="flex space-x-2">
              {batchCode.map((value, index) => (
                <Input
                  key={index}
                  id={`batchCode-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleBatchCodeChange(index, e.target.value)}
                  placeholder=""
                  className="h-12 w-1/4 px-2 bg-gray-100/80 rounded-lg text-center"
                  maxLength={1}
                  inputMode="numeric" // Restrict to numeric input
                  pattern="[0-9]*" // HTML5 pattern for numbers only
                  autoFocus={index === 0}
                />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rollSerial" className="text-sm font-medium text-black">
              Roll / Serial Number
            </Label>
            <Input
              id="rollSerial"
              type="text"
              value={rollSerial}
              onChange={(e) => setRollSerial(e.target.value.replace(/[^0-9]/g, ""))} // Allow only numbers
              placeholder="Type Roll / Serial Number"
              className="h-12 px-4 bg-gray-100/80 rounded-lg"
              inputMode="numeric" // Restrict to numeric input
              pattern="[0-9]*" // HTML5 pattern for numbers only
            />
          </div>
          <Button
            type="submit"
            className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg text-base"
          >
            Access My Form
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AccessForm;