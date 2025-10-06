"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, easeInOut } from "motion/react";
import { useWindowSize } from "@/utils/useWindowSize";
import { sitemapItems } from "@/constants";

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.03,
    },
  },
  hiddenAgain: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const listVariant = {
  hidden: { opacity: 0, y: -5 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeInOut },
  },
  hiddenAgain: {
    opacity: 0,
    y: -5,
    transition: { duration: 0.2, ease: easeInOut },
  },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const { width } = useWindowSize();
  const isLg = width >= 1024;

  return (
    <motion.nav
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      exit={{ y: -50 }}
      layout
      transition={{
        duration: 0.35,
        ease: "easeInOut",
        layout: { duration: 0.2, ease: "easeInOut" },
      }}
      className="fixed inset-x-0 top-0 z-[99]"
    >
      <div className="w-full h-full flex justify-between items-center px-4 py-2.5 lg:px-32 bg-white/90 backdrop-blur-xs overflow-hidden z-20">
        {/* logo */}
        <div className="select-none text-[19px] font-semibold">
          Video Proctoring System
        </div>

        {isLg ? (
          <div className="flex justify-center gap-x-8">
            {sitemapItems
              .filter((item) => item.label !== "Overview")
              .map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="text-xs text-[#000c] hover:text-black duration-300"
                >
                  {item.label}
                </a>
              ))}
          </div>
        ) : (
          <button
            onClick={toggleMenu}
            className={`flex justify-center items-center text-[#000c] hover:text-black cursor-pointer duration-300 ${
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
          <motion.div
            variants={containerVariant}
            initial="hidden"
            animate="show"
            exit="hiddenAgain"
            className="w-full h-full px-7 md:px-10 py-7 md:py-8 bg-white flex flex-col gap-y-2 z-20"
          >
            {sitemapItems.map((item, index) => (
              <motion.a
                onClick={() => setMenuOpen(false)}
                variants={listVariant}
                key={index}
                href={item.href}
                className="text-base text-[16px] text-[#333336] hover:text-black"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* bottom border */}
      <div className="h-[1px] bg-gray-300 z-20"></div>

      <AnimatePresence mode="wait">
        {/* blurred bg */}
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
  );
}
