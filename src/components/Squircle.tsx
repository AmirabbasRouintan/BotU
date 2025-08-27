import React, { useEffect, useRef, useState } from "react";
import { getSvgPath } from "figma-squircle";

export interface SquircleProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: number | "auto";
  roundness?: number; // 0–1
  className?: string; // Tailwind classes
}

export const Squircle: React.FC<SquircleProps> = ({
  radius = "auto",
  roundness = 0.9,
  className,
  style,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [maskUrl, setMaskUrl] = useState<string | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateMask = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      const computedRadius =
        radius === "auto"
          ? Math.min(w, h) / 4
          : typeof radius === "number"
          ? radius
          : 0;

      const path = getSvgPath({
        width: w,
        height: h,
        cornerRadius: computedRadius,
        cornerSmoothing: Math.max(0, Math.min(1, roundness))
      });

      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'><path d='${path}' fill='black'/></svg>`;
      setMaskUrl(`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`);
    };

    updateMask();
    const ro = new ResizeObserver(updateMask);
    ro.observe(el);
    return () => ro.disconnect();
  }, [radius, roundness]);

  const appliedStyle: React.CSSProperties = {
    ...style,
    WebkitMaskImage: maskUrl ? `url("${maskUrl}")` : undefined,
    maskImage: maskUrl ? `url("${maskUrl}")` : undefined,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat"
  };

  return (
    <div ref={ref} style={appliedStyle} className={className} {...rest}>
      {children}
    </div>
  );
};

export default Squircle;
