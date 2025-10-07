import Features from "./(_components)/Features";
import FourDigitAccessSystem from "./(_components)/FourDigitAccessSystem";
import Hero from "./(_components)/Hero";
import HowItWorks from "./(_components)/HowItWorks";
import RoleLogger from "./(_components)/RollLoger";
import SimplifyIdProcessSection from "./(_components)/SimplifyIdProcessSection";
import TemplateSelection from "./(_components)/TemplateSection";

export default function Home() {
  return (
    <div className="bg-white ">
      <Hero/>
      <RoleLogger/>
      <Features/>
      <TemplateSelection/>
      <HowItWorks/>
      <FourDigitAccessSystem/>
      <SimplifyIdProcessSection/>
     
    </div>
  );
}
