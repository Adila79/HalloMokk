import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LapanganPreview from "@/components/LapanganPreview";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Hero />
      <Features />
      <LapanganPreview />
    </main>
  );
}