// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { BiIdCard } from "react-icons/bi";
// import { usePathname } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@/lib/slice/Auth/authSlice";
// import { RootState } from "@/lib/store";
// import { LucideLayoutDashboard, LucideVerified } from "lucide-react";

// interface SidebarProps {
//   onToggle?: (isCollapsed: boolean) => void;
// }
// export interface LogOutButtonProps {
//   isDesktopCollapsed?: boolean;
// }

// export function Sidebar({ onToggle }: SidebarProps) {
//   const pathname = usePathname();
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

//   // const navItems = [
//   //   { href: "/dashboard", label: "Dashboard" },
//   //   { href: "/dashboard/verify", label: "Verify ID Card" },
//   // ];

//   const handleDesktopToggle = () => {
//     const newCollapsed = !isDesktopCollapsed;
//     setIsDesktopCollapsed(newCollapsed);
//     onToggle?.(newCollapsed);
//   };
//   const dispatch = useDispatch();

//   // 🔹 এখানে আমরা redux থেকে user আর isAuthenticated নিচ্ছি
//   const { user, isAuthenticated } = useSelector(
//     (state: RootState) => state.auth
//   );

//   // 🔹 যখন user বা isAuthenticated change হবে তখন console.log করবে
//   useEffect(() => {
//     // console.log("👉 Current User:", user);
//     // console.log("👉 Is Authenticated:", isAuthenticated);
//   }, [user, isAuthenticated]);

//   // 🔹 Logout বাটনে ক্লিক করলে এই ফাংশন রান করবে
//   const handleLogout = () => {
//     dispatch(logout());
//     // console.log("🚪 User logged out!");
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       {/* <Button
//         variant="ghost"
//         size="icon"
//         className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#4A61E4] hover:bg-[*4A61E4] rounded-2xl "
//         onClick={() => setIsMobileOpen(!isMobileOpen)}
//       > */}
       
//        <Button
//   variant="ghost"
//   size="icon"
//   className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#4A61E4] hover:bg-[#4A61E4] rounded-2xl"
//   onClick={() => setIsMobileOpen(!isMobileOpen)}
// >
//         {isMobileOpen ? (
//           <svg
//             className="h-10 w-10"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M6 18L18 6M6 6l12 12"
//             />
            
//           </svg>
//         ) : (
//           <svg
//             className="h-10 w-10"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         )}
//       </Button>

//       <Button
//         variant="ghost"
//         size="icon"
//         className="hidden md:block fixed top-4 left-4 z-80 hover:bg-blue-600"
//         onClick={handleDesktopToggle}
//       >
  
//         <div className="ml-2">
//           <svg
//             className="h-5 w-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </div>
//       </Button>

//       {/* Sidebar */}
//       {/* <aside
//         className={cn(
//           "fixed left-0 top-0 z-40 h-full bg-white border-r border-gray-200 transform transition-all duration-200 ease-in-out",
//           "md:translate-x-0",
//           isDesktopCollapsed ? "md:w-18" : "md:w-64",
//           isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
//         )}
//       > */}
       
//        <aside
//   className={cn(
//     "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transform transition-all duration-200 ease-in-out",
//     "md:translate-x-0",
//     isDesktopCollapsed ? "md:w-18" : "md:w-64",
//     isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
//   )}
// >

//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="p-6 pb-10 border-b border-gray-200">
//             <div className="flex items-center gap-2 md:ml-12 -mb-12">
//               <div
//                 className={cn(
//                   "font-semibold text-gray-900 transition-opacity duration-200",
//                   isDesktopCollapsed ? "md:hidden" : "block"
//                 )}
//               >
//                 <div className="flex items-center gap-2">
//                   {!isDesktopCollapsed && (
//                     <Link
//                       href="/"
//                       className="flex items-center space-x-2 font-bold text-lg"
//                     >
//                       <span className=" text-[#4A61E4]">
//                         <BiIdCard size={30} />
//                       </span>
//                       <span className="text-[20px] text-[#4A61E4]">AutoIDGen</span>
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 pb-1">
                     
//             {
//               pathname.includes('/dashboard') && (
//                 <Button
//                   variant="default"
//                   className={cn(
//                     "w-full bg-[#4A61E4] hover:bg-blue-700 text-white transition-all duration-200",
//                     isDesktopCollapsed
//                       ? "md:justify-center md:px-2"
//                       : "justify-start  gap-3"
//                   )}
//                 >
//                   <LucideLayoutDashboard />

//                   <Link href="/dashboard">
//                     <span
//                       className={cn(
//                         "transition-opacity duration-200",
//                         isDesktopCollapsed ? "md:hidden" : "block"
//                       )}
//                     >
//                       Dashboard
//                     </span>
//                   </Link>
//                 </Button>

//               )
//             }
//           </nav>
//           {/* <nav className="flex-1 p-4 pt-1">
//             {pathname.includes('/dashboard') && (
//               <Button
//                 variant="default"
//                 className={cn(
//                   "w-full bg-blue-400 hover:bg-blue-700 text-white transition-all duration-200",
//                   isDesktopCollapsed
//                     ? "md:justify-center md:px-2"
//                     : "justify-start  gap-3"
//                 )}
//               >
//                 <LucideVerified />

//                 <Link href="/dashboard/verify">
//                   <span
//                     className={cn(
//                       "transition-opacity duration-200",
//                       isDesktopCollapsed ? "md:hidden" : "block"
//                     )}
//                   >
//                     Verify ID Card
//                   </span>
//                 </Link>
//               </Button>
//             )}
//           </nav> */}

//           {/* Footer */}
//           <div className="p-4 border-t border-gray-200">
//             {pathname.includes("/user") ? (
//               <Link href="/">
//                 <Button
//                   variant="ghost"
//                   className={cn(
//                     "w-full text-gray-600 hover:text-gray-900 transition-all duration-200",
//                     isDesktopCollapsed
//                       ? "md:justify-center md:px-2"
//                       : "justify-start gap-3"
//                   )}
//                 >
//                   <svg
//                     className="h-4 w-4 flex-shrink-0"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                     />
//                   </svg>
//                   <span
//                     className={cn(
//                       "transition-opacity duration-200",
//                       isDesktopCollapsed ? "md:hidden" : "block"
//                     )}
//                   >
//                     Sign Out
//                   </span>{" "}
//                 </Button>
//               </Link>
//             ) : (
//               <Button
//                 onClick={handleLogout}
//                 variant="ghost"
//                 className={cn(
//                   "w-full text-gray-600 hover:text-gray-900 transition-all duration-200",
//                   isDesktopCollapsed
//                     ? "md:justify-center md:px-2"
//                     : "justify-start gap-3"
//                 )}
//               >
//                 <svg
//                   className="h-4 w-4 flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                   />
//                 </svg>
//                 <span
//                   className={cn(
//                     "transition-opacity duration-200",
//                     isDesktopCollapsed ? "md:hidden" : "block"
//                   )}
//                 >
//                   Sign Out
//                 </span>
//               </Button>
//             )}
//           </div>
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {/* {isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/80 z-30 md:hidden"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )} */}
//     {isMobileOpen && (
//   <div
//     className="fixed inset-0 bg-black/80 z-40 md:hidden"
//     onClick={() => setIsMobileOpen(false)}
//   />
// )}

//     </>

//   );
// }









// "use client";

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { BiIdCard } from "react-icons/bi";
// import { usePathname } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "@/lib/slice/Auth/authSlice";
// import { RootState } from "@/lib/store";
// import { LucideLayoutDashboard, LucideVerified } from "lucide-react";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

// interface SidebarProps {
//   onToggle?: (isCollapsed: boolean) => void;
// }
// export interface LogOutButtonProps {
//   isDesktopCollapsed?: boolean;
// }

// export function Sidebar({ onToggle }: SidebarProps) {
//   const pathname = usePathname();
//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);


// const userData = localStorage.getItem("user");
// console.log(userData);

  

//   const handleDesktopToggle = () => {
//     const newCollapsed = !isDesktopCollapsed;
//     setIsDesktopCollapsed(newCollapsed);
//     onToggle?.(newCollapsed);
//   };
//   const dispatch = useDispatch();

//   const { user, isAuthenticated } = useSelector(
//     (state: RootState) => state.auth
//   );

  

//   useEffect(() => {
//     console.log("👉 Current User:", user);
//     console.log("👉 Is Authenticated:", isAuthenticated);
//   }, [user, isAuthenticated]);

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <>
//       {/* Mobile menu button */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#4A61E4] hover:bg-[#4A61E4] font-extrabold! rounded-2xl"
//         onClick={() => setIsMobileOpen(!isMobileOpen)}
//       >
//         {isMobileOpen ? (
//           <HiOutlineX className="h-9! w-9! font-bold!" />
//         ) : ( 
//           <HiOutlineMenu className="h-9! w-9! font-bold!" />
//         )} 
//       </Button>

//       {/* Desktop toggle button */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="hidden md:block fixed top-4 left-4 z-80 hover:bg-blue-600"
//         onClick={handleDesktopToggle}
//       >
//         <div className="ml-2">
//           <HiOutlineMenu size={40} className="h-10 w-10" />
//         </div>
//       </Button>

//       {/* Sidebar */}
//       <aside
//         className={cn(
//           "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transform transition-all duration-200 ease-in-out",
//           "md:translate-x-0",
//           isDesktopCollapsed ? "md:w-18" : "md:w-64",
//           isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
//         )}
//       >
//         <div className="flex flex-col h-full">
//           {/* Header */}
//           <div className="p-6 pb-10 border-b border-gray-200">
//             <div className="flex items-center gap-2 md:ml-12 -mb-12">
//               <div
//                 className={cn(
//                   "font-semibold text-gray-900 transition-opacity duration-200",
//                   isDesktopCollapsed ? "md:hidden" : "block"
//                 )}
//               >
//                 <div className="flex items-center gap-2">
//                   {!isDesktopCollapsed && (
//                     <Link
//                       href="/"
//                       className="flex items-center space-x-2 font-bold text-lg"
//                     >
//                       <span className=" text-[#4A61E4]">
//                         <BiIdCard size={30} />
//                       </span>
//                       <span className="text-[20px] text-[#4A61E4]">AutoIDGen</span>
//                     </Link>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Navigation */}
//           <nav className="flex-1 p-4 pb-1">
//             {pathname.includes('/dashboard') && (
//               <Button
//                 variant="default"
//                 className={cn(
//                   "w-full bg-[#4A61E4] hover:bg-blue-700 text-white transition-all duration-200",
//                   isDesktopCollapsed
//                     ? "md:justify-center md:px-2"
//                     : "justify-start  gap-3"
//                 )}
//               >
//                 <LucideLayoutDashboard />

//                 <Link href="/dashboard">
//                   <span
//                     className={cn(
//                       "transition-opacity duration-200",
//                       isDesktopCollapsed ? "md:hidden" : "block"
//                     )}
//                   >
//                     Dashboard
//                   </span>
//                 </Link>
//               </Button>
//             )}
//           </nav>

//           {/* Footer */}
//           <div>

//             i want to show this user information here 
//           </div>
//           <div className="p-4 border-t border-gray-200">
//             {pathname.includes("/user") ? (
//               <Link href="/">
//                 <Button
//                   variant="ghost"
//                   className={cn(
//                     "w-full text-gray-600 hover:text-gray-900 transition-all duration-200",
//                     isDesktopCollapsed
//                       ? "md:justify-center md:px-2"
//                       : "justify-start gap-3"
//                   )}
//                 >
//                   <svg
//                     className="h-4 w-4 flex-shrink-0"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                     />
//                   </svg>
//                   <span
//                     className={cn(
//                       "transition-opacity duration-200",
//                       isDesktopCollapsed ? "md:hidden" : "block"
//                     )}
//                   >
//                     Sign Out
//                   </span>{" "}
//                 </Button>
//               </Link>
//             ) : (
//               <Button
//                 onClick={handleLogout}
//                 variant="ghost"
//                 className={cn(
//                   "w-full text-gray-600 hover:text-gray-900 transition-all duration-200",
//                   isDesktopCollapsed
//                     ? "md:justify-center md:px-2"
//                     : "justify-start gap-3"
//                 )}
//               >
//                 <svg
//                   className="h-4 w-4 flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                   />
//                 </svg>
//                 <span
//                   className={cn(
//                     "transition-opacity duration-200",
//                     isDesktopCollapsed ? "md:hidden" : "block"
//                   )}
//                 >
//                   Sign Out
//                 </span>
//               </Button>
//             )}
//           </div>
//         </div>
//       </aside> 

//       {/* Overlay for mobile */}
//       {isMobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/80 z-40 md:hidden"
//           onClick={() => setIsMobileOpen(false)}
//         />
//       )}
//     </>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BiIdCard } from "react-icons/bi";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/lib/slice/Auth/authSlice";
import { RootState } from "@/lib/store";
import { LucideLayoutDashboard, LucideVerified } from "lucide-react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

interface SidebarProps {
  onToggle?: (isCollapsed: boolean) => void;
}

export interface LogOutButtonProps {
  isDesktopCollapsed?: boolean;
}

export function Sidebar({ onToggle }: SidebarProps) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  // State for user data from localStorage
  const [storedUser, setStoredUser] = useState<any>(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        const parsedUser = JSON.parse(userDataString);
        setStoredUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);

  const handleDesktopToggle = () => {
    const newCollapsed = !isDesktopCollapsed;
    setIsDesktopCollapsed(newCollapsed);
    onToggle?.(newCollapsed);
  };

  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    console.log("👉 Current User:", user);
    console.log("👉 Is Authenticated:", isAuthenticated);
  }, [user, isAuthenticated]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-[#4A61E4] hover:bg-[#4A61E4] font-extrabold! rounded-2xl"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? (
          <HiOutlineX className="h-9! w-9! font-bold!" />
        ) : ( 
          <HiOutlineMenu className="h-9! w-9! font-bold!" />
        )} 
      </Button>

      {/* Desktop toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:block fixed top-4 left-4 z-80 hover:bg-blue-600"
        onClick={handleDesktopToggle}
      >
        <div className="ml-2">
          <HiOutlineMenu size={40} className="h-10 w-10" />
        </div>
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 transform transition-all duration-200 ease-in-out",
          "md:translate-x-0",
          isDesktopCollapsed ? "md:w-18" : "md:w-64",
          isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 pb-10 border-b border-gray-200">
            <div className="flex items-center gap-2 md:ml-12 -mb-12">
              <div
                className={cn(
                  "font-semibold text-gray-900 transition-opacity duration-200",
                  isDesktopCollapsed ? "md:hidden" : "block"
                )}
              >
                <div className="flex items-center gap-2">
                  {!isDesktopCollapsed && (
                    <Link
                      href="/"
                      className="flex items-center space-x-2 font-bold text-lg"
                    >
                      <span className=" text-[#4A61E4]">
                        <BiIdCard size={30} />
                      </span>
                      <span className="text-[20px] text-[#4A61E4]">AutoIDGen</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 pb-1">
            {pathname.includes('/dashboard') && (
              <Button
                variant="default"
                className={cn(
                  "w-full bg-[#4A61E4] hover:bg-blue-700 text-white transition-all duration-200",
                  isDesktopCollapsed
                    ? "md:justify-center md:px-2"
                    : "justify-start  gap-3"
                )}
              >
                <LucideLayoutDashboard />

                <Link href="/dashboard">
                  <span
                    className={cn(
                      "transition-opacity duration-200",
                      isDesktopCollapsed ? "md:hidden" : "block"
                    )}
                  >
                    Dashboard
                  </span>
                </Link>
              </Button>
            )}
          </nav>

          {/* Footer: User Information */}
          {storedUser && (
            <div className={cn(
              "p-4 border-t border-gray-200",
              isDesktopCollapsed ? "md:hidden" : ""
            )}>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-[#4A61E4] flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {storedUser.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {storedUser.userName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {storedUser.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 border-t border-gray-200">
            {pathname.includes("/user") ? (
              <Link href="/">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full text-gray-600 hover:text-gray-900 transition-all duration-200",
                    isDesktopCollapsed
                      ? "md:justify-center md:px-2"
                      : "justify-start gap-3"
                  )}
                >
                  <svg
                    className="h-4 w-4 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span
                    className={cn(
                      "transition-opacity duration-200",
                      isDesktopCollapsed ? "md:hidden" : "block"
                    )}
                  >
                    Sign Out
                  </span>{" "}
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleLogout}
                variant="ghost"
                className={cn(
                  "w-full text-gray-600 hover:text-gray-900 transition-all duration-200",
                  isDesktopCollapsed
                    ? "md:justify-center md:px-2"
                    : "justify-start gap-3"
                )}
              >
                <svg
                  className="h-4 w-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span
                  className={cn(
                    "transition-opacity duration-200",
                    isDesktopCollapsed ? "md:hidden" : "block"
                  )}
                >
                  Sign Out
                </span>
              </Button>
            )}
          </div>
        </div>
      </aside> 

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}