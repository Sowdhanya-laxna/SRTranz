import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Srtranz/Navbar";
import { Footer } from "@/components/Srtranz/Footer";
import { HomeSection } from "@/components/Srtranz/HomeSection";
import { FleetSection } from "@/components/Srtranz/FleetSection";
import { ToursSection } from "@/components/Srtranz/ToursSection";
import { AboutSection } from "@/components/Srtranz/AboutSection";
import { ContactSection } from "@/components/Srtranz/ContactSection";
import { BookingModal, type BookingPrefill } from "@/components/Srtranz/BookingModal";
import { Toaster } from "@/components/ui/sonner";
import type { Section } from "@/components/Srtranz/types";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [section, setSection] = useState<Section>("home");
  const [modal, setModal] = useState<{ open: boolean; prefill?: BookingPrefill }>({ open: false });

  const navigate = (s: Section) => {
    setSection(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as Section;
    if (["home", "fleet", "tours", "about", "contact"].includes(hash)) setSection(hash);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `#${section}`);
  }, [section]);

  const openBooking = (prefill?: BookingPrefill) => setModal({ open: true, prefill });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar active={section} onNavigate={navigate} onBook={() => openBooking()} />
      <main className="flex-1">
        <div key={section} className="animate-fade-up">
          {section === "home" && <HomeSection onBook={openBooking} onExploreFleet={() => navigate("fleet")} />}
          {section === "fleet" && <FleetSection onBook={openBooking} />}
          {section === "tours" && <ToursSection onBook={openBooking} />}
          {section === "about" && <AboutSection />}
          {section === "contact" && <ContactSection />}
        </div>
      </main>
      <Footer onNavigate={navigate} />
      <BookingModal open={modal.open} prefill={modal.prefill} onClose={() => setModal({ open: false })} />
      <Toaster richColors position="top-center" />
    </div>
  );
}
