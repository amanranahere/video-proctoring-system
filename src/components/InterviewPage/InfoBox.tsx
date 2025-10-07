"use client";

import useInterviewStore from "@/store/InterviewStore";

export default function InfoBox() {
  const { interviewData } = useInterviewStore();

  return (
    <div className="w-full h-full px-2 md:px-5 py-2 md:py-4 flex gap-x-4 md:gap-x-20 bg-[#ffffff06] rounded-[25px] shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.05)] hover:shadow-[inset_0_0_0_calc(1px+0px)_hsla(0,0%,100%,0.075),_inset_0_0_5vw_hsla(0,0%,100%,0.15)] duration-500 overflow-hidden">
      <div className="lg:w-[40%] flex flex-col">
        <span className="text-[#7a7a7a] font-semibold uppercase text-sm font-mono">
          Interview Title
        </span>
        <h2 className="text-lg lg:text-2xl font-semibold">
          {interviewData?.title}
        </h2>
      </div>

      <div className="flex flex-col">
        <span className="text-[#7a7a7a] font-semibold uppercase text-sm font-mono">
          Candidate Name
        </span>
        <h2 className="text-lg lg:text-2xl font-semibold">
          {interviewData?.candidateName}
        </h2>
      </div>

      <div className="flex flex-col">
        <span className="text-[#7a7a7a] font-semibold uppercase text-sm font-mono">
          Interviewer Name
        </span>
        <h2 className="text-lg lg:text-2xl font-semibold">
          {interviewData?.interviewerName}
        </h2>
      </div>

      <div className="flex flex-col">
        <span className="text-[#7a7a7a] font-semibold uppercase text-sm font-mono">
          Duration
        </span>
        <h2 className="text-lg lg:text-2xl font-semibold">
          {interviewData?.duration} minutes
        </h2>
      </div>

      <div className="flex flex-col">
        <span className="text-[#7a7a7a] font-semibold uppercase text-sm font-mono">
          Notes
        </span>
        <h2 className="text-lg lg:text-2xl font-semibold">
          {interviewData?.notes}
        </h2>
      </div>
    </div>
  );
}
