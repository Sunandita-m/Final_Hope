"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProgressRing({
  value,
  size = 88,
  stroke = 10,
  className,
  label,
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * c;

  return (
    <div className={cn("grid place-items-center gap-2", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          className="fill-transparent stroke-white/10"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          strokeWidth={stroke}
          strokeLinecap="round"
          className="fill-transparent"
          style={{
            stroke: "url(#grad)",
            strokeDasharray: `${dash} ${c - dash}`,
          }}
          initial={{ strokeDasharray: `0 ${c}` }}
          animate={{ strokeDasharray: `${dash} ${c - dash}` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="pointer-events-none text-center">
        <div
          className="font-mono text-lg font-semibold tabular-nums"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {pct}%
        </div>
        {label ? (
          <div className="mt-0.5 max-w-[8rem] text-[10px] leading-snug text-muted-foreground">
            {label}
          </div>
        ) : null}
      </div>
    </div>
  );
}

