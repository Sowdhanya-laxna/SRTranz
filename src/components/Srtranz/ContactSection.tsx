import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle, Instagram } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "@/lib/fleet";

export function ContactSection() {
  const [f, setF] = useState({ name: "", phone: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || f.name.length > 100) return toast.error("Enter a valid name.");
    if (!/^[+\d\s-]{7,20}$/.test(f.phone)) return toast.error("Enter a valid phone number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) return toast.error("Enter a valid email.");
    if (!f.message.trim() || f.message.length > 1000) return toast.error("Enter a message (max 1000 chars).");
    const text = `*WEBSITE ENQUIRY*\n----------------------------------\n*Name:* ${f.name}\n*Phone:* ${f.phone}\n*Email:* ${f.email}\n----------------------------------\n${f.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    toast.success("Opening WhatsApp with your enquiry…");
    setF({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <section className="bg-background pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs tracking-widest uppercase text-primary font-medium mb-3">Get In Touch</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Speak with our concierge</h2>
          <p className="text-muted-foreground mt-4">Quotes, custom itineraries, corporate contracts — we respond within the hour.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <form onSubmit={submit} className="bg-card rounded-2xl border border-border p-8 shadow-sm space-y-5 animate-fade-up">
            <h3 className="text-xl font-semibold">Send a Quick Enquiry</h3>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={f.name} maxLength={100} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="John Doe" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={f.phone} maxLength={20} onChange={(e) => setF({ ...f, phone: e.target.value })} placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={f.email} maxLength={255} onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea value={f.message} maxLength={1000} onChange={(e) => setF({ ...f, message: e.target.value })} placeholder="Tell us about your trip…" rows={5} />
            </div>
            <Button type="submit" className="w-full bg-primary-gradient text-primary-foreground shadow-glow">
              <MessageCircle className="w-4 h-4 mr-2" /> Send via WhatsApp
            </Button>
          </form>

          <div className="space-y-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
            <div className="bg-hero-gradient rounded-2xl p-8 text-white shadow-elegant">
              <h3 className="text-xl font-semibold mb-6">Corporate Office</h3>
              <div className="space-y-5">
                <Info icon={MapPin} title="Address">
                  493, Trichy Road,<br />Singanallur opp. City Union Bank,<br />Coimbatore - 641 005
                </Info>
                <Info icon={Phone} title="Phone">
                  <a href="tel:+919384921959" className="hover:text-primary transition-smooth">9384921959 / 9345921959</a>
                </Info>
                <Info icon={Mail} title="Email">
                  <a href="mailto:srtranz.cbe@gmail.com" className="hover:text-primary transition-smooth">srtranz.cbe@gmail.com</a>
                </Info>
                <Info icon={Instagram} title="Instagram">
                  <a href="https://instagram.com/srtranz_official" target="_blank" rel="noreferrer" className="hover:text-primary transition-smooth">@srtranz_official</a>
                </Info>
                <Info icon={Clock} title="Hours">24 / 7 — Always on call</Info>
              </div>
            </div>

            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="block bg-[#25D366] hover:bg-[#1ebe5c] transition-smooth rounded-2xl p-6 text-white shadow-elegant group">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-widest opacity-80">Instant Reply</div>
                  <div className="text-xl font-semibold mt-1">Chat on WhatsApp</div>
                </div>
                <MessageCircle className="w-10 h-10 group-hover:scale-110 transition-smooth" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="w-10 h-10 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-widest text-white/60 mb-1">{title}</div>
        <div className="text-white/90 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}