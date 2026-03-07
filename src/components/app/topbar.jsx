"use client";

import * as React from "react";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/app/theme-toggle";
import { toast } from "sonner";

export function Topbar() {
  return (
    <div className="sticky top-0 z-20 border-b border-white/10 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 md:px-6">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            aria-label="Search"
            placeholder="Search metrics, posts, or ask AI…"
            className="h-10 rounded-full pl-9 glass"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toast("AI search (demo)", {
                  description: "Connect your backend to power suggestions.",
                });
              }
            }}
          />
        </div>

        <Button
          className="hidden rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow hover:from-indigo-400 hover:to-violet-400 md:inline-flex"
          onClick={() =>
            toast("Generating insight…", {
              description: "This is demo UI. Wire it to your AI later.",
            })
          }
        >
          <Sparkles className="mr-2 size-4" />
          Ask mentor
        </Button>

        <ThemeToggle />
      </div>
    </div>
  );
}

