"use client";

import InfoBox from "@/components/InfoBox";
import ControlPanel from "@/components/ControlPanel.";
import LogBox from "@/components/LogBox";

export default function Interview() {
  return (
    <main className="min-h-screen lg:h-screen flex gap-2 md:gap-4 lg:gap-8 p-2 md:p-4 lg:p-8">
      <section className="w-full lg:w-[65%] flex flex-col flex-1 justify-between items-center gap-2 md:gap-4 lg:gap-8">
        {/* video box */}
        <div className="w-full aspect-video bg-black rounded-2xl flex items-center justify-center text-white p-2 border-2 border-[#4a4a4a]">
          VIDEO FEED
        </div>

        <InfoBox />
      </section>

      <section className="w-full lg:w-[35%] flex flex-col justify-between items-center gap-2 md:gap-4 lg:gap-8">
        <ControlPanel />

        <LogBox />
      </section>
    </main>
  );
}
