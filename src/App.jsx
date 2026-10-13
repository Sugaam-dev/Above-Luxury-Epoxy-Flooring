import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LandscapesSection from './components/LandscapesSection';
import SurfacesSection from './components/SurfacesSection';
import HypercareSection from './components/HypercareSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactFooter from './components/ContactFooter';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  return (
    <div className="relative bg-cream text-ink overflow-x-hidden">
      <CustomCursor />
      <WhatsAppButton />
      <Navbar />
      <main>
        <Hero />
        <LandscapesSection />
        <SurfacesSection />
        <HypercareSection />
        <TestimonialsSection />
        <ContactFooter />
      </main>
    </div>
  );
}
