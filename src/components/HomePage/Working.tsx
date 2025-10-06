"use client";

import { motion, easeOut } from "motion/react";

const data = [
  {
    number: "One",
    heading: "Start the Interview.",
    paragraph:
      "Enter your details and begin. The system simulates how a candidate would join an online exam or interview.",
    image: "",
  },
  {
    number: "Two",
    heading: "System Keeps Watch.",
    paragraph:
      " Your camera feed is monitored in real time. The system checks for suspicious activity like missing faces or distractions.",
    image: "",
  },
  {
    number: "Three",
    heading: "Get Warnings and Report.",
    paragraph:
      "Receive instant alerts for issues, and at the end, view a summary report of the session.",
    image: "",
  },
];

const containerVariant = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const listVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 1, delay: 0.8, ease: easeOut },
      y: { duration: 0.8, ease: easeOut },
    },
  },
};

export default function Working() {
  return (
    <section id="working-section" className="mx-4 lg:mx-32 py-20 lg:py-40">
      <h2 className="pb-2 lg:pb-4 md:mx-8 lg:mx-0 text-4xl md:text-5xl lg:text-7xl font-semibold">
        How it Works.
      </h2>

      <p className="max-w-4xl pb-6 lg:pb-12 md:mx-8 lg:mx-0 text-[#86868b] text-lg lg:text-2xl leading-6 lg:leading-tight tracking-tighter lg:tracking-tight font-semibold lg:text-balance">
        The system uses{" "}
        <span className="text-[#1d1d1f]">real-time video analysis</span> and{" "}
        <span className="text-[#1d1d1f]">computer vision</span> techniques to
        monitor candidates during online assessments. Here's a quick look at the
        process.
      </p>

      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={containerVariant}
        className="w-full grid md:grid-cols-3 gap-3 lg:gap-6"
      >
        {data.map((item, index) => (
          <motion.li
            variants={listVariant}
            key={index}
            className="bg-white rounded-4xl text-[#1d1d1f] hover:scale-[1.02] duration-500"
          >
            <div className="p-7 md:p-5 lg:p-8 flex flex-col gap-y-1.5 lg:gap-y-2.5">
              <p className="text-sm md:text-base font-bold">{item.number}</p>

              <h3 className="text-2xl md:text-3xl font-semibold lg:font-bold">
                {item.heading}
              </h3>

              <p className="text-sm md:text-base leading-tight">
                {item.paragraph}
              </p>
            </div>

            {/* image */}
            <div className="w-full h-80 rounded-b-4xl overflow-hidden">
              {item.image}
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
