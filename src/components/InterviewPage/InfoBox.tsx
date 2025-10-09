"use client";

import useInterviewStore from "@/store/InterviewStore";

export default function InfoBox() {
  const { interviewData } = useInterviewStore();

  return (
    <div className="w-full h-full flex flex-col gap-y-4 md:gap-y-6 px-3 rounded-4xl">
      <div className="flex flex-col">
        <span className="text-[#86868b] font-semibold text-sm">
          Candidate Name
        </span>
        <h2 className="text-lg lg:text-2xl font-semibold">
          {interviewData?.candidateName}
        </h2>
      </div>

      <div className="flex flex-col">
        <span className="text-[#86868b] font-semibold text-sm">Duration</span>
        <h2 className="text-lg lg:text-2xl font-semibold">
          {interviewData?.duration} minutes
        </h2>
      </div>

      <div className="flex flex-col">
        <span className="text-[#86868b] font-semibold text-sm">Notes</span>
        <h2 className="text-lg lg:text-2xl font-semibold">
          {interviewData?.notes}
        </h2>
      </div>
    </div>
  );
}
