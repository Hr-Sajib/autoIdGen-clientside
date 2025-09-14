// "use client";

import Image from "next/image";
import HeroImage from '@/../public/image/HeroImage.png'
import TextureForHero from '@/../public/image/Texture for hero.png'
import HeroButtons from "./HeroButtons";

export default function HeroSection() {

  return (
    <section className="bg-[#4A61E4] text-white relative overflow-hidden">
      <div className=" px-6 max-w-7xl mx-auto text-center">
        {/* Heading */}
        <h1 className="mt-16 text-[clamp(28px,5vw,80px)] text-shadow-lg font-extrabold leading-tight drop-shadow-lg">
          Bulk ID Cards Made Simple
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-[clamp(12px,1.5vw,18px)] text-gray-100 max-w-2xl mx-auto">
          Easily generate multiple professional ID cards at once with the automated system.
          Just share your unique 4-digit code to get it done. <br />
          <span className="font-semibold text-shadow-lg">
            “Have a 4-digit code? Fill in your info & get your ID instantly!”
          </span>
        </p>

        {/* Buttons */}
      
<HeroButtons />

        {/* People Image */}
        <div className="mt-16 flex justify-center relative">
          <Image
            src={HeroImage} 
            alt="People holding ID cards"
            width={1600}
            height={500}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Decorative fade effect at bottom */}
      <div className="absolute bottom-0 translate-y-1/2 mx-auto inset-x-0 h-24 ">
        <Image fill src={TextureForHero} alt="Texture"/>
      </div>
    </section>
  );
}


