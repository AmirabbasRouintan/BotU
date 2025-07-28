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

const mainNavItems = [
  { label: "Templates", to: "/Template" },
  { label: "My Services", to: "/services" },
  { label: "Cases", to: "/cases" },
  { label: "Contact", to: "/contact" }
];

const specialNavItems = [{ label: "SignIn", to: "/auth" }];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-5 z-50 flex justify-center items-center">
      <div className="mb-4 mx-2 p-2 w-full md:w-fit flex justify-between gap-0 md:gap-36 border rounded-full backdrop-blur-sm">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2">
          <Circle className="w-8 h-8 text-primary" />
          <span className="text-lg mt-[1px]">BotU</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-1 items-center">
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

          {/* Special buttons with custom styling */}
          <div className="flex gap-1 items-center">
            {specialNavItems.map(({ label, to }) => (
              <li key={to}>
                <Button
                  className="text-md font-light rounded-full"
                  asChild
                  size="sm"
                  variant={"default"}
                >
                  <Link to={to}>{label}</Link>
                </Button>
              </li>
            ))}

            <li>
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
            </li>
          </div>
        </ul>

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="rounded-lg">
              <SheetHeader>
                <SheetTitle className="text-left -mb-5">Navigation</SheetTitle>
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
    </nav>
  );
}

export default Navbar;
