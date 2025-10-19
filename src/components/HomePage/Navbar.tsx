"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, easeInOut } from "motion/react";
import { useWindowSize } from "@/utils/useWindowSize";
import { sitemapItems } from "@/constants";
import { handleScrollToView } from "@/utils/handleScrollToView";
import { useLogStore } from "@/store/logStore";

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
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const [indicator, setIndicator] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });
  const linkRefs = useRef<Record<string, HTMLLIElement | null>>({});

  const { width } = useWindowSize();
  const isLg = width >= 1024;

  const { endInterview } = useLogStore();

  useEffect(() => {
    const sectionIds = [
      "hero-section",
      "working-section",
      "features-section",
      "applications-section",
      "transparency-section",
      "start-interview",
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isLg) return;

    if (activeSection && linkRefs.current[activeSection]) {
      const el = linkRefs.current[activeSection]!;
      const { offsetLeft, offsetWidth } = el;
      setIndicator({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeSection]);

  return (
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
      <div className="w-full h-full flex justify-between items-center px-4 py-2.5 lg:px-32 bg-white/90 backdrop-blur-xs overflow-hidden z-20">
        {/* logo */}
        <div className="select-none text-[19px] font-semibold">
          Video Proctoring System
        </div>

        {isLg ? (
          <ul className="relative flex justify-center gap-x-8">
            {sitemapItems.map((item, index) => (
              <li
                key={index}
                onClick={() => handleScrollToView(item.id)}
                ref={(el) => {
                  linkRefs.current[item.id] = el;
                }}
                className="text-xs text-[#000c] hover:text-black duration-300 cursor-pointer text-center"
              >
                {item.label}
              </li>
            ))}

            <motion.div
              layout
              transition={{ duration: 0.4, ease: "easeInOut" }}
              animate={{ left: indicator.left, width: indicator.width }}
              className="absolute -bottom-4 h-[1px] bg-black rounded-full"
            />
          </ul>
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
          <motion.ul
            variants={containerVariant}
            initial="hidden"
            animate="show"
            exit="hiddenAgain"
            className="w-full h-full px-4 py-7 md:py-8 bg-white flex flex-col gap-y-5 z-20"
          >
            {sitemapItems.map((item, index) => (
              <motion.li
                onClick={() => {
                  setMenuOpen(false);
                  handleScrollToView(item.id);
                }}
                variants={listVariant}
                key={index}
                className={`px-3 md:px-6 text-base text-[16px] leading-2.5 hover:text-black border-l-2 cursor-pointer ${
                  activeSection === item.id
                    ? "text-black border-black"
                    : "text-[#333336da] border-transparent"
                }`}
              >
                {item.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* bottom border */}
      <div className="h-[1px] bg-gray-300 z-20"></div>

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
  );
}
