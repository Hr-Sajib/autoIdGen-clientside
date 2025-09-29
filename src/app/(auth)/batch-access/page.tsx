// //? role batch code and serial number consoled 

// "use client";
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// import { RootState } from "@/lib/store";
// import { toast } from "sonner";

// const AccessForm: React.FC = () => {
//   const role = useSelector((state: RootState) => state.role.selected); // 👈 Get role (student/employee)

//   const [batchCode, setBatchCode] = useState(["", "", "", ""]);
//   const [rollSerial, setRollSerial] = useState("");
//   const [errors, setErrors] = useState<{ batchCode?: string; rollSerial?: string }>({});

//   const handleBatchCodeChange = (
//     index: number,
//     value: string,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const numericValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
//     const newBatchCode = [...batchCode];
//     newBatchCode[index] = numericValue.slice(0, 1); // Limit to 1 character
//     setBatchCode(newBatchCode);

//     // Move focus to next input
//     if (numericValue && index < 3) {
//       const nextInput = document.getElementById(`batchCode-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }

//     // Handle backspace
//     if (
//       (e.nativeEvent as InputEvent).inputType === "deleteContentBackward" &&
//       !value &&
//       index > 0
//     ) {
//       newBatchCode[index] = "";
//       setBatchCode(newBatchCode);
//       const prevInput = document.getElementById(`batchCode-${index - 1}`);
//       if (prevInput) prevInput.focus();
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 4);
//     if (pasteData.length === 4) {
//       const newBatchCode = pasteData.split("");
//       setBatchCode(newBatchCode);
//       const lastInput = document.getElementById(`batchCode-3`);
//       if (lastInput) lastInput.focus();
//     }
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors: { batchCode?: string; rollSerial?: string } = {};

//     if (batchCode.some((val) => val === "")) {
//       newErrors.batchCode = "Batch Code is required";
//       valid = false;
//     }

//     if (!rollSerial.trim()) {
//       newErrors.rollSerial = "Roll / Serial Number is required";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       toast.success("Form submitted successfully 🚀");
//       console.log({
//         role, // 👈 role will be logged here
//         batchCode: batchCode.join(""),
//         rollSerial,
//       });
//     } else {
//       toast.error("Please fix the errors before submitting ❌");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           {/* Batch Code */}
//           <div className="space-y-2">
//             <Label htmlFor="batchCode" className="text-sm font-medium text-black">
//               Batch Code
//             </Label>
//             <div className="flex space-x-2">
//               {batchCode.map((value, index) => (
//                 <Input
//                   key={index}
//                   id={`batchCode-${index}`}
//                   type="text"
//                   value={value}
//                   onChange={(e) => handleBatchCodeChange(index, e.target.value, e)}
//                   onPaste={index === 0 ? handlePaste : undefined}
//                   placeholder=""
//                   className="h-12 w-1/4 px-2 bg-gray-100/80 rounded-lg text-center"
//                   maxLength={1}
//                   inputMode="numeric"
//                   pattern="[0-9]*"
//                   autoFocus={index === 0}
//                 />
//               ))}
//             </div>
//             {errors.batchCode && (
//               <p className="text-red-500 text-xs mt-1">{errors.batchCode}</p>
//             )}
//           </div>

//           {/* Roll / Serial Number */}
//           <div className="space-y-2">
//             <Label htmlFor="rollSerial" className="text-sm font-medium text-black">
//               Roll / Serial Number
//             </Label>
//             <Input
//               id="rollSerial"
//               type="text"
//               value={rollSerial}
//               onChange={(e) => setRollSerial(e.target.value.replace(/[^0-9]/g, ""))}
//               placeholder="Type Roll / Serial Number"
//               className="h-12 px-4 bg-gray-100/80 rounded-lg"
//               inputMode="numeric"
//               pattern="[0-9]*"
//             />
//             {errors.rollSerial && (
//               <p className="text-red-500 text-xs mt-1">{errors.rollSerial}</p>
//             )}
//           </div>

//           {/* Submit */}
//           <Button
//             type="submit"
//             className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg text-base"
//           >
//             Access My Form
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AccessForm;



"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // 👈 Router import
import { AiOutlineExclamationCircle, AiOutlineQuestionCircle } from "react-icons/ai";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const AccessForm: React.FC = () => {
  const router = useRouter(); // 👈 router hook
  const role = useSelector((state: RootState) => state.role.selected);

  const [batchCode, setBatchCode] = useState(["", "", "", ""]);
  const [rollSerial, setRollSerial] = useState("");
  const [errors, setErrors] = useState<{ batchCode?: string; rollSerial?: string }>({});

  const handleBatchCodeChange = (
    index: number,
    value: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    const newBatchCode = [...batchCode];
    newBatchCode[index] = numericValue.slice(0, 1);
    setBatchCode(newBatchCode);

    if (numericValue && index < 3) {
      const nextInput = document.getElementById(`batchCode-${index + 1}`);
      if (nextInput) nextInput.focus();
    }

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
      setBatchCode(pasteData.split(""));
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

      const formData = {
        // role,
        batchCode: batchCode.join(""),
        rollSerial,
      };

      console.log("👉 Submitting:", formData);

      // 👇 Redirect with query params
      const query = new URLSearchParams(formData).toString();
      router.push(`/user?${query}`);
    } else {
      toast.error("Please fix the errors before submitting ❌");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
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
          <div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Label htmlFor="rollSerial" className="text-sm font-medium text-black">
                  Serial Number
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="inset-y-0 right-0 flex items-center pr-3">
                      <AiOutlineQuestionCircle className="h-5 w-5 text-red-500 cursor-help" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="max-w-[320px]">
                      <span className="text-pretty">Serial Number is a way to keep each card unique. Institutions may use Student/Employee ID, Roll No., Card No., or Registration No. instead.</span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id="rollSerial"
                type="text"
                value={rollSerial}
                onChange={(e) => setRollSerial(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Type Serial Number"
                className="h-12 px-4 bg-gray-100/80 rounded-lg"
                inputMode="numeric"
                pattern="[0-9]*"
              />
              {errors.rollSerial && (
                <p className="text-red-500 text-xs mt-1">{errors.rollSerial}</p>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-700 mt-3 pl-2">
                Serial Number simply means a unique reference (Roll, ID, Card, Reg. No.).
              </p>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg text-base"
          >
            Access My Form
          </Button>
        </form>
      </div >
    </div >
  );
};

export default AccessForm;
