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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Bot, 
  Cog, 
  Palette, 
  Terminal, 
  Brain, 
  Cpu, 
  Edit, 
  Plus, 
  List, 
  Check, 
  X,
  MessageSquare
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type Command = {
  id: number;
  name: string;
  description: string;
  response: string;
  permissions: string;
  is_active: boolean;
};

type BotFutherTokens = {
  token1: string;
  token2: string;
  token3: string;
  token4: string;
  token5: string;
};

type BotType = {
  id: number;
  name: string;
  status: string;
  color: string;
  initials: string;
  avatar?: string;
  user?: string;
};

export default function MyBotsTab() {
  const [commands, setCommands] = useState<Command[]>([
    {
      id: 1,
      name: "/welcome",
      description: "Welcomes new users",
      response: "Welcome to the server!",
      permissions: "everyone",
      is_active: true,
    },
    {
      id: 2,
      name: "/info",
      description: "Shows server info",
      response: "This is a cool server!",
      permissions: "admins",
      is_active: false,
    },
  ]);

  const [botFutherTokens, setBotFutherTokens] = useState<BotFutherTokens>({
    token1: "",
    token2: "",
    token3: "",
    token4: "",
    token5: ""
  });
  
  const [bots, setBots] = useState<BotType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBotId, setSelectedBotId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedBotAvatar, setSelectedBotAvatar] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch("http://localhost:8000/auth/bots/");
        const data = await response.json();
        const userBots = data.filter((bot: any) => bot.user === user?.username);
        setBots(userBots.map((bot: any) => ({
          id: bot.id,
          name: bot.name,
          status: bot.status,
          color: bot.color,
          initials: bot.initials,
          avatar: bot.avatar,
          user: bot.user
        })));
      } catch (error) {
        console.error("Error fetching bots:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBots();
    }
  }, [user]);
  
  const [isAddingCommand, setIsAddingCommand] = useState(false);
  const [newCommand, setNewCommand] = useState({
    name: "",
    description: "",
    response: "",
    permissions: "everyone",
    is_active: true,
  });

  const handleAddCommand = () => {
    if (!newCommand.name || !newCommand.response) {
      alert("Command name and response are required!");
      return;
    }
    setCommands([
      ...commands,
      {
        id: commands.length + 1,
        ...newCommand,
      },
    ]);
    setNewCommand({
      name: "",
      description: "",
      response: "",
      permissions: "everyone",
      is_active: true,
    });
    setIsAddingCommand(false);
  };
  
  const handleSaveBotFuterTokens = () => {
    console.log("Saving BotFuther tokens:", botFutherTokens);
    alert("BotFuther API tokens saved successfully!");
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedBotAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const BotStatusItem = ({
    name,
    status,
    color,
    initials,
    id,
    avatar
  }: {
    name: string;
    status: string;
    color: string;
    initials: string;
    id: number;
    avatar?: string;
  }) => (
    <div 
      className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-all ${
        selectedBotId === id 
          ? "bg-primary/20 border border-primary" 
          : "hover:bg-muted/50"
      }`}
      onClick={() => setSelectedBotId(id)}
    >
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-sm font-medium">{name}</span>
      <span className="text-xs text-muted-foreground">({status})</span>
      <Avatar className="h-6 w-6">
        {avatar ? (
          <AvatarImage src={avatar} />
        ) : (
          <AvatarFallback>{initials}</AvatarFallback>
        )}
      </Avatar>
    </div>
  );

  return (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-3xl border border-border shadow-xl">
      <CardHeader className="flex flex-col lg:flex-row items-start justify-between">
        <div className="flex-1">
          <CardTitle className="text-2xl md:text-3xl font-bold">
            Edit Bot Configuration
          </CardTitle>
          <CardDescription className="mt-2">
            Customize your bot's behavior and appearance
          </CardDescription>
        </div>
        {/* TODO: fix the card styles */}
        <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0 mt-4 lg:mt-0 w-full lg:w-auto">
          {loading ? (
            <p>Loading bots...</p>
          ) : bots.length > 0 ? (
            bots.map((bot) => (
              <BotStatusItem
                key={bot.id}
                id={bot.id}
                name={bot.name}
                status={bot.status}
                color={bot.color}
                initials={bot.initials}
                avatar={bot.avatar}
              />
            ))
          ) : (
            <p>No bots available</p>
          )}
        </div>
      </CardHeader>

      <Separator className="mt-4" />

      <CardContent>
        {selectedBotId ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <Card className="bg-[#0000005b] backdrop-blur border-border hover:border-primary/50 transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cog className="mr-2 h-5 w-5 text-primary" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground mb-1">
                      Bot Token
                    </Label>
                    {selectedBotId ? (
                      <Input
                        id="bot-token"
                        className="bg-muted/40 border-border"
                        placeholder={`Enter the ${bots.find(bot => bot.id === selectedBotId)?.name} token from the BotFather`}
                      />
                    ) : (
                      <Input
                        id="bot-token"
                        className="bg-muted/40 border-border"
                        placeholder="Select a bot first"
                        disabled
                      />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="bot-name" className="text-muted-foreground mb-1">
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
                    <Label htmlFor="bot-desc" className="text-muted-foreground mb-1">
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
                    {/* TODO: the user be able to make the bot active or deactive from this toggle */}
                    <div>
                      <Label className="text-muted-foreground mb-1">Bot Status</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="bot-status" defaultChecked />
                        <Label htmlFor="bot-status">Active</Label>
                      </div>
                    </div>
                    <div>
                      <Label className="text-muted-foreground mb-1">Public Bot</Label>
                      <div className="flex items-center space-x-2">
                        <Switch id="public-bot" />
                        <Label htmlFor="public-bot" className="text-muted-foreground">
                          Private
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <Button variant="default" className="gap-2" onClick={handleSaveBotFuterTokens}>
                      <Check className="h-4 w-4" />
                      Save Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>

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
                        <Avatar 
                          className="bg-primary w-14 h-14 cursor-pointer"
                          onClick={handleAvatarClick}
                        >
                          {selectedBotAvatar ? (
                            <AvatarImage src={selectedBotAvatar} />
                          ) : (
                            <AvatarFallback className="text-primary-foreground">
                              B
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-1 bg-primary hover:bg-primary/90"
                          onClick={handleAvatarClick}
                        >
                          <Edit className="h-3 w-3 text-primary-foreground" />
                        </Button>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="default" className="gap-2" onClick={handleAvatarClick}>
                          <Edit className="h-4 w-4" />
                          Upload Image
                        </Button>
                        <Button variant="secondary" className="gap-2">
                          <Terminal className="h-4 w-4" />
                          Generate AI Avatar
                        </Button>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#0000005b] backdrop-blur border-border hover:border-primary/50 transition-all">
                <CardHeader>
                  {/* TODO: the user be able to select the items */}
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

            <Card className="bg-[#0000005b] backdrop-blur border-border mb-8">
              <CardHeader>
                {/* TODO: add the gemini api too and add the toggle to here so whcih when it was toggled the bot answers with the AI  */}
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

                <div className="mt-6 md:mt-8">
                  <Label className="text-muted-foreground mb-3 block">
                    Model Capabilities
                  </Label>
                  <div className="overflow-x-auto bg-[#ffffff00] backdrop-blur rounded-3xl">
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

            <Card className="bg-[#0000005b] backdrop-blur border-border mb-8">
              <CardHeader className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="flex items-center">
                  <Terminal className="mr-2 h-5 w-5 text-primary" />
                  Custom Commands
                </CardTitle>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <Button
                    variant="default"
                    className="gap-2"
                    onClick={() => setIsAddingCommand(true)}
                  >
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
                {isAddingCommand && (
                  <Card className="mb-4 bg-[#ffffff11] backdrop-blur border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Command</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="command-name">Command Name</Label>
                        <Input
                          id="command-name"
                          placeholder="/help"
                          value={newCommand.name}
                          onChange={(e) =>
                            setNewCommand({ ...newCommand, name: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="command-description">Description</Label>
                        <Input
                          id="command-description"
                          placeholder="What does this command do?"
                          value={newCommand.description}
                          onChange={(e) =>
                            setNewCommand({
                              ...newCommand,
                              description: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="command-response">Response</Label>
                        <Textarea
                          id="command-response"
                          placeholder="Bot response when command is used"
                          value={newCommand.response}
                          onChange={(e) =>
                            setNewCommand({ ...newCommand, response: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="command-permissions">Permissions</Label>
                        <select
                          id="command-permissions"
                          className="w-full p-2 rounded border bg-background"
                          value={newCommand.permissions}
                          onChange={(e) =>
                            setNewCommand({
                              ...newCommand,
                              permissions: e.target.value,
                            })
                          }
                        >
                          <option value="everyone">Everyone</option>
                          <option value="admins">Admins Only</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="command-active"
                          checked={newCommand.is_active}
                          onCheckedChange={(checked) =>
                            setNewCommand({ ...newCommand, is_active: checked })
                          }
                        />
                        <Label htmlFor="command-active">Active</Label>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingCommand(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={handleAddCommand}>Save Command</Button>
                    </CardFooter>
                  </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {commands.map((command) => (
                    <Card
                      key={command.id}
                      className="bg-[#ffffff11] backdrop-blur border-border hover:border-primary transition-colors"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg font-mono">
                            {command.name}
                          </CardTitle>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4 text-primary" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-destructive">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground mb-3">
                          {command.description || "No description"}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            {command.permissions === "admins"
                              ? "Admins Only"
                              : "Everyone"}
                          </Badge>
                          <Badge
                            className={
                              command.is_active
                                ? "bg-green-500/20 text-green-500"
                                : "bg-yellow-500/20 text-yellow-500"
                            }
                          >
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                command.is_active ? "bg-green-500" : "bg-yellow-500"
                              }`}
                            ></div>
                            {command.is_active ? "Active" : "Disabled"}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {commands.length === 0 && !isAddingCommand && (
                    <div className="flex flex-col items-center justify-center py-12 text-center col-span-full">
                      <Terminal className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold mb-2">
                        No commands created
                      </h3>
                      <p className="text-muted-foreground max-w-md">
                        Get started by adding your first custom command. Commands will
                        appear here once created.
                      </p>
                      <Button
                        className="mt-4 gap-2"
                        onClick={() => setIsAddingCommand(true)}
                      >
                        <Plus className="h-4 w-4" />
                        Create First Command
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

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
                <CardContent className="bg-muted/20 rounded-3xl p-4 h-64 overflow-y-auto">
                  <div className="space-y-4">
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-3xl p-3 max-w-[80%]">
                        What can you help me with?
                      </div>
                    </div>
                    <div className="flex">
                      <Avatar className="mr-2 h-6 w-6">
                        <AvatarFallback>B</AvatarFallback>
                      </Avatar>
                      <div className="bg-secondary text-secondary-foreground rounded-3xl p-3 max-w-[80%]">
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Bot className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-2xl font-semibold mb-2">No Bot Selected</h3>
            <p className="text-muted-foreground max-w-md text-center">
              Please select one of your bots from the list above to view and edit its configuration.
            </p>
          </div>
        )}
      </CardContent>

      {selectedBotId && (
        <>
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
        </>
      )}
    </Card>
  );
}