import { useState, useEffect } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  LayoutDashboard,
  Bot,
  Settings,
  Bell,
  HelpCircle,
  Headphones,
  Sparkles
} from "lucide-react";

import DashboardTab from "./template/DashboardTab";
import MyBotsTab from "./template/MyBotsTab";
import SettingsTab from "./template/SettingsTab";
import NotificationTab from "./template/NotificationTab";
import HelpTab from "./template/HelpTab";
import SupportTab from "./template/SupportTab";
import AIHelpTab from "./template/AIHelpTab";

const LoadingSkeleton = () => (
  <div className="flex-1">
    <div className="p-6 rounded-3xl">
      <Skeleton className="h-8 w-3/4 rounded-xl mb-4" />
      <div className="space-y-3">
        <Skeleton className="h-4 rounded-xl" />
        <Skeleton className="h-4 rounded-xl w-5/6" />
        <Skeleton className="h-4 rounded-xl w-2/3" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-40 rounded-3xl" />
        ))}
      </div>
      <Skeleton className="h-10 w-32 rounded-xl mt-6" />
    </div>
  </div>
);

export default function Template() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden text-white h-full select-none mt-3">
      <div className="p-4">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex flex-col md:flex-row"
        >
          <TabsList className="w-auto flex flex-row md:flex-col overflow-auto items-center justify-start pb-0 pt-1.5 pl-1.5 pr-1.5 md:p-2 md:mx-2 mx-0 bg-[#85858510] backdrop-blur border border-border shadow-xl rounded-3xl transparent-scrollbar">
            <TabsTrigger
              value="dashboard"
              className="px-3 py-2 text-sm md:text-base md:text-left flex items-center gap-2 rounded-2xl"
            >
              <LayoutDashboard className="h-4 w-4 md:h-5 md:w-5" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger
              value="mybots"
              className="px-3 py-2 text-sm md:text-base md:text-left flex items-center gap-2 rounded-2xl"
            >
              <Bot className="h-4 w-4 md:h-5 md:w-5" />
              My Bots
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="px-3 py-2 text-sm md:text-base md:text-left flex items-center gap-2 rounded-2xl"
            >
              <Settings className="h-4 w-4 md:h-5 md:w-5" />
              Settings
            </TabsTrigger>
            <TabsTrigger
              value="notification"
              className="px-3 py-2 text-sm md:text-base md:text-left flex items-center gap-2 rounded-2xl"
            >
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              Notification
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="px-3 py-2 text-sm md:text-base md:text-left flex items-center gap-2 rounded-2xl"
            >
              <HelpCircle className="h-4 w-4 md:h-5 md:w-5" />
              Help
            </TabsTrigger>
            <TabsTrigger
              value="support"
              className="px-3 py-2 text-sm md:text-base md:text-left flex items-center gap-2 rounded-2xl"
            >
              <Headphones className="h-4 w-4 md:h-5 md:w-5" />
              Support
            </TabsTrigger>
            <TabsTrigger
              value="aihelp"
              className="px-3 py-2 mb-auto text-sm md:text-base md:text-left flex items-center gap-2 rounded-2xl"
            >
              <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
              AI Help
            </TabsTrigger>
          </TabsList>

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

function setIsAddingCommand(arg0: boolean): void {
  throw new Error("Function not implemented.");
}
