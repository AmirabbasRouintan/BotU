import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Navbar from "./components/Navbar";
import ClickSpark from "./Animations/ClickSpark/ClickSpark";
import Silk from "@/Backgrounds/Silk/Silk";
import Template from "./pages/Template";
import AuthPage from "./pages/AuthPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AnimationProvider } from "./contexts/AnimationContext";

function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false
    });

    const animate = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, {
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        immediate: false
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!lenisRef.current) return;

    const handleScroll = () => {};

    lenisRef.current.on("scroll", handleScroll);
    return () => {
      if (lenisRef.current) {
        lenisRef.current.off("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <LanguageProvider>
      <AnimationProvider>
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <>
            <div className="fixed inset-1.5 z-[-1]">
              <Silk
                speed={20}
                scale={1}
                color="#212121"
                noiseIntensity={1.5}
                rotation={0}
              />
            </div>
            <Navbar />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/home" element={<Home />} />
              <Route path="/template" element={<Template />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </>
        </ClickSpark>
      </AnimationProvider>
    </LanguageProvider>
  );
}

export default App;