"use client";

import { useSearchParams } from "next/navigation";

export default function InfoBox() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "Untitled Interview";
  const duration = searchParams.get("duration");

  return (
    <div className="w-full h-full px-2 md:px-5 py-2 md:py-4 flex gap-x-4 md:gap-x-20 bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.15)] duration-500 overflow-hidden">
      <div className="lg:w-[40%] flex flex-col">
        <span className="text-[#7a7a7a] font-semibold uppercase text-sm font-mono">
          Title
        </span>
        <h2 className="text-lg lg:text-2xl font-semibold">{title}</h2>
      </div>

      <div className="flex flex-col">
        <span className="text-[#7a7a7a] font-semibold uppercase text-sm font-mono">
          Duration
        </span>
        <h2 className="text-lg lg:text-2xl font-semibold">{duration}</h2>
      </div>
    </div>
  );
}
