import React from 'react';

const FourDigitAccessSystem: React.FC = () => {
  return (
    <div className="my-20 lg:my-30 flex items-center justify-center p-5">
      <div className="text-center max-w-2xl">
        {/* Main Title */}
        <h1 className="text-[clamp(25px,2.5vw,30px)] font-medium text-[#4A61E4] mb-5 leading-tight">
          Simple 4-Digit Access System
        </h1>
        
        {/* Subtitle */}
        <p className="text-[clamp(16px,2.5vw,18px)]  text-center mb-15 leading-relaxed w-auto">
          Your users only need to remember a simple 4-digit code to submit their information
        </p>
        
        {/* Batch Code Section */}
    <div className="mb-10 px-4 sm:px-8 md:px-16 lg:px-20 py-6 sm:py-8 md:py-10 rounded-xl 
shadow-[0_8px_25px_-5px_rgba(79,70,229,0.08)] 
hover:shadow-[0_8px_25px_-5px_rgba(79,70,229,0.18)] 
hover:cursor-pointer inline-block w-full max-w-3xl mx-auto">
  <div className="text-[clamp(9px,1.5vw,18px)] text-gray-800 font-medium mb-8 sm:mb-12">
    Your Unique Batch code
  </div>
  <div className="relative inline-block mb-8 sm:mb-12 w-[clamp(160px,30vw,400px)] mx-auto">
    <div className="border-3 border-dashed border-[#4A61E480] rounded-2xl bg-white relative 
                    w-full aspect-[5/3] flex items-center justify-center">
      {/* Background large code */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-[#4A61E433] select-none tracking-wider">
          1224
        </span>
      </div>
      {/* Button */}
      <div className="absolute -bottom-1 z-10">
       <button 
      className="text-white border-none rounded-xl px-4 md:px-8  py-2 md:py-4 font-semibold cursor-pointer 
                 shadow-[0_8px_25px_-5px_rgba(74,97,228,0.3)] 
                 hover:shadow-[0_8px_25px_-5px_rgba(74,97,228,0.4)] 
                 hover:-translate-y-1 active:translate-y-0 
                 transition-all duration-200"
      style={{ backgroundColor: '#4A61E4' }}
    >
      <div className="leading-tight text-[clamp(8px,1.5vw,16px)] font-medium">
        4-Digit<br />
        Batch<br />
        Code
      </div>
    </button>
      </div>
    </div>
  </div>
  <p className="text-[clamp(8px,1.5vw,16px)] text-gray-500 leading-relaxed">
    Share this code with your users for them to access the submission portal
  </p>
</div>

        
        
      </div>
    </div>
  );
};

export default FourDigitAccessSystem;