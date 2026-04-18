import { Zap, Brain, Shield, Leaf, Wifi, Music } from "lucide-react";

const FEATURES = [
  {
    Icon: Zap,
    title: "750km Max Range",
    description:
      "Industry-leading battery technology ensures you never worry about range anxiety, even on the longest journeys.",
  },
  {
    Icon: Brain,
    title: "Neural Drive AI",
    description:
      "Learns your preferences, road patterns, and comfort settings to deliver a completely personalised driving experience.",
  },
  {
    Icon: Shield,
    title: "Aether Shield Safety",
    description:
      "360° sensor array with predictive collision avoidance. Rated five stars by every major global safety authority.",
  },
  {
    Icon: Leaf,
    title: "Carbon Neutral",
    description:
      "Every vehicle is manufactured using 100% renewable energy. Zero compromise — on performance or conscience.",
  },
  {
    Icon: Wifi,
    title: "Over-the-Air Updates",
    description:
      "Your vehicle continuously improves via wireless software updates delivered overnight while you sleep.",
  },
  {
    Icon: Music,
    title: "Aether Sound Studio",
    description:
      "A bespoke 18-speaker Dolby Atmos system tuned by Grammy-winning acoustic engineers. Sound redefined.",
  },
];

interface FeaturesProps {
  heading?: string;
  subheading?: string;
}

export default function Features({
  heading = "Engineered to Inspire",
  subheading = "WHY AETHER",
}: FeaturesProps) {
  return (
    <section
      id="features"
      className="bg-linear-to-b from-aether-bg to-aether-surface px-6 py-24"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-gold/70">
            {subheading}
          </p>
          <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-light text-white">
            {heading}
          </h2>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="rounded-xl border border-white/6 bg-white/2.5 p-8 transition-colors hover:border-white/10"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gold/10">
                <Icon size={20} className="text-gold" />
              </div>
              <h3 className="mb-2 text-base font-medium text-white">{title}</h3>
              <p className="text-sm leading-relaxed text-white/40">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
