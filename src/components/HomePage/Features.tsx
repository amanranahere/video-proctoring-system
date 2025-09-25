"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

const features = [
  {
    name: "Live Streaming",
    paragraph:
      "Monitor candidates in real-time with a clear video feed that ensures transparency during interviews or exams.",
  },
  {
    name: "Activity Detection",
    paragraph:
      "Detect suspicious activities such as multiple faces, mobile phone usage, or unusual movements automatically.",
  },
  {
    name: "Real-Time Alerts",
    paragraph:
      "Receive instant logs and warnings with timestamps whenever suspicious activity is detected.",
  },
  {
    name: "Proctoring Reports",
    paragraph:
      "At the end of the session, generate and download a comprehensive report summarizing all events and alerts.",
  },
  {
    name: "Session Recording",
    paragraph:
      "Record the full interview session, making it available for post-review or evidence if needed.",
  },
  {
    name: "Snapshots",
    paragraph:
      "Capture key frames during the session to highlight important moments or detected anomalies.",
  },
];

export default function Features() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleFeature = (index: number) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="w-full h-full flex flex-col justify-center items-center gap-y-10 my-20">
      <h2 className="w-full pl-10 lg:pl-28 text-4xl">Features</h2>

      <div className="w-[95%] lg:p-10 bg-white h-[95vh] rounded-4xl flex items-center">
        <div className="w-full lg:max-w-[40%] flex flex-col gap-y-3">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => toggleFeature(index)}
              className={`max-w-max px-4 lg:px-6 py-2 lg:py-3 bg-[#f7f7f9]  text-[#1d1d1f] cursor-pointer ${
                open === index ? "rounded-4xl" : "rounded-full"
              }`}
            >
              {open === index ? (
                <p className="text-xl leading-tight">
                  <span className="font-medium">{feature.name}.</span>&nbsp;
                  <span>{feature.paragraph}</span>
                </p>
              ) : (
                <div className="flex justify-center items-center gap-x-3 text-xl font-medium">
                  <PlusCircle className="w-3 h-3 lg:w-5 lg:h-5" />
                  <span className="lg:pb-1 select-nones">{feature.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* image */}
        <div></div>
      </div>
    </section>
  );
}
