"use client";

import { X } from "lucide-react";
import { motion } from "motion/react";

const rules = [
  { rule: "Looking away from the screen", deduction: "-3" },
  { rule: "Face not detected", deduction: "-5" },
  { rule: "Multiple faces detected", deduction: "-7" },
  { rule: "Book/Notes detected", deduction: "-5" },
  { rule: "Extra device detected", deduction: "-8" },
  { rule: "Mobile phone detected", deduction: "-10" },
];

type RuleBoxProps = {
  closeModal: () => void;
};

export default function RulesModal({ closeModal }: RuleBoxProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] max-w-[600px] rounded-4xl shadow-lg bg-white text-black flex flex-col gap-y-5 md:gap-y-8 z-[100] p-5 md:p-10"
      >
        <div
          onClick={closeModal}
          className="absolute top-5 right-5 w-9 h-9 bg-[#1d1d1f] rounded-full flex justify-center items-center cursor-pointer"
        >
          <X className="w-5 h-5 text-white" strokeWidth={4} />
        </div>

        <h3 className="text-3xl lg:text-5xl font-bold">
          Rules for Points Deduction
        </h3>

        <div className="flex-1 overflow-y-auto space-y-2.5">
          {rules.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center px-4 py-3 rounded-2xl bg-[#f5f5f7]"
            >
              <span className="text-[#6e6e73]">{item.rule}</span>

              <span className="font-semibold">
                <span className="font-mono">{item.deduction}</span>{" "}
                <span className="md:hidden">p</span>
                <span className="hidden md:inline">points</span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* black bg overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        onClick={closeModal}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[99]"
      ></motion.div>
    </>
  );
}
