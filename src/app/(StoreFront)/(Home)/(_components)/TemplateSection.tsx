// "use client";
// import Image from 'next/image';
// import React from 'react';
// import studentIdCard from "@/../public/image/Student ID Card.svg"
// import portraitCard from "@/../public/image/Employee Landscape.svg"

// interface TemplateCardProps {
//   templateId: string;
//   imageUrl: string;
//   redirectUrl: string;
// }

// const TemplateCard: React.FC<TemplateCardProps> = (
//     { templateId, imageUrl, redirectUrl }
// ) => {
//   const handleClick = () => {
//     window.open(redirectUrl, '_blank');
//   };

//   return (
//     <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105" onClick={handleClick}>
//       {/* Chain/Keyring */}
//       <div className="flex items-center mb-4">
//         <div className="w-8 h-3 bg-gray-800 rounded-sm"></div>
//         <div className="w-1 h-12 bg-gray-600 mx-1"></div>
//         <div className="w-4 h-4 border-2 border-gray-600 rounded-full bg-white"></div>
//       </div>
      
//       {/* ID Card Template */}
//       <div className="relative group">
//         <Image 
//           src={imageUrl} 
//           alt={`Template ${templateId}`}
//           className="w-80 h-auto rounded-lg shadow-lg transition-shadow group-hover:shadow-xl"
//         />
        
//         {/* Hover overlay */}
//         <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300 flex items-center justify-center">
//           <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <div className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-lg">
//               Select Template
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TemplateSelection: React.FC = () => {
//   // Placeholder data - replace with your actual template data
//   const templates = [
//     {
//       templateId: "1",
//       imageUrl: studentIdCard, // Replace with your SVG path
//       redirectUrl: "https://example.com/template/1" // Replace with your actual URL
//     },
//     {
//       templateId: "2", 
//       imageUrl: portraitCard, // Replace with your SVG path
//       redirectUrl: "https://example.com/template/2" // Replace with your actual URL
//     }
//   ];

//   return (
//     <div className="bg-gray-50 py-16 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Section Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-blue-600 mb-4">
//             Select Your Template
//           </h2>
//         </div>
        
//         {/* Template Cards */}
//         <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
//           {templates.map((template) => (
//             <TemplateCard
//               key={template.templateId}
//               templateId={template.templateId}
//               imageUrl={template.imageUrl}
//               redirectUrl={template.redirectUrl}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TemplateSelection;


"use client";
import Image from 'next/image';
import React from 'react';
import studentIdCard from "@/../public/image/Student ID Card.svg"
import portraitCard from "@/../public/image/Employee Landscape.svg"

const TemplateSelection: React.FC = () => {
  // Using placeholder images - replace with your actual imports
//   const studentIdCard = "/api/placeholder/320/200";
//   const portraitCard = "/api/placeholder/320/200";

  const handleTemplate1Click = () => {
    window.open("https://example.com/template/1", '_blank');
  };

  const handleTemplate2Click = () => {
    window.open("https://example.com/template/2", '_blank');
  };

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Select Your Template
          </h2>
        </div>
        
        {/* Template Cards */}
        <div className="flex flex-col lg:flex-row  items-center justify-center gap-16 lg:gap-24">
          
          {/* Template 1 */}
          <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105" onClick={handleTemplate1Click}>
            {/* Chain/Keyring */}
            {/* <div className="flex items-center mb-4">
              <div className="w-8 h-3 bg-gray-800 rounded-sm"></div>
              <div className="w-1 h-12 bg-gray-600 mx-1"></div>
              <div className="w-4 h-4 border-2 border-gray-600 rounded-full bg-white"></div>
            </div> */}
            
            {/* ID Card Template */}
            <div className="relative group">
              <Image 
                src={studentIdCard}
                alt="Student ID Card Template"
                width={320}
                height={200}
                className="w-80 h-auto rounded-lg transition-shadow"
              />
              
              {/* Hover overlay */}
              {/* <div className="absolute ">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-lg">
                    Select Template
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Template 2 */}
          <div className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105" onClick={handleTemplate2Click}>
            {/* Chain/Keyring */}
            {/* <div className="flex items-center mb-4">
              <div className="w-8 h-3 bg-gray-800 rounded-sm"></div>
              <div className="w-1 h-12 bg-gray-600 mx-1"></div>
              <div className="w-4 h-4 border-2 border-gray-600 rounded-full bg-white"></div>
            </div> */}
            
            {/* ID Card Template */}
            <div className="relative group">
              <Image 
                src={portraitCard}
                alt="Employee Portrait Card Template"
                className="w-120 h-auto rounded-lg transition-shadow"
              />
              
              {/* Hover overlay */}
              {/* <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-lg">
                    Select Template
                  </div>
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;