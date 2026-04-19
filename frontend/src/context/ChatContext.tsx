"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ChatMessage } from "@/types";
import aiService from "@/services/aiService";
import { useRouter } from "next/navigation";

interface ChatContextValue {
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextValue | null>(null);

const SESSION_KEY = "aether_chat_messages";

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) setMessages(JSON.parse(stored));
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const persistMessages = useCallback((msgs: ChatMessage[]) => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(msgs));
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: Date.now(),
        role: "user",
        text,
        isError: false,
      };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      persistMessages(nextMessages);

      setIsLoading(true);
      try {
        const history = nextMessages
          .slice(-8)
          .map((msg) => `${msg.role}: ${msg.text}`);

        const response = await aiService.getResponse(text, history);

        const assistantMsg: ChatMessage = {
          id: Date.now() + 1,
          role: "assistant",
          text: response.userMessage,
          isError: false,
        };
        const finalMessages = [...nextMessages, assistantMsg];
        setMessages(finalMessages);
        persistMessages(finalMessages);

        if (response.systemMessage.navigate) {
          const navigate = response.systemMessage.navigate; // e.g. "/#models"
          const filters = response.systemMessage.filters || {};

          // Filter out empty values
          const validEntries = Object.entries(filters).filter(
            ([_, v]) => v !== undefined && v !== null && v !== "",
          );

          const queryString = validEntries
            .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
            .join("&");

          // Split to handle hash
          const [path, hash] = navigate.split("#");

          // Construct: Path + Query (if exists) + Hash (if exists)
          let finalUrl = path;
          if (queryString) finalUrl += `?${queryString}`;
          if (hash) finalUrl += `#${hash}`;

          router.push(finalUrl);
        }
      } catch (error) {
        console.error("AI Service Error:", error);

        const errorMsg: ChatMessage = {
          id: Date.now() + 2,
          role: "assistant",
          text: "Something went wrong. Please try again.",
          isError: true,
        };

        setMessages((prev) => {
          const updated = [...prev, errorMsg];
          persistMessages(updated);
          return updated;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [messages, persistMessages],
  );

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChatContext must be used inside ChatProvider");
  return ctx;
}
