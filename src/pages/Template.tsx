import { useState, useEffect } from "react";
import {
  KanbanBoard,
  KanbanBoardProvider,
  KanbanBoardColumn,
  KanbanBoardColumnHeader,
  KanbanBoardColumnTitle,
  KanbanBoardColumnList,
  KanbanBoardColumnListItem,
  KanbanBoardCard,
  KanbanBoardCardTitle
} from "@/components/kanban";

// UI Components
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

// Icons
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
  Sparkles
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Types
type Card = { id: string; title: string };
type ColumnData = { id: string; title: string; cards: Card[] };

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

const initialBot: ColumnData[] = [
  {
    id: "responses",
    title: "Bot Replies",
    cards: [{ id: "3", title: "Hello! How can I help?" }]
  }
];

// Main Component
export default function Template() {
  const [loading, setLoading] = useState(true);
  const [commands, setCommands] = useState<ColumnData[]>(initialCommands);
  const [bot, setBot] = useState<ColumnData[]>(initialBot);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    // Show skeleton for 3.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

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

  // Move card between columns
  const moveCardToColumn = (
    cardData: string,
    targetColumnId: string,
    setFn: React.Dispatch<React.SetStateAction<ColumnData[]>>
  ) => {
    const card = JSON.parse(cardData) as Card;

    setFn((prev) => {
      const filtered = prev.map((col) => ({
        ...col,
        cards: col.cards.filter((c) => c.id !== card.id)
      }));
      const target = filtered.find((col) => col.id === targetColumnId);
      if (target) target.cards.push(card);
      return filtered;
    });
  };

  // Dashboard Tab Component
  const DashboardTab = () => (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Commands Section */}
      <section className="flex-1 flex flex-col rounded-3xl px-4 py-3 overflow-hidden bg-[var(--card)] backdrop-blur-[20px] border border-[var(--border)]">
        <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
          Commands
        </h2>
        <KanbanBoardProvider>
          <KanbanBoard className="flex flex-col md:flex-row gap-4 overflow-x-auto">
            {commands.map((column) => (
              <KanbanBoardColumn
                key={column.id}
                columnId={column.id}
                className="min-w-[280px] h-full w-full bg-[var(--muted)]/10 backdrop-blur-md rounded-2xl px-1 border border-[var(--border)]"
                onDropOverColumn={(data) =>
                  moveCardToColumn(data, column.id, setCommands)
                }
              >
                <KanbanBoardColumnHeader>
                  <KanbanBoardColumnTitle columnId={column.id}>
                    {column.title}
                  </KanbanBoardColumnTitle>
                </KanbanBoardColumnHeader>
                <KanbanBoardColumnList className="flex-grow overflow-y-auto max-h-[400px]">
                  {column.cards.map((card) => (
                    <KanbanBoardColumnListItem
                      key={card.id}
                      cardId={card.id}
                      onDropOverListItem={(data) =>
                        moveCardToColumn(data, column.id, setCommands)
                      }
                    >
                      <KanbanBoardCard
                        data={card}
                        className="bg-[var(--muted)]/10 backdrop-blur-sm rounded-lg text-[var(--foreground)]"
                      >
                        <KanbanBoardCardTitle>
                          {card.title}
                        </KanbanBoardCardTitle>
                      </KanbanBoardCard>
                    </KanbanBoardColumnListItem>
                  ))}
                </KanbanBoardColumnList>
              </KanbanBoardColumn>
            ))}
          </KanbanBoard>
        </KanbanBoardProvider>
      </section>

      {/* Bot Section */}
      <section className="flex-1 flex flex-col rounded-3xl px-4 py-3 overflow-hidden bg-[var(--card)] backdrop-blur-[20px] border border-[var(--border)] mt-4 md:mt-0">
        <h2 className="text-xl font-semibold mb-4 text-[var(--foreground)]">
          Bot
        </h2>
        <KanbanBoardProvider>
          <KanbanBoard className="flex flex-col md:flex-row gap-4 overflow-x-auto">
            {bot.map((column) => (
              <KanbanBoardColumn
                key={column.id}
                columnId={column.id}
                className="min-w-[280px] h-full w-full bg-[var(--muted)]/10 backdrop-blur-md rounded-2xl px-1 border border-[var(--border)]"
                onDropOverColumn={(data) =>
                  moveCardToColumn(data, column.id, setBot)
                }
              >
                <KanbanBoardColumnHeader>
                  <KanbanBoardColumnTitle columnId={column.id}>
                    {column.title}
                  </KanbanBoardColumnTitle>
                </KanbanBoardColumnHeader>
                <KanbanBoardColumnList className="flex-grow overflow-y-auto max-h-[400px]">
                  {column.cards.map((card) => (
                    <KanbanBoardColumnListItem
                      key={card.id}
                      cardId={card.id}
                      onDropOverListItem={(data) =>
                        moveCardToColumn(data, column.id, setBot)
                      }
                    >
                      <KanbanBoardCard
                        data={card}
                        className="bg-[var(--muted)]/10 backdrop-blur-sm rounded-lg text-[var(--foreground)]"
                      >
                        <KanbanBoardCardTitle>
                          {card.title}
                        </KanbanBoardCardTitle>
                      </KanbanBoardCard>
                    </KanbanBoardColumnListItem>
                  ))}
                </KanbanBoardColumnList>
              </KanbanBoardColumn>
            ))}
          </KanbanBoard>
        </KanbanBoardProvider>
      </section>
    </div>
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

  // AI Help Tab Component
  const AIHelpTab = () => (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-2xl border border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5" />
          AI Assistant
        </CardTitle>
        <CardDescription>
          Get instant help from our AI-powered assistant
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="bg-muted/20 rounded-lg p-4 h-96 overflow-y-auto">
          <div className="space-y-4">
            <div className="flex">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-secondary text-secondary-foreground rounded-xl p-3 max-w-[80%]">
                Hi there! I'm your AI assistant. How can I help you today? You
                can ask me about:
                <ul className="list-disc pl-5 mt-2">
                  <li>Setting up your bot</li>
                  <li>Troubleshooting issues</li>
                  <li>API documentation</li>
                  <li>Best practices</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="bg-primary text-primary-foreground rounded-xl p-3 max-w-[80%]">
                How do I create a new command?
              </div>
            </div>

            <div className="flex">
              <Avatar className="mr-2 h-6 w-6">
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="bg-secondary text-secondary-foreground rounded-xl p-3 max-w-[80%]">
                To create a new command:
                <ol className="list-decimal pl-5 mt-2">
                  <li>Go to the "My Bots" section</li>
                  <li>Select your bot</li>
                  <li>Navigate to "Custom Commands"</li>
                  <li>Click "Add Command"</li>
                  <li>Fill in the command details</li>
                  <li>Save your changes</li>
                </ol>
                Would you like me to show you step-by-step?
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Input placeholder="Ask a question..." />
          <Button>Send</Button>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-2">Quick Questions</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              How to add permissions?
            </Button>
            <Button variant="outline" size="sm">
              API rate limits
            </Button>
            <Button variant="outline" size="sm">
              Discord integration
            </Button>
            <Button variant="outline" size="sm">
              Troubleshoot errors
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="relative overflow-hidden text-white h-full select-none">
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
