import Features from "./(_components)/Features";
import Hero from "./(_components)/Hero";
import HowItWorks from "./(_components)/HowItWorks";
import RoleLogger from "./(_components)/RollLoger";
import TemplateSelection from "./(_components)/TemplateSection";

export default function Home() {
  return (
    <div className="bg-white min-h-screen h-full">
      <Hero/>
      <RoleLogger/>
      <Features/>
      <TemplateSelection/>
      <HowItWorks/>
      <h1 className="text-3xl font-bold underline">Landing</h1>
    </div>
  );
}
