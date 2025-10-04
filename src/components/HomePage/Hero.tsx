"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { CircleArrowRight, Pause, Play } from "lucide-react";

export default function Hero() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const containerRef = useRef(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    setIsLargeScreen(window.innerWidth >= 1024);
  }, []);

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

  const scale = useTransform(scrollY, [200, 400], [1, 0.83]);
  const smoothScaleMotion = useSpring(scale, { stiffness: 150, damping: 25 });
  const borderRadiusMotion = useTransform(
    scrollY,
    [200, 400],
    ["0rem", "2rem"]
  );

  const borderRadius = isLargeScreen ? borderRadiusMotion : "1rem";
  const smoothScale = isLargeScreen ? smoothScaleMotion : 1;

  return (
    <section
      id="hero-section"
      className="bg-[#fff] flex flex-col justify-center items-center gap-y-5 px-4 lg:px-0 overflow-hidden"
    >
      <h1 className="text-4xl lg:text-7xl text-center font-extrabold pt-32">
        Video Proctoring System
      </h1>

      <p className="text-[#86868b] max-w-4xl mx-auto text-lg lg:text-2xl leading-6 lg:leading-tight tracking-tighter lg:tracking-tight font-semibold text-center text-balance">
        A modern video proctoring system designed to demonstrate how{" "}
        <span className="text-[#1d1d1f]">remote candidates</span> can be
        monitored in real time. Using{" "}
        <span className="text-[#1d1d1f]">computer vision checks</span>, it
        showcases how suspicious activities are detected during
        <span className="text-[#1d1d1f]"> online exams</span> and{" "}
        <span className="text-[#1d1d1f]">interviews</span>.
      </p>

      <a
        href="#start-interview"
        className="lg:text-lg bg-[#e8e8ed94] text-[#1d1d1f] pr-2.5 lg:pr-3 pl-4 lg:pl-6 py-2.5 flex lg:justify-center items-center gap-x-2 lg:gap-x-3 hover:bg-[#e8e8edd7] rounded-full duration-300"
      >
        <span className="select-nones font-medium whitespace-nowrap">
          Start Interview
        </span>
        <CircleArrowRight className="w-7 h-7" />
      </a>

      {/* video */}
      <motion.div
        ref={containerRef}
        style={{
          scale: smoothScale,
          borderRadius,
          transformOrigin: "center top",
        }}
        className="relative w-full h-full overflow-hidden group"
      >
        <video
          ref={vidRef}
          src="/preview-vid.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        ></video>

        <button
          onClick={togglePlay}
          className="absolute bottom-3 right-3 lg:bottom-10 lg:right-10 lg:opacity-0 group-hover:opacity-100 duration-300 text-[#0000008f] bg-[#e8e8ede2] hover:bg-[#adadb1] active:scale-95 lg:active:scale-100 backdrop-blur-sm p-2 lg:p-3 rounded-full cursor-pointer outline-none"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={isLargeScreen ? "19" : "14"}
              height={isLargeScreen ? "19" : "14"}
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
              width={isLargeScreen ? "19" : "14"}
              height={isLargeScreen ? "19" : "14"}
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
