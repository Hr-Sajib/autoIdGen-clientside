// "use client";
// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { useSelector } from "react-redux";
// import { RootState } from "@/lib/store";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation"; // 👈 Router import
// import {
//   AiOutlineExclamationCircle,
//   AiOutlineQuestionCircle,
// } from "react-icons/ai";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import Link from "next/link";
// import { BiIdCard } from "react-icons/bi";

// const AccessForm: React.FC = () => {
//   const router = useRouter(); // 👈 router hook
//   const role = useSelector((state: RootState) => state.role.selected);

//   const [batchCode, setBatchCode] = useState(["", "", "", ""]);
//   const [rollSerial, setRollSerial] = useState("");
//   const [errors, setErrors] = useState<{
//     batchCode?: string;
//     rollSerial?: string;
//   }>({});

//   const handleBatchCodeChange = (
//     index: number,
//     value: string,
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const numericValue = value.replace(/[^0-9]/g, "");
//     const newBatchCode = [...batchCode];
//     newBatchCode[index] = numericValue.slice(0, 1);
//     setBatchCode(newBatchCode);

//     if (numericValue && index < 3) {
//       const nextInput = document.getElementById(`batchCode-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }

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
//     const pasteData = e.clipboardData
//       .getData("text")
//       .replace(/[^0-9]/g, "")
//       .slice(0, 4);
//     if (pasteData.length === 4) {
//       setBatchCode(pasteData.split(""));
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
//       newErrors.rollSerial = "Unique Number is required";
//       valid = false;
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (validateForm()) {
//       toast.success("Form submitted successfully 🚀");

//       const formData = {
//         // role,
//         batchCode: batchCode.join(""),
//         rollSerial,
//       };

//       const query = new URLSearchParams(formData).toString();
//       router.push(`/user?${query}`);
//     } else {
//       toast.error("Please fix the errors before submitting ❌");
//     }
//   };

//   return (
//     <div className=" bg-white h-screen mx-auto flex items-center justify-center p-4">
//       <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
//         {/* ✅ Logo Header */}
//         <div className="flex justify-center mb-8">
//           <Link
//             href="/"
//             className="flex items-center text-[#4A61E4] space-x-2 font-bold text-lg"
//           >
//             <BiIdCard size={28} />
//             <span className="text-xl sm:text-2xl">AutoIDGen</span>
//           </Link>
//         </div>

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
//                   onChange={(e) =>
//                     handleBatchCodeChange(index, e.target.value, e)
//                   }
//                   onPaste={index === 0 ? handlePaste : undefined}
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
//           <div>
//             <div className="space-y-2">
//               <div className="flex items-center space-x-2">
//                 <Label
//                   htmlFor="rollSerial"
//                   className="text-sm font-medium text-black"
//                 >
//                   Unique Number
//                 </Label>
//                 {/* <Tooltip>
//                   <TooltipTrigger>
//                     <span className="inset-y-0 right-0 flex items-center pr-3">
//                       <AiOutlineQuestionCircle className="h-5 w-5 text-red-500 cursor-help" />
//                     </span>
//                   </TooltipTrigger>
//                   <TooltipContent>
//                     <div className="max-w-[320px]">
//                       <span className="text-pretty">
//                         Unique number refers to Roll No., Registration No.,
//                         Student ID, Employee ID, etc., as assigned by your
//                         organization.
//                       </span>
//                     </div>
//                   </TooltipContent>
//                 </Tooltip> */}
//               </div>
//               <Input
//                 id="rollSerial"
//                 type="text"
//                 value={rollSerial}
//                 onChange={(e) =>
//                   setRollSerial(e.target.value.replace(/[^0-9]/g, ""))
//                 }
//                 placeholder="Type Unique Number"
//                 className="h-12 px-4 bg-gray-100/80 rounded-lg"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//               />
//               {errors.rollSerial && (
//                 <p className="text-red-500 text-xs mt-1">{errors.rollSerial}</p>
//               )}
//             </div>
//             {/* <div>
//               <p className="text-xs text-gray-700 mt-3 pl-2">
//                 Unique number refers to Roll No., Registration No., Student ID, Employee ID, etc., as assigned by your organization.
//               </p>
//             </div> */}
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
import {
  AiOutlineExclamationCircle,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { BiIdCard } from "react-icons/bi";

const AccessForm: React.FC = () => {
  const router = useRouter(); // 👈 router hook
  const role = useSelector((state: RootState) => state.role.selected);

  const [batchCode, setBatchCode] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState<{
    batchCode?: string;
  }>({});

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
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, 4);
    if (pasteData.length === 4) {
      setBatchCode(pasteData.split(""));
      const lastInput = document.getElementById(`batchCode-3`);
      if (lastInput) lastInput.focus();
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors: { batchCode?: string } = {};

    if (batchCode.some((val) => val === "")) {
      newErrors.batchCode = "Batch Code is required";
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
      };

      const query = new URLSearchParams(formData).toString();
      router.push(`/user?${query}`);
    } else {
      toast.error("Please fix the errors before submitting ❌");
    }
  };

  return (
    <div className="bg-white h-screen mx-auto flex items-center justify-center p-4">
      <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
        {/* ✅ Logo Header */}
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="flex items-center text-[#4A61E4] space-x-2 font-bold text-lg"
          >
            <BiIdCard size={28} />
            <span className="text-xl sm:text-2xl">AutoIDGen</span>
          </Link>
        </div>

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
                  onChange={(e) =>
                    handleBatchCodeChange(index, e.target.value, e)
                  }
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