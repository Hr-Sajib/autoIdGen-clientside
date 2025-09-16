












"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
// import { BiIdCard } from "react-icons/bi";
// import Link from "next/link";
import toast from "react-hot-toast";

const AccessForm: React.FC = () => {
  const [batchCode, setBatchCode] = useState(["", "", "", ""]);
  const [rollSerial, setRollSerial] = useState("");
  const [errors, setErrors] = useState<{ batchCode?: string; rollSerial?: string }>({});

  const handleBatchCodeChange = (
    index: number,
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
    const newBatchCode = [...batchCode];
    newBatchCode[index] = numericValue.slice(0, 1); // Limit to 1 character
    setBatchCode(newBatchCode);

    // Move focus to next input
    if (numericValue && index < 3) {
      const nextInput = document.getElementById(`batchCode-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

    // Handle backspace
    if (
      (e.nativeEvent as InputEvent).inputType === "deleteContentBackward" &&
      !value &&
      index > 0
    ) {
      newBatchCode[index] = "";
      setBatchCode(newBatchCode);
      const prevInput = document.getElementById(`batchCode-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 4);
    if (pasteData.length === 4) {
      const newBatchCode = pasteData.split("");
      setBatchCode(newBatchCode);
      const lastInput = document.getElementById(`batchCode-3`);
      if (lastInput) lastInput.focus();
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { batchCode?: string; rollSerial?: string } = {};

    if (batchCode.some((val) => val === "")) {
      newErrors.batchCode = "Batch Code is required";
      valid = false;
    }

    if (!rollSerial.trim()) {
      newErrors.rollSerial = "Roll / Serial Number is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Form submitted successfully 🚀");
      console.log({
        batchCode: batchCode.join(""),
        rollSerial,
      });
    } else {
      toast.error("Please fix the errors before submitting ❌");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
        {/* <Link
          href="/"
          className="flex space-x-2 mb-5 self-center text-[#4A61E4] font-bold text-lg"
        >
          <span>
            <BiIdCard size={30} />
          </span>
          <span className="text-[20px]">AutoIDGen</span>
        </Link> */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Batch Code */}
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
                  onChange={(e) => handleBatchCodeChange(index, e.target.value, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  placeholder=""
                  className="h-12 w-1/4 px-2 bg-gray-100/80 rounded-lg text-center"
                  maxLength={1}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoFocus={index === 0}
                />
              ))}
            </div>
            {errors.batchCode && (
              <p className="text-red-500 text-xs mt-1">{errors.batchCode}</p>
            )}
          </div>

          {/* Roll / Serial Number */}
          <div className="space-y-2">
            <Label htmlFor="rollSerial" className="text-sm font-medium text-black">
              Roll / Serial Number
            </Label>
            <Input
              id="rollSerial"
              type="text"
              value={rollSerial}
              onChange={(e) => setRollSerial(e.target.value.replace(/[^0-9]/g, ""))}
              placeholder="Type Roll / Serial Number"
              className="h-12 px-4 bg-gray-100/80 rounded-lg"
              inputMode="numeric"
              pattern="[0-9]*"
            />
            {errors.rollSerial && (
              <p className="text-red-500 text-xs mt-1">{errors.rollSerial}</p>
            )}
          </div>

          {/* Submit */}
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
