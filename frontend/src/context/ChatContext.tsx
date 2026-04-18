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
      const userMsg: ChatMessage = { id: Date.now(), role: "user", text };
      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      persistMessages(nextMessages);

      setIsLoading(true);
      try {
        const response = await aiService.getResponse(text);
        console.log(response.systemMessage);

        const assistantMsg: ChatMessage = {
          id: Date.now() + 1,
          role: "assistant",
          text: response.userMessage,
        };
        const finalMessages = [...nextMessages, assistantMsg];
        setMessages(finalMessages);
        persistMessages(finalMessages);
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
