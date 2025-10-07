"use client";

import VideoCapture from "@/components/InterviewPage/VideoCapture";
import InfoBox from "@/components/InterviewPage/InfoBox";
import ControlPanel from "@/components/InterviewPage/ControlPanel";
import LogBox from "@/components/InterviewPage/LogBox";

export default function Interview() {
  return (
    <main className="min-h-screen bg-[#1d1d1f] text-white lg:h-screen flex gap-2 md:gap-4 lg:gap-5 p-2 md:p-3 lg:p-6">
      <section className="w-full lg:w-[70%] flex flex-col flex-1 justify-between items-center gap-2 md:gap-3 lg:gap-5">
        <VideoCapture />
        <InfoBox />
      </section>

      <section className="w-full lg:w-[30%] flex flex-col justify-between items-center gap-2 md:gap-3 lg:gap-5">
        <ControlPanel />
        <LogBox />
      </section>
    </main>
  );
}
