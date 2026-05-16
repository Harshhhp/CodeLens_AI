import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Stats from "@/components/stats";
import HowItWorks from "@/components/how-it-works";
import Features from "@/components/features";
import DemoPreview from "@/components/demo-preview";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main className="bg-zinc-950 text-white overflow-hidden">

      <Navbar />

      <Hero />

      <Stats />

      <HowItWorks />

      <Features />

      <DemoPreview />

      <FAQ />

      <Footer />

    </main>
  );
}