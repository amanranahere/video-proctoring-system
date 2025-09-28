import Hero from "@/components/HomePage/Hero";
import Working from "@/components/HomePage/Working";
import Features from "@/components/HomePage/Features";
import UseCase from "@/components/HomePage/UseCase";
import Transparency from "@/components/HomePage/Transparency";
import StartInterview from "@/components/HomePage/StartInterview";
import Footer from "@/components/HomePage/Footer";

export default function Home() {
  return (
    <main className="relative scroll-smooth">
      <Hero />
      <Working />
      <Features />

      {/* working video */}

      <UseCase />
      <Transparency />
      <StartInterview />
      <Footer />
    </main>
  );
}
