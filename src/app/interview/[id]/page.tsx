"use client";

import { motion } from "motion/react";

import Navbar from "@/components/InterviewPage/Navbar";
import VideoCapture from "@/components/InterviewPage/VideoCapture";
import InfoBox from "@/components/InterviewPage/InfoBox";
import ControlPanel from "@/components/InterviewPage/ControlPanel";
import LogBox from "@/components/InterviewPage/LogBox";

export default function Interview() {
  return (
    <main className="relative min-h-screen p-5 bg-[#1d1d1f] text-white flex space-x-5 ">
      <Navbar />

      {/* left section */}
      <section className="hidden lg:flex lg:sticky lg:top-[60px] lg:h-[calc(100vh-80px)] w-[70%] flex-col justify-between items-center gap-5">
        <VideoCapture />
        {/* <ControlPanel /> */}
      </section>

      {/* right section */}
      <section className="w-full h-full lg:w-[30%] mt-[39px] flex flex-col gap-5 max-h-[calc(100vh-49px)]">
        <InfoBox />
        <LogBox />
      </section>
    </main>
  );
}
