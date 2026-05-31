import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import DroneShowcase from "@/components/sections/DroneShowcase";
import Simplicity from "@/components/sections/Simplicity";
import VisionAI from "@/components/sections/VisionAI";
import DecisionOS from "@/components/sections/DecisionOS";
import Traction from "@/components/sections/Traction";
import Gallery from "@/components/sections/Gallery";
import Vision from "@/components/sections/Vision";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <DroneShowcase />
      <Simplicity />
      <VisionAI />
      <DecisionOS />
      <Traction />
      <Gallery />
      <Vision />
      <Contact />
      <Footer />
    </>
  );
}
