"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import useInterviewStore from "@/store/InterviewStore";
import { v4 as uuidv4 } from "uuid";

type FormValues = {
  id: string;
  title: string;
  candidateName: string;
  interviewerName: string;
  duration: number;
  notes: string;
};

export default function StartInterview() {
  const router = useRouter();
  const { setInterviewData } = useInterviewStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const id = uuidv4();

    setInterviewData({
      id,
      title: data.title,
      candidateName: data.candidateName,
      interviewerName: data.interviewerName,
      duration: data.duration,
      notes: data.notes,
    });

    router.push(`/interview/${id}`);
  };

  return (
    <section id="start-interview" className="py-20 lg:py-40">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5, ease: "easeOut" },
          y: { duration: 0.8, delay: 0.2, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="relative w-[95%] lg:w-[85%] h-full lg:h-[95vh] mx-auto px-4 py-10 lg:px-24 lg:py-24 text-[#1d1d1f] bg-white rounded-4xl flex flex-col justify-center items-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.12)]"
      >
        <h2 className="pb-2 lg:pb-4 text-4xl md:text-5xl lg:text-7xl font-semibold text-center">
          Start the Interview
        </h2>

        <p className="max-w-4xl pb-6 lg:pb-12 text-[#86868b] text-lg lg:text-2xl leading-6 lg:leading-tight tracking-tighter lg:tracking-tight font-semibold text-center">
          This is a demo of our video proctoring system. Instead of a
          candidate's video, your own camera feed will be visible so you can
          explore how the checks and warnings work in real time.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full lg:max-w-max lg:min-w-2xl grid lg:grid-cols-2 gap-2 md:p-6"
        >
          <div className="flex flex-col gap-2">
            {/* interview title */}
            <div className="floating-input">
              <input
                {...register("title", {
                  required: "Interview title is required",
                })}
                placeholder=" "
                className={`border-2 rounded-2xl focus:border-[#86868b] duration-300 outline-none ${
                  errors.title ? "border-red-500" : "border-[#d1d5db]"
                }`}
              />

              <label>Interview Title</label>
            </div>

            {errors.title?.message && (
              <p className="ml-2 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}

            {/* candidate name */}
            <div className="floating-input">
              <input
                {...register("candidateName", {
                  required: "Candidate name is required",
                })}
                placeholder=" "
                className={`border-2 rounded-2xl focus:border-[#86868b] duration-300 outline-none ${
                  errors.candidateName ? "border-red-500" : "border-[#d1d5db]"
                }`}
              />

              <label>Candidate Name</label>
            </div>

            {errors.candidateName?.message && (
              <p className="ml-2 text-sm text-red-500">
                {errors.candidateName.message}
              </p>
            )}

            {/* interviewer name */}
            <div className="floating-input">
              <input
                {...register("interviewerName")}
                placeholder=" "
                className={`border-2 rounded-2xl focus:border-[#86868b] duration-300 outline-none ${
                  errors.interviewerName ? "border-red-500" : "border-[#d1d5db]"
                }`}
              />

              <label>Interviewer Name</label>

              {errors.interviewerName?.message && (
                <p className="ml-2 text-sm text-red-500">
                  {errors.interviewerName.message}
                </p>
              )}
            </div>

            {/* duration */}
            <div className="floating-input">
              <input
                type="number"
                {...register("duration", { min: 10, max: 180 })}
                placeholder=" "
                className={`border-2 rounded-2xl focus:border-[#86868b] duration-300 outline-none ${
                  errors.duration ? "border-red-500" : "border-[#d1d5db]"
                }`}
              />

              <label>Duration e.g. 30</label>

              {errors.duration?.message && (
                <p className="ml-2 text-sm text-red-500">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {/* notes */}
            <div className="h-full floating-textarea">
              <textarea
                rows={6}
                className="h-full resize-none custom-scrollbar rounded-2xl border-2 border-[#d1d5db] focus:border-[#86868b] duration-300 outline-none"
                {...register("notes")}
                placeholder=" "
              />

              <label>Some context (optional)</label>
            </div>

            <button
              type="submit"
              className="lg:text-lg bg-[#e8e8ed94] text-[#1d1d1f] py-2.5  hover:bg-[#e8e8edd7] rounded-2xl cursor-pointer duration-300"
            >
              Start Interview
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}
