import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FLEET, TRIP_TYPES, buildWhatsAppMessage, sendBookingEmail } from "@/lib/fleet";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export type BookingPrefill = {
  vehicle?: string;
  tripType?: string;
  pickup?: string;
  drop?: string;
  dateTime?: string;
};

interface Props {
  open: boolean;
  onClose: () => void;
  prefill?: BookingPrefill;
}

export function BookingModal({ open, onClose, prefill }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    tripType: "Outstation",
    vehicle: "Innova Crysta",
    pickup: "",
    drop: "",
    dateTime: "",
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (open && prefill) {
      setForm((f) => ({ ...f, ...prefill }));
      setStep(1);
    }
  }, [open, prefill]);

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    if (!form.tripType || !form.vehicle || !form.pickup || !form.drop || !form.dateTime) {
      toast.error("Please complete all trip details.");
      return false;
    }
    return true;
  };
  const validateStep2 = () => {
    if (!form.name.trim() || form.name.length > 100) { toast.error("Please enter a valid name."); return false; }
    if (!/^[+\d\s-]{7,20}$/.test(form.phone)) { toast.error("Please enter a valid phone number."); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { toast.error("Please enter a valid email."); return false; }
    return true;
  };

  const handleConfirm = async () => {
    if (!validateStep2()) return;
    toast.loading("Processing booking...");
    
    // Send email
    const emailSent = await sendBookingEmail(form);
    
    // Open WhatsApp
    const url = buildWhatsAppMessage(form);
    window.open(url, "_blank");
    
    if (emailSent) {
      toast.success("Booking sent via WhatsApp & Email! ✓");
    } else {
      toast.success("Booking sent via WhatsApp! Opening WhatsApp...");
    }
    
    onClose();
    setTimeout(() => setStep(1), 400);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-card">
        <div className="bg-hero-gradient p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold tracking-tight text-white">
              Reserve Your Journey
            </DialogTitle>
            <p className="text-sm text-white/70 mt-1">Step {step} of 3 — {step === 1 ? "Trip Details" : step === 2 ? "Your Information" : "Confirm"}</p>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-smooth ${s <= step ? "bg-primary" : "bg-white/15"}`} />
            ))}
          </div>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up">
              <div className="space-y-2">
                <Label>Trip Type</Label>
                <Select value={form.tripType} onValueChange={(v) => update("tripType", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{TRIP_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Vehicle</Label>
                <Select value={form.vehicle} onValueChange={(v) => update("vehicle", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{FLEET.map((v) => <SelectItem key={v.id} value={v.name}>{v.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Pickup Location</Label>
                <Input value={form.pickup} onChange={(e) => update("pickup", e.target.value)} placeholder="e.g. Coimbatore Airport" maxLength={120} />
              </div>
              <div className="space-y-2">
                <Label>Drop Location</Label>
                <Input value={form.drop} onChange={(e) => update("drop", e.target.value)} placeholder="e.g. Ooty" maxLength={120} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="flex items-center gap-2"><Clock className="w-4 h-4" /> Date & Time</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="date" value={form.dateTime.split("T")[0]} onChange={(e) => {
                    const time = form.dateTime.split("T")[1] || "09:00";
                    update("dateTime", `${e.target.value}T${time}`);
                  }} />
                  <Input type="time" value={form.dateTime.split("T")[1] || ""} onChange={(e) => {
                    const date = form.dateTime.split("T")[0] || new Date().toISOString().split("T")[0];
                    update("dateTime", `${date}T${e.target.value}`);
                  }} />
                </div>
                <p className="text-xs text-muted-foreground">Choose pickup date and time. Enter time in 12-hour format (AM/PM) if your device supports it.</p>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-up">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" maxLength={20} />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} placeholder="you@example.com" />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 animate-fade-up">
              <h3 className="text-lg font-semibold">Booking Summary</h3>
              <div className="rounded-lg border bg-secondary/50 p-4 space-y-2 text-sm">
                <Row label="Customer" value={form.name} />
                <Row label="Phone" value={form.phone} />
                <Row label="Email" value={form.email} />
                <Row label="Trip Type" value={form.tripType} />
                <Row label="Vehicle" value={form.vehicle} />
                <Row label="Date & Time" value={form.dateTime} />
                <Row label="Route" value={`${form.pickup} → ${form.drop}`} />
              </div>
              <p className="text-xs text-muted-foreground">Confirming will open WhatsApp with your booking details pre-filled for our team to action.</p>
            </div>
          )}
        </div>

        <div className="border-t bg-secondary/30 p-4 flex justify-between gap-2">
          <Button variant="ghost" onClick={() => (step > 1 ? setStep(step - 1) : onClose())}>
            <ArrowLeft className="w-4 h-4 mr-1" /> {step > 1 ? "Back" : "Cancel"}
          </Button>
          {step < 3 ? (
            <Button onClick={() => { if (step === 1 && !validateStep1()) return; if (step === 2 && !validateStep2()) return; setStep(step + 1); }} className="bg-primary-gradient text-primary-foreground shadow-glow">
              Continue <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleConfirm} className="bg-[#25D366] hover:bg-[#1ebe5c] text-white shadow-glow">
              <MessageCircle className="w-4 h-4 mr-2" /> Confirm via WhatsApp
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground text-right">{value || "—"}</span>
    </div>
  );
}