import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Terminal, Check, List, Cpu, Brain, Sparkles, Edit, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

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

type QuickActionProps = {
  icon: React.ReactNode;
  label: string;
  color: string;
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

const StatCard = ({ title, value, icon, change, color }: StatCardProps) => (
  <Card className="bg-[#0000005b] backdrop-blur border border-border">
    <div className="flex justify-between items-start p-4">
      <span className="text-xs text-muted-foreground">{title}</span>
      <div className={`p-1 rounded-full ${color}`}>{icon}</div>
    </div>
    <div className="px-4 pb-4 flex items-baseline">
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
  <div className="flex items-center justify-between p-2 rounded-2xl bg-muted/20 border border-border/30">
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
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </Button>
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

export default function DashboardTab() {
  const { user } = useAuth();
  const [bots, setBots] = useState<BotType[]>([]);
  const [loading, setLoading] = useState(true);

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
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-4 border border-border rounded-3xl p-4 bg-[#ffffff08] backdrop-blur">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* TODO: fix the card icons */}
        <StatCard
          title="Total Bots"
          value="12"
          icon={<Bot className="h-4 w-4 text-white" />}
          change="+2.5%"
          color="bg-blue-500"
        />
        <StatCard
          title="Active Commands"
          value="142"
          icon={<Terminal className="h-4 w-4 text-white" />}
          change="+5.2%"
          color="bg-green-500"
        />
        <StatCard
          title="Handled Messages"
          value="1.2K"
          icon={<MessageSquare className="h-4 w-4 text-white" />}
          change="+12.4%"
          color="bg-purple-500"
        />
        <StatCard
          title="Avg. Response Time"
          value="0.8s"
          icon={<Cpu className="h-4 w-4 text-white" />}
          change="-0.1s"
          color="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-[#0000005b] backdrop-blur border border-border">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="grid grid-cols-3 gap-2">
              <QuickAction
                icon={<Bot className="h-4 w-4" />}
                label="New Bot"
                color="from-blue-500/20 to-blue-700/20"
              />
              <QuickAction
                icon={<Terminal className="h-4 w-4" />}
                label="Add Command"
                color="from-green-500/20 to-green-700/20"
              />
              <QuickAction
                icon={<Edit className="h-4 w-4" />}
                label="Edit Flow"
                color="from-purple-500/20 to-purple-700/20"
              />
              <QuickAction
                icon={<List className="h-4 w-4" />}
                label="View Logs"
                color="from-orange-500/20 to-orange-700/20"
              />
              <QuickAction
                icon={<Check className="h-4 w-4" />}
                label="Run Test"
                color="from-teal-500/20 to-teal-700/20"
              />
              <QuickAction
                icon={<Cpu className="h-4 w-4" />}
                label="AI Settings"
                color="from-pink-500/20 to-pink-700/20"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#0000005b] backdrop-blur border border-border">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center">
              <Bot className="mr-2 h-4 w-4 text-primary" />
              Bot Status
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-2">
              {loading ? (
                <div className="text-center py-4 text-muted-foreground">
                  Loading bots...
                </div>
              ) : bots.length > 0 ? (
                bots.map((bot) => (
                  <BotStatusItem
                    key={bot.id}
                    name={bot.name}
                    status={bot.status}
                    color={bot.color}
                    initials={bot.initials}
                  />
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No bots found. Create your first bot!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-[#0000005b] backdrop-blur border border-border">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base flex items-center">
              <List className="mr-2 h-4 w-4 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-xs">
              Last 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start p-2 rounded-2xl bg-muted/20 border border-border/30">
                  <div className="mt-0.5 mr-3">
                    <div className="bg-primary/10 p-1.5 rounded-full">
                      <Terminal className="h-3 w-3 text-primary" />
                    </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <Card className="bg-[#0000005b] backdrop-blur border border-border">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base flex items-center">
                <Cpu className="mr-2 h-4 w-4 text-primary" />
                Usage Trends
              </CardTitle>
              <CardDescription className="text-xs">
                Last 7 days command usage
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="h-40 flex items-end justify-between">
                {[40, 75, 60, 85, 55, 90, 70].map((value, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center flex-1 mx-0.5 border border-border"
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

          <Card className="bg-[#0000005b] backdrop-blur border border-border">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-base flex items-center text-neutral-200">
                <Brain className="mr-2 h-4 w-4 text-neutral-400" />
                AI Model Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="h-40 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(
                #d1d5db 0% 45%, 
                #9ca3af 45% 75%, 
                #6b7280 75% 100%
              )`,
                    }}
                  ></div>
                  <div className="absolute inset-4 bg-[#0000005b] backdrop-blur rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">AI Models</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 space-y-1">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-300 rounded-full mr-1"></div>
                    <span className="text-[10px]">Gemini Pro</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-1"></div>
                    <span className="text-[10px]">GPT-4</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-1"></div>
                    <span className="text-[10px]">Claude</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}