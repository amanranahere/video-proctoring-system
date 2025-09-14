"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("30");

  const handleStart = () => {
    if (!title) return alert("Please enter interview title");
    const id = title;
    router.push(
      `/interview/${id}?title=${encodeURIComponent(title)}&duration=${duration}`
    );
  };

  return (
    <>
      <main className="min-h-screen flex justify-center items-center">
        <div className="w-1/2 flex flex-col justify-center items-center gap-y-5">
          <h1 className="font-mono text-4xl font-bold">
            VIDEO PROCTORING SYSTEM
          </h1>
          <p className="text-center">
            Welcome to the Video Proctoring System. This platform allows you to
            conduct interviews with real-time video monitoring, candidate
            details, and activity logging.
          </p>

          <div className="w-full lg:w-[40%] flex flex-col justify-center items-center gap-y-3">
            <input
              type="text"
              placeholder="Interview Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] focus:bg-[#3a3a3a] duration-300 py-2.5 px-3 rounded-xl outline-none"
            />

            <div className="w-full flex gap-x-3">
              <select
                name="duration"
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#2a2a2a] py-2.5 px-3 rounded-xl outline-none cursor-pointer"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>

              <button
                onClick={handleStart}
                className="w-full text-black font-semibold bg-[#f1f1f1] hover:bg-[#f1f1f1]/80 active:scale-95 duration-300 py-2.5 px-3 rounded-xl outline-none cursor-pointer"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-0.5 right-0.5 font-mono text-[#bababa] text-sm">
        Made by{" "}
        <a
          href="https://amanrana.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white duration-150 transition-colors"
        >
          Aman_Rana
        </a>
      </footer>
    </>
  );
}
