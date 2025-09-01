// TODO: add support table into the database (Users be able to send Tickets to the Support Team)
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, LifeBuoy } from "lucide-react";

export default function SupportTab() {
  return (
    <Card className="bg-[#85858510] backdrop-blur-xl rounded-3xl border border-border shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <LifeBuoy className="mr-2 h-5 w-5" />
          Support Center
        </CardTitle>
        <CardDescription>Contact our support team for assistance</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div className="border border-dashed rounded-3xl p-4 text-center cursor-pointer hover:bg-muted/10 transition-colors">
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

          <Card className="bg-[#0000005b] backdrop-blur border-border">
            <CardHeader>
              <CardTitle>Support Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Community Forum</h4>
                  <p className="text-muted-foreground text-sm mt-1">
                    Connect with other developers and get help from the community
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
}