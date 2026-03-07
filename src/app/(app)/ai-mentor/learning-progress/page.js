"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function Node({ x, y, delay = 0 }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="6"
      fill="rgba(255,255,255,0.9)"
      initial={{ opacity: 0.3, scale: 0.9 }}
      animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.05, 0.9] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function Edge({ x1, y1, x2, y2, delay = 0 }) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#edge)"
      strokeWidth="2"
      initial={{ opacity: 0.15 }}
      animate={{ opacity: [0.15, 0.75, 0.15] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

export default function LearningProgressPage() {
  const nodes = React.useMemo(
    () => [
      [40, 42],
      [40, 110],
      [40, 178],
      [160, 76],
      [160, 144],
      [280, 52],
      [280, 116],
      [280, 180],
    ],
    []
  );

  const edges = [
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 5],
    [3, 6],
    [4, 6],
    [4, 7],
  ];

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">
            Learning Engine Visualization
          </div>
          <h1
            className="text-2xl font-semibold"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            The AI is adapting to your style.
          </h1>
        </div>
        <Badge className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20">
          <Sparkles className="mr-1 size-3" />
          Live adaptation (demo)
        </Badge>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass border-white/10 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="size-5 text-indigo-300" />
              <span style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                AI Brain Dashboard
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <svg
                viewBox="0 0 320 220"
                className="h-[280px] w-full"
                role="img"
                aria-label="Neural network visualization"
              >
                <defs>
                  <linearGradient id="edge" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {edges.map(([a, b], i) => (
                  <Edge
                    key={i}
                    x1={nodes[a][0]}
                    y1={nodes[a][1]}
                    x2={nodes[b][0]}
                    y2={nodes[b][1]}
                    delay={i * 0.12}
                  />
                ))}

                {nodes.map(([x, y], i) => (
                  <Node key={i} x={x} y={y} delay={i * 0.08} />
                ))}
              </svg>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Pattern confidence
                </div>
                <div className="mt-2 text-2xl font-semibold tabular-nums">
                  86%
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  “Save-heavy frameworks”
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Best window
                </div>
                <div className="mt-2 text-2xl font-semibold tabular-nums">
                  8:40 AM
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Tue/Thu velocity peak
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Adaptation
                </div>
                <div className="mt-2 text-2xl font-semibold tabular-nums">
                  +12
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  New signals this week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              What I’ve learned about you
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Your audience responds best to <span className="text-foreground">3–5 step frameworks</span> with a
              result-first hook.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <span className="text-foreground">Carousels</span> drive saves; short videos drive discovery. Pair them
              for compounding reach.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              Tuesday mornings have the highest first-hour velocity. Schedule your highest-value posts there.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

