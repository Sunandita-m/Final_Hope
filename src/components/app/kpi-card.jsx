"use client";

import * as React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function KpiCard({ title, value, deltaPct, suffix, icon: Icon }) {
  const up = (deltaPct ?? 0) >= 0;

  return (
    <div className="glass rounded-2xl p-4 transition hover:-translate-y-0.5 hover:bg-white/70 dark:hover:bg-slate-900/55">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </div>
          <div className="mt-2 flex items-end gap-2">
            <div
              className="text-2xl font-semibold leading-none"
              style={{ fontFamily: "var(--font-plus-jakarta)" }}
            >
              {value}
              {suffix ? (
                <span className="ml-1 text-base text-muted-foreground">
                  {suffix}
                </span>
              ) : null}
            </div>
            {typeof deltaPct === "number" ? (
              <div
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                  up
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-rose-500/15 text-rose-300"
                )}
              >
                {up ? (
                  <ArrowUpRight className="size-3" />
                ) : (
                  <ArrowDownRight className="size-3" />
                )}
                {Math.abs(deltaPct).toFixed(1)}%
              </div>
            ) : null}
          </div>
        </div>

        {Icon ? (
          <div className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5">
            <Icon className="size-5 text-indigo-300" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

