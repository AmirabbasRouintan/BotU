import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HelpCircle } from "lucide-react";

export default function HelpTab() {
  return (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-3xl border border-border shadow-xl">
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
                Go to the "My Bots" section and click "Create New Bot". Follow the
                setup wizard to configure your bot.
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
}