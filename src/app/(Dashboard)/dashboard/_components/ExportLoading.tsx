// "use client"

// import { motion } from "framer-motion"
// import { Loader2 } from "lucide-react"
// import Image from "next/image"

// export default function ExportLoading() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.4 }}
//         className="w-full max-w-md text-center space-y-6"
//       >
//         {/* Illustration */}
//         <div className="hidden md:block">
//           <Image
//             src="/images/desktop-illustration.svg"
//             alt="Loading illustration"
//             width={120}
//             height={120}
//             className="w-full h-96 object-contain"
//           />
//         </div>
//         <div className="block md:hidden">
//           <Image
//             src="/images/mobile-illustration.svg"
//             alt="Loading illustration"
//             width={120}
//             height={120}
//             className="w-full h-96 object-contain"
//           />
//         </div>

//         {/* Animated loader */}
//         <div className="flex flex-col items-center gap-3">
//           <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-gray-700 font-medium"
//           >
//             Exporting your cards, please wait…
//           </motion.p>
//           <motion.div
//             className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden"
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
//           >
//             <div className="h-full bg-indigo-500 w-full"></div>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }


"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import Image from "next/image"

interface ExportLoadingProps {
  progress?: number
}

export default function ExportLoading({ progress = 0 }: ExportLoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md text-center space-y-6"
      >
        {/* Illustration */}
        <div className="hidden md:block">
          <Image
            src="/images/desktop-illustration.svg"
            alt="Loading illustration"
            width={120}
            height={120}
            className="w-full h-96 object-contain"
          />
        </div>
        <div className="block md:hidden">
          <Image
            src="/images/mobile-illustration.svg"
            alt="Loading illustration"
            width={120}
            height={120}
            className="w-full h-96 object-contain"
          />
        </div>

        {/* Animated loader */}
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-700 font-medium"
          >
            Exporting your cards, please wait…
          </motion.p>
          
          {/* Progress percentage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-indigo-600"
          >
            {progress}%
          </motion.div>
          
          {/* Progress Bar */}
          <div className="w-2/3 h-3 bg-gray-200 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <div className="h-full w-full bg-white/20 animate-pulse"></div>
            </motion.div>
          </div>
          
          {/* Status text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-500"
          >
            {progress < 15 && "Preparing export..."}
            {progress >= 15 && progress < 85 && "Downloading images..."}
            {progress >= 85 && progress < 100 && "Creating ZIP file..."}
            {progress === 100 && "Export complete!"}
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}