import { useEffect, useRef, useState } from "react";
import { Award, Users, Car, Heart } from "lucide-react";

const STATS = [
  { icon: Award, n: 20, suffix: "+", label: "Years of Excellence" },
  { icon: Car, n: 50, suffix: "+", label: "Fleet Vehicles" },
  { icon: Users, n: 10000, suffix: "+", label: "Happy Journeys" },
  { icon: Heart, n: 99, suffix: "%", label: "Client Retention" },
];

function useCount(target: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    const dur = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run]);
  return n;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const n = useCount(value, vis);
  return <div ref={ref} className="text-4xl md:text-5xl font-bold text-gradient-teal">{n.toLocaleString()}{suffix}</div>;
}

export function AboutSection() {
  return (
    <section className="bg-background pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6 animate-fade-up">
            <div className="text-xs tracking-widest uppercase text-primary font-medium">Our Legacy</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Two decades of moving Coimbatore — with care.</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded in <strong className="text-foreground">2021</strong> under the leadership of <strong className="text-foreground">M. Sreenivaasan</strong>, SR TRANZ  began as a single-cab operation with one promise — treat every passenger like family.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, that promise lives on across a fleet of <strong className="text-foreground">50+ premium vehicles</strong>, a roster of professional chauffeurs, and over <strong className="text-foreground">10,000 successful journeys</strong> across South India.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="border-l-2 border-primary pl-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Founded</div>
                <div className="text-xl font-semibold mt-1">2021, Coimbatore</div>
              </div>
              <div className="border-l-2 border-primary pl-4">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Helmed By</div>
                <div className="text-xl font-semibold mt-1">M. Sreenivaasan</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-primary-gradient opacity-20 blur-3xl rounded-full" />
            <div className="relative glass-dark rounded-2xl p-10 shadow-elegant">
              <blockquote className="text-white text-xl md:text-2xl font-light leading-relaxed italic">
                "Luxury is not in extravagance — it is in the quiet confidence that every detail has been taken care of."
              </blockquote>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-white font-bold">SK</div>
                <div>
                  <div className="text-white font-semibold">M. Sreenivaasan</div>
                  <div className="text-white/60 text-sm">Founder & Managing Director</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card rounded-2xl border border-border p-7 text-center hover:border-primary/40 hover:-translate-y-1 transition-smooth shadow-sm hover:shadow-elegant">
              <div className="w-12 h-12 rounded-xl bg-primary-gradient mx-auto flex items-center justify-center mb-4 shadow-glow">
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <Counter value={s.n} suffix={s.suffix} />
              <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}