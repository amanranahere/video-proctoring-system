"use client";

import { useState } from "react";
import { motion, AnimatePresence, spring } from "motion/react";
import useInterviewStore from "@/store/InterviewStore";

export default function InfoBox() {
  const [contextBoxOpen, setContextBoxOpen] = useState(false);
  const toggleContextBox = () => setContextBoxOpen((prev) => !prev);

  const { interviewData } = useInterviewStore();

  return (
    <motion.div
      layout
      transition={{ type: spring, stiffness: 150, damping: 18 }}
      className="w-full h-full flex flex-col gap-y-4 md:gap-y-2"
    >
      <div className="col-span-2 flex flex-col bg-[#2a2a2db8] px-6 py-5 rounded-3xl">
        <span className="text-[#86868b] font-semibold text-sm">Title</span>
        <h2 className="text-lg lg:text-2xl font-semibold">
          {interviewData?.title}
        </h2>
      </div>

      <div className="grid grid-cols-5 gap-x-2">
        <div className="col-span-3 flex flex-col bg-[#2a2a2db8] px-6 py-5 rounded-3xl">
          <span className="text-[#86868b] font-semibold text-sm">
            Candidate Name
          </span>
          <h2 className="text-lg lg:text-2xl text-[#f5f5f7] font-semibold">
            {interviewData?.candidateName}
          </h2>
        </div>

        <div className="col-span-2 flex flex-col bg-[#2a2a2db8] px-6 py-5 rounded-3xl">
          <span className="text-[#86868b] font-semibold text-sm">Duration</span>
          <h2 className="text-lg lg:text-2xl font-semibold">
            {interviewData?.duration} mins
          </h2>
        </div>
      </div>

      <div
        key={contextBoxOpen ? "open" : "closed"}
        onClick={toggleContextBox}
        className="flex flex-col bg-[#2a2a2db8] hover:bg-[#2a2a2deb] duration-300 p-6 rounded-4xl cursor-pointer select-none"
      >
        <span className="text-[#86868b] font-semibold text-sm">Context</span>
        <AnimatePresence mode="wait">
          {contextBoxOpen ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
              className={`text-lg lg:text-2xl font-semibold line-clamp-none`}
            >
              {interviewData?.notes} {interviewData?.notes}
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.2 }}
              className={`text-lg lg:text-2xl font-semibold line-clamp-3
            `}
            >
              {interviewData?.notes}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
