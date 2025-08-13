import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  Settings as Cog,
  Palette,
  Terminal,
  Sliders,
  Edit,
  Trash2,
  Plus,
  List,
  Check,
  X,
  Brain,
  Cpu,
  Bot,
  MessageSquare,
  Bell,
  LifeBuoy,
  HelpCircle,
  Sparkles,
  ChevronRight
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Types
type Card = { id: string; title: string };
type ColumnData = { id: string; title: string; cards: Card[] };

// Define types for our components
type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change: string;
  color: string;
};

type BotStatusItemProps = {
  name: string;
  status: string;
  color: string;
  initials: string;
};

type ChartLegendProps = {
  color: string;
  label: string;
};

type QuickActionProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
};

// Initial data
const initialCommands: ColumnData[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "1", title: "Add /help command" },
      { id: "2", title: "Fix /start bug" }
    ]
  }
];

// AI Help Tab Component
const AIHelpTab = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm your AI assistant. How can I help you today? You can ask me about:\n\n• Setting up your bot\n• Troubleshooting issues\n• API documentation\n• Best practices",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini API
  const API_KEY =
    import.meta.env.VITE_GEMINI_API_KEY ||
    process.env.REACT_APP_GEMINI_API_KEY ||
    "AIzaSyCzdqvMRidgBWxMVkBQqUvgoNUnm54FP5Q";
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message to chat
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Send message to Gemini API
      const result = await model.generateContent(inputValue);
      const response = await result.response;
      const text = response.text();

      // Add AI response to chat
      const aiMessage = {
        id: messages.length + 2,
        text: text,
        isUser: false,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling Gemini API:", error);

      // Show error message
      const errorMessage = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting to the AI service. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickQuestion = async (question: string) => {
    setInputValue(question);

    // Add a small delay to let the input update
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

  return (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-2xl border border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5 text-yellow-400" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Get instant help from our AI-powered assistant
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="bg-muted/20 rounded-lg p-4 h-[50vh] overflow-y-auto text-sm font-light">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : ""}`}
              >
                {!message.isUser && (
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarFallback className="bg-blue-500 text-white">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`
                    rounded-xl p-3 max-w-[80%] whitespace-pre-line
                    ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }
                  `}
                >
                  {message.text}
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
                  <Avatar className="ml-2 h-6 w-6">
                    <AvatarFallback className="bg-purple-500 text-white">
                      U
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex">
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarFallback className="bg-blue-500 text-white">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary text-secondary-foreground rounded-xl p-3 max-w-[80%]">
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
};

// Main Component
export default function Template() {
  const [loading, setLoading] = useState(true);
  const [commands] = useState<ColumnData[]>(initialCommands);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Skeleton Component
  const LoadingSkeleton = () => (
    <div className="flex-1">
      <div className="p-6 rounded-lg">
        <Skeleton className="h-8 w-3/4 rounded-md mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-4 rounded-md" />
          <Skeleton className="h-4 rounded-md w-5/6" />
          <Skeleton className="h-4 rounded-md w-2/3" />
        </div>

        {/* Grid of cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>

        {/* Additional content skeleton */}
        <Skeleton className="h-10 w-32 rounded-md mt-6" />
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  // Dashboard Tab Component
  const DashboardTab = () => (
    <div className="flex flex-col gap-4 mt-2">
      {/* Stats Cards - Compact */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard
          title="Total Bots"
          value="7"
          icon={<Bot className="h-4 w-4" />}
          change="+2 this month"
          color="bg-green-500/20 text-green-500 border border-border"
        />
        <StatCard
          title="Active Commands"
          value="24"
          icon={<Terminal className="h-4 w-4" />}
          change="+5 this week"
          color="bg-blue-500/20 text-blue-500 border border-border"
        />
        <StatCard
          title="User Interactions"
          value="1.2K"
          icon={<MessageSquare className="h-4 w-4" />}
          change="+120 today"
          color="bg-purple-500/20 text-purple-500 border border-border"
        />
        <StatCard
          title="Success Rate"
          value="94%"
          icon={<Check className="h-4 w-4" />}
          change="+3% from last month"
          color="bg-amber-500/20 text-amber-500 border border-border"
        />
      </div>

      {/* Main Content - Activity and Bots */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Activity Feed - More Compact */}
        <Card className="lg:col-span-2 bg-[#ffffff08] backdrop-blur border border-border">
          {" "}
          {/* Updated border */}
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center">
              <List className="mr-2 h-4 w-4 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-start p-2 rounded hover:bg-muted/20 transition-colors border border-border" // Added border
                >
                  <div className="bg-primary/10 p-1.5 rounded-full mr-2 mt-0.5">
                    <Edit className="h-3 w-3 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium">
                        Updated command settings
                      </h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        2h ago
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Modified response for /help command in MyBot
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bot Status - More Compact */}
        <Card className="bg-[#ffffff08] backdrop-blur border border-border">
          {" "}
          {/* Updated border */}
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center">
              <Bot className="mr-2 h-4 w-4 text-primary" />
              Bot Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-2">
              <BotStatusItem
                name="MyBot"
                status="Online"
                color="bg-green-500"
                initials="MB"
              />
              <BotStatusItem
                name="SupportBot"
                status="Online"
                color="bg-green-500"
                initials="SB"
              />
              <BotStatusItem
                name="AdminBot"
                status="Maintenance"
                color="bg-yellow-500"
                initials="AB"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Usage Chart */}
        <Card className="bg-[#ffffff08] backdrop-blur border border-border p-4">
          {" "}
          {/* Updated border */}
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-base flex items-center">
              <Cpu className="mr-2 h-4 w-4 text-primary" />
              Usage Trends
            </CardTitle>
            <CardDescription className="text-xs">
              Last 7 days command usage
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-40 flex items-end justify-between">
              {[40, 75, 60, 85, 55, 90, 70].map((value, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center flex-1 mx-0.5 border border-border" // Added border
                >
                  <div
                    className="w-full bg-gradient-to-t from-primary/70 to-primary/30 rounded-t"
                    style={{ height: `${value}%`, minHeight: "10px" }}
                  ></div>
                  <span className="text-[10px] text-muted-foreground mt-1">
                    {["M", "T", "W", "T", "F", "S", "S"][i]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Model Distribution */}
        <Card className="bg-[#ffffff08] backdrop-blur border border-border p-4">
          {" "}
          {/* Updated border */}
          <CardHeader className="p-0 mb-3">
            <CardTitle className="text-base flex items-center">
              <Brain className="mr-2 h-4 w-4 text-primary" />
              AI Model Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-40 flex items-center justify-center">
              <div className="relative w-32 h-32 border border-border rounded-full">
                {" "}
                {/* Added border */}
                {/* Doughnut Chart */}
                <div
                  className="absolute inset-0 rounded-full border-[8px] border-transparent"
                  style={{
                    background: `conic-gradient(
                    #3b82f6 0% 45%, 
                    #8b5cf6 45% 75%, 
                    #10b981 75% 100%
                  )`
                  }}
                ></div>
                <div className="absolute inset-4 rounded-full bg-card"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold">Models</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-3 mt-2">
              <ChartLegend color="bg-blue-500" label="GPT-4 (45%)" />
              {/* Added border */}
              <ChartLegend color="bg-purple-500" label="Claude (30%)" />
              {/* Added border */}
              <ChartLegend color="bg-green-500" label="Gemini (25%)" />
              {/* Added border */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions - Compact */}
      <Card className="bg-[#ffffff08] backdrop-blur border border-border p-4">
        {" "}
        {/* Updated border */}
        <CardHeader className="p-0 mb-3">
          <CardTitle className="text-base flex items-center">
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <QuickAction
              icon={<Plus className="h-5 w-5" />}
              label="New Bot"
              color="from-primary/20"
            />
            <QuickAction
              icon={<Terminal className="h-5 w-5" />}
              label="Add Command"
              color="from-secondary/20"
            />
            <QuickAction
              icon={<Palette className="h-5 w-5" />}
              label="Customize"
              color="from-green-500/20"
            />
            <QuickAction
              icon={<Brain className="h-5 w-5" />}
              label="Configure AI"
              color="from-purple-500/20"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
  // Helper Components
  const StatCard = ({ title, value, icon, change, color }: StatCardProps) => (
    <Card className="bg-[#ffffff08] backdrop-blur border border-border p-3">
      <div className="flex justify-between items-start">
        <span className="text-xs text-muted-foreground">{title}</span>
        <div className={`p-1 rounded-full ${color}`}>{icon}</div>
      </div>
      <div className="mt-1 flex items-baseline">
        <span className="text-xl font-bold">{value}</span>
        <span className="text-xs text-green-500 ml-2">{change}</span>
      </div>
    </Card>
  );

  const BotStatusItem = ({
    name,
    status,
    color,
    initials
  }: BotStatusItemProps) => (
    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/20 border border-border/30">
      <div className="flex items-center">
        <Avatar className={`w-8 h-8 ${color}`}>
          <AvatarFallback className="text-xs">{initials}</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="text-sm font-medium">{name}</p>
          <div className="flex items-center mt-1">
            <div
              className={`w-2 h-2 rounded-full ${
                status === "online" ? "bg-green-500" : "bg-yellow-500"
              } mr-1`}
            ></div>
            <span className="text-xs text-muted-foreground capitalize">
              {status}
            </span>
          </div>
        </div>
      </div>
      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  const ChartLegend = ({ color, label }: ChartLegendProps) => (
    <div className="flex items-center">
      <div className={`w-3 h-3 rounded-full ${color} mr-1`}></div>
      <span className="text-xs">{label}</span>
    </div>
  );

  const QuickAction = ({ icon, label, color }: QuickActionProps) => (
    <Button
      variant="outline"
      className={`flex flex-col items-center justify-center h-16 gap-1 p-2 bg-gradient-to-br ${color} border border-border hover:border-primary/50 transition-all`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Button>
  );

  // My Bots Tab Component
  const MyBotsTab = () => (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-2xl border border-border shadow-xl">
      <CardHeader className="flex flex-col md:flex-row items-start justify-between">
        <div>
          <CardTitle className="text-2xl md:text-3xl font-bold">
            Edit Bot Configuration
          </CardTitle>
          <CardDescription className="mt-2">
            Customize your bot's behavior and appearance
          </CardDescription>
        </div>

        <div className="flex items-center space-x-4 bg-muted/50 p-3 rounded-xl border border-border mt-4 md:mt-0">
          <Avatar className="bg-primary w-10 h-10 md:w-14 md:h-14">
            <AvatarFallback className="text-primary-foreground">
              B
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">MyBot</h3>
            <Badge className="mt-1 bg-green-500/20 text-green-500">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              Online
            </Badge>
          </div>
        </div>
      </CardHeader>

      <Separator />

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* General Settings Card */}
          <Card className="bg-[#0000005b] backdrop-blur border-border hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Cog className="mr-2 h-5 w-5 text-primary" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label
                  htmlFor="bot-name"
                  className="text-muted-foreground mb-1"
                >
                  Bot Name
                </Label>
                <Input
                  id="bot-name"
                  className="bg-muted/40 border-border"
                  placeholder="Enter bot name"
                  defaultValue="MyBot"
                />
              </div>

              <div>
                <Label
                  htmlFor="bot-desc"
                  className="text-muted-foreground mb-1"
                >
                  Bot Description
                </Label>
                <Textarea
                  id="bot-desc"
                  className="bg-muted/40 border-border min-h-[100px]"
                  placeholder="Describe what your bot does"
                  defaultValue="A helpful assistant bot for your Discord server"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-2 gap-4">
                <div>
                  <Label className="text-muted-foreground mb-1">
                    Bot Status
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="bot-status" defaultChecked />
                    <Label htmlFor="bot-status">Active</Label>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground mb-1">
                    Public Bot
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="public-bot" />
                    <Label
                      htmlFor="public-bot"
                      className="text-muted-foreground"
                    >
                      Private
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Card */}
          <Card className="bg-[#0000005b] backdrop-blur border-border hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5 text-primary" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-muted-foreground mb-1">
                    Primary Color
                  </Label>
                  <div className="flex items-center cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-primary border-2 border-border group-hover:border-primary/50 transition-colors"></div>
                    <span className="ml-2 text-foreground group-hover:text-primary transition-colors">
                      Primary
                    </span>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground mb-1">
                    Accent Color
                  </Label>
                  <div className="flex items-center cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-secondary border-2 border-border group-hover:border-primary/50 transition-colors"></div>
                    <span className="ml-2 text-foreground group-hover:text-primary transition-colors">
                      Accent
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Label className="text-muted-foreground mb-1">Bot Avatar</Label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="relative">
                    <Avatar className="bg-primary w-14 h-14">
                      <AvatarFallback className="text-primary-foreground">
                        B
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-1 bg-primary hover:bg-primary/90"
                    >
                      <Edit className="h-3 w-3 text-primary-foreground" />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="default" className="gap-2">
                      <Edit className="h-4 w-4" />
                      Upload Image
                    </Button>
                    <Button variant="secondary" className="gap-2">
                      <Terminal className="h-4 w-4" />
                      Generate AI Avatar
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Behavior Card */}
          <Card className="bg-[#0000005b] backdrop-blur border-border hover:border-primary/50 transition-all">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5 text-primary" />
                AI Behavior
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground mb-1">
                  Conversation Style
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="h-9">
                    Formal
                  </Button>
                  <Button variant="default" className="h-9">
                    Balanced
                  </Button>
                  <Button variant="outline" className="h-9">
                    Casual
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground mb-1">
                  Response Length
                </Label>
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <Slider
                    defaultValue={[3]}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex gap-1 flex-wrap">
                    <Badge variant="secondary" className="cursor-pointer">
                      Short
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      Medium
                    </Badge>
                    <Badge variant="default" className="cursor-pointer">
                      Long
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      Detailed
                    </Badge>
                    <Badge variant="secondary" className="cursor-pointer">
                      Novel
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground mb-1">
                  Knowledge Base
                </Label>
                <div className="flex flex-wrap gap-2">
                  <Badge className="gap-2">
                    Tech Docs
                    <X className="h-3 w-3 cursor-pointer" />
                  </Badge>
                  <Badge className="gap-2">
                    Company Policy
                    <X className="h-3 w-3 cursor-pointer" />
                  </Badge>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="h-3 w-3" />
                    Add Source
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-6 md:my-10" />

        {/* AI Model Configuration Section */}
        <Card className="bg-[#0000005b] backdrop-blur border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Cpu className="mr-2 h-5 w-5 text-primary" />
              AI Model Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <Label className="text-muted-foreground mb-3 block">
                  Base Model
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Card className="cursor-pointer border-primary bg-primary/10 transition-all hover:scale-[1.02]">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">GPT-4 Turbo</CardTitle>
                      <CardDescription>128K context</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="cursor-pointer opacity-80 hover:opacity-100 transition-all hover:scale-[1.02]">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Claude 3</CardTitle>
                      <CardDescription>200K context</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card className="cursor-pointer opacity-80 hover:opacity-100 transition-all hover:scale-[1.02]">
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">Gemini Pro</CardTitle>
                      <CardDescription>Multimodal</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground mb-3 block">
                  Model Parameters
                </Label>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-muted-foreground text-sm">
                        Temperature
                      </Label>
                      <Badge
                        variant="outline"
                        className="font-mono bg-primary/10 text-primary"
                      >
                        0.7
                      </Badge>
                    </div>
                    <Slider defaultValue={[0.7]} max={1} min={0} step={0.1} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Controls randomness: lower = more deterministic
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-muted-foreground text-sm">
                        Top-P
                      </Label>
                      <Badge
                        variant="outline"
                        className="font-mono bg-primary/10 text-primary"
                      >
                        0.9
                      </Badge>
                    </div>
                    <Slider defaultValue={[0.9]} max={1} min={0} step={0.1} />
                    <p className="text-xs text-muted-foreground mt-1">
                      Controls diversity: lower = more focused
                    </p>
                  </div>

                  <div className="pt-2">
                    <Label className="text-muted-foreground text-sm mb-2 block">
                      Max Tokens
                    </Label>
                    <Input
                      type="number"
                      defaultValue={4096}
                      className="bg-muted/40 border-border w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Model Features Comparison */}
            <div className="mt-6 md:mt-8">
              <Label className="text-muted-foreground mb-3 block">
                Model Capabilities
              </Label>
              <div className="overflow-x-auto bg-[#ffffff00] backdrop-blur rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Feature</TableHead>
                      <TableHead className="text-center">GPT-4 Turbo</TableHead>
                      <TableHead className="text-center">Claude 3</TableHead>
                      <TableHead className="text-center">Gemini Pro</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Multimodal</TableCell>
                      <TableCell className="text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Code Generation</TableCell>
                      <TableCell className="text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <X className="h-4 w-4 text-red-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Long Context</TableCell>
                      <TableCell className="text-center">128K</TableCell>
                      <TableCell className="text-center">200K</TableCell>
                      <TableCell className="text-center">32K</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Internet Access</TableCell>
                      <TableCell className="text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <X className="h-4 w-4 text-red-500 mx-auto" />
                      </TableCell>
                      <TableCell className="text-center">
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6 md:my-10" />

        {/* Commands Section */}
        <Card className="bg-[#0000005b] backdrop-blur border-border mb-8">
          <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="flex items-center">
              <Terminal className="mr-2 h-5 w-5 text-primary" />
              Custom Commands
            </CardTitle>
            <div className="flex gap-2 mt-2 md:mt-0">
              <Button variant="default" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Command
              </Button>
              <Button variant="secondary" className="gap-2">
                <List className="h-4 w-4" />
                Bulk Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Command Card 1 */}
              <Card className="bg-[#ffffff11] backdrop-blur border-border hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-mono">/help</CardTitle>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-3">
                    Shows help information
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Everyone</Badge>
                    <Badge className="bg-green-500/20 text-green-500">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Command Card 2 */}
              <Card className="bg-[#ffffff11] backdrop-blur border-border hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-mono">/start</CardTitle>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-3">Welcome message</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Everyone</Badge>
                    <Badge className="bg-green-500/20 text-green-500">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      Active
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Command Card 3 */}
              <Card className="bg-[#ffffff11] backdrop-blur border-border hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-mono">/admin</CardTitle>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4 text-primary" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground mb-3">
                    Admin commands menu
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Admins Only</Badge>
                    <Badge className="bg-yellow-500/20 text-yellow-500">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                      Disabled
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Empty State */}
            {commands.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Terminal className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  No commands created
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Get started by adding your first custom command. Commands will
                  appear here once created.
                </p>
                <Button className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Create First Command
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Separator className="my-6 md:my-10" />

        {/* Advanced Settings */}
        <Card className="bg-[#0000005b] backdrop-blur border-border">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sliders className="mr-2 h-5 w-5 text-primary" />
              Advanced Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-muted-foreground mb-1">
                  Response Timeout
                </Label>
                <div className="flex items-center gap-4">
                  <Slider
                    defaultValue={[15]}
                    max={30}
                    min={1}
                    className="w-full"
                  />
                  <div className="px-3 py-1 bg-primary/20 text-primary text-xs rounded font-mono">
                    15s
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground mb-1">
                  Error Message Style
                </Label>
                <div className="flex gap-2">
                  <Button variant="default" className="flex-1">
                    Friendly
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Technical
                  </Button>
                </div>
              </div>

              {/* Safety Settings */}
              <div>
                <Label className="text-muted-foreground mb-1">
                  Content Safety
                </Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground text-sm">
                      Harmful Content Filter
                    </Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground text-sm">
                      PII Redaction
                    </Label>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-muted-foreground text-sm">
                      NSFW Blocking
                    </Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <Label className="text-muted-foreground mb-1">
                Custom API Endpoints
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  className="bg-muted/40 border-border flex-1"
                  placeholder="https://api.example.com/endpoint"
                />
                <Button variant="default" className="shrink-0">
                  Add Endpoint
                </Button>
              </div>
            </div>

            {/* API Key Management */}
            <div className="mt-6">
              <Label className="text-muted-foreground mb-1">
                API Key Management
              </Label>
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  className="bg-muted/40 border-border flex-1"
                  placeholder="sk-...your-api-key"
                  type="password"
                  value="sk-...d93k"
                />
                <div className="flex gap-2">
                  <Button variant="secondary">Rotate Key</Button>
                  <Button variant="destructive">Revoke</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6 md:my-10" />

        {/* Footer */}
        <div className="mt-6">
          <Card className="bg-[#0000005b] backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                Test Conversation
              </CardTitle>
              <CardDescription>
                Preview how your bot responds with current settings
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-muted/20 rounded-lg p-4 h-64 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-xl p-3 max-w-[80%]">
                    What can you help me with?
                  </div>
                </div>
                <div className="flex">
                  <Avatar className="mr-2 h-6 w-6">
                    <AvatarFallback>B</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary text-secondary-foreground rounded-xl p-3 max-w-[80%]">
                    I can answer questions, explain concepts, help with
                    troubleshooting, and more based on your configured knowledge
                    sources!
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4">
              <Input placeholder="Type a test message..." />
              <Button>Send</Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex flex-col sm:flex-row justify-end gap-3">
        <Button variant="secondary" className="gap-2">
          <X className="h-5 w-5" />
          Discard Changes
        </Button>

        <Button variant="outline" className="gap-2">
          <Bot className="h-4 w-4" />
          Test Bot
        </Button>

        <Button
          variant="default"
          className="gap-2 shadow-lg hover:shadow-primary/20"
        >
          <Check className="h-5 w-5" />
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );

  // Settings Tab Component
  const SettingsTab = () => (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-2xl border border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Cog className="mr-2 h-5 w-5" />
          Account Settings
        </CardTitle>
        <CardDescription>
          Manage your account preferences and security
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card className="bg-[#0000005b] backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <Input defaultValue="user123" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue="user@example.com" type="email" />
                </div>
                <div>
                  <Label>Timezone</Label>
                  <Input defaultValue="UTC+00:00" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-[#0000005b] backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm">Disabled</span>
                    <Switch />
                  </div>
                </div>
                <div>
                  <Label>Active Sessions</Label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm">2 active sessions</span>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* API Keys */}
        <Card className="bg-[#0000005b] backdrop-blur border-border">
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Manage keys for accessing our API services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Production Key</TableCell>
                  <TableCell>Jan 12, 2024</TableCell>
                  <TableCell>Today</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-green-500/20 text-green-500"
                    >
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Development Key</TableCell>
                  <TableCell>Mar 5, 2024</TableCell>
                  <TableCell>Apr 2, 2024</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="bg-yellow-500/20 text-yellow-500"
                    >
                      Inactive
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button className="mt-4 gap-2">
              <Plus className="h-4 w-4" />
              Create New API Key
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );

  // Notification Tab Component
  const NotificationTab = () => (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-2xl border border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notification Settings
        </CardTitle>
        <CardDescription>
          Configure how and when you receive notifications
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Notifications */}
          <Card className="bg-[#0000005b] backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Bot Status Updates</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>New Messages</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Monthly Reports</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Security Alerts</Label>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* In-App Notifications */}
          <Card className="bg-[#0000005b] backdrop-blur border-border">
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>New Features</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Maintenance Alerts</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Usage Limits</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Community Updates</Label>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification Preferences */}
        <Card className="bg-[#0000005b] backdrop-blur border-border">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Notification Sound</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant="outline">Chime</Button>
                  <Button variant="default">Bell</Button>
                  <Button variant="outline">None</Button>
                </div>
              </div>

              <div>
                <Label>Do Not Disturb Hours</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Input type="time" defaultValue="22:00" />
                  <span>to</span>
                  <Input type="time" defaultValue="08:00" />
                </div>
              </div>

              <div>
                <Label>Desktop Notifications</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant="outline">Enabled</Button>
                  <Button variant="default">Only when active</Button>
                  <Button variant="outline">Disabled</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );

  // Help Tab Component
  const HelpTab = () => (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-2xl border border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <HelpCircle className="mr-2 h-5 w-5" />
          Help Center
        </CardTitle>
        <CardDescription>
          Find answers to common questions and issues
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-[#0000005b] backdrop-blur border-border cursor-pointer hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="text-lg">Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Learn how to set up your first bot
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0000005b] backdrop-blur border-border cursor-pointer hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="text-lg">Command Reference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Complete guide to available commands
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[#0000005b] backdrop-blur border-border cursor-pointer hover:border-primary transition-colors">
            <CardHeader>
              <CardTitle className="text-lg">Troubleshooting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Solutions for common problems
              </p>
            </CardContent>
          </Card>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">How do I create a new bot?</h4>
              <p className="text-muted-foreground text-sm mt-1">
                Go to the "My Bots" section and click "Create New Bot". Follow
                the setup wizard to configure your bot.
              </p>
            </div>
            <div>
              <h4 className="font-medium">How do I add custom commands?</h4>
              <p className="text-muted-foreground text-sm mt-1">
                Navigate to the bot's settings, then to the "Commands" section.
                Click "Add Command" and configure your command.
              </p>
            </div>
            <div>
              <h4 className="font-medium">How can I integrate with Discord?</h4>
              <p className="text-muted-foreground text-sm mt-1">
                Use the Discord integration guide in our documentation. You'll
                need to create a Discord application and configure OAuth.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Support Tab Component
  const SupportTab = () => (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-2xl border border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <LifeBuoy className="mr-2 h-5 w-5" />
          Support Center
        </CardTitle>
        <CardDescription>
          Contact our support team for assistance
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form */}
          <Card className="bg-[#0000005b] backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label>Subject</Label>
                  <Input placeholder="Briefly describe your issue" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Please describe your issue in detail..."
                    rows={5}
                  />
                </div>
                <div>
                  <Label>Attachments</Label>
                  <div className="border border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-muted/10 transition-colors">
                    <Plus className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Click to add screenshots or files
                    </p>
                  </div>
                </div>
                <Button className="w-full">Submit Request</Button>
              </div>
            </CardContent>
          </Card>

          {/* Support Information */}
          <Card className="bg-[#0000005b] backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Support Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Community Forum</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Connect with other developers and get help from the
                    community
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Documentation</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Comprehensive guides and API references
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Status Page</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Check system status and incident reports
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Live Chat</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Available Monday-Friday, 9AM-5PM EST
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="relative overflow-hidden text-white h-full select-none mt-3">
      <div className="p-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex flex-col md:flex-row"
        >
          {/* Scrollable tabs for mobile */}
          <TabsList className="w-auto flex flex-row md:flex-col overflow-auto items-center justify-start pb-0 pt-1 pl-1 pr-1 md:p-2 md:mx-2 mx-0 bg-[#85858510] backdrop-blur border border-border shadow-xl rounded-xl transparent-scrollbar">
            <TabsTrigger
              value="dashboard"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="mybots"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              My Bots
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Settings
            </TabsTrigger>
            <TabsTrigger
              value="notification"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Notification
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Help
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Support
            </TabsTrigger>
            <TabsTrigger
              value="aihelp"
              className="px-3 py-2 mb-auto text-sm md:text-base md:text-left"
            >
              AI Help
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <div className="flex-1">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <>
                <TabsContent value="dashboard">
                  <DashboardTab />
                </TabsContent>
                <TabsContent value="mybots">
                  <MyBotsTab />
                </TabsContent>
                <TabsContent value="settings">
                  <SettingsTab />
                </TabsContent>
                <TabsContent value="notification">
                  <NotificationTab />
                </TabsContent>
                <TabsContent value="help">
                  <HelpTab />
                </TabsContent>
                <TabsContent value="support">
                  <SupportTab />
                </TabsContent>
                <TabsContent value="aihelp">
                  <AIHelpTab />
                </TabsContent>
              </>
            )}
          </div>
        </Tabs>
      </div>
    </div>
  );
}
