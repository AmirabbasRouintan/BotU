// import DarkVeil from "@/Backgrounds/DarkVeil/DarkVeil";
import TrueFocus from "@/TextAnimations/TrueFocus/TrueFocus";
import Magnet from "@/Animations/Magnet/Magnet";
import AnimatedContent from "@/Animations/AnimatedContent/AnimatedContent";
import MagicBento from "@/components/MagicBento/MagicBento";
import type { BentoCardProps } from "@/components/MagicBento/MagicBento";
import PixelCard from "@/components/PixelCard/PixelCard";
import { Link } from "react-router-dom";
// import Galaxy from "@/Backgrounds/Galaxy/Galaxy";

const cardData: BentoCardProps[] = [
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=1974&auto=format&fit=crop",
    title: "Bot Analytics",
    description: "Track user interactions with your bot",
    label: "Bot Insights"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=1974&auto=format&fit=crop",
    title: "Bot Analytics",
    description: "Track user interactions with your bot",
    label: "Bot Insights"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=1974&auto=format&fit=crop",
    title: "Bot Analytics",
    description: "Track user interactions with your bot",
    label: "Bot Insights"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=1974&auto=format&fit=crop",
    title: "Bot Analytics",
    description: "Track user interactions with your bot",
    label: "Bot Insights"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=1974&auto=format&fit=crop",
    title: "Bot Analytics",
    description: "Track user interactions with your bot",
    label: "Bot Insights"
  },
  {
    imageUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    hoverImageUrl:
      "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=1974&auto=format&fit=crop",
    title: "Bot Analytics",
    description: "Track user interactions with your bot",
    label: "Bot Insights"
  }
];

export default function Landing() {
  const baseDelay = 0.3;
  const delayIncrement = 0.3;

  return (
    <div className="flex flex-col items-center justify-center mt-28 select-none">
      <div className="fixed inset-1.5 z-[-1]">
        {/* <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={0.2}
          glowIntensity={0.2}
          saturation={0}
          hueShift={0}
          twinkleIntensity={1}
          rotationSpeed={0.1}
          repulsionStrength={1}
          autoCenterRepulsion={20}
          starSpeed={0.5}
          speed={1}
          transparent={true}
        /> */}
      </div>

      {/* 1. Header */}
      <AnimatedContent
        distance={150}
        direction="vertical"
        reverse={false}
        duration={1.2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={0.1}
        threshold={0}
        delay={baseDelay + delayIncrement * 0}
      >
        <Magnet padding={5000} disabled={false} magnetStrength={50}>
          <h1 className="font-extralight text-lg mb-7 text-center [text-shadow:_0px_0px_20px_#000000]">
            Telegram bot templates
          </h1>
        </Magnet>
      </AnimatedContent>

      <div className="mt-16">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.1}
          threshold={0}
          delay={baseDelay + delayIncrement * 1}
        >
          <div className="w-[600px] leading-6">
            <TrueFocus
              sentence="Stop building from scratch"
              manualMode={false}
              blurAmount={5}
              borderColor="red"
              animationDuration={2}
              pauseBetweenAnimations={1}
            />
          </div>
        </AnimatedContent>
      </div>

      <div className="mt-16">
        <AnimatedContent
          distance={150}
          direction="vertical"
          reverse={false}
          duration={1.2}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.1}
          threshold={0}
          delay={baseDelay + delayIncrement * 2}
        >
          <p className="font-extralight text-lg text-center w-[35rem]">
            Professional Telegram bot templates built for creatives who want
            results without the technical headaches.
          </p>
        </AnimatedContent>
      </div>

      <AnimatedContent
        distance={150}
        direction="vertical"
        reverse={false}
        duration={1.2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={0.1}
        threshold={0}
        delay={baseDelay + delayIncrement * 3}
      >
        <Link to="/template" className="block">
          <PixelCard
            className="mt-20 hover:scale-105 duration-300 ease-in-out transition-transform"
            variant="cyan"
            width={350}
            height={100}
            speed={300}
          >
            <p className="absolute text-2xl font-extralight [text-shadow:_0px_0px_20px_#000000]">
              Start Telegram Bot Trial
            </p>
          </PixelCard>
        </Link>
      </AnimatedContent>

      <AnimatedContent
        distance={150}
        direction="vertical"
        reverse={false}
        duration={1.2}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={0.1}
        threshold={0}
        delay={baseDelay + delayIncrement * 4}
      >
        <div className="mt-24 mb-10">
          <MagicBento
            cards={cardData}
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="255, 255, 255"
          />
        </div>
      </AnimatedContent>
    </div>
  );
}
