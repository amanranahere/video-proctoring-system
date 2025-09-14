"use client";

import { useState } from "react";
import { Clapperboard, Square, Play, Pause, Camera, Power } from "lucide-react";

export default function ControlPanel() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  return (
    <div className="w-full flex flex-col gap-y-2 rounded-2xl">
      <h1 className="text-lg md:text-xl lg:text-3xl font-bold pb-3">
        VIDEO PROCTORING SYSTEM
      </h1>

      <div className="flex flex-col gap-3">
        <div className="flex gap-x-3">
          <button
            onClick={() => setRecording(!recording)}
            className="relative w-full py-2 flex justify-center active:scale-95 items-center gap-x-2 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out"
          >
            {recording ? <Square size={18} /> : <Clapperboard size={18} />}

            {recording ? (
              <span>End Recording</span>
            ) : (
              <span>Start Recording</span>
            )}

            <span
              className={`absolute top-1.5 right-1.5 h-2 w-2 rounded-full ${
                recording ? "bg-red-500 animate-pulse" : "bg-green-400"
              }`}
            ></span>
          </button>

          {recording ? (
            <button
              onClick={() => setPaused(!paused)}
              className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out cursor-pointer"
            >
              {paused ? <Play size={18} /> : <Pause size={18} />}
              {paused ? <span>Resume</span> : <span>Pause</span>}
            </button>
          ) : null}
        </div>

        <div className="flex gap-x-3">
          <button className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out">
            <Camera size={18} />
            Take Snapshot
          </button>

          <button className="relative w-full py-2 flex justify-center items-center gap-x-2 active:scale-95 outline-none cursor-pointer select-none rounded-xl text-white font-semibold bg-[#ffffff06] hover:bg-red-400 border border-white/10 shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_12px_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_1px_hsla(0,0%,100%,0.075),inset_0_0_22px_hsla(0,0%,100%,0.15)] transition-all duration-300 ease-out">
            <Power size={18} />
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
}
