import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import type { Section } from "./types";

const NAV: { id: Section; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "fleet", label: "Fleet" },
  { id: "tours", label: "Tours" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ active, onNavigate, onBook }: { active: Section; onNavigate: (s: Section) => void; onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (s: Section) => { onNavigate(s); setOpen(false); };

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-smooth ${active === "home" ? (scrolled ? "glass-dark shadow-elegant" : "bg-transparent") : "glass-dark shadow-elegant"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg overflow-hidden shadow-glow flex items-center justify-center">
            <img src="/src/assets/logo.jpeg" alt="SR TRANZ" className="w-full h-full object-cover" width={40} height={40} />
          </div>
          <div className="text-left">
            <div className="text-white font-semibold tracking-tight leading-none">SR TRANZ</div>
            <div className="text-[10px] text-white/60 tracking-widest uppercase">Since 2021</div>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`relative px-4 py-2 text-sm font-medium transition-smooth ${active === n.id ? "text-white" : "text-white/70 hover:text-white"}`}
            >
              {n.label}
              {active === n.id && (
                <span className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-primary-gradient rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+919384921959" className="text-white/80 hover:text-white text-sm flex items-center gap-2">
            <Phone className="w-4 h-4" /> 9384921959 / 9345921959
          </a>
          <Button onClick={onBook} className="bg-primary-gradient hover:opacity-90 text-primary-foreground shadow-glow">
            Book Now
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden glass-dark border-t border-white/10 px-6 py-4 space-y-2">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => go(n.id)} className={`block w-full text-left py-2 ${active === n.id ? "text-primary" : "text-white/80"}`}>
              {n.label}
            </button>
          ))}
          <Button onClick={() => { onBook(); setOpen(false); }} className="w-full bg-primary-gradient text-primary-foreground mt-2">Book Now</Button>
        </div>
      )}
    </header>
  );
}