import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";
import Collaboration from "@/components/landing/Collaboration";
import Services from "@/components/landing/Services";
import Pricing from "@/components/landing/Pricing";
import Roadmap from "@/components/landing/Roadmap";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <Hero />
      <Benefits />
      <Collaboration />
      <Services />
      <Pricing />
      <Roadmap />
      <Footer />
    </main>
  );
}
