import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Chatbot from "@/components/common/Chatbot";
import { ChatProvider } from "@/context/ChatContext";

export const metadata: Metadata = {
  title: "Aether Motors — Electric Luxury Redefined",
  description:
    "Explore the Aether Motors range of premium electric vehicles. Book a test drive today.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ChatProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Chatbot />
        </ChatProvider>
      </body>
    </html>
  );
}
