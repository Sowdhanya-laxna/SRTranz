import { FLEET } from "@/lib/fleet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Snowflake, Fuel, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { BookingPrefill } from "./BookingModal";

const CATEGORIES = ["All", "Premium Cab", "Executive Van", "Luxury Coach"] as const;

export function FleetSection({ onBook }: { onBook: (p?: BookingPrefill) => void }) {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = cat === "All" ? FLEET : FLEET.filter((f) => f.category === cat);

  return (
    <section className="bg-background pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs tracking-widest uppercase text-primary font-medium mb-3">The Showroom</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Choose Your Ride</h2>
          <p className="text-muted-foreground mt-4">From compact sedans to 52-seater luxury coaches — meticulously maintained, immaculately presented.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-5 py-2 rounded-full text-sm font-medium transition-smooth ${cat === c ? "bg-primary-gradient text-primary-foreground shadow-glow" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((v) => (
            <div key={v.id} className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/40 hover:-translate-y-1 transition-smooth shadow-sm hover:shadow-elegant animate-fade-up">
              <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                <img src={v.image} alt={v.name} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-smooth" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end justify-center pb-5">
                  <Button onClick={() => onBook({ vehicle: v.name })} className="bg-primary-gradient text-primary-foreground shadow-glow">
                    Book Now <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <Badge className="absolute top-3 left-3 bg-slate-900/80 text-white border-0 backdrop-blur">{v.category}</Badge>
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-glow">
                  Starting at {v.startingRate}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-semibold text-lg">{v.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Spec icon={Users} label={`${v.seats} Seats`} />
                  <Spec icon={Briefcase} label={v.luggage} />
                  <Spec icon={Snowflake} label={v.ac ? "AC" : "Non-AC"} />
                  <Spec icon={Fuel} label={v.fuel} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spec({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs bg-secondary text-secondary-foreground px-2.5 py-1 rounded-full">
      <Icon className="w-3 h-3 text-primary" /> {label}
    </span>
  );
}