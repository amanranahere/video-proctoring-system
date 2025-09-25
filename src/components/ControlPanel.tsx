"use client";

import { useRef, useState, useEffect } from "react";
import { Clapperboard, Square, Play, Pause, Camera, Power } from "lucide-react";
import { useLogStore } from "@/store/logStore";

export default function ControlPanel() {
  // const [recording, setRecording] = useState(false);
  // const [paused, setPaused] = useState(false);

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
    <div className="w-full flex flex-col gap-y-2 rounded-2xl">
      <h1 className="text-lg md:text-xl lg:text-3xl font-bold pb-3 text-center">
        VIDEO PROCTORING SYSTEM
      </h1>

      <div className="flex flex-col gap-3">
        <div className="flex gap-x-3">
          {!isRecording ? (
            <button
              onClick={() => {
                const video = document.querySelector(
                  "video"
                ) as HTMLVideoElement;
                if (video && video.srcObject) {
                  startRecording(video.srcObject as MediaStream);
                }
              }}
              className="relative w-full py-2 flex justify-center active:scale-95 items-center gap-x-2 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out"
            >
              <Clapperboard size={18} strokeWidth={2.5} />
              <span>Start Recording</span>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-green-400"></span>
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="relative w-full py-2 flex justify-center active:scale-95 items-center gap-x-2 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out"
            >
              <Square size={18} strokeWidth={3} />
              <span>End Recording</span>
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
            </button>
          )}

          {isRecording ? (
            !isPaused ? (
              <button
                onClick={pauseRecording}
                className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out cursor-pointer"
              >
                <Pause size={18} strokeWidth={3} />
                <span>Pause</span>
              </button>
            ) : (
              <button
                onClick={resumeRecording}
                className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out cursor-pointer"
              >
                <Play size={18} strokeWidth={3} />
                <span>Resume</span>
              </button>
            )
          ) : null}
        </div>

        <div className="flex gap-x-3">
          <button
            onClick={handleScreenshot}
            className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out"
          >
            <Camera size={18} strokeWidth={3} />
            Take Snapshot
          </button>

          <button
            onClick={handleEndInterview}
            className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] hover:bg-red-400 border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out"
          >
            <Power size={18} strokeWidth={3} />
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
}
