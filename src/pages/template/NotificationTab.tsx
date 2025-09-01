import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Bell } from "lucide-react";

export default function NotificationTab() {
  return (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-3xl border border-border shadow-xl">
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
}