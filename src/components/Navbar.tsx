import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Circle, Play, Pause, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlassSurface from "./GlassSurface/GlassSurface";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAnimation } from "@/hooks/useAnimation";
import { useAuth } from "@/contexts/AuthContext";

const mainNavItems = [
  { label: "Templates", to: "/Template" },
  { label: "My Services", to: "/services" },
  { label: "Cases", to: "/cases" },
  { label: "Contact", to: "/contact" },
];

const versions = [
  { label: "2.4v", value: "2.4", status: "R" },
  { label: "2.3v", value: "2.3", status: "R" },
  { label: "2.2v", value: "2.2", status: "B" },
  { label: "2.1v", value: "2.1", status: "B" },
  { label: "1.1v", value: "1.1", status: "A" },
];

function getVersionStatusStyle(status: string) {
  switch (status) {
    case "R": 
      return "bg-green-500/20 text-green-500";
    case "B": 
      return "bg-yellow-500/20 text-yellow-500";
    case "A": 
      return "bg-red-500/20 text-red-500";
    default:
      return "bg-gray-500/20 text-gray-500";
  }
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isRTL } = useLanguage();
  const { animationsEnabled, toggleAnimations } = useAnimation();
  const { isAuthenticated, user } = useAuth();
  const specialNavItems = isAuthenticated ? [] : [{ label: "SignIn", to: "/auth" }];

  return (
    <nav
      className="sticky top-5 z-50 flex justify-center items-center w-full px-2"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <GlassSurface
        displace={1.5}
        distortionScale={-160}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        brightness={66}
        opacity={1}
        backgroundOpacity={0.5}
        mixBlendMode="color"
        borderRadius={9999}
        className="mb-4 w-full max-w-4xl"
      >
        <div className="flex justify-between items-center p-0 md:p-2 w-full">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-2">
            <Circle className="w-8 h-8 text-primary" />
            <span className="text-lg mt-[1px]">BotU</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <ul className="flex gap-1 items-center">
              {/* Main navigation items */}
              {mainNavItems.map(({ label, to }) => (
                <li key={to}>
                  <Button
                    className="text-md font-light rounded-full"
                    asChild
                    variant="ghost"
                    size="sm"
                  >
                    <Link to={to}>{label}</Link>
                  </Button>
                </li>
              ))}
            </ul>

            <div className="flex gap-1 items-center">
              <Button
                className="rounded-full"
                size="sm"
                variant={"ghost"}
                onClick={toggleAnimations}
                aria-label={
                  animationsEnabled
                    ? "Disable animations"
                    : "Enable animations"
                }
              >
                {animationsEnabled ? <Pause size={18} /> : <Play size={18} />}
              </Button>

              {isAuthenticated && user ? (
                <Button
                  className="text-md font-light rounded-full"
                  size="sm"
                  variant={"default"}
                >
                  {user.username}
                </Button>
              ) : (
                specialNavItems.map(({ label, to }) => (
                  <div key={to}>
                    <Button
                      className="text-md font-light rounded-full"
                      asChild
                      size="sm"
                      variant={"default"}
                    >
                      <Link to={to}>{label}</Link>
                    </Button>
                  </div>
                ))
              )}

              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="rounded-full flex items-center gap-1"
                      size="sm"
                      variant="default"
                    >
                      <span>2.4v</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-32 bg-transparent backdrop-blur-sm border-transparent"
                  >
                    {versions.map((version) => (
                      <DropdownMenuItem
                        key={version.value}
                        className="flex justify-between items-center cursor-default bg-background/30"
                      >
                        <span>{version.label}</span>
                        <span
                          className={`flex items-center justify-center rounded-full w-5 h-5 text-xs font-bold ${getVersionStatusStyle(
                            version.status
                          )}`}
                        >
                          {version.status}
                        </span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleAnimations}
              aria-label={
                animationsEnabled ? "Disable animations" : "Enable animations"
              }
            >
              {animationsEnabled ? <Pause size={20} /> : <Play size={20} />}
            </Button>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={isRTL ? "left" : "right"}
                className="rounded-lg"
              >
                <SheetHeader>
                  <SheetTitle className="text-left -mb-5">
                    Navigation
                  </SheetTitle>
                </SheetHeader>
                <Separator />
                <div className="flex flex-col gap-3 justify-center items-center text-center">
                  {mainNavItems.map(({ label, to }) => (
                    <Button
                      key={to}
                      variant="outline"
                      className="w-[90%]"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to={to}>{label}</Link>
                    </Button>
                  ))}
                </div>
                <Separator />
                <div className="flex flex-col gap-3 justify-center items-center text-center">
                  {specialNavItems.map(({ label, to }) => (
                    <Button
                      key={to}
                      className="w-[90%]"
                      asChild
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link to={to}>{label}</Link>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </GlassSurface>
    </nav>
  );
}

export default Navbar;
