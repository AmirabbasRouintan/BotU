import { useState } from "react";
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

import { Card } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { CardDescription } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardFooter } from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import { TableHeader } from "@/components/ui/table";
import { TableRow } from "@/components/ui/table";
import { TableHead } from "@/components/ui/table";
import { TableBody } from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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
  MessageSquare
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type Card = { id: string; title: string };
type ColumnData = { id: string; title: string; cards: Card[] };

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

export default function Template() {
  const [commands, setCommands] = useState<ColumnData[]>(initialCommands);
  const [bot, setBot] = useState<ColumnData[]>(initialBot);
  const [activeTab, setActiveTab] = useState("commands");

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
  return (
    <div className="relative overflow-hidden text-white h-full select-none">
      <div className="p-4 md:p-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex flex-col md:flex-row"
        >
          {/* Scrollable tabs for mobile */}
          <TabsList className="bg-[#85858523] backdrop-blur rounded-xl p-2 mb-4 md:mb-0 md:mr-4 flex flex-row md:flex-col overflow-x-auto whitespace-nowrap">
            <TabsTrigger
              value="commands"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Commands
            </TabsTrigger>
            <TabsTrigger
              value="api"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              API Token
            </TabsTrigger>
            <TabsTrigger
              value="edit"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Edit Bot
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Bot Settings
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Payments
            </TabsTrigger>
            <TabsTrigger
              value="transfareowner"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Transfer Ownership
            </TabsTrigger>
            <TabsTrigger
              value="delete"
              className="px-3 py-2 text-sm md:text-base md:text-left"
            >
              Delete Bot
            </TabsTrigger>
          </TabsList>

          <TabsContent value="commands">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Commands Section - Stack on mobile */}
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

              {/* Bot Section - Stack below commands on mobile */}
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
          </TabsContent>

          <TabsContent value="api" className="animate-fadeIn">
            <Card className="bg-card backdrop-blur-xl rounded-2xl border border-border shadow-xl">
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
                  <Card className="border-border hover:border-primary/50 transition-all">
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
                  <Card className="border-border hover:border-primary/50 transition-all">
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
                        <Label className="text-muted-foreground mb-1">
                          Bot Avatar
                        </Label>
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
                  <Card className="border-border hover:border-primary/50 transition-all">
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
                            <Badge
                              variant="secondary"
                              className="cursor-pointer"
                            >
                              Short
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="cursor-pointer"
                            >
                              Medium
                            </Badge>
                            <Badge variant="default" className="cursor-pointer">
                              Long
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="cursor-pointer"
                            >
                              Detailed
                            </Badge>
                            <Badge
                              variant="secondary"
                              className="cursor-pointer"
                            >
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
                <Card className="border-border mb-8">
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
                              <CardTitle className="text-lg">
                                GPT-4 Turbo
                              </CardTitle>
                              <CardDescription>128K context</CardDescription>
                            </CardHeader>
                          </Card>
                          <Card className="cursor-pointer opacity-80 hover:opacity-100 transition-all hover:scale-[1.02]">
                            <CardHeader className="p-4">
                              <CardTitle className="text-lg">
                                Claude 3
                              </CardTitle>
                              <CardDescription>200K context</CardDescription>
                            </CardHeader>
                          </Card>
                          <Card className="cursor-pointer opacity-80 hover:opacity-100 transition-all hover:scale-[1.02]">
                            <CardHeader className="p-4">
                              <CardTitle className="text-lg">
                                Gemini Pro
                              </CardTitle>
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
                            <Slider
                              defaultValue={[0.7]}
                              max={1}
                              min={0}
                              step={0.1}
                            />
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
                            <Slider
                              defaultValue={[0.9]}
                              max={1}
                              min={0}
                              step={0.1}
                            />
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
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Feature</TableHead>
                              <TableHead className="text-center">
                                GPT-4 Turbo
                              </TableHead>
                              <TableHead className="text-center">
                                Claude 3
                              </TableHead>
                              <TableHead className="text-center">
                                Gemini Pro
                              </TableHead>
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
                              <TableCell className="text-center">
                                128K
                              </TableCell>
                              <TableCell className="text-center">
                                200K
                              </TableCell>
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
                <Card className="border-border mb-8">
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
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-muted/50">
                          <TableRow>
                            <TableHead className="text-muted-foreground">
                              Command
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Response
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Permissions
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Status
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-muted/40">
                            <TableCell className="font-medium">/help</TableCell>
                            <TableCell>Shows help information</TableCell>
                            <TableCell>
                              <Badge variant="secondary">Everyone</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-500">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4 text-primary" />
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-muted/40">
                            <TableCell className="font-medium">
                              /start
                            </TableCell>
                            <TableCell>Welcome message</TableCell>
                            <TableCell>
                              <Badge variant="secondary">Everyone</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/20 text-green-500">
                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4 text-primary" />
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-muted/40">
                            <TableCell className="font-medium">
                              /admin
                            </TableCell>
                            <TableCell>Admin commands menu</TableCell>
                            <TableCell>
                              <Badge variant="secondary">Admins Only</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-yellow-500/20 text-yellow-500">
                                <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                                Disabled
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon">
                                  <Edit className="h-4 w-4 text-primary" />
                                </Button>
                                <Button variant="outline" size="icon">
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>

                <Separator className="my-6 md:my-10" />

                {/* Advanced Settings */}
                <Card className="border-border">
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
                  <Card>
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
                            troubleshooting, and more based on your configured
                            knowledge sources!
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
          </TabsContent>

          <TabsContent value="edit" className="animate-in fade-in duration-500">
            <div className="max-w-5xl mx-auto grid gap-6 p-2 sm:p-4 md:p-6">
              {/* Header */}
              <header className="text-center">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-indigo-400">
                  Edit Your Bot
                </h1>
                <p className="mt-2 text-white/70 max-w-md mx-auto">
                  Fine-tune personality, triggers, and responses.
                </p>
              </header>

              {/* Two-column layout - Stack on mobile */}
              <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left – Avatar & Identity */}
                <section className="md:col-span-1 flex flex-col gap-6">
                  {/* Avatar */}
                  <div className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-sky-400/20 to-indigo-500/20 border border-white/10 backdrop-blur p-6">
                    <div className="aspect-square w-32 mx-auto rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-4 border-white/20 flex items-center justify-center">
                      <span className="text-4xl font-black text-white/40">
                        :)
                      </span>
                    </div>
                    <label className="absolute inset-0 cursor-pointer opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40 flex items-center justify-center">
                      <input type="file" className="sr-only" accept="image/*" />
                      <span className="text-sm font-semibold text-white/90">
                        Upload
                      </span>
                    </label>
                  </div>

                  {/* Identity Card */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-5 space-y-4">
                    <h3 className="text-lg font-semibold text-white/90">
                      Identity
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Bot Name
                        </label>
                        <input
                          type="text"
                          defaultValue="MyBot"
                          className="w-full bg-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-1">
                          Short Description
                        </label>
                        <textarea
                          rows={3}
                          placeholder="A helpful assistant..."
                          className="w-full bg-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Right – Triggers & Responses */}
                <section className="md:col-span-2 flex flex-col gap-6">
                  {/* Triggers */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-5">
                    <h3 className="text-lg font-semibold text-white/90 mb-4">
                      Triggers
                    </h3>
                    <div className="space-y-3">
                      {["/start", "/help", "/joke"].map((t) => (
                        <div
                          key={t}
                          className="group flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2 transition hover:bg-white/10"
                        >
                          <span className="font-mono text-sm text-sky-300">
                            {t}
                          </span>
                          <button className="ml-auto text-white/40 group-hover:text-white/90 transition">
                            ✕
                          </button>
                        </div>
                      ))}
                      <button className="w-full flex items-center justify-center gap-2 text-sm text-sky-300 border border-dashed border-sky-400/30 rounded-xl py-2 hover:border-solid hover:bg-sky-400/10 transition">
                        + Add trigger
                      </button>
                    </div>
                  </div>

                  {/* Responses */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur p-5">
                    <h3 className="text-lg font-semibold text-white/90 mb-4">
                      Responses
                    </h3>
                    <div className="space-y-3">
                      {[
                        "Hello! How can I help?",
                        "Here’s a joke for you 😄"
                      ].map((r) => (
                        <div
                          key={r}
                          className="group bg-white/5 rounded-xl px-3 py-3 transition hover:bg-white/10"
                        >
                          <p className="text-sm text-white/80">{r}</p>
                          <div className="flex gap-2 mt-2">
                            <button className="text-xs px-2 py-1 bg-sky-500/10 text-sky-300 rounded-md hover:bg-sky-500/20 transition">
                              Edit
                            </button>
                            <button className="text-xs px-2 py-1 bg-red-500/10 text-red-300 rounded-md hover:bg-red-500/20 transition">
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                      <button className="w-full flex items-center justify-center gap-2 text-sm text-indigo-300 border border-dashed border-indigo-400/30 rounded-xl py-2 hover:border-solid hover:bg-indigo-400/10 transition">
                        + Add response
                      </button>
                    </div>
                  </div>

                  {/* Save / Discard */}
                  <footer className="flex gap-3 justify-end">
                    <button className="px-5 py-2 text-sm rounded-xl bg-white/10 text-white/90 hover:bg-white/20 transition">
                      Discard
                    </button>
                    <button className="px-5 py-2 text-sm rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 text-white font-semibold hover:from-indigo-600 hover:to-sky-600 transition shadow-lg shadow-indigo-500/25">
                      Save Changes
                    </button>
                  </footer>
                </section>
              </main>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
