// "use client"
// import React, { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// // import CardPreview from "../_components/CardPreview"
// import { useRouter } from "next/navigation"
// import StudentCard from "@/components/layout/cards/StudentCard"
// import { DashboardHeader } from "../_components/dashboard-header"
// import { LucideSignature, LucideUpload, LucideUser2 } from "lucide-react"

// export default function InstituteTemplateSetupPage() {
//   const router = useRouter()
//   const [form, setForm] = useState({
//     instituteName: "Eastern Mine School & College",
//     idCardType: "Student",
//     address: "21A/B mine union point, Singapore",
//     department: "",
//     roll: "",
//     bloodGroup: "",
//     dob: "",
//     phone: "",
//     logoUrl: "",
//     signatureUrl: "",
//     profileUrl: "https://via.placeholder.com/100",
//     bgColor: "#0f172a",
//     qrData: "CSE/1233/B+/12122000/+65-2131-XXXX",
//   })

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
//     if (e.target.files && e.target.files[0]) {
//       const fileUrl = URL.createObjectURL(e.target.files[0])
//       setForm({ ...form, [field]: fileUrl })
//     }
//   }

//   const handleContinue = () => {
//     router.push("/dashboard/student-information")
//   }

//   const colors = ["#0f172a", "#0ea5e9", "#3b82f6", "#06b6d4", "#9333ea", "#ec4899"]

//   return (
//     <div className="min-h-screen bg-background">
//       <DashboardHeader />
//       <div className="flex flex-col md:flex-row justify-between gap-10 p-8">
//         {/* ===== Left Form Section ===== */}
//         <div className="flex-1 max-w-xl space-y-6">
//           <h2 className="text-3xl font-bold">ID Card Template Setup</h2>

//           <div className="space-y-4">
//             <Input
//               name="instituteName"
//               value={form.instituteName}
//               onChange={handleChange}
//               placeholder="Type Institute Name"
//               className="bg-gray-50 py-6 px-4 rounded-lg"
//             />
//             <Input
//               name="idCardType"
//               value={form.idCardType}
//               onChange={handleChange}
//               placeholder="Type Student"
//               className="bg-gray-50 py-6 px-4 rounded-lg"
//             />
//             <Input
//               name="address"
//               value={form.address}
//               onChange={handleChange}
//               placeholder="Type Address"
//               className="bg-gray-50 py-6 px-4 rounded-lg"
//             />
//             <Input
//               name="department"
//               value={form.department}
//               onChange={handleChange}
//               placeholder="Type Department"
//               className="bg-gray-50 py-6 px-4 rounded-lg"
//             />
//             <Input
//               name="roll"
//               value={form.roll}
//               onChange={handleChange}
//               placeholder="Type Roll"
//               className="bg-gray-50 py-6 px-4 rounded-lg"
//             />
//             <Input
//               name="bloodGroup"
//               value={form.bloodGroup}
//               onChange={handleChange}
//               placeholder="Type Blood Group"
//               className="bg-gray-50 py-6 px-4 rounded-lg"
//             />
//             <Input
//               name="dob"
//               value={form.dob}
//               onChange={handleChange}
//               placeholder="Type Date of Birth"
//               className="bg-gray-50 py-6 px-4 rounded-lg"
//             />
//             <Input
//               name="phone"
//               value={form.phone}
//               onChange={handleChange}
//               placeholder="Type Phone"
//               className="bg-gray-50 py-6 px-4 rounded-lg"
//             />

//             {/* Upload Buttons */}
//             <div className="flex gap-4 pt-2">
//               <label className="cursor-pointer">
//                 <span className="px-6 py-3  rounded-lg bg-gray-50 flex items-center gap-2">
//                   <LucideUpload /> Institution Logo
//                 </span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(e, "logoUrl")}
//                   className="hidden"
//                 />
//               </label>

//               <label className="cursor-pointer">
//                 <span className="px-6 py-3 rounded-lg bg-gray-50 flex items-center gap-2">
//                   <LucideUser2 /> Profile Photo
//                 </span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(e, "profileUrl")}
//                   className="hidden"
//                 />
//               </label>

//               <label className="cursor-pointer">
//                 <span className="px-6 py-3  rounded-lg  bg-gray-50 flex items-center gap-2">
//                   <LucideSignature /> Signature
//                 </span>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(e, "signatureUrl")}
//                   className="hidden"
//                 />
//               </label>
//             </div>
//           </div>

//           <div className="flex justify-between gap-4">
//             <Button variant="secondary" className="rounded-2xl text-lg px-6 py-6" disabled={!form.instituteName || !form.idCardType}>
//               Preview
//             </Button>
//             <Button onClick={handleContinue} className="bg-[#4A61E4]  rounded-2xl text-lg px-6 py-6">Next</Button>
//           </div>
//         </div>

//         {/* ===== Right Preview Section ===== */}
//         <div className="pr-32">
//           {/* <CardPreview
//           instituteName={form.instituteName}
//           idCardType={form.idCardType}
//           logoUrl={form.logoUrl}
//           signatureUrl={form.signatureUrl}
//           profileUrl={form.profileUrl}
//           bgColor={form.bgColor}
//         /> */}
//           <StudentCard
//             instituteName={form.instituteName}
//             address={form.address}
//             idCardType={form.idCardType}
//             studentName={form.instituteName}
//             department={form.department}
//             roll={form.roll}
//             bloodGroup={form.bloodGroup}
//             dob={form.dob}
//             phone={form.phone}
//             logoUrl={form.logoUrl}
//             signatureUrl={form.signatureUrl}
//             profileUrl={form.profileUrl}
//             // logoUrl="https://i.postimg.cc/hthwhxwy/uni-logo.avif"
//             // signatureUrl="https://i.postimg.cc/TYfbfv1Q/principal-Sign.png"
//             // profileUrl="https://i.postimg.cc/Y0ydK27n/person.jpg"
//             bgColor={form.bgColor}
//             qrData={form.qrData}
//           />

//           {/* Color Picker */}
//           <div className="flex gap-2 mt-4">
//             <p className="text-xs text-gray-500">Select photo Background Color</p>
//             {colors.map((c) => (
//               <button
//                 key={c}
//                 onClick={() => setForm({ ...form, bgColor: c })}
//                 className="w-6 h-6 rounded-full border"
//                 style={{ backgroundColor: c }}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

























"use client"
import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import StudentCard from "@/components/layout/cards/StudentCard"
import { DashboardHeader } from "../_components/dashboard-header"
import { LucideSignature, LucideUpload, LucideUser2 } from "lucide-react"
import EmployeeCard from "@/components/layout/cards/EmployeCard"

export default function InstituteTemplateSetupPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    instituteName: "",
    idCardType: "",
    address: "",
    department: "",
    roll: "",
    bloodGroup: "",
    dob: "",
    phone: "",
    logoUrl: "",
    signatureUrl: "",
    profileUrl: "https://via.placeholder.com/100",
    bgColor: "#0f172a",
    qrData: "CSE/1233/B+/12122000/+65-2131-XXXX",
    whoseSign: ''
  })

  const [cardOrientation, setCardOrientation] = useState("horizontal") // horizontal (student) or vertical (employee)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0])
      setForm({ ...form, [field]: fileUrl })
    }
  }

  const handleContinue = () => {
    // Store the card orientation preference for the next page
    sessionStorage.setItem('cardOrientation', cardOrientation)
    router.push("/dashboard/student-information")
  }

  const colors = ["#0f172a", "#10b981", "#3b82f6", "#06b6d4", "#06b6d4", "#a855f7"]

  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      
      <div className="px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Form Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                ID Card Template Setup
              </h1>
            </div>

            <div className="space-y-6">
              {/* Institute Name */}
              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Institute Name
                </label>
                <Input
                  name="instituteName"
                  value={form.instituteName}
                  onChange={handleChange}
                  placeholder="Type Institute Name"
                  className="h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* ID Card Type */}
              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  ID card Type
                </label>
                <Input
                  name="idCardType"
                  value={form.idCardType}
                  onChange={handleChange}
                  placeholder="Type Student/Employee"
                  className="h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Address
                </label>
                <Input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Type Address"
                  className="h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Whose Sign */}
              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Whose sign
                </label>
                <Input
                  name="whoseSign"
                  value={form.whoseSign}
                  onChange={handleChange}
                  placeholder="Whose sign"
                  className="h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                />
              </div>
              {/* Whose Sign */}
              <div className="space-y-2">
                <label className="text-base font-medium text-gray-700">
                  Whose sign
                </label>
                <Input
                  name="whoseSign"
                  value={form.whoseSign}
                  onChange={handleChange}
                  placeholder="Whose sign"
                  className="h-14 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder:text-gray-500"
                />
              </div>

              {/* Upload Buttons */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <label className="cursor-pointer flex-1">
                    <div className="h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                      <LucideUpload size={20} className="text-gray-600" />
                      <span className="text-gray-700 text-xl font-medium">Institution Logo</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "logoUrl")}
                      className="hidden"
                    />
                  </label>

                  <label className="cursor-pointer flex-1">
                    <div className="h-14 bg-gray-50 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors">
                      <LucideSignature size={20} className="text-gray-600" />
                      <span className="text-gray-700 text-xl font-medium">Signature</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "signatureUrl")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button 
                  variant="outline" 
                  className="flex-1 h-14 text-gray-600 border-gray-300 rounded-xl text-lg font-medium hover:bg-gray-50"
                  disabled={!form.instituteName || !form.idCardType}
                >
                  Preview
                </Button>
                <Button 
                  onClick={handleContinue}
                  className="flex-1 h-14 bg-[#4A61E4] hover:bg-[#4A61E6] text-white text-lg rounded-xl font-medium"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Right Preview Section */}
          <div className="flex flex-col items-center justify-start">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
                Preview
              </h2>
              
              {/* Orientation Toggle */}
              <div className="flex justify-center mb-6">
                <div className="bg-gray-100 p-1 rounded-lg flex">
                  <button
                    onClick={() => setCardOrientation("horizontal")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      cardOrientation === "horizontal"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Horizontal
                  </button>
                  <button
                    onClick={() => setCardOrientation("vertical")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      cardOrientation === "vertical"
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    Vertical
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              {cardOrientation === "vertical" ? (
                // Vertical - Show Employee Card
                <EmployeeCard
                  name="Mark Marshal"
                  companyName={form.instituteName || "Eastern Mine School & College"}
                  address={form.address || "21A/B mine union point, Singapore"}
                  idCardType={form.idCardType || "Student ID"}
                  employeeName="Mark Marshal"
                  department="CSE"
                  employeeId="1233"
                  bloodGroup="B+"
                  dob="12-12-2000"
                  phone="+65-2131-XXXX"
                  logoUrl={form.logoUrl}
                  signatureUrl={form.signatureUrl}
                  profileUrl={form.profileUrl}
                  bgColor={form.bgColor}
                  qrData={form.qrData}
                  whoseSign={form.whoseSign || "Principal"}
                  personImage={form.profileUrl}
                  logo={form.logoUrl}
                  signature={form.signatureUrl}
                />
              ) : (
                // Horizontal - Show Student Card
                <StudentCard
                  instituteName={form.instituteName || "Eastern Mine Awesome Beautiful School & College, Singapore"}
                  address={form.address || "21A/B mine union point, Singapore"}
                  idCardType={form.idCardType || "Student"}
                  studentName="Mark Marshal"
                  department="CSE"
                  roll="1233"
                  bloodGroup="B+"
                  dob="12-12-2000"
                  phone="+65-2131-XXXX"
                  logoUrl={form.logoUrl}
                  signatureUrl={form.signatureUrl}
                  profileUrl={form.profileUrl}
                  bgColor={form.bgColor}
                  qrData={form.qrData}
                  whoseSign={form.whoseSign || "Principal"}
                />
              )}
            </div>

            {/* Color Picker */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-gray-600 font-medium">
                Select photo Background Color
              </p>
              <div className="flex gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setForm({ ...form, bgColor: color })}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      form.bgColor === color 
                        ? 'border-gray-800 scale-110' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}