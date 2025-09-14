

import React from 'react';

interface HowItWorksCardProps {
  step: number;
  title: string;
  items: string[];
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({ step, title, items }) => (
  <div className="border flex flex-col items-center border-white text-white p-6 rounded-[20px] shadow-lg flex-1 min-h-full min-w-[280px] md:min-w-0">
    <div className="flex items-center justify-center w-12 h-12 text-[#4A61E4] text-[20px] bg-white font-bold rounded-full mb-4 mx-auto md:mx-0">
      {step}
    </div>
    <h3 className="font-[700] text-[20px] mb-2 text-center md:text-left">
      {title}
    </h3>
    <div className="text-sm space-y-2 text-left w-full">
      {items.map((item, index) => (
        <div key={index} className="flex items-start leading-relaxed">
          <span className="text-white mr-2 mt-1">•</span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
);

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-[#4A61E4] py-12 px-4 mx-auto w-full">
      <div className="text-center mb-12">
        <h2 className="text-[clamp(25px,1.5vw,30px)] font-[500] text-white mb-2">
          How It Works
        </h2>
        <p className="text-[clamp(16px,1.5vw,18px)] text-white/80">
          Just Simple 3-step process makes bulk ID card generation effortless
        </p>
      </div>
      <div className="flex max-w-7xl mx-auto flex-col md:flex-row items-stretch justify-center gap-8 md:gap-4 lg:gap-6">
        <HowItWorksCard
          step={1}
          title="Template Selection"
          items={[
            "Choose a pre-made template.",
            "Complete the form with institute details.",
            "Select the required student fields.",
            "Generate a 4-digit batch code."
          ]}
        />
        <HowItWorksCard
          step={2}
          title="Distribute Batch Code"
          items={[
            "Distribute the batch code to students.",
            "Students will use the code in the Student Portal.",
            "Upon completing the form, they will instantly receive their ID card."
          ]}
        />
        <HowItWorksCard
          step={3}
          title="Bulk Download"
          items={[
            "Check the status on the institution's dashboard.",
            "Download the print-ready bulk file."
          ]}
        />
      </div>
    </div>
  );
};

export default HowItWorks;