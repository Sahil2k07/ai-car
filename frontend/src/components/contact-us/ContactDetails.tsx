import { Mail, Phone, MapPin, Clock } from "lucide-react";

const SHOWROOMS = [
  {
    city: "Mumbai",
    address: "142 Marine Lines, Nariman Point, Mumbai 400 021",
    phone: "+91 22 6789 0001",
    hours: "Mon–Sat: 9am–7pm",
  },
  {
    city: "Delhi",
    address: "37 Connaught Place, New Delhi 110 001",
    phone: "+91 11 6789 0002",
    hours: "Mon–Sat: 9am–7pm",
  },
  {
    city: "Bangalore",
    address: "18 MG Road, Indiranagar, Bangalore 560 038",
    phone: "+91 80 6789 0003",
    hours: "Mon–Sat: 9am–7pm",
  },
];

interface ContactDetailsProps {
  heading?: string;
}

export default function ContactDetails({
  heading = "Get in Touch",
}: ContactDetailsProps) {
  return (
    <div className="flex flex-col gap-12">
      {/* General contact */}
      <div>
        <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-gold/70">
          General Enquiries
        </p>
        <h2 className="mb-8 font-serif text-[clamp(2rem,4vw,2.5rem)] font-light text-white">
          {heading}
        </h2>

        <div className="flex flex-col gap-5">
          <ContactItem
            Icon={Mail}
            label="Email"
            value="hello@aethermotors.com"
            href="mailto:hello@aethermotors.com"
          />
          <ContactItem
            Icon={Phone}
            label="Customer care"
            value="+91 98765 43210"
            href="tel:+919876543210"
          />
          <ContactItem
            Icon={Clock}
            label="Support hours"
            value="Monday – Saturday, 9am – 8pm IST"
          />
        </div>
      </div>

      {/* Showrooms */}
      <div>
        <p className="mb-6 text-[11px] tracking-[0.25em] uppercase text-gold/70">
          Showrooms
        </p>
        <div className="flex flex-col gap-4">
          {SHOWROOMS.map((showroom) => (
            <div
              key={showroom.city}
              className="rounded-xl border border-white/7 bg-white/2 p-5"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-sm font-medium text-white">
                  {showroom.city}
                </span>
              </div>
              <div className="flex flex-col gap-2 pl-3.5">
                <span className="flex items-start gap-2 text-xs text-white/45">
                  <MapPin size={12} className="mt-0.5 shrink-0 text-white/25" />
                  {showroom.address}
                </span>
                <span className="flex items-center gap-2 text-xs text-white/45">
                  <Phone size={12} className="shrink-0 text-white/25" />
                  {showroom.phone}
                </span>
                <span className="flex items-center gap-2 text-xs text-white/45">
                  <Clock size={12} className="shrink-0 text-white/25" />
                  {showroom.hours}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface ContactItemProps {
  Icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}

function ContactItem({ Icon, label, value, href }: ContactItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/8">
        <Icon size={15} className="text-gold" />
      </div>
      <div>
        <p className="text-[10px] tracking-widest uppercase text-white/30 mb-0.5">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-sm text-white/65 hover:text-white transition-colors"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm text-white/65">{value}</p>
        )}
      </div>
    </div>
  );
}
