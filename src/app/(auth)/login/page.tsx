
//! before heardcoded to vercel link

// "use client";

// import React, { useState } from "react";
// import { Eye, EyeOff, X } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { BiIdCard } from "react-icons/bi";
// import { useLogInMutation, useSendResetOtpMutation, useResetPasswordOtpMutation } from "@/lib/feature/Auth/authApi";
// import {jwtDecode} from "jwt-decode";
// import { TUser } from "@/types/inedx";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { toast } from "sonner";
// import { setUser } from "@/lib/slice/Auth/authSlice";

// const AutoIDGenLogin: React.FC = () => {
//   // Login states
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Modal states
//   const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
//   const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

//   // Forgot password states
//   const [forgotEmail, setForgotEmail] = useState("");
  
//   // Reset password states
//   const [resetEmail, setResetEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // API hooks
//   const [logIn, { isLoading: isLoginLoading }] = useLogInMutation();
//   const [sendResetOtp, { isLoading: isSendingOtp }] = useSendResetOtpMutation();
//   const [resetPasswordOtp, { isLoading: isResettingPassword }] = useResetPasswordOtpMutation();
  
//   const router = useRouter();
//   const dispatch = useDispatch();

//   // Login handler
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const res = await logIn({ email, password }).unwrap();
//       const accessToken = res?.data?.accessToken || res?.accessToken;
      
//       if (!accessToken) {
//         toast.error("Login failed: Token missing.");
//         return;
//       }

//       const decoded = jwtDecode<TUser>(accessToken);
//       dispatch(setUser({ user: decoded, accessToken }));

//       toast.success("Login successful!");
//       router.push("/dashboard");
//     } catch (error: unknown) {
//       console.error("Login error:", error);
      
//       if (
//         typeof error === "object" &&
//         error !== null &&
//         "data" in error &&
//         typeof (error as { data?: { message?: string } }).data?.message === "string"
//       ) {
//         toast.error((error as { data?: { message?: string } }).data?.message);
//       } else {
//         toast.error("Login failed. Please check your credentials.");
//       }
//     }
//   };

//   // Send OTP handler
//   const handleSendOtp = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!forgotEmail) {
//       toast.error("Please enter your email address");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(forgotEmail)) {
//       toast.error("Please enter a valid email address");
//       return;
//     }

//     try {
//       await sendResetOtp({ email: forgotEmail }).unwrap();
//       toast.success("OTP sent successfully! Check your email.");
      
//       // Close forgot password modal and open reset password modal
//       setShowForgotPasswordModal(false);
//       setResetEmail(forgotEmail);
//       setShowResetPasswordModal(true);
//     } catch (error: unknown) {
//       console.error("Send OTP error:", error);
      
//       if (
//         typeof error === "object" &&
//         error !== null &&
//         "data" in error &&
//         typeof (error as { data?: { message?: string } }).data?.message === "string"
//       ) {
//         toast.error((error as { data?: { message?: string } }).data?.message);
//       } else {
//         toast.error("Failed to send OTP. Please try again.");
//       }
//     }
//   };

//   // Reset password handler
//   const handleResetPassword = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!resetEmail) {
//       toast.error("Email is required");
//       return;
//     }

//     if (!otp || otp.length < 6) {
//       toast.error("Please enter a valid 6-digit OTP");
//       return;
//     }

//     if (!newPassword) {
//       toast.error("Please enter a new password");
//       return;
//     }

//     if (newPassword.length < 6) {
//       toast.error("Password must be at least 6 characters long");
//       return;
//     }

//     if (newPassword !== confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     try {
//       await resetPasswordOtp({
//         email: resetEmail,
//         otp: Number(otp),
//         newPassword,
//       }).unwrap();

//       toast.success("Password reset successfully!");
      
//       // Reset all states and close modal
//       setShowResetPasswordModal(false);
//       setResetEmail("");
//       setOtp("");
//       setNewPassword("");
//       setConfirmPassword("");
//       setForgotEmail("");
//     } catch (error: unknown) {
//       console.error("Reset password error:", error);

//       if (
//         typeof error === "object" &&
//         error !== null &&
//         "data" in error &&
//         typeof (error as { data?: { message?: string } }).data?.message === "string"
//       ) {
//         toast.error((error as { data?: { message?: string } }).data?.message);
//       } else {
//         toast.error("Failed to reset password. Please try again.");
//       }
//     }
//   };

//   // Close modal handlers
//   const closeForgotPasswordModal = () => {
//     setShowForgotPasswordModal(false);
//     setForgotEmail("");
//   };

//   const closeResetPasswordModal = () => {
//     setShowResetPasswordModal(false);
//     setResetEmail("");
//     setOtp("");
//     setNewPassword("");
//     setConfirmPassword("");
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
//         {/* Logo */}
//         <Link
//           href="/"
//           className="flex space-x-2 mb-5 self-center text-[#4A61E4] font-bold text-lg"
//         >
//           <span>
//             <BiIdCard size={30} />
//           </span>
//           <Link href="/" className="text-[20px]">AutoIDGen</Link>
//         </Link>

//         <h1 className="text-[34px] font-bold text-center mb-12 text-gray-900">
//           Log In
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Email */}
//           <div className="space-y-2">
//             <Label htmlFor="email" className="text-sm font-medium text-black">
//               Email
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Type Your Email"
//               className="h-12 px-4 bg-gray-100/80 rounded-lg"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="space-y-2">
//             <div className="flex items-center justify-between mb-2">
//               <Label htmlFor="password" className="text-sm font-medium text-black">
//                 Password
//               </Label>
//               {/* Forgot Password Button */}
//               <button
//                 type="button"
//                 onClick={() => setShowForgotPasswordModal(true)}
//                 className="text-sm text-[#4A61E4] hover:underline font-medium"
//               >
//                 Forgot Password?
//               </button>
//             </div>
//             <div className="relative">
//               <Input
//                 id="password"
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Type Password"
//                 className="h-12 px-4 pr-12 bg-gray-100/80 rounded-lg"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           <Button
//             type="submit"
//             disabled={isLoginLoading}
//             className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg text-base"
//           >
//             {isLoginLoading ? "Logging in..." : "Log In"}
//           </Button>
//         </form>

//         <p className="text-center mt-6">
//           Don&apos;t have any account?{" "}
//           <Link href="/sign-up" className="text-[#4A61E4] font-semibold">
//             create account
//           </Link>
//         </p>
//       </div>

//       {/* Forgot Password Modal */}
//       {showForgotPasswordModal && (
//         <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
//             {/* Close button */}
//             <button
//               onClick={closeForgotPasswordModal}
//               className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//             >
//               <X size={24} />
//             </button>

//             <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
//               Forgot Password
//             </h2>
//             <p className="text-center text-gray-600 mb-6 text-sm">
//               Enter your email address and we&apos;ll send you an OTP
//             </p>

//             <form onSubmit={handleSendOtp} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="forgot-email" className="text-sm font-medium text-black">
//                   Email
//                 </Label>
//                 <Input
//                   id="forgot-email"
//                   type="email"
//                   value={forgotEmail}
//                   onChange={(e) => setForgotEmail(e.target.value)}
//                   placeholder="Type Your Email"
//                   className="h-12 px-4 bg-gray-100/80 rounded-lg"
//                   required
//                 />
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isSendingOtp}
//                 className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg"
//               >
//                 {isSendingOtp ? "Sending OTP..." : "Send OTP"}
//               </Button>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Reset Password Modal */}
//       {showResetPasswordModal && (
//         <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
//             {/* Close button */}
//             <button
//               onClick={closeResetPasswordModal}
//               className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
//             >
//               <X size={24} />
//             </button>

//             <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
//               Reset Password
//             </h2>
//             <p className="text-center text-gray-600 mb-6 text-sm">
//               Enter the OTP and your new password
//             </p>

//             <form onSubmit={handleResetPassword} className="space-y-4">
//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="reset-email" className="text-sm font-medium text-black">
//                   Email
//                 </Label>
//                 <Input
//                   id="reset-email"
//                   type="email"
//                   value={resetEmail}
//                   onChange={(e) => setResetEmail(e.target.value)}
//                   placeholder="Type Your Email"
//                   className="h-12 px-4 bg-gray-100/80 rounded-lg"
//                   required
//                 />
//               </div>

//               {/* OTP */}
//               <div className="space-y-2">
//                 <Label htmlFor="otp" className="text-sm font-medium text-black">
//                   OTP Code
//                 </Label>
//                 <Input
//                   id="otp"
//                   type="text"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//                   placeholder="Enter 6-digit OTP"
//                   className="h-12 px-4 bg-gray-100/80 rounded-lg text-center text-lg tracking-widest font-semibold"
//                   maxLength={6}
//                   required
//                 />
//               </div>

//               {/* New Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="new-password" className="text-sm font-medium text-black">
//                   New Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="new-password"
//                     type={showNewPassword ? "text" : "password"}
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     placeholder="Type New Password"
//                     className="h-12 px-4 pr-12 bg-gray-100/80 rounded-lg"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowNewPassword(!showNewPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="space-y-2">
//                 <Label htmlFor="confirm-password" className="text-sm font-medium text-black">
//                   Confirm Password
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="confirm-password"
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     placeholder="Confirm New Password"
//                     className="h-12 px-4 pr-12 bg-gray-100/80 rounded-lg"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                   </button>
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 disabled={isResettingPassword}
//                 className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg"
//               >
//                 {isResettingPassword ? "Resetting..." : "Reset Password"}
//               </Button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AutoIDGenLogin;














"use client";

import React, { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiIdCard } from "react-icons/bi";
// import { useLogInMutation, useSendResetOtpMutation, useResetPasswordOtpMutation } from "@/lib/feature/Auth/authApi";
import { useLogInMutation} from "@/lib/feature/Auth/authApi";
import {jwtDecode} from "jwt-decode";
import { TUser } from "@/types/inedx";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setUser } from "@/lib/slice/Auth/authSlice";

export interface Error {
  message?:string
} 


const AutoIDGenLogin: React.FC = () => {
  // Login states
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Modal states
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState("");
  
  // Reset password states
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
const [isResettingPassword, setIsResettingPassword] = useState(false);

  // API hooks
  const [logIn, { isLoading: isLoginLoading }] = useLogInMutation();
  // const [sendResetOtp, { isLoading: isSendingOtp }] = useSendResetOtpMutation();
  // const [resetPasswordOtp, { isLoading: isResettingPassword }] = useResetPasswordOtpMutation();
  
  const router = useRouter();
  const dispatch = useDispatch();

  // Login handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await logIn({ email, password }).unwrap();
      const accessToken = res?.data?.accessToken || res?.accessToken;
      
      if (!accessToken) {
        toast.error("Login failed: Token missing.");
        return;
      }

      const decoded = jwtDecode<TUser>(accessToken);
      dispatch(setUser({ user: decoded, accessToken }));

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: unknown) {
      console.error("Login error:", error);
      
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data?: { message?: string } }).data?.message === "string"
      ) {
        toast.error((error as { data?: { message?: string } }).data?.message);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    }
  };

  // ?Send OTP handler
  // const handleSendOtp = async (e: React.FormEvent) => {
  //   e.preventDefault();
    
  //   if (!forgotEmail) {
  //     toast.error("Please enter your email address");
  //     return;
  //   }

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(forgotEmail)) {
  //     toast.error("Please enter a valid email address");
  //     return;
  //   }

  //   try {
  //     await sendResetOtp({ email: forgotEmail }).unwrap();
  //     toast.success("OTP sent successfully! Check your email.");
      
  //     // Close forgot password modal and open reset password modal
  //     setShowForgotPasswordModal(false);
  //     setResetEmail(forgotEmail);
  //     setShowResetPasswordModal(true);
  //   } catch (error: unknown) {
  //     console.error("Send OTP error:", error);
      
  //     if (
  //       typeof error === "object" &&
  //       error !== null &&
  //       "data" in error &&
  //       typeof (error as { data?: { message?: string } }).data?.message === "string"
  //     ) {
  //       toast.error((error as { data?: { message?: string } }).data?.message);
  //     } else {
  //       toast.error("Failed to send OTP. Please try again.");
  //     }
  //   }
  // };

  //? reset pass handler previous 

  //   const handleResetPassword = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!resetEmail) {
  //     toast.error("Email is required");
  //     return;
  //   }

  //   if (!otp || otp.length < 6) {
  //     toast.error("Please enter a valid 6-digit OTP");
  //     return;
  //   }

  //   if (!newPassword) {
  //     toast.error("Please enter a new password");
  //     return;
  //   }

  //   if (newPassword.length < 6) {
  //     toast.error("Password must be at least 6 characters long");
  //     return;
  //   }

  //   if (newPassword !== confirmPassword) {
  //     toast.error("Passwords do not match!");
  //     return;
  //   }

  //   try {
  //     await resetPasswordOtp({
  //       email: resetEmail,
  //       otp: Number(otp),
  //       newPassword,
  //     }).unwrap();

  //     toast.success("Password reset successfully!");
      
  //     // Reset all states and close modal
  //     setShowResetPasswordModal(false);
  //     setResetEmail("");
  //     setOtp("");
  //     setNewPassword("");
  //     setConfirmPassword("");
  //     setForgotEmail("");
  //   } catch (error: unknown) {
  //     console.error("Reset password error:", error);

  //     if (
  //       typeof error === "object" &&
  //       error !== null &&
  //       "data" in error &&
  //       typeof (error as { data?: { message?: string } }).data?.message === "string"
  //     ) {
  //       toast.error((error as { data?: { message?: string } }).data?.message);
  //     } else {
  //       toast.error("Failed to reset password. Please try again.");
  //     }
  //   }
  // };




// ✅ Updated Send OTP handler
const handleSendOtp = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!forgotEmail) {
    toast.error("Please enter your email address");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(forgotEmail)) {
    toast.error("Please enter a valid email address");
    return;
  }

  setIsSendingOtp(true); // Start loading
  try {
    const res = await fetch("https://rabbi-server.vercel.app/api/v1/user/send-reset-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: forgotEmail }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to send OTP.");
    }

    toast.success("OTP sent successfully! Check your email.");

    // Proceed to next step
    setShowForgotPasswordModal(false);
    setResetEmail(forgotEmail);
    setShowResetPasswordModal(true);
  } catch (error: unknown) {
    if (error instanceof Error){
      console.error("Send OTP error:", error);
      toast.error(error.message || "Something went wrong. Try again.");
    }
  } finally {
    setIsSendingOtp(false); // Stop loading
  }
};


// ✅ Updated Reset Password handler
const handleResetPassword = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!resetEmail) {
    toast.error("Email is required");
    return;
  }

  if (!otp || otp.length !== 6) {
    toast.error("Please enter a valid 6-digit OTP");
    return;
  }

  if (!newPassword) {
    toast.error("Please enter a new password");
    return;
  }

  if (newPassword.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  setIsResettingPassword(true); // Start loading
  try {
    const res = await fetch("https://rabbi-server.vercel.app/api/v1/user/reset-password-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: resetEmail,
        otp: Number(otp),
        newPassword,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.message || "Failed to reset password.");
    }

    toast.success("Password reset successfully!");

    // Clear everything
    setShowResetPasswordModal(false);
    setResetEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setForgotEmail("");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Reset password error:", error);
      toast.error(error.message || "Something went wrong. Try again.");
    }
  } finally {
    setIsResettingPassword(false); // Stop loading
  }
};



 


  // Close modal handlers
  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    setForgotEmail("");
  };

  const closeResetPasswordModal = () => {
    setShowResetPasswordModal(false);
    setResetEmail("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full md:max-w-xl flex flex-col bg-white md:rounded-3xl md:shadow-lg sm:p-8 md:py-20">
        {/* Logo */}
        <Link
          href="/"
          className="flex space-x-2 mb-5 self-center text-[#4A61E4] font-bold text-lg"
        >
          <span>
            <BiIdCard size={30} />
          </span>
          <Link href="/" className="text-[20px]">AutoIDGen</Link>
        </Link>

        <h1 className="text-[34px] font-bold text-center mb-12 text-gray-900">
          Log In
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Type Your Email"
              className="h-12 px-4 bg-gray-100/80 rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="password" className="text-sm font-medium text-black">
                Password
              </Label>
              {/* Forgot Password Button */}
              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-sm text-[#4A61E4] hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type Password"
                className="h-12 px-4 pr-12 bg-gray-100/80 rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoginLoading}
            className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg text-base"
          >
            {isLoginLoading ? "Logging in..." : "Log In"}
          </Button>
        </form>

        <p className="text-center mt-6">
          Don&apos;t have any account?{" "}
          <Link href="/sign-up" className="text-[#4A61E4] font-semibold">
            create account
          </Link>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
            {/* Close button */}
            <button
              onClick={closeForgotPasswordModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
              Forgot Password
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm">
              Enter your email address and we&apos;ll send you an OTP
            </p>

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email" className="text-sm font-medium text-black">
                  Email
                </Label>
                <Input
                  id="forgot-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Type Your Email"
                  className="h-12 px-4 bg-gray-100/80 rounded-lg"
                  required
                />
              </div>
<Button
  type="submit"
  disabled={isSendingOtp}
  className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg"
>
  {isSendingOtp ? "Sending OTP..." : "Send OTP"}
</Button>
            </form>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 bg-black/50  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closeResetPasswordModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-center mb-2 text-gray-900">
              Reset Password
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm">
              Enter the OTP and your new password
            </p>

            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="reset-email" className="text-sm font-medium text-black">
                  Email
                </Label>
                <Input
                  id="reset-email"
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Type Your Email"
                  className="h-12 px-4 bg-gray-100/80 rounded-lg"
                  required
                />
              </div>

              {/* OTP */}
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium text-black">
                  OTP Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 6-digit OTP"
                  className="h-12 px-4 bg-gray-100/80 rounded-lg text-center text-lg tracking-widest font-semibold"
                  maxLength={6}
                  required
                />
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-sm font-medium text-black">
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Type New Password"
                    className="h-12 px-4 pr-12 bg-gray-100/80 rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-sm font-medium text-black">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm New Password"
                    className="h-12 px-4 pr-12 bg-gray-100/80 rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button
  type="submit"
  disabled={isResettingPassword}
  className="w-full h-12 bg-[#4A61E4] hover:bg-blue-700/70 text-white font-semibold rounded-lg"
>
  {isResettingPassword ? "Resetting..." : "Reset Password"}
</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoIDGenLogin;