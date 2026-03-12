"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, RotateCcw, Save, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  initialMessages?: Message[];
  chatId?: string;
}

const ChatInterface = ({ initialMessages = [], chatId }: ChatInterfaceProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.length > 0
      ? initialMessages
      : [{ role: "assistant", content: "Hello! I'm Brainwave AI. How can I assist you today?" }]
  );
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(chatId);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isStreaming]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, chatId: currentChatId })
      });

      if (!response.body) return;

      const xChatId = response.headers.get('X-Chat-Id');
      if (xChatId && xChatId !== currentChatId) {
          setCurrentChatId(xChatId);
          // Update URL without refresh if it's a new chat
          window.history.pushState({}, '', `/chat/${xChatId}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantMsg: Message = { role: "assistant", content: "" };
      setMessages(prev => [...prev, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantContent += chunk;

        setMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1] = { ...assistantMsg, content: assistantContent };
          return newMsgs;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-n-7 rounded-2xl border border-n-6 overflow-hidden">
      <ScrollArea className="flex-1 p-6" ref={scrollRef}>
        <div className="space-y-6">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-color-1 text-n-1"
                    : "bg-n-6 text-n-1 border border-n-5"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <Image src="/assets/brainwave-symbol.svg" width={20} height={20} alt="AI" />
                    <span className="text-xs font-bold uppercase tracking-wider text-n-3">
                      Brainwave AI
                    </span>
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.content}</div>
              </div>
            </div>
          ))}
          {isStreaming && messages[messages.length-1].role === 'user' && (
            <div className="flex justify-start">
              <div className="bg-n-6 text-n-1 border border-n-5 p-4 rounded-2xl animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 border-t border-n-6 bg-n-8">
        <form onSubmit={handleSendMessage} className="relative flex items-center gap-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Brainwave anything..."
            className="flex-1 bg-n-7 border-n-6 rounded-xl py-6 px-6 text-n-1 focus-visible:ring-color-1"
            disabled={isStreaming}
          />
          <Button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="bg-color-1 hover:bg-color-1/80 text-n-1 h-12 w-12 rounded-xl p-0"
          >
            <Send size={20} />
          </Button>
        </form>
        <div className="mt-4 flex gap-6">
          <button className="flex items-center gap-2 text-xs font-code uppercase text-n-3 hover:text-n-1 transition-colors">
            <RotateCcw size={14} />
            Regenerate
          </button>
          <button className="flex items-center gap-2 text-xs font-code uppercase text-n-3 hover:text-n-1 transition-colors">
            <Save size={14} />
            Save as note
          </button>
          <button className="flex items-center gap-2 text-xs font-code uppercase text-n-3 hover:text-n-1 transition-colors">
            <FileDown size={14} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
