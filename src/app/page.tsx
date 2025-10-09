"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";

import Hero from "@/components/HomePage/Hero";
import Working from "@/components/HomePage/Working";
import Features from "@/components/HomePage/Features";
import UseCase from "@/components/HomePage/UseCase";
import Transparency from "@/components/HomePage/Transparency";
import StartInterview from "@/components/HomePage/StartInterview";
import Footer from "@/components/Footer";
import Navbar from "@/components/HomePage/Navbar";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById("hero-section");
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNavbar(!entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative scroll-smooth">
      <AnimatePresence mode="wait">{showNavbar && <Navbar />}</AnimatePresence>

      <Hero />
      <Working />
      <Features />
      <UseCase />
      <Transparency />
      <StartInterview />
      <Footer />
    </main>
  );
}
