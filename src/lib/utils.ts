import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCardNumber(value: string): string {
  // Remove all non-digit characters
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  
  // Add spaces every 4 digits
  const matches = v.match(/\d{4,16}/g);
  const match = matches && matches[0] || '';
  const parts = [];
  
  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }
  
  if (parts.length) {
    return parts.join(' ');
  } else {
    return v;
  }
}

export function formatExpirationDate(value: string): string {
  // Remove all non-digit characters
  const v = value.replace(/\D/g, '');
  
  // Add slash after 2 digits
  if (v.length >= 2) {
    return v.substring(0, 2) + '/' + v.substring(2, 4);
  }
  
  return v;
}

export function formatPhoneNumber(value: string): string {
  // Remove all non-digit characters
  return value.replace(/\D/g, '');
}

// Dummy data for dropdowns
export const states = [
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
  { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
  { value: "assam", label: "Assam" },
  { value: "bihar", label: "Bihar" },
  { value: "chhattisgarh", label: "Chhattisgarh" },
  { value: "goa", label: "Goa" },
  { value: "gujarat", label: "Gujarat" },
  { value: "haryana", label: "Haryana" },
  { value: "himachal-pradesh", label: "Himachal Pradesh" },
  { value: "jharkhand", label: "Jharkhand" },
  { value: "karnataka", label: "Karnataka" },
  { value: "kerala", label: "Kerala" },
  { value: "madhya-pradesh", label: "Madhya Pradesh" },
  { value: "maharashtra", label: "Maharashtra" },
  { value: "manipur", label: "Manipur" },
  { value: "meghalaya", label: "Meghalaya" },
  { value: "mizoram", label: "Mizoram" },
  { value: "nagaland", label: "Nagaland" },
  { value: "odisha", label: "Odisha" },
  { value: "punjab", label: "Punjab" },
  { value: "rajasthan", label: "Rajasthan" },
  { value: "sikkim", label: "Sikkim" },
  { value: "tamil-nadu", label: "Tamil Nadu" },
  { value: "telangana", label: "Telangana" },
  { value: "tripura", label: "Tripura" },
  { value: "uttar-pradesh", label: "Uttar Pradesh" },
  { value: "uttarakhand", label: "Uttarakhand" },
  { value: "west-bengal", label: "West Bengal" },
  { value: "delhi", label: "Delhi" }
];

export const countries = [
  { value: "india", label: "India" },
  { value: "united-states", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "united-kingdom", label: "United Kingdom" },
  { value: "australia", label: "Australia" },
  { value: "germany", label: "Germany" },
  { value: "france", label: "France" },
  { value: "singapore", label: "Singapore" },
  { value: "japan", label: "Japan" },
  { value: "south-korea", label: "South Korea" },
  { value: "china", label: "China" },
  { value: "brazil", label: "Brazil" },
  { value: "mexico", label: "Mexico" },
  { value: "spain", label: "Spain" },
  { value: "italy", label: "Italy" },
  { value: "netherlands", label: "Netherlands" },
  { value: "sweden", label: "Sweden" },
  { value: "norway", label: "Norway" },
  { value: "denmark", label: "Denmark" },
  { value: "switzerland", label: "Switzerland" }
];

export const eventOptions = [
  { id: "tech-talk", label: "Tech Talk" },
  { id: "workshop", label: "Workshop" },
  { id: "networking", label: "Networking Session" },
  { id: "keynote", label: "Keynote Speech" },
  { id: "panel-discussion", label: "Panel Discussion" },
  { id: "hackathon", label: "Hackathon" },
  { id: "startup-pitch", label: "Startup Pitch" },
  { id: "career-fair", label: "Career Fair" }
];