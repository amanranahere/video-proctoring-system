"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useWindowSize } from "@/utils/useWindowSize";
import RulesModal from "./RulesModal";
import { useLogStore } from "@/store/logStore";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const [ruleBoxOpen, setRuleBoxOpen] = useState(false);
  const toggleRuleBox = () => setRuleBoxOpen((prev) => !prev);
  const closeRuleBox = () => setRuleBoxOpen(false);

  const { width } = useWindowSize();
  const isMd = width >= 768;

  return (
    <>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        exit={{ y: -50 }}
        layout
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          layout: { duration: 0.2, ease: "easeInOut" },
        }}
        className="fixed inset-x-0 top-0 z-[99]"
      >
        <div className="fixed inset-x-0 top-0 max-h-max flex justify-between items-center pl-4 pr-4 lg:pl-10 lg:pr-5 py-1 bg-black/50 backdrop-blur-sm overflow-hidden z-[99]">
          <div className="flex gap-x-4 py-2.5">
            <div className="select-none text-[19px] font-semibold ">
              Video Proctoring System
            </div>
          </div>

          {isMd ? (
            <div className="relative flex justify-center gap-x-8 text-xs text-white text-center">
              <button
                onClick={toggleRuleBox}
                className="text-[#d7d7de] font-semibold hover:text-white duration-300 cursor-pointer"
              >
                Rules
              </button>

              <button
                onClick={() => {
                  useLogStore.getState().endInterview();
                }}
                className="bg-red-400 hover:brightness-110 duration-300 rounded-full font-semibold px-5 py-2 cursor-pointer"
              >
                End Interview
              </button>
            </div>
          ) : (
            <button
              onClick={toggleMenu}
              className={`flex justify-center items-center text-white cursor-pointer duration-300 ${
                menuOpen ? "rotate-180" : ""
              }`}
            >
              <ChevronDown size={28} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* menu */}
        <AnimatePresence mode="wait">
          {menuOpen && (
            <motion.div className="w-full h-full px-4 pt-20 pb-8 bg-[#161617cc] backdrop-blur-xs flex flex-col items-center gap-y-5 z-[98] relative text-white duration-300 cursor-pointer text-center">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.2, ease: "easeInOut" }}
                onClick={() => {
                  toggleMenu();
                  toggleRuleBox();
                }}
                className="w-[50%] bg-gray-400 rounded-full px-3 py-1.5 cursor-pointer"
              >
                Rules
              </motion.button>

              <motion.button
                onClick={() => {
                  useLogStore.getState().endInterview();
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, delay: 0.25, ease: "easeInOut" }}
                className="w-[50%] bg-red-400 rounded-full px-3 py-1.5 cursor-pointer"
              >
                End Interview
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* blurred bg */}
        <AnimatePresence mode="wait">
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "linear" }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 backdrop-blur-2xl -z-10"
            ></motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* rule box */}
      <AnimatePresence mode="wait">
        {ruleBoxOpen && <RulesModal closeModal={closeRuleBox} />}
      </AnimatePresence>
    </>
  );
}
