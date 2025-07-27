import { useState, type FormEvent, type ChangeEvent } from "react";
import { Tabs } from "@/components/ui/tabs";
import { TabsContent } from "@/components/ui/tabs";
import { TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Threads from "@/Backgrounds/Threads/Threads";
import {
  Lock,
  Mail,
  User,
  X,
  Check,
  Github,
  Chrome,
  Facebook,
  Key,
  UserPlus,
  Eye,
  EyeOff,
  Info,
  AlertCircle,
  BookOpen
} from "lucide-react";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clearForm = () => {
    // Form clearing logic would go here
  };

  const handleTabChange = (value: string) => {
    if (value === "login" || value === "signup") {
      setActiveTab(value);
    }
  };

  // Add type annotation for the event
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    // Simple password strength calculation
    let strength = 0;
    if (password.length > 5) strength++;
    if (password.length > 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  // Add type annotation for the event
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const renderPasswordStrength = () => {
    if (!passwordStrength) return null;

    const strengthText = [
      "Very Weak",
      "Weak",
      "Medium",
      "Strong",
      "Very Strong"
    ][passwordStrength - 1];

    const strengthColors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-green-400",
      "bg-green-600"
    ];

    return (
      <div className="mt-2 mx-1">
        <div className="flex items-center gap-2 mb-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => {
              const isActive = i < passwordStrength;
              const bgColor = isActive ? strengthColors[i] : "bg-muted";
              const shadowColor = isActive
                ? {
                    0: "shadow-[0_0_10px_#ef4444]",
                    1: "shadow-[0_0_10px_#fb923c]",
                    2: "shadow-[0_0_10px_#facc15]",
                    3: "shadow-[0_0_10px_#4ade80]",
                    4: "shadow-[0_0_10px_#16a34a]"
                  }[i]
                : "";

              return (
                <div
                  key={i}
                  className={`h-1 w-6 rounded-sm ${bgColor} ${shadowColor}`}
                />
              );
            })}
          </div>
          <span
            className={`text-xs font-medium ${
              passwordStrength < 3
                ? "text-red-500"
                : passwordStrength < 4
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {strengthText}
          </span>
        </div>

        <div className="text-xs text-muted-foreground flex items-start gap-1 mt-1">
          <Info size={12} className="mt-0.5 flex-shrink-0" />
          <span>
            {passwordStrength < 3
              ? "Use at least 8 characters with numbers and symbols"
              : "Good password!"}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-[90vh] flex items-center overflow-y-hidden justify-center">
      <div className="fixed -left-[30rem] inset-0 z-[0]">
        <Threads amplitude={2} distance={0} enableMouseInteraction={false} />
      </div>
      <div className="w-full max-w-md mx-auto">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <Card className="bg-card border-border rounded-3xl shadow-xl overflow-hidden w-full relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-white"></div>
            <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-primary/10 blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-white/10 blur-xl"></div>

            <CardHeader className="pb-3">
              <div className="flex justify-center mb-3">
                <div className="bg-primary/10 p-3 rounded-full shadow-inner">
                  <Key className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-foreground">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </CardTitle>
            </CardHeader>

            <TabsList className="grid w-auto grid-cols-2 bg-muted/20 mx-4 rounded-xl shadow-inner">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-xl transition-all"
              >
                Sign In
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm rounded-xl transition-all"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            <CardContent className="">
              {/* Login Form */}
              <TabsContent value="login" className="mt-3">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-foreground/80 flex items-center gap-1">
                        Username or Email
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Enter your username or email"
                          className="pl-10 h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-foreground/80 flex items-center gap-1">
                          Password
                          <span className="text-red-500">*</span>
                        </Label>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-primary px-0 hover:text-primary/80 text-xs h-auto"
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showLoginPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 h-11 pr-10"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
                          onClick={() =>
                            setShowLoginPassword(!showLoginPassword)
                          }
                        >
                          {showLoginPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) =>
                            setRememberMe(!!checked)
                          }
                          className="h-4 w-4"
                        />
                        <Label
                          htmlFor="remember"
                          className="ml-2 text-sm text-foreground/80"
                        >
                          Remember me
                        </Label>
                      </div>

                      <div className="flex items-center gap-1 text-xs bg-yellow-500/10 px-2 py-1 rounded text-yellow-600">
                        <AlertCircle size={14} />
                        <span>Secure connection</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-1 h-11 shadow-sm"
                      onClick={clearForm}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                      Clear
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 gap-1 bg-primary hover:bg-primary/90 h-11 shadow-md shadow-primary/30 transition-all"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </div>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          Sign In
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Signup Form */}
              <TabsContent value="signup" className="mt-3">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-foreground/80 flex items-center gap-1">
                        Username
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Create a username"
                          className="pl-10 h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground/80 flex items-center gap-1">
                        Email
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 h-11"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-foreground/80 flex items-center gap-1">
                        Password
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showSignupPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 h-11 pr-10"
                          onChange={handlePasswordChange}
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
                          onClick={() =>
                            setShowSignupPassword(!showSignupPassword)
                          }
                        >
                          {showSignupPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                      {renderPasswordStrength()}
                    </div>

                    <div className="flex items-center pt-1">
                      <Checkbox
                        id="terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                        className="h-4 w-4"
                      />
                      <Label
                        htmlFor="terms"
                        className="ml-2 text-sm text-foreground/80"
                      >
                        I agree to the{" "}
                        <Button
                          variant="link"
                          className="text-primary hover:text-primary/80 p-0 h-auto text-sm"
                          onClick={() => setIsTermsModalOpen(true)}
                        >
                          terms and conditions
                        </Button>
                      </Label>
                    </div>
                  </div>
                  <Separator className="my-5 bg-border" />
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 gap-1 h-11 shadow-sm"
                      onClick={clearForm}
                      type="button"
                    >
                      <X className="h-4 w-4" />
                      Clear
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 gap-1 bg-primary hover:bg-primary/90 h-11 shadow-md shadow-primary/30 transition-all"
                      disabled={!agreeTerms || isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        </div>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4" />
                          Sign Up
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <Separator className="my-5 bg-border" />

              {/* Social Login */}
              <div className="">
                <p className="pb-3 text-center text-sm text-muted-foreground">
                  or continue with
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    className="gap-1 bg-background hover:bg-muted h-10 shadow-sm"
                  >
                    <Chrome className="h-4 w-4 text-blue-500" />
                    <span className="text-xs">Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-1 bg-background hover:bg-muted h-10 shadow-sm"
                  >
                    <Facebook className="h-4 w-4 text-blue-700" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-1 bg-background hover:bg-muted h-10 shadow-sm"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-xs">GitHub</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {activeTab === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Button
            variant="link"
            size="sm"
            className="text-primary px-0 hover:text-primary/80 text-sm font-medium"
            onClick={() =>
              setActiveTab(activeTab === "login" ? "signup" : "login")
            }
          >
            {activeTab === "login" ? "Sign up now" : "Sign in"}
          </Button>
        </p>
      </div>

      {isTermsModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Terms & Conditions
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsTermsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="prose prose-sm max-h-60 overflow-y-auto text-muted-foreground">
              <p>By using our service, you agree to the following terms:</p>
              <ul className="mt-2 space-y-1">
                <li>
                  You are responsible for maintaining the security of your
                  account
                </li>
                <li>You must be at least 13 years old to use this service</li>
                <li>
                  You agree not to misuse the service or access others' accounts
                </li>
                <li>We may update these terms periodically</li>
                <li>
                  Your data will be handled according to our Privacy Policy
                </li>
              </ul>
              <p className="mt-3">
                These terms were last updated on July 27, 2025.
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <Button onClick={() => setIsTermsModalOpen(false)}>
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
