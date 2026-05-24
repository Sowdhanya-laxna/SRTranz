import type { Section } from "./types";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

export function Footer({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <footer className="bg-[oklch(0.14_0.04_256)] text-white/70 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg overflow-hidden shadow-glow flex items-center justify-center">
              <img src="/src/assets/logo.jpeg" alt="SR TRANZ" className="w-full h-full object-cover" width={40} height={40} />
            </div>
            <div>
              <div className="text-white font-semibold">SR TRANZ</div>
              <div className="text-[10px] tracking-widest uppercase text-white/50">Since 2021</div>
            </div>
          </div>
          <p className="text-sm">Luxury vehicle rentals & fleet management, serving Coimbatore and South India with quiet excellence.</p>
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Explore</div>
          {(["home", "fleet", "tours", "about", "contact"] as Section[]).map((s) => (
            <button key={s} onClick={() => onNavigate(s)} className="block text-sm hover:text-primary transition-smooth capitalize py-1">{s}</button>
          ))}
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Services</div>
          {["Local Rentals", "Outstation Tours", "Airport Transfers", "Corporate Contracts", "Wedding Fleets"].map((s) => (
            <div key={s} className="text-sm py-1">{s}</div>
          ))}
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Reach Us</div>
          <div className="space-y-2 text-sm">
            <div className="flex gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" /><span>493, Trichy Road, Singanallur opp. City Union Bank, Coimbatore - 641 005</span></div>
            <a href="tel:+919384921959" className="flex gap-2 hover:text-primary"><Phone className="w-4 h-4 text-primary" /><span>9384921959 / 9345921959</span></a>
            <a href="mailto:srtranz.cbe@gmail.com" className="flex gap-2 hover:text-primary"><Mail className="w-4 h-4 text-primary" /><span>srtranz.cbe@gmail.com</span></a>
            <a href="https://instagram.com/srtranz_official" target="_blank" rel="noreferrer" className="flex gap-2 hover:text-primary"><Instagram className="w-4 h-4 text-primary" /><span>@srtranz_official</span></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} SR TRANZ. All rights reserved. Crafted with care in Coimbatore.
      </div>
    </footer>
  );
}