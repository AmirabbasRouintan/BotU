import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Sparkles, Key, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type MessagePart =
  | { type: "text"; content: string }
  | { type: "bold"; content: string }
  | { type: "italic"; content: string }
  | { type: "inlineCode"; content: string }
  | { type: "link"; text: string; url: string }
  | { type: "listItem"; content: string }
  | { type: "code"; language: string; content: string };

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export default function AIHelpTab() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your AI assistant. How can I help you today? You can ask me about:\n\n• Setting up your bot\n• **Troubleshooting** issues\n• `API documentation`\n• [Best practices](https://example.com)\n\nHere's a code sample:\n\n```javascript\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet('Developer'));\n```",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (user?.gemini_api_key) {
      setApiKey(user.gemini_api_key);
    }
  }, [user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!", {
      description: "Code snippet is ready to paste",
      duration: 2000
    });
  };

  const parseMessage = (text: string): MessagePart[] => {
    const parts: MessagePart[] = [];
    let currentIndex = 0;

    const codeBlockRegex = /```(\w*)\n([\s\S]*?)```/g;
    let match;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > currentIndex) {
        parts.push({
          type: "text",
          content: text.substring(currentIndex, match.index)
        });
      }

      parts.push({
        type: "code",
        language: match[1] || "text",
        content: match[2].trim()
      });

      currentIndex = match.index + match[0].length;
    }

    if (currentIndex < text.length) {
      parts.push({
        type: "text",
        content: text.substring(currentIndex)
      });
    }

    return parts.flatMap((part) => {
      if (part.type !== "text") return [part];

      const subParts: MessagePart[] = [];
      let subIndex = 0;

      const boldRegex = /\*\*(.*?)\*\*/g;
      const italicRegex = /\*(.*?)\*/g;
      const inlineCodeRegex = /`(.*?)`/g;
      const linkRegex = /\[(.*?)\]\((.*?)\)/g;
      const combinedRegex = new RegExp(
        `${boldRegex.source}|${italicRegex.source}|${inlineCodeRegex.source}|${linkRegex.source}`,
        "g"
      );

      let subMatch;
      while ((subMatch = combinedRegex.exec(part.content)) !== null) {
        if (subMatch.index > subIndex) {
          subParts.push({
            type: "text",
            content: part.content.substring(subIndex, subMatch.index)
          });
        }

        const fullMatch = subMatch[0];
        if (fullMatch.startsWith("**")) {
          subParts.push({
            type: "bold",
            content: fullMatch.slice(2, -2)
          });
        } else if (fullMatch.startsWith("*")) {
          subParts.push({
            type: "italic",
            content: fullMatch.slice(1, -1)
          });
        } else if (fullMatch.startsWith("`")) {
          subParts.push({
            type: "inlineCode",
            content: fullMatch.slice(1, -1)
          });
        } else if (fullMatch.startsWith("[")) {
          const linkMatch = fullMatch.match(/\[(.*?)\]\((.*?)\)/);
          if (linkMatch) {
            subParts.push({
              type: "link",
              text: linkMatch[1],
              url: linkMatch[2]
            });
          }
        }

        subIndex = subMatch.index + fullMatch.length;
      }

      if (subIndex < part.content.length) {
        subParts.push({
          type: "text",
          content: part.content.substring(subIndex)
        });
      }

      return subParts.flatMap((subPart) => {
        if (subPart.type !== "text") return [subPart];

        const listParts: MessagePart[] = [];
        const lines = subPart.content.split("\n");

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const listMatch = line.match(/^(\s*)[*\-+] (.*)$/);

          if (listMatch) {
            listParts.push({
              type: "listItem",
              content: listMatch[2]
            });
          } else {
            listParts.push({
              type: "text",
              content: line + (i < lines.length - 1 ? "\n" : "")
            });
          }
        }

        return listParts;
      });
    });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    if (!apiKey) {
      toast.error("Please enter your Gemini API key to use the AI assistant");
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/auth/ai/generate-content/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: inputValue,
          api_key: apiKey
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const text = data.text;

      const aiMessage: Message = {
        id: messages.length + 2,
        text: text,
        isUser: false,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error: any) {
      console.error("Error calling AI service:", error);
      let errorMessage = "Sorry, I'm having trouble connecting to the AI service. Please try again later.";
      
      if (error.message?.includes("Failed to fetch")) {
        errorMessage = "Network error. Please check your connection and try again.";
      }
      
      const errorMessageObj: Message = {
        id: messages.length + 2,
        text: errorMessage,
        isUser: false,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessageObj]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = async (question: string) => {
    setInputValue(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const saveApiKey = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    if (!user) {
      toast.error("You must be logged in to save your API key");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:8000/auth/update_gemini_api_key/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          gemini_api_key: apiKey
        })
      });
      
      if (!response.ok) {
        throw new Error(`Failed to save API key: ${response.status}`);
      }
      
      toast.success("API key saved successfully!");
    } catch (error) {
      console.error("Error saving API key:", error);
      toast.error("Failed to save API key. Please try again.");
    }
  };

  return (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-3xl border border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 " />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Get instant help from our AI-powered assistant
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* TODO: fix the gemini api key icon (show/hide) */}
        <div className="mb-6 p-4 bg-secondary/20 rounded-2xl border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Key className="h-4 w-4 text-muted-foreground" />
            <label className="text-sm font-medium">Gemini API Key</label>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showApiKey ? "text" : "password"}
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <Button onClick={saveApiKey} className="whitespace-nowrap">
              Save Key
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>

        <div className="bg-muted/20 rounded-3xl p-4 h-[50vh] overflow-y-auto text-sm font-light">
          <div className="space-y-4">
            {messages.map((message) => {
              const messageParts = parseMessage(message.text);

              return (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : ""}`}
                >
                  {!message.isUser && (
                    <Avatar className="mr-2 h-6 w-6 shrink-0">
                      <AvatarFallback className="bg-blue-500 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`
                      rounded-3xl p-3 max-w-[80%]
                      ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }
                    `}
                  >
                    <div className="space-y-1">
                      {messageParts.map((part, index) => {
                        let element;

                        switch (part.type) {
                          case "text":
                            element = (
                              <div className="whitespace-pre-line">
                                {part.content}
                              </div>
                            );
                            break;
                          case "bold":
                            element = (
                              <strong className="font-semibold">
                                {part.content}
                              </strong>
                            );
                            break;
                          case "italic":
                            element = (
                              <em className="italic">{part.content}</em>
                            );
                            break;
                          case "inlineCode":
                            element = (
                              <code className="bg-gray-800 rounded px-1 py-0.5 text-xs font-mono">
                                {part.content}
                              </code>
                            );
                            break;
                          case "link":
                            element = (
                              <a
                                href={part.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline hover:text-blue-300"
                              >
                                {part.text}
                              </a>
                            );
                            break;
                          case "listItem":
                            element = (
                              <div className="flex items-start">
                                <span className="mr-2">•</span>
                                <span>{part.content}</span>
                              </div>
                            );
                            break;
                          case "code":
                            element = (
                              <div className="mt-2 bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-700">
                                <div className="bg-neutral-800 px-3 py-1 text-xs text-neutral-300 flex justify-between items-center">
                                  <span className="font-mono uppercase text-[10px] tracking-wider">
                                    {part.language || "code"}
                                  </span>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-neutral-300 hover:text-neutral-100 h-6 px-2"
                                    onClick={() =>
                                      copyToClipboard(part.content)
                                    }
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      className="mr-1"
                                    >
                                      <rect
                                        x="9"
                                        y="9"
                                        width="13"
                                        height="13"
                                        rx="2"
                                        ry="2"
                                      ></rect>
                                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                    </svg>
                                    Copy
                                  </Button>
                                </div>
                                <pre className="text-xs p-4 overflow-x-auto font-mono text-neutral-200">
                                  {part.content}
                                </pre>
                              </div>
                            );
                            break;
                          default:
                            const fallbackPart = part as { content?: string };
                            element = (
                              <div className="whitespace-pre-line">
                                {fallbackPart.content || "Unsupported format"}
                              </div>
                            );
                        }

                        return <div key={index}>{element}</div>;
                      })}
                    </div>

                    <div
                      className={`text-xs mt-1 ${
                        message.isUser
                          ? "text-primary-foreground/70"
                          : "text-secondary-foreground/70"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                  </div>

                  {message.isUser && (
                    <Avatar className="ml-2 h-6 w-6 shrink-0">
                      <AvatarFallback className="bg-purple-500 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarFallback className="bg-blue-500 text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary text-secondary-foreground rounded-3xl p-3 max-w-[80%]">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Input
            placeholder="Ask a question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="min-w-[80px]"
          >
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Quick Questions</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickQuestion("How do I add permissions to my bot?")
              }
              disabled={isLoading}
            >
              How to add permissions?
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickQuestion("What are the API rate limits?")
              }
              disabled={isLoading}
            >
              API rate limits
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickQuestion("How do I integrate with Discord?")
              }
              disabled={isLoading}
            >
              Discord integration
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handleQuickQuestion("How do I troubleshoot common errors?")
              }
              disabled={isLoading}
            >
              Troubleshoot errors
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}