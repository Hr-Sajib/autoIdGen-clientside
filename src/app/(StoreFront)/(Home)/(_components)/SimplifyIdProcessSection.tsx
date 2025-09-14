import React from "react";

const SimplifyIdProcessSection: React.FC = () => {
  return (
    <div className="relative  bg-[#4A61E41A]">
      {/* Wrapper keeps aspect ratio */}
      <div className="max-w-7xl mx-auto">
      <div className="relative w-[80%] mx-auto aspect-[2/1] bg-[#4A61E4]"
           style={{
             clipPath: "ellipse(50% 100% at 50% 100%)",
           }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-white mt-6 md:mt-4 text-[clamp(5px,2.5vw,30px)] font-bold mb-1 lg:mb-4 max-w-2xl">
            Ready to Simplify Your ID Process?
          </h2>

          <p className="text-white/90 text-[clamp(5px,1.5vw,18px)] mb-3 md:mb-6 lg:mb-8 max-w-2xl leading-relaxed">
            Join thousands of institutions that use AutoIDGen for their bulk ID card needs
          </p>

          <button className="border md:border-2 border-white text-[clamp(6px,1.5vw,18px)] text-white rounded-md md:rounded-lg px-4 sm:px-5 py-1 sm:py-3 font-medium hover:bg-white/10 ">
            Get Your 4-Digit Code Now
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SimplifyIdProcessSection;
