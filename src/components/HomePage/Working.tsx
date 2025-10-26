"use client";

import Image from "next/image";
import { motion, easeOut } from "motion/react";

const data = [
  {
    number: "One",
    heading: "Start the Session.",
    paragraph:
      "Enter your details and begin. The system simulates how a candidate would join an online exam or interview.",
    image: "/images/start-session.svg",
  },
  {
    number: "Two",
    heading: "System Keeps Watch.",
    paragraph:
      "Your camera feed is analyzed in real time to detect missing face, unauthorized devices, or other suspicious activity.",
    image: "images/system-watch.svg",
  },
  {
    number: "Three",
    heading: "Session Summary.",
    paragraph:
      "Receive instant alerts for detected issues and a session summary at the end with all logged events.",
    image: "/images/final-report.svg",
  },
];

const containerVariant = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listVariant = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: 2, delay: 1.2, ease: easeOut },
      y: { duration: 1.2, ease: easeOut },
    },
  },
};

export default function Working() {
  return (
    <section id="working-section" className="mx-4 lg:mx-32 py-20 lg:py-40">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="pb-2 lg:pb-4 md:mx-8 lg:mx-0 text-4xl md:text-5xl lg:text-7xl font-semibold"
      >
        How it Works.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="max-w-4xl pb-6 lg:pb-12 md:mx-8 lg:mx-0 text-[#86868b] text-lg lg:text-2xl leading-6 lg:leading-tight tracking-tighter lg:tracking-tight font-semibold lg:text-balance"
      >
        The system simulates a proctored session, analyzing your camera feed in{" "}
        <span className="text-[#1d1d1f]">real time</span> to identify key
        events, <span className="text-[#1d1d1f]">flag potential issues</span>,
        and finally generate a{" "}
        <span className="text-[#1d1d1f]">detailed report</span> summarizing the
        entire session.
      </motion.p>

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
            className="bg-white rounded-4xl text-[#1d1d1f] hover:scale-[1.02] duration-500 flex flex-col justify-between"
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
            <div className="relative w-full h-70 rounded-b-4xl overflow-hidden">
              <Image src={item.image} alt={item.number} fill />
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
