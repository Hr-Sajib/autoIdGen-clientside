import React from 'react';
import leftLeaf from "@/../public/images/export images/leaf-left.svg";
import rightLeaf from "@/../public/images/export images/leaf-right.svg";
import exportSky from "@/../public/images/export images/download-sky.svg";
import hand from "@/../public/images/export images/hand.svg";
import Image from 'next/image';

const ExportPage = () => {
    return (
        <div className='relative h-screen flex items-center justify-center overflow-hidden'>
  {/* Background sky image */}
  <Image 
    src={exportSky} 
    alt="export sky" 
    className='w-full h-full' 
  />
  
  {/* Bottom decorative elements */}
  <div className='absolute -bottom-5 left-0 right-0 flex justify-between items-end px-0 sm:px-6 md:px-10 pt-10'>
    {/* Left leaf - responsive sizing */}
    <Image 
      src={leftLeaf} 
      width={150} 
      height={200} 
      alt="left leaf" 
      className='w-12 h-20 sm:w-20 sm:h-24 md:w-24 md:h-32 lg:w-32 lg:h-40 xl:w-36 xl:h-44 object-contain' 
    />
    
    {/* Center hand - responsive sizing */}
    <Image 
      src={hand} 
      alt="hand" 
      width={400} 
      height={200} 
      className='w-48 h-24 sm:w-56 sm:h-28 md:w-64 md:h-32 lg:w-80 lg:h-40 xl:w-96 xl:h-48 object-contain' 
    />
    
    {/* Right leaf - responsive sizing */}
    <Image 
      src={rightLeaf} 
      width={150} 
      height={200} 
      alt="right leaf" 
      className='w-10 h-20 sm:w-20 sm:h-24 md:w-24 md:h-32 lg:w-32 lg:h-40 xl:w-36 xl:h-44 object-contain' 
    />
  </div>
</div>    );
};

export default ExportPage;