import { TOURS } from "@/lib/fleet";
import { Button } from "@/components/ui/button";
import { Check, X, MapPin, Calendar, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { BookingPrefill } from "./BookingModal";

export function ToursSection({ onBook }: { onBook: (p?: BookingPrefill) => void }) {
  const [active, setActive] = useState(TOURS[0].id);
  const tour = TOURS.find((t) => t.id === active)!;

  return (
    <section className="bg-background pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs tracking-widest uppercase text-primary font-medium mb-3">Curated Journeys</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Tour Packages</h2>
          <p className="text-muted-foreground mt-4">Hand-crafted multi-day escapes departing Coimbatore — all logistics handled.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-3 mb-10">
          {TOURS.map((t) => (
            <button key={t.id} onClick={() => setActive(t.id)} className={`relative rounded-xl overflow-hidden aspect-[4/3] group transition-smooth ${active === t.id ? "ring-2 ring-primary shadow-glow" : "opacity-70 hover:opacity-100"}`}>
              <img src={t.image} alt={t.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-white/70 text-xs">{t.duration}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8 bg-card rounded-2xl border border-border p-6 md:p-10 shadow-elegant animate-fade-up">
          <div className="lg:col-span-3 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h3 className="text-3xl font-bold tracking-tight">{tour.name}</h3>
                <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium flex items-center gap-1"><Calendar className="w-3 h-3" /> {tour.duration}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tour.highlights.map((h) => (
                  <span key={h} className="text-xs inline-flex items-center gap-1 px-2.5 py-1 bg-secondary rounded-full"><MapPin className="w-3 h-3 text-primary" />{h}</span>
                ))}
              </div>
            </div>

            <div className="relative pl-6 space-y-5">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent" />
              {tour.itinerary.map((it, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-primary-gradient shadow-glow ring-4 ring-background" />
                  <div className="text-xs text-primary font-semibold tracking-widest uppercase">{it.day}</div>
                  <div className="font-semibold mt-0.5">{it.title}</div>
                  <p className="text-sm text-muted-foreground mt-1">{it.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-5">
            <div className="bg-hero-gradient rounded-xl p-5 text-white">
              <div className="text-xs text-white/60 uppercase tracking-widest">Vehicle starts from</div>
              <div className="text-3xl font-bold mt-1">{tour.startingPrice}</div>
              <Button onClick={() => onBook({ tripType: "Outstation", pickup: "Coimbatore", drop: tour.name.split(" ")[0] })} className="w-full mt-4 bg-primary-gradient text-primary-foreground shadow-glow">
                Book This Tour <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="rounded-xl border border-border p-5 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-primary">Inclusions</div>
              {tour.inclusions.map((i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> <span>{i}</span>
                </div>
              ))}
            </div>
            <div className="rounded-xl border border-border p-5 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Exclusions</div>
              {tour.exclusions.map((i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <X className="w-4 h-4 mt-0.5 shrink-0" /> <span>{i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}