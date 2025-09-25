import Hero from "@/components/HomePage/Hero";
import Features from "@/components/HomePage/Features";
import StartInterview from "@/components/HomePage/StartInterview";
import Footer from "@/components/HomePage/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Features />
      <StartInterview />
      <Footer />
    </main>
  );
}
