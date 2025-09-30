"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { VideoOff, Eye, Scale, Plus, X } from "lucide-react";

export const modalData = [
  {
    title: "Your video is never stored",
    body: (
      <>
        <p>
          To demonstrate how the prototype works, the system asks for camera
          permission so you can see your own video as if you were a candidate.
        </p>
        <p>
          You also have the option to record this video, but any recording is
          saved only on your device — we never have access to it.
        </p>
        <p>
          The video stream itself is processed securely in real time and is not
          stored on any server. This ensures you can explore the monitoring
          features while remaining fully in control of your data.
        </p>
      </>
    ),
  },
  {
    title: "Transparency at every step",
    body: (
      <>
        <p>
          We designed this prototype so that every check and alert is visible to
          you.
        </p>
        <p>
          Instead of running hidden background processes, the system openly
          shows when a warning is triggered — for example, if multiple faces
          appear in the camera view or if the user looks away for too long.
        </p>
        <p>
          By presenting these events clearly, you can see exactly what the
          system detects and why, creating a transparent and trustworthy
          experience.
        </p>
      </>
    ),
  },
  {
    title: "Fair and unbiased evaluation",
    body: (
      <>
        <p>
          Our checks are powered by open-source technologies like TensorFlow
          (using an npm package) and MediaPipe (loaded via CDN). These tools are
          industry-trusted and apply the same algorithms consistently to every
          candidate.
        </p>
        <p>
          Because we rely on open and widely used frameworks, the system ensures
          fairness and reduces bias.
        </p>
        <p>
          This way, every candidate is evaluated under the same conditions,
          creating a level playing field without hidden advantages.
        </p>
      </>
    ),
  },
];

export default function Transparency() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="transparency-section" className="mx-32 py-40">
      <h2 className="pb-4 lg:text-7xl font-semibold">
        Trust and Transparency.
      </h2>

      <p className="max-w-4xl pb-12 text-[#86868b] text-2xl leading-tight tracking-tight font-semibold text-balance">
        We believe <span className="text-[#1d1d1f]">confidence</span> is earned
        by being <span className="text-[#1d1d1f]">open</span> about how the
        system works and by protecting what matters most —{" "}
        <span className="text-[#1d1d1f]">your privacy</span>.
      </p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="w-full grid md:grid-cols-3 gap-6 select-none"
      >
        <motion.button
          onClick={() => setActiveIndex(0)}
          className="relative px-8 pt-8 pb-16 bg-white rounded-4xl text-left text-[#1d1d1f] hover:scale-[1.02] duration-500 space-y-4 cursor-pointer overflow-hidden"
        >
          {/* icon */}
          <VideoOff className="w-12 h-12 text-[#ff4f81]" strokeWidth={1} />

          {/* content */}
          <p className="text-[28px] font-bold leading-tight">
            Your <span className="text-[#ff4f81]">video is never stored</span>,
            only processed in real time.
          </p>

          {/* close btn */}
          <div className="absolute bottom-5 right-5 w-9 h-9 bg-[#1d1d1f] rounded-full flex justify-center items-center">
            <Plus className="w-5 h-5 text-white" strokeWidth={4} />
          </div>
        </motion.button>

        <motion.button
          onClick={() => setActiveIndex(1)}
          className="relative px-8 pt-8 pb-16 bg-white rounded-4xl text-left text-[#1d1d1f] hover:scale-[1.02] duration-500 space-y-4 cursor-pointer overflow-hidden"
        >
          {/* icon */}

          <Eye className="w-12 h-12 text-[#00bcd4]" strokeWidth={1} />

          {/* content */}
          <p className="text-[28px] font-bold leading-tight">
            Clear{" "}
            <span className="text-[#00bcd4]">transparency at every step</span>,
            with visible checks and alerts.
          </p>

          {/* close btn */}
          <div className="absolute bottom-5 right-5 w-9 h-9 bg-[#1d1d1f] rounded-full flex justify-center items-center">
            <Plus className="w-5 h-5 text-white" strokeWidth={4} />
          </div>
        </motion.button>

        <motion.button
          onClick={() => setActiveIndex(2)}
          className="relative px-8 pt-8 pb-16 bg-white rounded-4xl text-left text-[#1d1d1f] hover:scale-[1.02] duration-500 space-y-4 cursor-pointer overflow-hidden"
        >
          {/* icon */}
          <Scale className="w-12 h-12 text-[#8668ff]" strokeWidth={1} />

          {/* content */}
          <p className="text-[28px] font-bold leading-tight">
            Designed for{" "}
            <span className="text-[#8668ff]">fair and unbiased evaluation</span>
            , the same for everyone.
          </p>

          {/* close btn */}
          <div className="absolute bottom-5 right-5 w-9 h-9 bg-[#1d1d1f] rounded-full flex justify-center items-center">
            <Plus className="w-5 h-5 text-white" strokeWidth={4} />
          </div>
        </motion.button>
      </motion.div>

      {/* modal */}
      <AnimatePresence mode="wait">
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-full flex justify-center items-center z-[99] text-[#1d1d1f]"
          >
            <div className="relative w-[90%] lg:w-[50%] p-8 lg:px-20 lg:pt-24 lg:pb-20 bg-white z-[90] rounded-4xl flex flex-col gap-y-6">
              <h3 className="text-[56px] font-bold leading-14">
                {modalData[activeIndex].title}
              </h3>

              <div className="lg:text-lg space-y-4">
                {modalData[activeIndex].body}
              </div>

              {/* close btn */}
              <div
                onClick={() => setActiveIndex(null)}
                className="absolute top-6 right-6 w-9 h-9 bg-[#1d1d1f] rounded-full flex justify-center items-center cursor-pointer"
              >
                <X className="w-5 h-5 text-white" strokeWidth={4} />
              </div>
            </div>

            {/* blurred bg */}
            <div
              onClick={() => setActiveIndex(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50"
            ></div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
