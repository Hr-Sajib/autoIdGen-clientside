"use client";

import Image from "next/image";
import HeroImage from '@/../public/images/HeroImage.png'
import TextureForHero from '@/../public/images/TextureForHero.png'
import HeroButtons from "./HeroButtons";
import { GiArrowCursor } from "react-icons/gi";
// import { useRouter } from "next/navigation";

export default function HeroSection() {
  //  const router = useRouter();
  

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
         {/* <button
         onClick={ () => router.push("/batch-access")}
          // onClick={() => handleClick("employee")}
          className=" py-4 px-6 font-semibold transition-colors duration-300 ease-in-out border rounded-2xl mt-10 hover:bg-white/50 hover:text-[#4A61E4] cursor-pointer"
        >
          Generate Id card
        </button> */}
        <p className="mt-2 text-xs flex items-center text-gray-300 justify-center gap-2">Click here to generate your ID card <span><GiArrowCursor size={15} /></span> </p>
    


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
        <Image fill src={TextureForHero} alt="Texture" />
      </div>
    </section>
  );
}


