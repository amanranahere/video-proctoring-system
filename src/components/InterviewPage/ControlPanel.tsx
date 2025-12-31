"use client";

import { useRef, useEffect, useState } from "react";
import { Clapperboard, Square, Play, Pause, Camera, Check } from "lucide-react";
import { useLogStore } from "@/store/logStore";
import { AnimatePresence, motion } from "motion/react";
import InterviewTimer from "@/utils/InterviewTimer";
import getTimeStamp from "@/utils/getTimeStamp";

export default function ControlPanel() {
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  const {
    isRecording,
    isPaused,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    takeScreenshot,
    addLog,
  } = useLogStore();

  const videoEl = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      videoEl.current = document.querySelector("video");
    }
  }, []);

  const handleScreenshot = () => {
    if (videoEl.current) {
      takeScreenshot(videoEl.current);
    }

    addLog({ rule: "Snapshot captured", time: getTimeStamp() });

    setSnapshotTaken(true);
    setTimeout(() => {
      setSnapshotTaken(false);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:gap-x-2 gap-y-2">
      {/* timer */}
      <InterviewTimer />

      {/* buttons */}
      <div className="flex flex-wrap justify-center lg:justify-end gap-2">
        {/* start/end recording btn */}
        <button
          onClick={() => {
            if (isRecording) {
              stopRecording();
              addLog({ rule: "Recording stopped", time: getTimeStamp() });
            } else {
              const video = document.querySelector("video") as HTMLVideoElement;
              if (video && video.srcObject) {
                startRecording(video.srcObject as MediaStream);
                addLog({ rule: "Recording started", time: getTimeStamp() });
              }
            }
          }}
          className="relative w-[175px] md:w-[200px] py-3 md:py-2.5 pr-8 text-sm md:text-base md:font-semibold bg-[#424245b3] hover:brightness-110 duration-300 rounded-full flex justify-center items-center gap-x-4 cursor-pointer"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isRecording ? "end" : "start"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="whitespace-nowrap"
            >
              {isRecording ? "End Recording" : "Start Recording"}
            </motion.div>
          </AnimatePresence>

          <motion.div
            animate={{ backgroundColor: isRecording ? "#ef4444" : "#1f1f1f" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute right-1.5 md:right-2 w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isRecording ? "square" : "clapperboard"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-0 flex justify-center items-center"
              >
                {isRecording ? (
                  <Square size={18} strokeWidth={3} />
                ) : (
                  <Clapperboard size={18} strokeWidth={2.5} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </button>

        {/* resume/pause recording btn */}
        {isRecording && (
          <button
            onClick={() => {
              if (!isRecording) return;

              if (isPaused) {
                resumeRecording();
                addLog({ rule: "Recording resumed", time: getTimeStamp() });
              } else {
                pauseRecording();
                addLog({ rule: "Recording paused", time: getTimeStamp() });
              }
            }}
            disabled={!isRecording}
            className="relative w-[125px] md:w-[140px] py-3 lg:py-2.5 pr-8 text-sm md:text-base lg:font-semibold bg-[#424245b3] hover:brightness-110 duration-300 rounded-full flex justify-center items-center gap-x-4 cursor-pointer"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isPaused ? "resume" : "pause"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {isPaused ? "Resume" : "Pause"}
              </motion.div>
            </AnimatePresence>

            <div className="absolute right-1.5 md:right-2 w-9 h-9 rounded-full flex items-center justify-center overflow-hidden bg-[#1f1f1f]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isPaused ? "play" : "pause"}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute inset-0 flex justify-center items-center"
                >
                  {isPaused ? (
                    <Play size={18} strokeWidth={3} />
                  ) : (
                    <Pause size={18} strokeWidth={2.5} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </button>
        )}

        {/* screenshot btn */}
        <button
          onClick={handleScreenshot}
          className="relative w-[170px] md:w-[190px] py-3 md:py-2.5 pr-8 text-sm md:text-base lg:font-semibold bg-[#424245b3] hover:brightness-110 duration-300 rounded-full flex justify-center items-center gap-x-4 cursor-pointer"
        >
          <span>Take Snapshot</span>

          <motion.div
            animate={{ backgroundColor: snapshotTaken ? "#3B82F6" : "#1f1f1f" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute right-1.5 md:right-2 w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={snapshotTaken ? "play" : "pause"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="absolute inset-0 flex justify-center items-center"
              >
                {snapshotTaken ? (
                  <Check size={18} strokeWidth={3} />
                ) : (
                  <Camera size={18} strokeWidth={2.5} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </button>
      </div>
    </div>
  );
}
