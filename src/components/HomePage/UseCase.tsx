"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const useCases = [
  {
    title: "Online Exams",
    description:
      "Ideal for conducting remote exams securely. The system continuously monitors the candidate through their webcam, detecting if they look away, leave the frame, or use external devices like phones during the test.",
    imageSrc: "/images/online-exam.png",
  },
  {
    title: "Virtual Interviews",
    description:
      "Useful for interview scenarios where maintaining focus and fairness matters. The system ensures the candidate stays attentive and flags cases like absence or multiple faces detected during the session.",
    imageSrc: "/images/virtual-interview.webp",
  },
  {
    title: "Skill Assessments",
    description:
      "Applicable in coding tests or timed challenges where authenticity is crucial. The system monitors the participant's presence and activity, minimizing external interference or unfair practices.",
    imageSrc: "/images/skill-assessment.png",
  },
  {
    title: "Online Training & Practice",
    description:
      "Trainers can use it during online sessions to observe attentiveness. The system identifies when learners are distracted or move away, helping ensure genuine participation in learning modules.",
    imageSrc: "/images/online-training.png",
  },
];

export default function UseCase() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    const lastIndex = useCases.length - 1;

    if (activeIndex === lastIndex && index === lastIndex)
      setActiveIndex(lastIndex - 1);
    else setActiveIndex(activeIndex === index ? index + 1 : index);
  };

  return (
    <section id="applications-section" className="bg-white py-20 lg:py-40">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="mx-4 md:mx-12 lg:mx-32 pb-6 lg:pb-12 text-4xl md:text-5xl lg:text-7xl font-semibold"
      >
        Where Can This Be Used?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5, ease: "easeOut" },
          y: { duration: 0.8, delay: 0.2, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="relative w-[90%] md:w-[95%] lg:w-[85%] h-full lg:h-[95vh] mx-auto px-5 lg:px-0 py-2 lg:py-0 lg:pl-24 text-[#1d1d1f] bg-[#f5f5f7] rounded-4xl overflow-hidden grid lg:grid-cols-5 gap-8"
      >
        <ul className="lg:col-span-2 flex flex-col justify-center divide-y-[0.5px] divide-gray-300">
          {useCases.map((item, index) => (
            <li key={index} className="first:pt-0 last:pb-0 select-none">
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
                        <Image
                          src={item.imageSrc}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

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
                className="relative w-[90%] h-[70%]"
              >
                <Image
                  src={useCases[activeIndex].imageSrc}
                  alt={useCases[activeIndex].title}
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
