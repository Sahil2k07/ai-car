"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useChatContext } from "@/context/ChatContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Chatbot() {
  const { messages, sendMessage, isLoading } = useChatContext();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat window */}
      {isOpen && (
        <div className="w-85 rounded-xl border border-white/10 bg-aether-card shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-[#0D0D14]">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm font-medium text-white tracking-wide">
                Aether Assistant
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 p-4 h-72 overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-xs text-white/30 text-center mt-8">
                Ask me about models, pricing, or book a test drive.
              </p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gold/20 text-gold-light"
                      : "bg-white/5 text-white/75"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-xl px-3 py-2 text-white/40 text-sm">
                  <span className="animate-pulse">Thinking…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-white/8">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything…"
              className="text-xs h-9"
              disabled={isLoading}
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="text-gold hover:text-gold-light disabled:opacity-30 transition-colors"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <Button
        onClick={() => setIsOpen((prev) => !prev)}
        size="icon"
        className="h-13 w-13 rounded-full shadow-xl bg-gold hover:bg-gold-light text-aether-bg"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
      </Button>
    </div>
  );
}
