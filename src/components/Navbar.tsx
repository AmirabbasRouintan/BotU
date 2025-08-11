import { useState } from "react";
import { Link } from "react-router-dom";
import { Github, Menu, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import GlassSurface from "./GlassSurface/GlassSurface";
import { useLanguage } from "@/contexts/LanguageContext";

const mainNavItems = [
  { label: "Templates", to: "/Template" },
  { label: "My Services", to: "/services" },
  { label: "Cases", to: "/cases" },
  { label: "Contact", to: "/contact" }
];

const specialNavItems = [{ label: "SignIn", to: "/auth" }];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isRTL } = useLanguage();

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

            {/* Special buttons with custom styling */}
            <div className="flex gap-1 items-center">
              {specialNavItems.map(({ label, to }) => (
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
              ))}

              <div>
                <Button
                  className="rounded-full"
                  asChild
                  size="sm"
                  variant={"default"}
                >
                  <a
                    href="https://github.com/FreaksLxss"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={18} />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center gap-2">
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
                  {/* Main navigation items */}
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

                  <Button className="w-[90%]" asChild>
                    <a
                      href="https://github.com/FreaksLxss"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center gap-2">
                        <Github size={18} />
                        <span>GitHub</span>
                      </div>
                    </a>
                  </Button>
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
