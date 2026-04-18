import { AiResponse } from "@/types";

const MOCK_RESPONSES: Record<string, AiResponse> = {
  book: {
    userMessage:
      "I'd love to help you book a test drive! Head to our Book Test Drive page and choose your preferred model, city, and date.",
    systemMessage:
      "[SYSTEM] Booking intent detected. User should be directed to /book-test-drive.",
  },
  price: {
    userMessage:
      "Our vehicles range from $89,000 for the Aether One to $156,000 for the Aether Volta. Flexible financing is available.",
    systemMessage: "[SYSTEM] Price inquiry detected. Displaying pricing range.",
  },
  suv: {
    userMessage:
      "We have two exceptional SUVs — the Aether Apex for urban luxury and the Aether Terra for adventure. Both are incredible.",
    systemMessage:
      "[SYSTEM] SUV query detected. Suggesting filter: type=SUV in models section.",
  },
  compare: {
    userMessage:
      "Great idea! Use our Compare section to view specs side-by-side. You can compare any two models instantly.",
    systemMessage:
      "[SYSTEM] Comparison intent detected. Scroll target: #comparison.",
  },
  range: {
    userMessage:
      "The Aether Terra leads with 670km of range, followed by the Apex at 610km. All models exceed 480km on a single charge.",
    systemMessage: "[SYSTEM] Range query detected.",
  },
  default: {
    userMessage:
      "Welcome to Aether Motors! I can help you explore our models, compare features, check pricing, or book a test drive. What interests you?",
    systemMessage: "[SYSTEM] Default greeting response triggered.",
  },
};

class AiService {
  async getResponse(prompt: string): Promise<AiResponse> {
    const lower = prompt.toLowerCase();

    if (
      lower.includes("book") ||
      lower.includes("drive") ||
      lower.includes("test")
    ) {
      return MOCK_RESPONSES.book;
    }
    if (
      lower.includes("price") ||
      lower.includes("cost") ||
      lower.includes("much")
    ) {
      return MOCK_RESPONSES.price;
    }
    if (
      lower.includes("suv") ||
      lower.includes("apex") ||
      lower.includes("terra")
    ) {
      return MOCK_RESPONSES.suv;
    }
    if (lower.includes("compar")) {
      return MOCK_RESPONSES.compare;
    }
    if (
      lower.includes("range") ||
      lower.includes("km") ||
      lower.includes("battery")
    ) {
      return MOCK_RESPONSES.range;
    }

    return MOCK_RESPONSES.default;
  }
}

export default new AiService();
