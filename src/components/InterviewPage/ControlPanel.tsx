"use client";

import { useRef, useEffect, useState } from "react";
import {
  Clapperboard,
  Square,
  Play,
  Pause,
  Camera,
  Check,
  Power,
} from "lucide-react";
import { useLogStore } from "@/store/logStore";
import { AnimatePresence, motion } from "motion/react";

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

    setSnapshotTaken(true);
    setTimeout(() => {
      setSnapshotTaken(false);
    }, 1000);
  };

  const handleEndInterview = () => {
    stopRecording();

    const logs = useLogStore.getState().logs;

    const report = {
      candidate: "Candidate Name",
      title: "Interview Title",
      duration: "00:45:00",
      points: useLogStore.getState().points,
      logs,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `interview-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {/* start/end recording btn */}
      <button
        onClick={() => {
          const video = document.querySelector("video") as HTMLVideoElement;
          if (video && video.srcObject) {
            startRecording(video.srcObject as MediaStream);
          }
        }}
        className="py-2.5 pl-6 pr-2.5 text-lg font-semibold bg-[#424245b3] hover:brightness-110 duration-300 rounded-full flex justify-between items-center gap-x-4 cursor-pointer"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isRecording ? "end" : "start"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {isRecording ? "End Recording" : "Start Recording"}
          </motion.div>
        </AnimatePresence>

        <motion.div
          animate={{ backgroundColor: isRecording ? "#ef4444" : "#5CFF5C" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
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
                <Clapperboard size={20} strokeWidth={2.5} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </button>

      {/* resume/pause recording btn */}
      <button
        onClick={() => {
          isPaused ? resumeRecording() : pauseRecording();
        }}
        className="py-2.5 pl-6 pr-2.5 text-lg font-semibold bg-[#424245b3] hover:brightness-110 duration-300 rounded-full flex justify-between items-center gap-x-4 cursor-pointer"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isPaused ? "resume" : "pause"}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {isPaused ? "Resume Recording" : "Pause Recording"}
          </motion.div>
        </AnimatePresence>

        <motion.div
          animate={{ backgroundColor: isPaused ? "#000" : "#000" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
        >
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
                <Pause size={20} strokeWidth={2.5} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </button>

      {/* screenshot btn */}
      <button
        onClick={handleScreenshot}
        className="py-2.5 pl-6 pr-2.5 text-lg font-semibold bg-[#424245b3] hover:brightness-110 duration-300 rounded-full flex justify-between items-center gap-x-4 cursor-pointer"
      >
        <span>Take Snapshot</span>

        <motion.div
          animate={{ backgroundColor: snapshotTaken ? "#5CFF5C" : "#000" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
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
                <Camera size={20} strokeWidth={2.5} />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </button>
    </div>
  );
}

// <div className="w-full flex flex-col gap-y-2 rounded-2xl">
//   <div className="flex flex-col gap-3">
//     <div className="flex gap-x-3">

//       {!isRecording ? (
//         <button
//           onClick={() => {
//             const video = document.querySelector(
//               "video"
//             ) as HTMLVideoElement;
//             if (video && video.srcObject) {
//               startRecording(video.srcObject as MediaStream);
//             }
//           }}
//           className="relative w-full py-2 flex justify-center active:scale-95 items-center gap-x-2 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out"
//         >
//           <Clapperboard size={18} strokeWidth={2.5} />
//           <span>Start Recording</span>
//           <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-green-400"></span>
//         </button>
//       ) : (
//         <button
//           onClick={stopRecording}
//           className="relative w-full py-2 flex justify-center active:scale-95 items-center gap-x-2 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out"
//         >
//           <Square size={18} strokeWidth={3} />
//           <span>End Recording</span>
//           <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
//         </button>
//       )}

//       {isRecording ? (
//         !isPaused ? (
//           <button
//             onClick={pauseRecording}
//             className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out cursor-pointer"
//           >
//             <Pause size={18} strokeWidth={3} />
//             <span>Pause</span>
//           </button>
//         ) : (
//           <button
//             onClick={resumeRecording}
//             className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out cursor-pointer"
//           >
//             <Play size={18} strokeWidth={3} />
//             <span>Resume</span>
//           </button>
//         )
//       ) : null}
//     </div>

//     <div className="flex gap-x-3">
//       <button
//         onClick={handleScreenshot}
//         className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out"
//       >
//         <Camera size={18} strokeWidth={3} />
//         Take Snapshot
//       </button>

//       <button
//         onClick={handleEndInterview}
//         className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] hover:bg-red-400 border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out"
//       >
//         <Power size={18} strokeWidth={3} />
//         End Interview
//       </button>
//     </div>
//   </div>
// </div>
