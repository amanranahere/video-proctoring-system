"use client";

import { motion } from "motion/react";

import Navbar from "@/components/InterviewPage/Navbar";
import VideoCapture from "@/components/InterviewPage/VideoCapture";
import InfoBox from "@/components/InterviewPage/InfoBox";
import ControlPanel from "@/components/InterviewPage/ControlPanel";
import LogBox from "@/components/InterviewPage/LogBox";

export default function Interview() {
  return (
    <main className="relative p-5 bg-[#000] text-white flex flex-col lg:flex-row space-x-5 ">
      <Navbar />

      {/* left section */}
      <section className="flex lg:sticky lg:top-[60px] lg:h-[calc(100vh-80px)] w-full lg:w-[70%] mt-[56px] lg:mt-0 flex-col justify-between items-center gap-5">
        <VideoCapture />
        <ControlPanel />
      </section>

      {/* right section */}
      <section className="w-full lg:w-[30%] mt-[39px] flex flex-col gap-5">
        <InfoBox />
        <LogBox />
      </section>
    </main>
  );
}
