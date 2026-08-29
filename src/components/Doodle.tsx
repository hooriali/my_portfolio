import type { CSSProperties } from "react";

interface DoodleProps {
  className?: string;
  style?: CSSProperties;
}

/** Small solid dot — pair with `rounded-full bg-*` sizing in className. */
export function DotDoodle({ className = "", style }: DoodleProps) {
  return <div className={`rounded-full ${className}`} style={style} />;
}

/** Small rotated square. */
export function SquareDoodle({ className = "", style }: DoodleProps) {
  return <div className={`rounded-sm ${className}`} style={style} />;
}

/** Hand-drawn wavy squiggle line. */
export function SquiggleDoodle({ className = "", style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 32" fill="none">
      <path d="M2 20 C 12 4, 22 4, 32 18 S 52 30, 62 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Dashed circle outline, like a scribbled ring. */
export function RingDoodle({ className = "", style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5" />
    </svg>
  );
}

/** Four-pointed sparkle / diamond shape. */
export function SparkDoodle({ className = "", style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z" fill="currentColor" />
    </svg>
  );
}

/** Simple plus / cross mark. */
export function PlusDoodle({ className = "", style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** Small hand-drawn wobbly circle outline (not dashed — a single loose stroke). */
export function LoopDoodle({ className = "", style }: DoodleProps) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 40" fill="none">
      <path
        d="M20 4c9 0 15 6 15 15s-6 15-16 15S4 28 4 19 10 4 20 4Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
