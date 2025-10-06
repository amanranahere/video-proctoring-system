"use client";

import Image from "next/image";
import { useState } from "react";
import { PlusCircle, ChevronUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, easeInOut } from "motion/react";

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

type FeatureName =
  | "Live Streaming"
  | "Activity Detection"
  | "Real-Time Alerts"
  | "Proctoring Reports"
  | "Session Recording"
  | "Snapshots";

interface FeatureFocus {
  originX: string;
  originY: string;
  scale: number;
}

const featureFocus: Record<FeatureName, FeatureFocus> = {
  "Live Streaming": { originX: "33.4%", originY: "41.7%", scale: 1.5 }, // whole video feed box
  "Activity Detection": { originX: "33.4%", originY: "41.7%", scale: 2.5 }, // zoomed-in feed (e.g. hands)
  "Real-Time Alerts": { originX: "100%", originY: "35%", scale: 2.5 }, // logs panel bottom-right
  "Session Recording": { originX: "84.9%", originY: "11.1%", scale: 2.2 }, // Start Recording button
  Snapshots: { originX: "77.1%", originY: "11.1%", scale: 2.2 }, // Take Snapshot button
  "Proctoring Reports": { originX: "50.0%", originY: "50.0%", scale: 1 }, // keep centered
};

const containerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const listVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeInOut },
  },
};

export default function Features() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleFeature = (index: number) => {
    setOpen(open === index ? null : index);
  };

  const nextFeature = (index: number) => {
    const lastIndex = features.length - 1;
    setOpen(index === lastIndex ? 0 : index + 1);
  };

  const prevFeature = (index: number) => {
    const lastIndex = features.length - 1;
    setOpen(index === 0 ? lastIndex : index - 1);
  };

  return (
    <section id="features-section" className="w-full h-full py-20 lg:py-40">
      <h2 className="mx-4 md:mx-12 lg:mx-32 pb-6 lg:pb-12 text-4xl md:text-5xl lg:text-7xl font-semibold">
        Features
      </h2>

      <div className="relative w-[95%] h-full lg:h-[95vh] py-3 md:py-6 lg:py-24 lg:px-24 bg-white rounded-4xl flex flex-col-reverse lg:flex-row items-center justify-end lg:justify-normal gap-y-5 lg:gap-y-0 overflow-hidden mx-auto">
        {/* buttons */}
        <AnimatePresence mode="wait">
          {open !== null && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-1/2 -translate-y-1/2 left-9 hidden lg:flex flex-col gap-y-5 pr-8 z-20"
            >
              <button
                onClick={() => prevFeature(open)}
                className="p-1.5 text-[#1d1d1f] bg-[#e8e8edb8] hover:bg-[#e8e8ede7] duration-300 rounded-full cursor-pointer"
              >
                <ChevronUp className="w-3 h-3 lg:w-6 lg:h-6" strokeWidth={3} />
              </button>

              <button
                onClick={() => nextFeature(open)}
                className="p-1.5 text-[#1d1d1f] bg-[#e8e8edb8] hover:bg-[#e8e8ede7] duration-300 rounded-full cursor-pointer"
              >
                <ChevronDown
                  className="w-3 h-3 lg:w-6 lg:h-6"
                  strokeWidth={3}
                />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* feature list */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariant}
          className="w-[100%] lg:w-[40%] px-3 pb- flex flex-col gap-y-2 lg:gap-y-3 z-20 overflow-x-auto no-scrollbar"
        >
          {features.map((feature, index) => (
            <motion.li
              layout
              variants={listVariant}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                  mass: 0.8,
                },
              }}
              key={index}
              onClick={() => toggleFeature(index)}
              className={`lg:max-w-max max-h-max lg:text-lg bg-[#e8e8ed94] text-[#1d1d1f] cursor-pointer select-none backdrop-blur-md ${
                open === index ? "rounded-4xl" : "rounded-full"
              }`}
            >
              {open === index ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
                  className="p-5 lg:p-7 leading-tight"
                >
                  <span className="font-semibold">{feature.name}.</span>&nbsp;
                  <span>{feature.paragraph}</span>
                </motion.p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
                  className="pl-2.5 lg:pl-3 pr-4 lg:pr-6 py-2.5 lg:py-3 flex lg:justify-center items-center gap-x-2 lg:gap-x-3 hover:bg-[#e8e8ed9d] rounded-full duration-300"
                >
                  <PlusCircle className="w-6 h-6" />
                  <span className="select-nones font-medium whitespace-nowrap">
                    {feature.name}
                  </span>
                </motion.div>
              )}
            </motion.li>
          ))}
        </motion.ul>

        {/* image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          layout
          transition={{
            duration: 0.5,
            ease: "easeOut",
            layout: {
              type: "spring",
              stiffness: 220,
              damping: 18,
              mass: 0.8,
            },
          }}
          className={`lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-10 rounded-4xl lg:shadow-2xl z-10 overflow-hidden select-none ${
            open !== null
              ? "h-[50vh] md:h-[60vh] lg:h-[80vh] w-[95%] lg:w-[50vw]"
              : "w-[95%] lg:w-[65vw] aspect-video"
          } `}
        >
          <motion.div
            initial={{ scale: 1 }}
            animate={
              open !== null
                ? {
                    scale: `${
                      featureFocus[features[open].name as FeatureName].scale
                    }`,
                  }
                : {
                    scale: 1,
                  }
            }
            style={{
              transformOrigin:
                open !== null
                  ? `${
                      featureFocus[features[open].name as FeatureName].originX
                    } ${
                      featureFocus[features[open].name as FeatureName].originY
                    }`
                  : "50% 50%",
            }}
            className="relative w-full h-full duration-300"
          >
            <Image
              src="/features.png"
              alt="Features demo"
              fill
              className="object-cover rounded-4xl"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
