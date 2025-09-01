import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
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
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Cog, Edit, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsTab() {
  const { user } = useAuth();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    toast.success("Password changed successfully!");
    setIsPasswordDialogOpen(false);
    
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Card className="bg-[#85858510] backdrop-blur-xl rounded-3xl border border-border shadow-xl">
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
            <Card className="bg-[#0000005b] backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Username</Label>
                    <Input defaultValue={user?.username || "user123"} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input defaultValue={user?.username ? `${user.username}@example.com` : "user@example.com"} type="email" />
                  </div>
                  <div>
                    <Label>Timezone</Label>
                    <Input defaultValue="UTC+00:00" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#0000005b] backdrop-blur border-border">
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label>Password</Label>
                    <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full mt-1">
                          Reset Password
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Change Password</DialogTitle>
                          <DialogDescription>
                            Enter your current password and a new password below.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="old-password" className="text-right">
                              Old Password
                            </Label>
                            <Input
                              id="old-password"
                              type="password"
                              value={oldPassword}
                              onChange={(e) => setOldPassword(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="new-password" className="text-right">
                              New Password
                            </Label>
                            <Input
                              id="new-password"
                              type="password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="confirm-password" className="text-right">
                              Confirm New
                            </Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="col-span-3"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button onClick={handlePasswordChange}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
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

          {/* TODO: show all of the APIs or Keys in here */}
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
              {/* TODO: in here open the popup windows for adding new keys (add some defult APIs for the example deepseep gemini bot tockens and ... ) */}
              <Button className="mt-4 gap-2">
                <Plus className="h-4 w-4" />
                Create New API Key
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}