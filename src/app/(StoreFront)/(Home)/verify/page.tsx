

// "use client"

// import { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// import {
//   Loader2,
//   Shield,
//   CheckCircle,
//   XCircle,
//   FileText,
//   Copy,
//   Check,
//   Image as ImageIcon,
//   User,
//   Hash,
//   Calendar,
// } from "lucide-react"
// import Image from "next/image"
// import { useVerificationStatusMutation } from "@/lib/feature/Card/cardApi"

// export default function VerifyPage() {
//   const [payload, setPayload] = useState("")
//   const [verifyStatus, setVerifyStatus] = useState<any>(null)
//   const [copied, setCopied] = useState(false)

//   const [verifyCard, { isLoading }] = useVerificationStatusMutation()

//   const handleVerify = async () => {
//     try {
//       const res = await verifyCard({ payloadString: payload }).unwrap()
//       setVerifyStatus(res)
//     } catch (err: unknown) {
//       const errorMessage =
//         (err as { data?: { message?: string } })?.data?.message ||
//         "Verification failed"
//       setVerifyStatus({ error: errorMessage })
//     }
//   }

//   const copyToClipboard = (text: string) => {
//     navigator.clipboard.writeText(text)
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2000)
//   }

//   const formatJsonResponse = (data: any) => JSON.stringify(data, null, 2)

//   return (
//     <div className="bg-white min-h-screen">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex justify-center items-center">
//         <div className="w-full max-w-[90%] sm:max-w-2xl space-y-6">
//           {/* Header */}
//           <div className="text-center space-y-4">
//             <div className="flex justify-center">
//               <div className="p-3 bg-blue-100 rounded-full">
//                 <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
//               </div>
//             </div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
//               ID Card Verification
//             </h1>
//             <p className="text-gray-600 text-sm sm:text-base">
//               Verify the authenticity of your ID cards with our secure verification system
//             </p>
//           </div>

//           {/* Input Card */}
//           <Card className="bg-white border-gray-200 shadow-lg">
//             <CardHeader className="pb-4">
//               <CardTitle className="text-gray-900 text-xl sm:text-2xl font-semibold text-center">
//                 Enter QR/Barcode Details
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
//                   <FileText className="h-4 w-4" />
//                   Batch Code - Unique ID
//                 </label>
//                 <Input
//                   placeholder="2134-3859"
//                   value={payload}
//                   onChange={(e) => setPayload(e.target.value)}
//                   className="h-10 sm:h-12 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
//                 />
//               </div>

//               <Button
//                 onClick={handleVerify}
//                 className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
//                 disabled={isLoading || !payload}
//               >
//                 {isLoading ? (
//                   <>
//                     <Loader2 className="h-5 w-5 animate-spin mr-2" />
//                     Verifying...
//                   </>
//                 ) : (
//                   <>
//                     <Shield className="h-5 w-5 mr-2" />
//                     Verify ID Card
//                   </>
//                 )}
//               </Button>
//             </CardContent>
//           </Card>

//           {/* Verification Results */}
//           {verifyStatus && (
//             <Card className="bg-white border-gray-200 shadow-lg">
//               <CardHeader className="pb-4 flex items-center justify-between">
//                 <CardTitle className="text-gray-900 text-lg sm:text-xl font-semibold">
//                   Verification Results
//                 </CardTitle>
//                 {!verifyStatus.error && (
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => copyToClipboard(formatJsonResponse(verifyStatus))}
//                     className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
//                   >
//                     {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
//                   </Button>
//                 )}
//               </CardHeader>

//               <CardContent>
//                 {/* Error Message */}
//                 {verifyStatus.error ? (
//                   <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//                     <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
//                     <div>
//                       <h3 className="text-red-600 font-semibold text-sm sm:text-base mb-1">
//                         Verification Failed
//                       </h3>
//                       <p className="text-red-500 text-sm">{verifyStatus.error}</p>
//                     </div>
//                   </div>
//                 ) : verifyStatus.status === "success" ? (
//                   verifyStatus.data ? (
//                     <>
//                       {/* ✅ Success Message */}
//                       <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
//                         <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
//                         <div>
//                           <h3 className="text-green-600 font-semibold text-sm sm:text-base mb-1">
//                             Verification Successful
//                           </h3>
//                           <p className="text-green-500 text-sm">
//                             {verifyStatus.message}
//                           </p>
//                         </div>
//                       </div>

//                       {/* ✅ Authenticated User Data */}
//                       <div className="space-y-4">
//                         <div className="flex flex-col sm:flex-row gap-4 items-center">
//                           <div className="w-40 h-40 relative border rounded-lg overflow-hidden">
//                             <Image
//                               src={verifyStatus.data.personalPhotoUrl}
//                               alt="Personal Photo"
//                               fill
//                               className="object-cover"
//                             />
//                           </div>
//                           <div className="flex-1 space-y-2">
//                             <div className="flex items-center gap-2 text-gray-800 font-medium">
//                               <User className="h-4 w-4 text-blue-600" />
//                               {verifyStatus.data.name}
//                             </div>
//                             <div className="flex items-center gap-2 text-gray-700">
//                               <Hash className="h-4 w-4 text-blue-600" />
//                               <span className="text-sm">
//                                 Batch ID: <strong>{verifyStatus.data.batchId}</strong>
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-2 text-gray-700">
//                               <Hash className="h-4 w-4 text-blue-600" />
//                               <span className="text-sm">
//                                 Unique Number: <strong>{verifyStatus.data.uniqueNumber}</strong>
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-2 text-gray-700">
//                               <Calendar className="h-4 w-4 text-blue-600" />
//                               <span className="text-sm">
//                                 Created:{" "}
//                                 {new Date(
//                                   verifyStatus.data.createdAt
//                                 ).toLocaleString()}
//                               </span>
//                             </div>
//                             <div className="flex items-center gap-2 text-gray-700">
//                               <Calendar className="h-4 w-4 text-blue-600" />
//                               <span className="text-sm">
//                                 Updated:{" "}
//                                 {new Date(
//                                   verifyStatus.data.updatedAt
//                                 ).toLocaleString()}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         {/* Card Image */}
//                         <div>
//                           <h4 className="text-gray-900 font-semibold mb-2 flex items-center gap-2">
//                             <ImageIcon className="h-4 w-4 text-blue-600" />
//                             Card Image
//                           </h4>
//                           <div className="w-full border rounded-lg overflow-hidden">
//                             <Image
//                               src={verifyStatus.data.cardImageUrl}
//                               alt="Card Image"
//                               width={600}
//                               height={400}
//                               className="object-cover w-full h-auto"
//                             />
//                           </div>
//                         </div>

//                         {/* Additional Fields */}
//                         {/* {verifyStatus.data.additionalfieldValues?.length > 0 && (
//                           <div>
//                             <h4 className="text-gray-900 font-semibold mb-2">
//                               Additional Information
//                             </h4>
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                               {verifyStatus.data.additionalfieldValues.map(
//                                 (field: any, idx: number) => (
//                                   <div
//                                     key={idx}
//                                     className="p-2 border rounded-lg bg-gray-50"
//                                   >
//                                     <p className="text-sm text-gray-600 font-medium">
//                                       {field.label}:
//                                     </p>
//                                     <p className="text-sm text-gray-800">
//                                       {field.value}
//                                     </p>
//                                   </div>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         )} */}
//                       </div>
//                     </>
//                   ) : (
//                     <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
//                       <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
//                       <div>
//                         <h3 className="text-red-600 font-semibold text-sm sm:text-base mb-1">
//                           Verification Failed
//                         </h3>
//                         <p className="text-red-500 text-sm">
//                           No record found for this ID.
//                         </p>
//                       </div>
//                     </div>
//                   )
//                 ) : null}
//               </CardContent>
//             </Card>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }







"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Loader2,
  Shield,
  CheckCircle,
  XCircle,
  FileText,
  Copy,
  Check,
  Image as ImageIcon,
  User,
  Hash,
  Calendar,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import { useVerificationStatusMutation } from "@/lib/feature/Card/cardApi"

export default function VerifyPage() {
  const [payload, setPayload] = useState("")
  const [verifyStatus, setVerifyStatus] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const [imageErrors, setImageErrors] = useState<{
    personalPhoto: boolean
    cardImage: boolean
  }>({ personalPhoto: false, cardImage: false })

  const [verifyCard, { isLoading }] = useVerificationStatusMutation()

  const handleVerify = async () => {
    try {
      // Reset image errors when verifying
      setImageErrors({ personalPhoto: false, cardImage: false })
      
      const res = await verifyCard({ payloadString: payload }).unwrap()
      setVerifyStatus(res)
    } catch (err: unknown) {
      const errorMessage =
        (err as { data?: { message?: string } })?.data?.message ||
        "Verification failed"
      setVerifyStatus({ error: errorMessage })
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatJsonResponse = (data: any) => JSON.stringify(data, null, 2)

  const handleImageError = (imageType: "personalPhoto" | "cardImage") => {
    setImageErrors((prev) => ({ ...prev, [imageType]: true }))
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex justify-center items-center">
        <div className="w-full max-w-[90%] sm:max-w-2xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              ID Card Verification
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Verify the authenticity of your ID cards with our secure verification system
            </p>
          </div>

          {/* Input Card */}
          <Card className="bg-white border-gray-200 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900 text-xl sm:text-2xl font-semibold text-center">
                Enter QR/Barcode Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FileText className="h-4 w-4" />
                  Batch Code - Unique ID
                </label>
                <Input
                  placeholder="2134-3859"
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  className="h-10 sm:h-12 bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>

              <Button
                onClick={handleVerify}
                className="w-full h-10 sm:h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200"
                disabled={isLoading || !payload}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Verify ID Card
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Verification Results */}
          {verifyStatus && (
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader className="pb-4 flex items-center justify-between">
                <CardTitle className="text-gray-900 text-lg sm:text-xl font-semibold">
                  Verification Results
                </CardTitle>
                {!verifyStatus.error && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(formatJsonResponse(verifyStatus))}
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </CardHeader>

              <CardContent>
                {/* Error Message */}
                {verifyStatus.error ? (
                  <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-red-600 font-semibold text-sm sm:text-base mb-1">
                        Verification Failed
                      </h3>
                      <p className="text-red-500 text-sm">{verifyStatus.error}</p>
                    </div>
                  </div>
                ) : verifyStatus.status === "success" ? (
                  verifyStatus.data ? (
                    <>
                      {/* ✅ Success Message */}
                      <div className="flex items-start gap-3 p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h3 className="text-green-600 font-semibold text-sm sm:text-base mb-1">
                            Verification Successful
                          </h3>
                          <p className="text-green-500 text-sm">
                            {verifyStatus.message}
                          </p>
                        </div>
                      </div>

                      {/* ✅ Authenticated User Data */}
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                          {/* Personal Photo with Error Handling */}
                          <div className="w-40 h-40 relative border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                            {imageErrors.personalPhoto ? (
                              <div className="flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                                <AlertCircle className="h-8 w-8 mb-2" />
                                <span className="text-xs">Image unavailable</span>
                              </div>
                            ) : (
                              <Image
                                src={verifyStatus.data.personalPhotoUrl}
                                alt="Personal Photo"
                                fill
                                className="object-cover"
                                onError={() => handleImageError("personalPhoto")}
                                unoptimized
                              />
                            )}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2 text-gray-800 font-medium">
                              <User className="h-4 w-4 text-blue-600" />
                              {verifyStatus.data.name}
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Hash className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">
                                Batch ID: <strong>{verifyStatus.data.batchId}</strong>
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Hash className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">
                                Unique Number: <strong>{verifyStatus.data.uniqueNumber}</strong>
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">
                                Created:{" "}
                                {new Date(
                                  verifyStatus.data.createdAt
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Calendar className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">
                                Updated:{" "}
                                {new Date(
                                  verifyStatus.data.updatedAt
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Card Image with Error Handling */}
                        <div>
                          <h4 className="text-gray-900 font-semibold mb-2 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-blue-600" />
                            Card Image
                          </h4>
                          <div className="w-full border rounded-lg overflow-hidden bg-gray-100 min-h-[300px] flex items-center justify-center">
                            {imageErrors.cardImage ? (
                              <div className="flex flex-col items-center justify-center text-gray-400 p-8">
                                <AlertCircle className="h-12 w-12 mb-3" />
                                <span className="text-sm">Card image unavailable</span>
                              </div>
                            ) : (
                              <Image
                                src={verifyStatus.data.cardImageUrl}
                                alt="Card Image"
                                width={600}
                                height={400}
                                className="object-cover w-full h-auto"
                                onError={() => handleImageError("cardImage")}
                                unoptimized
                              />
                            )}
                          </div>
                        </div>

                        {/* Additional Fields */}
                        {/* {verifyStatus.data.additionalfieldValues?.length > 0 && (
                          <div>
                            <h4 className="text-gray-900 font-semibold mb-2">
                              Additional Information
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {verifyStatus.data.additionalfieldValues.map(
                                (field: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="p-2 border rounded-lg bg-gray-50"
                                  >
                                    <p className="text-sm text-gray-600 font-medium">
                                      {field.label}:
                                    </p>
                                    <p className="text-sm text-gray-800">
                                      {field.value}
                                    </p>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )} */}
                      </div>
                    </>
                  ) : (
                    <div className="flex items-start gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-red-600 font-semibold text-sm sm:text-base mb-1">
                          Verification Failed
                        </h3>
                        <p className="text-red-500 text-sm">
                          No record found for this ID.
                        </p>
                      </div>
                    </div>
                  )
                ) : null}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}