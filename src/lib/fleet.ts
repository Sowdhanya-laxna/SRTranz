import swiftDzire from "@/assets/swift-dzire.jpg";
import etios from "@/assets/etios.jpg";
import innovaCrysta from "@/assets/innova-crysta.jpg";
import hycross from "@/assets/hycross.jpg";
import fortuner from "@/assets/fortuner.jpg";
import urbania from "@/assets/urbania.jpg";
import traveller from "@/assets/traveller.jpg";
import coach from "@/assets/coach.jpg";

export type Vehicle = {
  id: string;
  name: string;
  category: "Premium Cab" | "Executive Van" | "Luxury Coach";
  image: string;
  seats: number;
  luggage: string;
  ac: boolean;
  fuel: string;
  startingRate: string;
};

export const FLEET: Vehicle[] = [
  { id: "dzire", name: "Swift Dzire", category: "Premium Cab", image: swiftDzire, seats: 4, luggage: "2 Bags", ac: true, fuel: "Diesel", startingRate: "₹14/Km" },
  { id: "etios", name: "Toyota Etios", category: "Premium Cab", image: etios, seats: 4, luggage: "3 Bags", ac: true, fuel: "Diesel", startingRate: "₹15/Km" },
  { id: "crysta", name: "Innova Crysta", category: "Premium Cab", image: innovaCrysta, seats: 7, luggage: "4 Bags", ac: true, fuel: "Diesel", startingRate: "₹19/Km" },
  { id: "hycross", name: "Innova Hycross", category: "Premium Cab", image: hycross, seats: 7, luggage: "4 Bags", ac: true, fuel: "Hybrid", startingRate: "₹22/Km" },
  { id: "fortuner", name: "Toyota Fortuner", category: "Premium Cab", image: fortuner, seats: 7, luggage: "5 Bags", ac: true, fuel: "Diesel", startingRate: "₹28/Km" },
  { id: "urbania", name: "Force Urbania", category: "Executive Van", image: urbania, seats: 10, luggage: "8 Bags", ac: true, fuel: "Diesel", startingRate: "₹32/Km" },
  { id: "traveller-12", name: "12-Seater Premium Traveller", category: "Executive Van", image: traveller, seats: 12, luggage: "10 Bags", ac: true, fuel: "Diesel", startingRate: "₹26/Km" },
  { id: "traveller-16", name: "16-Seater Premium Traveller", category: "Executive Van", image: traveller, seats: 16, luggage: "12 Bags", ac: true, fuel: "Diesel", startingRate: "₹30/Km" },
  { id: "coach-35", name: "35-Seater AC Luxury Coach", category: "Luxury Coach", image: coach, seats: 35, luggage: "30 Bags", ac: true, fuel: "Diesel", startingRate: "₹55/Km" },
  { id: "coach-45", name: "45-Seater AC Luxury Coach", category: "Luxury Coach", image: coach, seats: 45, luggage: "40 Bags", ac: true, fuel: "Diesel", startingRate: "₹65/Km" },
  { id: "coach-52", name: "52-Seater AC Luxury Coach", category: "Luxury Coach", image: coach, seats: 52, luggage: "45 Bags", ac: true, fuel: "Diesel", startingRate: "₹75/Km" },
];

import ooty from "@/assets/tour-ooty.jpg";
import mysore from "@/assets/tour-mysore.jpg";
import coorg from "@/assets/tour-coorg.jpg";
import kerala from "@/assets/tour-kerala.jpg";

export type Tour = {
  id: string;
  name: string;
  duration: string;
  image: string;
  highlights: string[];
  itinerary: { day: string; title: string; detail: string }[];
  inclusions: string[];
  exclusions: string[];
  startingPrice: string;
};

export const TOURS: Tour[] = [
  {
    id: "ooty",
    name: "Ooty Hill Escapes",
    duration: "3 Days / 2 Nights",
    image: ooty,
    highlights: ["Botanical Gardens", "Doddabetta Peak", "Tea Estates", "Pykara Lake"],
    itinerary: [
      { day: "Day 1", title: "Coimbatore → Ooty", detail: "Scenic drive through Mettupalayam, check-in, evening at Botanical Gardens." },
      { day: "Day 2", title: "Ooty Sightseeing", detail: "Doddabetta peak, Tea Museum, Pykara waterfalls & boating." },
      { day: "Day 3", title: "Coonoor → Coimbatore", detail: "Sim's Park, Lamb's Rock viewpoint, return drive." },
    ],
    inclusions: ["Fuel & toll charges", "Multi-state permits", "Driver allowance", "Air-conditioned vehicle"],
    exclusions: ["Accommodation", "Meals & entry tickets", "Personal expenses"],
    startingPrice: "₹12,500",
  },
  {
    id: "mysore",
    name: "Mysore Heritage Trail",
    duration: "2 Days / 1 Night",
    image: mysore,
    highlights: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens", "St. Philomena's"],
    itinerary: [
      { day: "Day 1", title: "Coimbatore → Mysore", detail: "Drive via Bandipur, palace tour & illumination viewing." },
      { day: "Day 2", title: "Mysore → Coimbatore", detail: "Chamundi Hills, Brindavan musical fountains, return." },
    ],
    inclusions: ["Fuel & toll charges", "Multi-state permits", "Driver allowance", "Air-conditioned vehicle"],
    exclusions: ["Accommodation", "Meals & entry tickets", "Personal expenses"],
    startingPrice: "₹9,800",
  },
  {
    id: "coorg",
    name: "Coorg Wilderness Retreat",
    duration: "3 Days / 2 Nights",
    image: coorg,
    highlights: ["Abbey Falls", "Raja's Seat", "Coffee Plantations", "Dubare Elephant Camp"],
    itinerary: [
      { day: "Day 1", title: "Coimbatore → Madikeri", detail: "Drive to Coorg, Raja's Seat sunset, local market." },
      { day: "Day 2", title: "Coorg Exploration", detail: "Abbey Falls, Talakaveri, coffee estate walk." },
      { day: "Day 3", title: "Dubare → Coimbatore", detail: "Elephant camp interaction, return drive." },
    ],
    inclusions: ["Fuel & toll charges", "Multi-state permits", "Driver allowance", "Air-conditioned vehicle"],
    exclusions: ["Accommodation", "Meals & entry tickets", "Personal expenses"],
    startingPrice: "₹14,200",
  },
  {
    id: "kerala",
    name: "Kerala Backwaters",
    duration: "4 Days / 3 Nights",
    image: kerala,
    highlights: ["Alleppey Houseboat", "Munnar Tea Hills", "Kumarakom", "Cochin Heritage"],
    itinerary: [
      { day: "Day 1", title: "Coimbatore → Munnar", detail: "Drive through Marayoor, tea museum & gardens." },
      { day: "Day 2", title: "Munnar → Alleppey", detail: "Echo Point, Mattupetty dam, evening houseboat check-in." },
      { day: "Day 3", title: "Backwaters Cruise", detail: "Full-day houseboat cruise, traditional Kerala cuisine." },
      { day: "Day 4", title: "Cochin → Coimbatore", detail: "Fort Kochi, Chinese fishing nets, return drive." },
    ],
    inclusions: ["Fuel & toll charges", "Multi-state permits", "Driver allowance", "Houseboat reference"],
    exclusions: ["Accommodation", "Meals & entry tickets", "Personal expenses"],
    startingPrice: "₹18,500",
  },
];

export const TRIP_TYPES = ["Local", "Outstation", "Airport Transfer"] as const;
export type TripType = typeof TRIP_TYPES[number];

export const WHATSAPP_NUMBER = "919384921959";
export const BUSINESS_EMAIL = "srtranz.cbe@gmail.com";

export function buildWhatsAppMessage(data: {
  name: string;
  phone: string;
  vehicle: string;
  tripType: string;
  dateTime: string;
  pickup: string;
  drop: string;
}) {
  const msg = `*NEW BOOKING REQUEST FROM WEBSITE*
----------------------------------
*Customer Name:* ${data.name}
*Phone:* ${data.phone}
*Selected Fleet:* ${data.vehicle}
*Trip Category:* ${data.tripType}
*Date & Time:* ${data.dateTime}
*Route:* ${data.pickup} to ${data.drop}
----------------------------------
Please confirm availability and dispatch driver details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function buildEmailMessage(data: {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  tripType: string;
  dateTime: string;
  pickup: string;
  drop: string;
}) {
  const emailBody = `
Dear ${data.name},

Thank you for booking with SR TRANZ! We have received your booking request and will confirm your trip shortly.

--- BOOKING DETAILS ---
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Vehicle: ${data.vehicle}
Trip Type: ${data.tripType}
Date & Time: ${data.dateTime}
Route: ${data.pickup} to ${data.drop}

Our team will contact you within the next 30 minutes to confirm availability and arrange pickup details.

For immediate assistance, contact us:
📱 WhatsApp: +91 9384921959
📞 Phone: 9384921959 / 9345921959
📧 Email: srtranz.cbe@gmail.com

Thank you for choosing SR TRANZ!

Best Regards,
SR TRANZ Team
493, Trichy Road, Singanallur
Coimbatore - 641 005
`;
  return emailBody;
}

export async function sendBookingEmail(data: {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  tripType: string;
  dateTime: string;
  pickup: string;
  drop: string;
}) {
  try {
    const emailBody = buildEmailMessage(data);
    const response = await fetch("https://formspree.io/f/xnnpzqdo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        vehicle: data.vehicle,
        tripType: data.tripType,
        dateTime: data.dateTime,
        pickup: data.pickup,
        drop: data.drop,
        message: `New booking request: ${data.name} (${data.phone}) for ${data.vehicle}`,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("Email sending error:", error);
    return false;
  }
}