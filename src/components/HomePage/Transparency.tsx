"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { VideoOff, Eye, Scale, Plus, X } from "lucide-react";

const modalData = [
  {
    title: "Your video is never stored",
    body: (
      <>
        <p>
          This prototype requests camera access only to demonstrate how
          monitoring features work — letting you see your own video just like a
          candidate would during a session.
        </p>
        <p>
          Recording is optional, and any video you choose to record is stored
          solely on your device. No data or video is uploaded or saved on any
          server.
        </p>
        <p>
          All processing happens in real time within your browser, ensuring you
          stay in complete control of your data and privacy throughout the
          experience.
        </p>
      </>
    ),
  },
  {
    title: "Transparency at every step",
    body: (
      <>
        <p>
          Every check and event in the system is visible to you — there are no
          hidden background processes or silent detections.
        </p>
        <p>
          When an alert is triggered, such as when multiple faces appear or the
          user looks away, it&apos;s clearly shown in the interface so you always
          understand what&apos;s being detected and why.
        </p>
        <p>
          This open approach keeps the experience clear and honest, ensuring you
          always know what&apos;s happening in real time.
        </p>
      </>
    ),
  },
  {
    title: "Fair and unbiased evaluation",
    body: (
      <>
        <p>
          The system uses open-source technologies like TensorFlow (via npm) and
          MediaPipe (via CDN) for real-time detection and analysis.
        </p>
        <p>
          These computer-vision frameworks are widely adopted and apply the same
          logic to every user, ensuring consistency and minimizing bias.
        </p>
        <p>
          Because the same conditions and algorithms are applied universally,
          every candidate is evaluated fairly and transparently.
        </p>
      </>
    ),
  },
];

export default function Transparency() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="transparency-section" className="mx-4 lg:mx-32 py-20 lg:py-40">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="pb-2 lg:pb-4 md:mx-8 lg:mx-0 text-4xl md:text-5xl lg:text-7xl font-semibold"
      >
        Trust and Transparency.
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="max-w-4xl pb-6 lg:pb-12 md:mx-8 lg:mx-0 text-[#86868b] text-lg lg:text-2xl leading-6 lg:leading-tight tracking-tighter lg:tracking-tight font-semibold lg:text-balance"
      >
        We believe confidence is built through{" "}
        <span className="text-[#1d1d1f]">openness</span>, by showing how the
        system works and by protecting what matters most &mdash;{" "}
        <span className="text-[#1d1d1f]">your privacy</span>.
      </motion.p>

      <div className="w-full grid md:grid-cols-3 gap-3 lg:gap-6 select-none">
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            y: { duration: 0.6, ease: "easeOut" },
            opacity: { duration: 0.6, delay: 0.6, ease: "easeOut" },
          }}
          viewport={{ once: true }}
          onClick={() => setActiveIndex(0)}
          className="relative px-7 lg:px-8 pt-7 lg:pt-8 pb-14 lg:pb-16 bg-white rounded-4xl text-left text-[#1d1d1f] hover:scale-[1.02] duration-500 space-y-2.5 lg:space-y-4 cursor-pointer overflow-hidden"
        >
          {/* icon */}
          <VideoOff
            className="w-10 lg:w-12 h-10 lg:h-12 text-[#ff4f81]"
            strokeWidth={1}
          />

          {/* content */}
          <p className="text-2xl lg:text-[28px] font-bold leading-tight">
            Your <span className="text-[#ff4f81]">video is never stored</span>,
            only processed in real time.
          </p>

          {/* close btn */}
          <div className="absolute bottom-5 right-5 w-9 h-9 bg-[#1d1d1f] rounded-full flex justify-center items-center">
            <Plus className="w-5 h-5 text-white" strokeWidth={4} />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            y: { duration: 0.6, delay: 0.15, ease: "easeOut" },
            opacity: { duration: 0.6, delay: 0.75, ease: "easeOut" },
          }}
          viewport={{ once: true }}
          onClick={() => setActiveIndex(1)}
          className="relative px-7 lg:px-8 pt-7 lg:pt-8 pb-14 lg:pb-16 bg-white rounded-4xl text-left text-[#1d1d1f] hover:scale-[1.02] duration-500 space-y-2.5 lg:space-y-4 cursor-pointer overflow-hidden"
        >
          {/* icon */}
          <Eye
            className="w-10 lg:w-12 h-10 lg:h-12 text-[#00bcd4]"
            strokeWidth={1}
          />

          {/* content */}
          <p className="text-2xl lg:text-[28px] font-bold leading-tight">
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            y: { duration: 0.6, delay: 0.3, ease: "easeOut" },
            opacity: { duration: 0.6, delay: 0.9, ease: "easeOut" },
          }}
          viewport={{ once: true }}
          onClick={() => setActiveIndex(2)}
          className="relative px-7 lg:px-8 pt-7 lg:pt-8 pb-14 lg:pb-16 bg-white rounded-4xl text-left text-[#1d1d1f] hover:scale-[1.02] duration-500 space-y-2.5 lg:space-y-4 cursor-pointer overflow-hidden"
        >
          {/* icon */}
          <Scale
            className="w-10 lg:w-12 h-10 lg:h-12 text-[#8668ff]"
            strokeWidth={1}
          />

          {/* content */}
          <p className="text-2xl lg:text-[28px] font-bold leading-tight">
            Designed for{" "}
            <span className="text-[#8668ff]">fair and unbiased evaluation</span>
            , the same for everyone.
          </p>

          {/* close btn */}
          <div className="absolute bottom-5 right-5 w-9 h-9 bg-[#1d1d1f] rounded-full flex justify-center items-center">
            <Plus className="w-5 h-5 text-white" strokeWidth={4} />
          </div>
        </motion.button>
      </div>

      {/* modal */}
      <AnimatePresence mode="wait">
        {activeIndex !== null && (
          <div className="fixed inset-0 w-full h-full flex justify-center items-center z-[99] text-[#1d1d1f]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative w-[90%] md:w-[70%] lg:w-[50%] px-8 lg:px-20 pt-16 lg:pt-24 pb-8 lg:pb-20 bg-white rounded-4xl flex flex-col gap-y-6 z-30"
            >
              <h3 className="text-4xl lg:text-[56px] font-bold lg:leading-14">
                {modalData[activeIndex].title}
              </h3>

              <div className="lg:text-lg space-y-4 leading-snug lg:leading-normal">
                {modalData[activeIndex].body}
              </div>

              {/* close btn */}
              <div
                onClick={() => setActiveIndex(null)}
                className="absolute top-6 right-6 w-9 h-9 bg-[#1d1d1f] rounded-full flex justify-center items-center cursor-pointer"
              >
                <X className="w-5 h-5 text-white" strokeWidth={4} />
              </div>
            </motion.div>

            {/* blurred bg */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => setActiveIndex(null)}
              className="fixed inset-0 bg-black/40 backdrop-blur-lg z-20"
            ></motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
