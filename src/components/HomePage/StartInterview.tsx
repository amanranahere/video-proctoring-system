"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  candidateName: string;
  interviewerName: string;
  duration: number;
  notes: string;
};

export default function StartInterview() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    router.push("/interview");
  };

  return (
    <section id="start-interview" className="py-20 lg:py-40">
      <div className="relative w-[90%] lg:w-[85%] h-full mx-auto p-4 lg:p-24 text-[#1d1d1f] bg-white rounded-4xl flex flex-col justify-center items-center overflow-hidden">
        <h2 className="pb-2 lg:pb-4 text-4xl lg:text-7xl font-semibold">
          Start the Interview.
        </h2>

        <p className="max-w-5xl pb-6 lg:pb-12 text-[#86868b] text-lg lg:text-2xl leading-6 lg:leading-tight tracking-tighter lg:tracking-tight font-semibold lg:text-balance text-center">
          This is a demo of our video proctoring system. Instead of a
          candidate's video, your own camera feed will be visible so you can
          explore how the checks and warnings work in real time.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:min-w-2xl grid grid-cols-2 gap-2"
        >
          <div className="flex flex-col gap-2">
            {/* interview title */}
            <div className="floating-input">
              <input
                {...register("title", {
                  required: "Interview title is required",
                })}
                placeholder=" "
                className={`border rounded-2xl ${
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
                className={`border rounded-2xl ${
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
                className={`border rounded-2xl ${
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
                className={`border rounded-2xl ${
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
                className="h-full resize-none custom-scrollbar rounded-2xl border border-[#d1d5db]"
                {...register("notes")}
                placeholder=" "
              />

              <label>Notes (optional)</label>
            </div>

            <button
              type="submit"
              className="lg:text-lg bg-[#e8e8ed94] text-[#1d1d1f] pr-2.5 lg:pr-3 pl-4 lg:pl-6 py-2.5 flex lg:justify-center items-center gap-x-2 lg:gap-x-3 hover:bg-[#e8e8edd7] rounded-2xl cursor-pointer duration-300"
            >
              Start Interview
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
