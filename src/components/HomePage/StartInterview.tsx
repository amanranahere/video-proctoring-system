"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function StartInterview() {
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
    <section className="min-h-screen flex justify-center items-center">
      <div className="w-full lg:w-[40%] flex flex-col justify-center items-center gap-y-3">
        <input
          type="text"
          placeholder="Interview Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-gray-200 hover:bg-gray-300 focus:bg-gray-300 duration-300 py-2.5 px-3 rounded-xl outline-none"
        />

        <div className="w-full flex gap-x-3">
          <select
            name="duration"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full bg-gray-200 hover:bg-gray-300 py-2.5 px-3 rounded-xl outline-none cursor-pointer"
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">60 minutes</option>
          </select>

          <button
            onClick={handleStart}
            className="w-full font-semibold bg-[#000] text-white hover:bg-[#000]/80 active:scale-95 duration-300 py-2.5 px-3 rounded-xl outline-none cursor-pointer"
          >
            Start
          </button>
        </div>
      </div>
    </section>
  );
}
