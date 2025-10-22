"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLogStore } from "@/store/logStore";
import { useInterviewStore } from "@/store/InterviewStore";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import { ChevronDown } from "lucide-react";

export default function EndInterviewModal() {
  const router = useRouter();
  const [openOptions, setOpenOptions] = useState(false);

  const {
    showEndModal,
    closeModal,
    logs,
    recordings,
    snapshots,
    clearLogs,
    clearMedia,
  } = useLogStore();

  const { interviewData, clearInterviewData } = useInterviewStore();

  const handleDownload = (url: string, name: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.click();
  };

  const report = {
    id: interviewData?.id,
    candidate: interviewData?.candidateName,
    administrator: interviewData?.interviewerName,
    title: interviewData?.title,
    duration: interviewData?.duration,
    context: interviewData?.context,
    logs,
  };

  const downloadJSONReport = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    handleDownload(url, `interview-report-${Date.now()}.json`);
  };

  const downloadPDFReport = () => {
    const doc = new jsPDF();

    // heading
    doc.setFontSize(20);
    const pageWidth = doc.internal.pageSize.getHeight();
    doc.text("Interview Report", 25, 25);

    // details
    doc.setFontSize(12);
    const startX = 25;
    let y = 45;
    const labelWidth = 45;

    const drawRow = (label: string, value: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, startX, y);

      doc.setFont("helvetica", "normal");
      const valueX = startX + labelWidth;
      const lineHeight = 7;

      // wrap text if too long
      const splitText = doc.splitTextToSize(value, pageWidth - valueX - 100);
      doc.text(splitText, valueX, y);

      y += splitText.length * lineHeight;
    };

    drawRow("Session Title", report.title || "-");
    drawRow("Session ID", report.id || "-");
    drawRow("Candidate Name", report.candidate || "-");
    drawRow("Administrator Name", report.candidate || "-");
    drawRow("Duration", `${report.duration || "-"} mins`);
    drawRow("Context", report.context || "-");

    // logs
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Logs:", startX, y);
    y += 8;

    doc.setFont("helvetica", "normal");
    const lineHeight = 6;
    if (report.logs && report.logs.length > 0) {
      report.logs.forEach((log) => {
        const logText = `[${log.time}] ${log.rule}`;
        const splitLog = doc.splitTextToSize(logText, pageWidth - startX * 2);

        if (y + splitLog.length * lineHeight > 280) {
          doc.addPage();
          y = 20;
        }

        doc.text(splitLog, startX, y);
        y += splitLog.length * lineHeight;
      });
    } else {
      doc.text("No logs available.", startX, y);
    }

    // save pdf
    doc.save(`interview-report-${Date.now()}.pdf`);
  };

  return (
    <AnimatePresence mode="wait">
      {showEndModal && (
        <div className="fixed inset-0 w-full h-full flex justify-center items-center z-[99] text-[#1d1d1f]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative w-[95%] md:w-[70%] lg:w-[60%] h-[85%] lg:h-[90%] px-5 lg:px-14 pt-12 lg:pt-20 pb-32 lg:pb-32 bg-white rounded-4xl flex flex-col items-center gap-y-3 md:gap-y-6 z-30 overflow-y-auto no-scrollbar"
          >
            <h3 className="text-4xl lg:text-[56px] font-bold lg:leading-14 text-center">
              Interview Summary
            </h3>

            <div className="max-w-max px-6 p-2 font-semibold text-sm md:text-base text-[#1d1d1fd2] bg-[#f5f5f7] rounded-full">
              ID: {interviewData?.id}
            </div>

            <div className="w-full lg:text-lg mt-8 leading-snug lg:leading-normal">
              <p className="flex flex-col font-bold px-2 md:px-6 pb-4 md:pb-8 border-b border-[#e5e5e5]">
                <span className="md:text-lg text-[#9e9ea3]">Session Title</span>
                <span className="text-xl md:text-2xl text-[#1d1d1f]">
                  {interviewData?.title}
                </span>
              </p>

              <div className="md:grid md:grid-cols-5 border-b border-[#e5e5e5] py-4 md:py-8 space-y-6 md:space-y-0">
                <p className="col-span-3 flex flex-col font-bold px-2 lg:px-6">
                  <span className="md:text-lg text-[#9e9ea3]">
                    Candidate Name
                  </span>
                  <span className="text-xl md:text-2xl text-[#1d1d1f]">
                    {interviewData?.candidateName}
                  </span>
                </p>

                <p className="col-span-2 flex flex-col font-bold px-2 lg:px-6">
                  <span className="md:text-lg text-[#9e9ea3]">
                    Administrator Name
                  </span>
                  <span className="text-xl md:text-2xl text-[#1d1d1f]">
                    {interviewData?.interviewerName}
                  </span>
                </p>
              </div>

              <p className="flex flex-col font-bold px-2 lg:px-6 border-b border-[#e5e5e5] py-4 md:py-8">
                <span className="md:text-lg text-[#9e9ea3]">Duration</span>
                <span className="text-xl md:text-2xl text-[#1d1d1f]">
                  {interviewData?.duration} mins
                </span>
              </p>

              <p className="flex flex-col font-bold px-2 lg:px-6 border-b border-[#e5e5e5] py-4 md:py-8">
                <span className="md:text-lg text-[#9e9ea3]">
                  Additional Context
                </span>
                <span className="text-xl md:text-2xl text-[#1d1d1f]">
                  {interviewData?.context ? interviewData?.context : "-"}
                </span>
              </p>

              {/* logs */}
              <div className="flex flex-col gap-y-2 mt-8 mb-10">
                <span className="text-lg md:text-2xl text-[#9e9ea3] font-bold px-2 lg:px-6">
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
              <div className="flex flex-col gap-y-2 mb-10">
                <span className="text-lg md:text-2xl text-[#9e9ea3] font-bold px-2 lg:px-6">
                  Snapshots
                  <sup className="ml-0.5 text-sm font-semibold align-super text-[#1d1d1f]">
                    {snapshots.length === 0 ? null : snapshots.length}
                  </sup>
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
              <div className="flex flex-col gap-y-2 mb-20">
                <span className="text-lg md:text-2xl text-[#9e9ea3] font-bold px-2 lg:px-6">
                  Recordings
                  <sup className="ml-0.5 text-sm font-semibold align-super text-[#1d1d1f]">
                    {recordings.length === 0 ? null : recordings.length}
                  </sup>
                </span>

                <div className="h-[300px] md:h-[400px] flex flex-wrap gap-1 p-1 md:p-5 bg-[#f5f5f7] border-8 border-[#f5f5f7] rounded-4xl overflow-y-auto no-scrollbar overflow-hidden">
                  {recordings.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center text-[#5a5a5a] font-semibold">
                      No recordings available
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

              <div className="flex justify-center items-start gap-x-6">
                <div className="relative flex flex-col justify-center">
                  <button
                    onClick={() => setOpenOptions((prev) => !prev)}
                    className="pl-5 pr-3 md:pl-6 md:pr-4 py-3 text-sm md:text-base font-semibold bg-[#1d1d1f] text-white hover:bg-black rounded-full transition-all duration-200 cursor-pointer flex justify-center items-center gap-x-3 z-10"
                  >
                    <span>Download Report</span>
                    <ChevronDown
                      size={20}
                      strokeWidth={2}
                      className={`duration-700 ${
                        openOptions ? "rotate-x-180" : "rotate-x-0"
                      }`}
                    />
                  </button>

                  <AnimatePresence mode="wait">
                    {openOptions && (
                      <motion.div
                        initial={{ opacity: 1, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 1, scaleY: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 18,
                          opacity: { duration: 0.4, ease: "easeInOut" },
                          y: { duration: 0.4, ease: "easeInOut" },
                        }}
                        className="w-full absolute top-7 pt-7 p-2 bg-[#2d2d2d] text-white flex flex-col justify-end items-center rounded-b-3xl z-0 origin-top"
                      >
                        <button
                          onClick={() => {
                            downloadPDFReport();
                            setOpenOptions(false);
                          }}
                          className="w-full p-1.5 text-sm font-semibold hover:bg-[#3a3a3a] duration-200 rounded-full cursor-pointer"
                        >
                          PDF Format
                        </button>

                        <button
                          onClick={() => {
                            downloadJSONReport();
                            setOpenOptions(false);
                          }}
                          className="w-full p-1.5 text-sm font-semibold hover:bg-[#3a3a3a] duration-200 rounded-full cursor-pointer"
                        >
                          JSON Format
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => {
                    closeModal();
                    clearLogs();
                    clearMedia();
                    clearInterviewData();
                    router.push("/");
                  }}
                  className="px-6 md:px-8 py-3 text-sm md:text-base font-semibold bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] rounded-full transition-all duration-200 cursor-pointer"
                >
                  Close
                </button>
              </div>
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
