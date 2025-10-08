// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { BiIdCard } from "react-icons/bi";


// export default function Navbar() {
//   const pathname = usePathname();
//   const isHomeath= pathname === "/"
//   return (
//     <nav className="bg-[#4A61E4] text-white">
//       <div className="max-w-7xl mx-auto 
//      md:pt-6 pb-4 px-2">
//         {/* Desktop layout */}
//         <div className="hidden md:flex justify-between items-center h-16">
//           {/* Left - Logo */}
//           <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
//             <span><BiIdCard size={30} /></span>
//             <span className="text-[20px]">AutoIDGen</span>
//           </Link>

//           {/* Center - Links */}
//           <div className="flex space-x-8 text-[18px]">
//             <Link href={isHomeath ? "#features" : '/'}className="hover:opacity-80">Features</Link>
//             <Link href={isHomeath? "#how-it-works":'/'} className="hover:opacity-80">How It Works</Link>
//             <Link href="/verify" className="hover:opacity-80">Verify ID Card</Link>
//           </div>

//           {/* Right - Button */}
//           <div>
//             <Link href="/login" className="bg-white text-[#4A61E4] py-4 px-6 rounded-2xl font-medium hover:bg-gray-100 transition">
//               Log In
//             </Link>
//           </div>
//         </div>

//         {/* Mobile layout */}
//         <div className="flex flex-col md:hidden py-4 space-y-4">
//           {/* Top - Links */}
//           <div className="flex justify-center space-x-8 text-[clamp(12px,2vw,14px)]">
//           <Link href={isHomeath?"#features":'/'} className="hover:opacity-80">Features</Link>
//             <Link href={isHomeath?"#how-it-works":'/'} className="hover:opacity-80">How It Works</Link>
//             <Link href="/verify" className="hover:opacity-80">Verify ID Card</Link>
//           </div>

//           {/* Bottom - Logo + Button */}
//           <div className="flex justify-between items-center">
//             <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
//               <span><BiIdCard size={30} /></span>
//               <span className="text-[20px]">AutoIDGen</span>
//             </Link>
//             <Link href="/login" className="bg-white text-blue-600 px-4 py-1 rounded-lg font-medium hover:bg-gray-100 transition">
//               Log In
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }



"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiIdCard } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Navbar() {
  const pathname = usePathname();
  const isHomeath = pathname === "/";
  const isStudent = pathname.includes("user");
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="bg-[#4A61E4] text-white">
      <div className="max-w-7xl mx-auto md:pt-6 pb-4 px-2">
        {/* Desktop layout */}
        <div className="hidden md:flex justify-between items-center h-16">
          {/* Left - Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-lg"
          >
            <span>
              <BiIdCard size={30} />
            </span>
            <span className="text-[20px]">AutoIDGen</span>
          </Link>

          {/* Center - Links */}
          <div className="flex space-x-8 text-[18px]">
            <Link
              href={isHomeath ? "#features" : "/"}
              className="hover:opacity-80"
            >
              Features
            </Link>
            <Link
              href={isHomeath ? "#how-it-works" : "/"}
              className="hover:opacity-80"
            >
              How It Works
            </Link>
            {!isStudent &&(
              
              <Link href="/verify" className="hover:opacity-80">
              Verify ID Card
            </Link>
            )}
          </div>

          {/* Right - Conditional Button */}
          {isStudent ? (<div></div>): (

            <div>
            {isAuthenticated ? (
              <Link
              href="/dashboard"
              className="bg-white text-[#4A61E4] py-4 px-6 rounded-2xl font-medium hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
            ) : (
              <Link
              href="/login"
              className="bg-white text-[#4A61E4] py-4 px-6 rounded-2xl font-medium hover:bg-gray-100 transition"
              >
                Log In
              </Link>
            )}
          </div>
            )}
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col md:hidden py-4 space-y-4">
          {/* Top - Links */}
          <div className="flex justify-center space-x-8 text-[clamp(12px,2vw,14px)]">
            <Link
              href={isHomeath ? "#features" : "/"}
              className="hover:opacity-80"
            >
              Features
            </Link>
            <Link
              href={isHomeath ? "#how-it-works" : "/"}
              className="hover:opacity-80"
            >
              How It Works
            </Link>
            <Link href="/verify" className="hover:opacity-80">
              Verify ID Card
            </Link>
          </div>

          {/* Bottom - Logo + Conditional Button */}
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 font-bold text-lg"
            >
              <span>
                <BiIdCard size={30} />
              </span>
              <span className="text-[20px]">AutoIDGen</span>
            </Link>

            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="bg-white text-blue-600 px-4 py-1 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="bg-white text-blue-600 px-4 py-1 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
