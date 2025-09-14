// import React from 'react';

// // Placeholder imports for your local image files
// // Please replace these paths with the actual paths to your images
// import aiIcon from '@/../public/image/ai_feature.svg';
// import keyIcon from '@/../public/image/key_feature.svg';
// import jpgIcon from '@/../public/image/jpg_feature.svg';
// import Image from 'next/image';
// import { StaticImport } from 'next/dist/shared/lib/get-img-props';

// interface FeatureCardProps {
//   title: string;
//   description: string;
//   imageSrc: string | StaticImport;
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageSrc }) => (
//   <div className="flex flex-col items-center text-center min-w-sm p-4">
//     <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4">
//       <Image src={imageSrc} alt={`${title} icon`} className="w-16 h-16 object-contain" />
//     </div>
//     <h3 className="font-[700] text-[20px] text-[#4A61E4] mb-2">
//       {title}
//     </h3>
//     <p className="text-black text-sm leading-relaxed">
//       {description}
//     </p>
//   </div>



// );

// const Features: React.FC = () => {
//   return (
//     <div className="min-h-screen bg-white p-4">
//       <div className=" mx-auto max-w-7xl py-12">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-blue-900 mb-2">
//             Smart & Simple Features
//           </h2>
//           <p className="text-lg text-gray-500">
//             Everything you need to create professional ID cards without the hassle
//           </p>
//         </div>
//         <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-2">
//           <FeatureCard
//             imageSrc={aiIcon}
//             title="AI Photo Processing"
//             description="Automated background removal, face detection, and perfect positioning for every ID photo."
//           />
//           <FeatureCard
//             imageSrc={keyIcon}
//             title="4-Digit Access System"
//             description="Simple code access for your users. No complicated passwords or usernames required."
//           />
//           <FeatureCard
//             imageSrc={jpgIcon}
//             title="Batch Download"
//             description="Download all ID cards at once as print-ready JPG files with automatic naming."
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Features;

import React from 'react';

// Placeholder imports for your local image files
// Please replace these paths with the actual paths to your images
import aiIcon from '@/../public/image/ai_feature.svg';
import keyIcon from '@/../public/image/key_feature.svg';
import jpgIcon from '@/../public/image/jpg_feature.svg';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: StaticImageData;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, imageSrc }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="flex items-center justify-center w-16 h-16 rounded-full mb-4">
      <Image src={imageSrc} alt={`${title} icon`} className="w-16 h-16 object-contain" />
    </div>
    <h3 className="font-[700] text-[20px] text-[#4A61E4] mb-2">
      {title}
    </h3>
    <p className="text-black text-sm leading-relaxed">
      {description}
    </p>
  </div>
);

const Features: React.FC = () => {
  return (
    <div className="py-10 bg-white p-4">
      <div className="mx-auto max-w-7xl py-12">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(25px,2.5vw,30px)] font-bold text-[#4A61E4] mb-2">
            Smart & Simple Features
          </h2>
          <p className="text-[clamp(16px,2.5vw,18px)] text-gray-500">
            Everything you need to create professional ID cards without the hassle
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
          <FeatureCard
            imageSrc={aiIcon}
            title="AI Photo Processing"
            description="Automated background removal, face detection, and perfect positioning for every ID photo."
          />
          <FeatureCard
            imageSrc={keyIcon}
            title="4-Digit Access System"
            description="Simple code access for your users. No complicated passwords or usernames required."
          />
          <FeatureCard
            imageSrc={jpgIcon}
            title="Batch Download"
            description="Download all ID cards at once as print-ready JPG files with automatic naming."
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
