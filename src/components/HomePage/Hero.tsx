import { CircleArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero-section"
      className="min-h-screen bg-[#fff] flex flex-col justify-center items-center gap-y-5 px-4 lg:px-0"
    >
      <h1 className="text-4xl lg:text-7xl text-center font-extrabold">
        Video Proctoring System
      </h1>

      <p className="text-[#86868b] max-w-4xl mx-auto text-lg lg:text-2xl leading-6 lg:leading-tight tracking-tighter lg:tracking-tight font-semibold text-center text-balance">
        A modern video proctoring system designed to demonstrate how{" "}
        <span className="text-[#1d1d1f]">remote candidates</span> can be
        monitored in real time. Using{" "}
        <span className="text-[#1d1d1f]">computer vision checks</span>, it
        showcases how suspicious activities are detected during
        <span className="text-[#1d1d1f]"> online exams</span> and{" "}
        <span className="text-[#1d1d1f]">interviews</span>.
      </p>

      <a
        href="#start-interview"
        className="lg:text-lg bg-[#e8e8ed94] text-[#1d1d1f] pr-2.5 lg:pr-3 pl-4 lg:pl-6 py-2.5 flex lg:justify-center items-center gap-x-2 lg:gap-x-3 hover:bg-[#e8e8edd7] rounded-full duration-300"
      >
        <span className="select-nones font-medium whitespace-nowrap">
          Start Interview
        </span>
        <CircleArrowRight className="w-7 h-7" />
      </a>
    </section>
  );
}
