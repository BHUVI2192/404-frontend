import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  ChevronLeft,
  User,
  Shield,
  Download,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

const Settings = () => {
  const [incognitoMode, setIncognitoMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "john@example.com",
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleExportData = () => {
    toast.success("Data export started. You'll receive an email soon.");
  };

  const handleDeleteAccount = () => {
    toast.error("Account deleted");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              404
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Settings</h1>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-muted">
              <TabsTrigger value="profile">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Shield className="w-4 h-4 mr-2" />
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="p-6 gradient-card border-0 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                  <Button
                    onClick={handleSaveProfile}
                    className="gradient-accent shadow-glow"
                  >
                    Save Changes
                  </Button>
                </div>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-6">
              <Card className="p-6 gradient-card border-0 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start justify-between space-x-4 p-4 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-accent" />
                        <h3 className="font-semibold">Incognito Mode</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        When enabled, your session data will not be saved. This ensures
                        complete privacy for your work sessions.
                      </p>
                    </div>
                    <Switch
                      checked={incognitoMode}
                      onCheckedChange={(checked) => {
                        setIncognitoMode(checked);
                        toast.success(
                          checked
                            ? "Incognito mode enabled"
                            : "Incognito mode disabled"
                        );
                      }}
                    />
                  </div>

                  <div className="pt-6 border-t space-y-4">
                    <h3 className="font-semibold text-lg">Data Management</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button
                        variant="outline"
                        onClick={handleExportData}
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export My Data
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" className="flex-1">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete My Account
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-card">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete
                              your account and remove all your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete Account
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
