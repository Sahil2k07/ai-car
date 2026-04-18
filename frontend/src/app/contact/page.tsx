import ContactDetails from "@/components/contact-us/ContactDetails";
import ContactForm from "@/components/contact-us/ContactForm";

export const metadata = {
  title: "Contact — Aether Motors",
  description: "Get in touch with the Aether Motors team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-aether-bg pt-17">
      <div className="mx-auto max-w-7xl px-6 py-24">
        {/* Page header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-gold/70">
            We'd Love to Hear From You
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-light text-white">
            Contact Us
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <ContactDetails />

          {/* Contact form */}
          <div>
            <p className="mb-3 text-[11px] tracking-[0.25em] uppercase text-gold/70">
              Send a Message
            </p>
            <h2 className="mb-8 font-serif text-2xl font-light text-white">
              Drop Us a Line
            </h2>
            <div className="rounded-xl border border-white/7 bg-white/2 p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
