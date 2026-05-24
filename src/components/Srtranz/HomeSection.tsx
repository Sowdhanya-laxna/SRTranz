import hero from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { TRIP_TYPES } from "@/lib/fleet";
import { ArrowRight, ShieldCheck, BadgeCheck, Headphones, IndianRupee, Sparkles, Clock } from "lucide-react";
import type { BookingPrefill } from "./BookingModal";

export function HomeSection({ onBook, onExploreFleet }: { onBook: (p?: BookingPrefill) => void; onExploreFleet: () => void }) {
  const [trip, setTrip] = useState({
    tripType: "Outstation",
    pickup: "",
    drop: "",
    dateTime: "",
    seats: "4",
  });

  const features = [
    { icon: IndianRupee, title: "100% Transparent Pricing", desc: "No hidden charges. Every kilometre, every toll — clearly itemised before you book." },
    { icon: ShieldCheck, title: "Safe & Sanitised Fleets", desc: "Every vehicle is deep-cleaned and safety-inspected after each journey." },
    { icon: Headphones, title: "24/7 Dedicated Support", desc: "Real humans on call any hour of the day — never an automated maze." },
    { icon: BadgeCheck, title: "Verified Professional Chauffeurs", desc: "Background-checked, route-trained drivers with a hospitality-first ethos." },
  ];

  return (
    <section className="relative">
      {/* HERO */}
      <div className="relative min-h-screen flex items-center bg-hero-gradient overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-65">
          <img src={hero} alt="Luxury executive transport" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.14_0.04_256)]/70 via-[oklch(0.14_0.04_256)]/50 to-transparent" />
        </div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl animate-float-slow" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="text-white space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Coimbatore's Premier Travel Partner
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Your Ride.<br /> Your Comfort.<br />
              <span className="text-gradient-teal">Our Commitment.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-xl">
              Chauffeur-driven luxury cabs, executive vans, and AC coaches — engineered for executives, families, and groups who demand effortless travel.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => onBook()} className="bg-primary-gradient text-primary-foreground shadow-glow hover:scale-105 transition-smooth">
                Book a Ride <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={onExploreFleet} className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                Explore Fleet
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-6 border-t border-white/10">
              <Stat n="20+" l="Years" />
              <Stat n="50+" l="Vehicles" />
              <Stat n="10K+" l="Journeys" />
            </div>
          </div>

          {/* Estimator */}
          <div className="glass-dark rounded-2xl p-6 md:p-8 shadow-elegant animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-semibold">Live Booking Estimator</h3>
              <span className="text-xs text-primary tracking-widest uppercase">Instant</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 space-y-2">
                <Label className="text-white/70 text-xs uppercase tracking-wider">Trip Type</Label>
                <Select value={trip.tripType} onValueChange={(v) => setTrip({ ...trip, tripType: v })}>
                  <SelectTrigger className="bg-white/5 border-white/15 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent>{TRIP_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 text-xs uppercase tracking-wider">Pickup</Label>
                <Input value={trip.pickup} onChange={(e) => setTrip({ ...trip, pickup: e.target.value })} placeholder="Coimbatore" className="bg-white/5 border-white/15 text-white placeholder:text-white/40" maxLength={120} />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 text-xs uppercase tracking-wider">Drop</Label>
                <Input value={trip.drop} onChange={(e) => setTrip({ ...trip, drop: e.target.value })} placeholder="Ooty" className="bg-white/5 border-white/15 text-white placeholder:text-white/40" maxLength={120} />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 text-xs uppercase tracking-wider flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Date</Label>
                <Input type="date" value={trip.dateTime.split("T")[0] || ""} onChange={(e) => {
                  const time = trip.dateTime.split("T")[1] || "09:00";
                  setTrip({ ...trip, dateTime: `${e.target.value}T${time}` });
                }} className="bg-white/5 border-white/15 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 text-xs uppercase tracking-wider flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> Time</Label>
                <Input type="time" value={trip.dateTime.split("T")[1] || ""} onChange={(e) => {
                  const date = trip.dateTime.split("T")[0] || new Date().toISOString().split("T")[0];
                  setTrip({ ...trip, dateTime: `${date}T${e.target.value}` });
                }} className="bg-white/5 border-white/15 text-white" />
                <p className="text-xs text-white/60">Choose the pickup time. Use AM/PM on supported devices.</p>
              </div>
              <div className="space-y-2">
                <Label className="text-white/70 text-xs uppercase tracking-wider">Seats</Label>
                <Select value={trip.seats} onValueChange={(v) => setTrip({ ...trip, seats: v })}>
                  <SelectTrigger className="bg-white/5 border-white/15 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["4", "7", "10", "12", "16", "35+"].map((s) => <SelectItem key={s} value={s}>{s} Passengers</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => onBook(trip)} className="w-full mt-6 bg-primary-gradient text-primary-foreground shadow-glow hover:scale-[1.02] transition-smooth">
              Calculate Fare & Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <p className="text-xs text-white/50 text-center mt-3">No advance payment · Free cancellation up to 12 hours</p>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-background py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs tracking-widest uppercase text-primary font-medium mb-3">Why SR TRANZ</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Built on trust. Driven by detail.</h2>
            <p className="text-muted-foreground mt-4">Four promises we keep on every single journey.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={f.title} className="group relative bg-card rounded-2xl p-7 border border-border hover:border-primary/40 hover:-translate-y-1 transition-smooth shadow-sm hover:shadow-elegant" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-12 h-12 rounded-xl bg-primary-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-smooth shadow-glow">
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-white">{n}</div>
      <div className="text-xs text-white/60 uppercase tracking-widest">{l}</div>
    </div>
  );
}