"use client";

import { useRouter } from "next/router";
import { motion, AnimatePresence } from "motion/react";
import { useLogStore } from "@/store/logStore";
import { useInterviewStore } from "@/store/InterviewStore";
import { Download } from "lucide-react";

export default function EndInterviewModal() {
  const router = useRouter();

  const { showEndModal, closeModal, logs, recordings, snapshots } =
    useLogStore();

  const { interviewData, clearInterviewData } = useInterviewStore();

  const handleDownload = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  };

  const downloadReport = () => {
    const report = {
      candidate: "Candidate Name",
      interviewer: "Interviewer Name",
      title: "Interview Title",
      duration: "00:45:00",
      logs,
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    handleDownload(url, `interview-report-${Date.now()}.json`);
  };

  return (
    <AnimatePresence mode="wait">
      {!showEndModal && (
        <div className="fixed inset-0 w-full h-full flex justify-center items-center z-[99] text-[#1d1d1f]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-[90%] md:w-[70%] lg:w-[60%] h-[80%] lg:h-[90%] px-6 lg:px-14 pt-16 lg:pt-20 pb-8 lg:pb-20 bg-white rounded-4xl flex flex-col gap-y-6 z-30 overflow-y-auto no-scrollbar"
          >
            <h3 className="text-4xl lg:text-[56px] font-bold lg:leading-14 text-center">
              Interview Summary
            </h3>

            <div className="lg:text-lg space-y-8 leading-snug lg:leading-normal">
              <p className="flex flex-col font-bold px-2 lg:px-6">
                <span className="text-lg text-[#86868b]">Interview Title</span>
                <span className="text-2xl text-[#1d1d1f]">
                  {interviewData?.title}
                </span>
              </p>
              <p className="flex flex-col font-bold px-2 lg:px-6">
                <span className="text-lg text-[#86868b]">Interview Id</span>
                <span className="text-2xl text-[#1d1d1f]">
                  {interviewData?.id}
                </span>
              </p>
              <p className="flex flex-col font-bold px-2 lg:px-6">
                <span className="text-lg text-[#86868b]">Candidate Name</span>
                <span className="text-2xl text-[#1d1d1f]">
                  {interviewData?.candidateName}
                </span>
              </p>
              <p className="flex flex-col font-bold px-2 lg:px-6">
                <span className="text-lg text-[#86868b]">Interviwer Name</span>
                <span className="text-2xl text-[#1d1d1f]">
                  {interviewData?.interviewerName}
                </span>
              </p>
              <p className="flex flex-col font-bold px-2 lg:px-6">
                <span className="text-lg text-[#86868b]">Duration</span>
                <span className="text-2xl text-[#1d1d1f]">
                  {interviewData?.duration} mins
                </span>
              </p>
              <p className="flex flex-col font-bold px-2 lg:px-6">
                <span className="text-lg text-[#86868b]">Context</span>
                <span className="text-2xl text-[#1d1d1f]">
                  {interviewData?.context}
                </span>
              </p>

              {/* logs */}
              <div className="flex flex-col gap-y-2">
                <span className="text-lg md:text-2xl text-[#86868b] font-bold px-2 lg:px-6">
                  Logs
                </span>

                <div className="h-[300px] md:h-[400px] flex flex-col gap-y-1.5 p-1 md:p-5 bg-[#f5f5f7] border-8 border-[#f5f5f7] rounded-4xl overflow-y-auto no-scrollbar overflow-hidden">
                  {logs.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center text-[#5a5a5a] font-semibold">
                      No logs available
                    </div>
                  ) : (
                    logs.map((log, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 rounded-full px-3 lg:px-4 py-1.5 bg-[#fff]"
                      >
                        <span className="w-[70px] md:w-[80px] text-xs">
                          {log.time}
                        </span>

                        <span className="text-xs md:text-sm flex-1">
                          {log.rule}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* snapshots */}
              <div className="flex flex-col gap-y-2">
                <span className="text-lg md:text-2xl text-[#86868b] font-bold px-2 lg:px-6">
                  Snapshots
                </span>

                <div className="h-[300px] md:h-[400px] flex flex-wrap gap-1 p-1 md:p-5 bg-[#f5f5f7] border-8 border-[#f5f5f7] rounded-4xl overflow-y-auto no-scrollbar overflow-hidden">
                  {snapshots.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center text-[#5a5a5a] font-semibold">
                      No snapshots available
                    </div>
                  ) : (
                    snapshots.map((url, index) => (
                      <div
                        key={index}
                        className="relative w-full md:w-[49.2%] rounded-xl md:rounded-2xl overflow-hidden"
                      >
                        <img
                          src={url}
                          alt={`Snapshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                        <button
                          onClick={() =>
                            handleDownload(url, `Snapshot-${index + 1}.png`)
                          }
                          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-[#00000064] backdrop-blur-sm hover:brightness-125 active:scale-90 lg:active:scale-100 duration-200 rounded-full flex justify-center items-center cursor-pointer"
                        >
                          <Download
                            className="w-3 h-3 md:w-5 md:h-5 text-white"
                            strokeWidth={4}
                          />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* recordings */}
              <div className="flex flex-col gap-y-2">
                <span className="text-lg md:text-2xl text-[#86868b] font-bold px-2 lg:px-6">
                  Recordings
                </span>

                <div className="h-[300px] md:h-[400px] flex flex-wrap gap-1 p-1 md:p-5 bg-[#f5f5f7] border-8 border-[#f5f5f7] rounded-4xl overflow-y-auto no-scrollbar overflow-hidden">
                  {recordings.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center text-[#5a5a5a] font-semibold">
                      No recording available
                    </div>
                  ) : (
                    recordings.map((url, index) => (
                      <div
                        key={index}
                        className="relative w-full  rounded-xl md:rounded-2xl overflow-hidden"
                      >
                        <video src={url} className="w-full h-full" />

                        <button
                          onClick={() =>
                            handleDownload(url, `Recording-${index + 1}.webm`)
                          }
                          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 bg-[#00000064] backdrop-blur-sm hover:brightness-125 active:scale-90 lg:active:scale-100 duration-200 rounded-full flex justify-center items-center cursor-pointer"
                        >
                          <Download
                            className="w-3 h-3 md:w-5 md:h-5 text-white"
                            strokeWidth={4}
                          />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button onClick={downloadReport} className="cursor-pointer">
                Download Report
              </button>

              <button
                onClick={() => {
                  closeModal();
                  //   router.push("/");
                }}
              >
                Close
              </button>
            </div>
          </motion.div>

          {/* blurred bg */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/40 backdrop-blur-lg z-20"
          ></motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
