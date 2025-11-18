"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconMessageChatbot } from "@tabler/icons-react";
import { Spinner } from "@/components/ui/spinner";

export default function ChatApp() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("Ask me anything...");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: "user" | "bot" }[]
  >([]);
  const [openModal, setOpenModal] = useState(false);

  const sendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setOutput("Thinking...");
    setIsLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now(), text: input, sender: "user" },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.error) {
        setOutput(`Error: ${data.error}`);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now(), text: data.response, sender: "bot" },
        ]);
        setOutput(data.response);
        setInput("");
      }
    } catch (error) {
      console.error("Frontend Fetch Error:", error);
      setOutput("An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(e);
      setInput("");
    }
  };

  console.log(output);
  return (
    <div className="p-4 fixed bottom-5 z-50 right-2 w-full md:w-96">
      <Card
        className={
          "max-w-3xl mx-auto border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md flex flex-col min-h-[70vh]"
        }
        style={{ display: openModal ? "flex" : "none" }}
      >
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <CardTitle className="text-xl font-semibold">
            {" "}
            <Bot className="inline w-6 h-6 mr-2" /> AI Chatbot Assistant
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col flex-1 p-0">
          <ScrollArea className="flex-1 p-4 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm",
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none mb-2"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none mb-2"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && <div className="flex items-center justify-start gap-2"><Spinner className="w-4 h-4 mr-1 animate-spin" /> <span className="text-sm">Thinking...</span></div>}
          </ScrollArea>

          <div className="flex items-center gap-2 border-t border-gray-100 dark:border-gray-800 p-4">
            <Input
              placeholder="Ask me anything..."
              className="flex-1 dark:bg-gray-800"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Spinner className="w-4 h-4 mr-1 animate-spin" /> : <Send className="w-4 h-4 mr-1" />} {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div
        className="w-12 h-12 rounded-full bg-blue-600 flex items-center ml-auto mt-4 cursor-pointer shadow-lg"
        onClick={() => setOpenModal(!openModal)}
      >
        {openModal ? (
          <X className="w-6 h-6 text-white m-auto" />
        ) : (
          <IconMessageChatbot className="w-6 h-6 text-white m-auto" />
        )}
      </div>
    </div>
  );
}
