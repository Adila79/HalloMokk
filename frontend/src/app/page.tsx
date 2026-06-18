import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import LapanganPreview from "@/components/LapanganPreview";
import Footer from "@/components/Footer";
import Container from "@/components/Container";

export default function Home() {
  return (
    <Container>
      <Hero />
      <Features />
      <LapanganPreview />
    </Container>
  );
}