import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Obstacles from "@/components/Obstacles";
import Solution from "@/components/Solution";
import Features from "@/components/Features";
import OrbitLaws from "@/components/OrbitLaws";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Obstacles />
      <Solution />
      <Features />
      <OrbitLaws />
      <Footer />
    </div>
  );
};

export default Index;
