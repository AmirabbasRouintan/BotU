import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import pfp from "@/assets/pfp.jpg";
import MetaBalls from "@/Animations/MetaBalls/MetaBalls";

const navItems = [
  { label: "SignIn", to: "/auth" },
  { label: "Templates", to: "/Template" },
  { label: "My Services", to: "/services" },
  { label: "Cases", to: "/cases" },
  { label: "Contact", to: "/contact" }
];

function Navbar() {
  return (
    <div className="flex justify-between items-center max-w-5xl mx-auto py-2.5 mt-2 px-5">
      <div className="relative w-36 h-16 flex items-center justify-center">
        <div className="absolute top-[10px] inset-0 z-0">
          <MetaBalls
            color="#ffffff"
            cursorBallColor="#ffffff"
            cursorBallSize={4}
            ballCount={30}
            animationSize={30}
            enableMouseInteraction={true}
            enableTransparency={true}
            hoverSmoothness={0.05}
            clumpFactor={1.5}
            speed={1}
          />
        </div>
        <img
          src={pfp}
          alt="Profile"
          className="relative z-10 w-10 h-10 rounded-full"
        />
      </div>
      <Link to="/" className="mx-4 w-full">
        <div className="w-full h-6 flex items-center cursor-pointer">
          <hr className="w-full h-px border-t border-gray-300" />
        </div>
      </Link>
      <ul className="flex gap-4">
        {navItems.map(({ label, to }) => (
          <li key={to}>
            <Button
              className="text-[15px] font-light"
              asChild
              variant="ghost"
              size="sm"
            >
              <Link to={to} className="">
                {label}
              </Link>
            </Button>
          </li>
        ))}
        <li>
          <Button asChild variant="ghost" size="sm">
            <a
              href="https://github.com/FreaksLxss"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Github size={20} />
            </a>
          </Button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
