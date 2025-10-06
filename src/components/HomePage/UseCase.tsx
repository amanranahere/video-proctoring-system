"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, easeOut } from "motion/react";

const useCases = [
  {
    title: "Online Exams",
    description:
      "Run secure online exams where the system keeps watch through the candidate's camera. It can detect if the candidate looks away too often, if someone else enters the frame, or if restricted activity happens during the test.",
    imageSrc: "/features.png",
  },
  {
    title: "Remote Interviews",
    description:
      "Make interviews fair and reliable. The system ensures the candidate stays focused on the screen and flags interruptions or unusual behavior, helping recruiters trust the process.",
    imageSrc: "/features.png",
  },
  {
    title: "Certification Tests",
    description:
      "Protect the credibility of certification programs by reducing the chances of cheating. The system monitors the candidate's presence throughout the session, making certificates more dependable.",
    imageSrc: "/features.png",
  },
  {
    title: "Training Sessions",
    description:
      "Instructors and trainers can use it to ensure learners are actively participating. The system checks for engagement and alerts when distractions or unusual activity occur during practice tests or evaluations.",
    imageSrc: "/features.png",
  },
];

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
    transition: { duration: 0.4, ease: easeOut },
  },
};

export default function UseCase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    const lastIndex = useCases.length - 1;

    if (activeIndex === lastIndex && index === lastIndex)
      setActiveIndex(lastIndex - 1);
    else setActiveIndex(activeIndex === index ? index + 1 : index);
  };

  return (
    <section id="useCase-section" className="bg-white py-20 lg:py-40">
      <h2 className="mx-4 md:mx-12 lg:mx-32 pb-6 lg:pb-12 text-4xl md:text-5xl lg:text-7xl font-semibold">
        Where Can This Be Used?
      </h2>

      <div className="relative w-[90%] md:w-[95%] lg:w-[85%] h-full lg:h-[95vh] mx-auto px-5 lg:px-0 py-2 lg:py-0 lg:pl-24 text-[#1d1d1f] bg-[#f5f5f7] rounded-4xl overflow-hidden grid lg:grid-cols-5 gap-8">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariant}
          className="lg:col-span-2 flex flex-col justify-center divide-y-[0.5px] divide-gray-300"
        >
          {useCases.map((item, index) => (
            <motion.li
              variants={listVariant}
              key={index}
              className="first:pt-0 last:pb-0 select-none"
            >
              <button
                onClick={() => toggleItem(index)}
                className={`relative w-full flex justify-between items-center z-20 pt-5 lg:pt-7 cursor-pointer bg-[#f5f5f7] ${
                  activeIndex === index ? "pb-3 lg:pb-5" : "pb-5 lg:pb-7"
                } `}
              >
                <h3 className="text-2xl lg:text-3xl font-semibold lg:font-bold text-left">
                  {item.title}
                </h3>

                <div
                  className={` ${
                    activeIndex === index ? "rotate-x-180 duration-700" : null
                  }`}
                >
                  <ChevronDown className="w-7 h-7 lg:w-10 lg:h-10" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    layout
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="flex flex-col justify-center items-center gap-y-5 z-10"
                  >
                    <p className="lg:pb-10 pr-8 lg:pr-16 lg:text-lg leading-tight">
                      {item.description}
                    </p>

                    {/* image for sm and md screens */}
                    {item.imageSrc && (
                      <div className="relative lg:hidden w-full h-[40vh] mb-5 ">
                        <Image src={item.imageSrc} alt={item.title} fill />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          ))}
        </motion.ul>

        {/* image on lg screens */}
        <div className="hidden lg:flex justify-center items-center lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeIndex !== null && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.2 }}
                className="relative w-[70%] h-[70%]"
              >
                <Image
                  src={useCases[activeIndex].imageSrc}
                  alt={useCases[activeIndex].title}
                  fill
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
