"use client";

import { sitemapItems, socials } from "@/constants";
import { motion, easeOut } from "motion/react";

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.07,
    },
  },
};

const listVariant = {
  hidden: { opacity: 0, y: -10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOut },
  },
};

export default function Footer() {
  return (
    <footer className="mx-4 md:mx-12 lg:mx-32 pt-10 lg:pt-20 pb-6 lg:pb-6">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
          y: { duration: 0.8, ease: "easeOut" },
        }}
        viewport={{ once: true }}
        className="pb-6 lg:pb-14 text-3xl md:text-4xl lg:text-7xl font-semibold"
      >
        Video Proctoring System
      </motion.h2>

      <div className="flex gap-x-28">
        {/* sitemap */}
        <div className="flex flex-col">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#6e6e73] mb-2"
          >
            Sitemap
          </motion.h3>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariant}
            className="flex flex-col"
          >
            {sitemapItems.map((item, index) => (
              <motion.a
                variants={listVariant}
                key={index}
                href={`#${item.id}`}
                className="text-xl lg:text-[28px] text-[#333336] hover:text-black font-bold"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.ul>
        </div>

        {/* socials */}
        <div className="flex flex-col">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-[#6e6e73] mb-2"
          >
            Socials
          </motion.h3>

          <motion.ul
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={containerVariant}
            className="flex flex-col"
          >
            {socials.map((item, index) => (
              <motion.a
                variants={listVariant}
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-xl lg:text-[28px] text-[#333336] hover:text-black font-bold"
              >
                {item.label}
              </motion.a>
            ))}
          </motion.ul>
        </div>
      </div>

      <hr className="my-6 text-gray-400" />

      <div className="flex flex-col md:flex-row justify-between text-xs lg:text-sm text-[#86868b]">
        <span>© 2025 Video Proctoring System. All rights reserved.</span>

        <div>
          Made by{" "}
          <a
            href="https://amanrana.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black duration-150 transition-colors text-[#333336]"
          >
            Aman_Rana
          </a>
        </div>
      </div>
    </footer>
  );
}
