"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  easeInOut,
} from "motion/react";
import { useWindowSize } from "@/utils/useWindowSize";
import { sitemapItems } from "@/constants";
import { handleScrollToView } from "@/utils/handleScrollToView";

const containerVariant = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "100%",
    transition: {
      duration: 0.3,
      ease: easeInOut,
      delayChildren: 0.2,
      staggerChildren: 0.04,
    },
  },
  hiddenAgain: { opacity: 0, height: 0 },
};

const listVariant = {
  hidden: { opacity: 0, y: -5 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: easeInOut },
  },
  hiddenAgain: { opacity: 0, y: -5 },
};

export default function Hero() {
  const { width } = useWindowSize();
  const isLg = width >= 1024;

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  const togglePlay = () => {
    const video = vidRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const scale = useTransform(scrollY, [80, 440], [1, 0.83]);
  const smoothScaleMotion = useSpring(scale, { stiffness: 800, damping: 50 });
  const borderRadiusMotion = useTransform(scrollY, [80, 440], ["0rem", "3rem"]);

  const borderRadius = isLg ? borderRadiusMotion : "0rem";
  const smoothScale = isLg ? smoothScaleMotion : 1;

  return (
    <section id="hero-section" className="bg-[#fff] overflow-hidden">
      {/* navbar */}
      <header className="w-full px-4 py-2.5 lg:px-32 flex justify-between items-center ">
        {/* logo */}
        <div className={`text-lg text-[#1d1d1f] select-none font-extrabold`}>
          VPS
        </div>

        {isLg ? (
          <ul className="flex justify-center gap-x-8">
            {sitemapItems
              .filter((item) => item.label !== "Overview")
              .map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleScrollToView(item.id)}
                  className="text-xs text-[#000c] hover:text-black duration-300 cursor-pointer"
                >
                  {item.label}
                </li>
              ))}
          </ul>
        ) : (
          <>
            <button
              onClick={toggleMenu}
              className="relative flex justify-center items-center cursor-pointer group z-[99] h-12 w-12"
            >
              <div
                className={`absolute top-1/2  w-5 md:w-7 h-0.5 md:h-1 bg-[#000] rounded-full duration-300 ${
                  menuOpen ? "-translate-y-0 rotate-45" : "-translate-y-1"
                }`}
              ></div>
              <div
                className={`absolute top-1/2  w-5 md:w-7 h-0.5 md:h-1 bg-[#000] rounded-full duration-300 ${
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1"
                }`}
              ></div>
            </button>

            <AnimatePresence mode="wait">
              {menuOpen && (
                <motion.ul
                  variants={containerVariant}
                  initial="hidden"
                  animate="show"
                  exit="hiddenAgain"
                  className="fixed inset-0 px-7 md:px-10 py-20 md:py-32 bg-white flex flex-col gap-y-4 md:gap-y-6 z-[90]"
                >
                  {sitemapItems.map((item, index) => (
                    <motion.li
                      onClick={() => {
                        setMenuOpen(false);
                        handleScrollToView(item.id);
                      }}
                      variants={listVariant}
                      key={index}
                      className="text-3xl md:text-5xl text-[#333336] hover:text-black font-bold cursor-pointer"
                    >
                      {item.label}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </>
        )}
      </header>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
        className="grid lg:grid-cols-7 mx-4 md:mx-12 lg:mx-28 pt-20 pb-10 lg:pt-40 lg:pb-24"
      >
        <h1 className="col-span-4 text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter">
          Video <br />
          Proctoring &nbsp;System
        </h1>

        <p className="col-span-3 text-[#86868b] max-w-4xl mx-auto mt-3 text-lg lg:text-xl leading-6 lg:leading-tight tracking-tighter lg:tracking-tight font-semibold">
          Designed to demonstrate how{" "}
          <span className="text-[#1d1d1f]">automated monitoring</span> can
          ensure fairness and integrity in remote assessments, this system uses{" "}
          <span className="text-[#1d1d1f]">computer vision</span> to monitor
          candidates in real time and{" "}
          <span className="text-[#1d1d1f]">detect suspicious activities</span>{" "}
          like face absence, multiple faces, or unauthorized devices.
        </p>
      </motion.div>

      {/* video */}
      <motion.div
        ref={containerRef}
        style={{
          scale: smoothScale,
          borderRadius,
          transformOrigin: "center top",
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5, ease: "easeOut" },
          y: { duration: 0.8, delay: 0.2, ease: "easeOut" },
        }}
        className="relative w-full h-full px-4 md:px-12 lg:px-0 overflow-hidden group"
      >
        <video
          ref={vidRef}
          src="/preview-vid.mp4"
          className="w-full h-full object-cover rounded-2xl md:rounded-4xl lg:rounded-none"
          autoPlay
          muted
          loop
          playsInline
        ></video>

        <button
          onClick={togglePlay}
          className="absolute bottom-4 right-7 md:bottom-8 md:right-20 lg:bottom-10 lg:right-10 lg:opacity-0 group-hover:opacity-100 duration-300 text-[#0000008f] bg-[#e8e8ede2] hover:bg-[#adadb1] active:scale-95 lg:active:scale-100 backdrop-blur-sm p-2 lg:p-3 rounded-full cursor-pointer outline-none"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isLg ? "19" : "14"}
              height={isLg ? "19" : "14"}
              viewBox="0 0 24 24"
              fill="0000008f"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-pause-icon lucide-pause"
            >
              <rect x="14" y="3" width="5" height="18" rx="1" />
              <rect x="5" y="3" width="5" height="18" rx="1" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isLg ? "19" : "14"}
              height={isLg ? "19" : "14"}
              viewBox="0 0 24 24"
              fill="#0000008f"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-play-icon lucide-play"
            >
              <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
            </svg>
          )}
        </button>
      </motion.div>
    </section>
  );
}
