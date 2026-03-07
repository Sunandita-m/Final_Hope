"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { nav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

function NavItem({ href, icon: Icon, label, active }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
        "hover:bg-white/10 dark:hover:bg-white/10",
        active ? "text-white" : "text-muted-foreground"
      )}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500/35 to-violet-500/35"
          transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
        />
      )}
      <span
        className={cn(
          "grid size-8 place-items-center rounded-lg border border-white/10 bg-white/5 transition group-hover:bg-white/10",
          active && "bg-white/10"
        )}
        aria-hidden="true"
      >
        {Icon ? <Icon className="size-4" /> : null}
      </span>
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[280px] flex-col gap-4 border-r border-white/10 bg-background/40 p-4 backdrop-blur-xl md:flex">
      <div className="glass flex items-center gap-3 rounded-2xl px-3 py-3">
        <Avatar className="size-10 ring-1 ring-white/10">
          <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
            AV
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="truncate font-semibold" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Growth Mentor AI
          </div>
          <div className="truncate text-xs text-muted-foreground">
            Premium creator dashboard
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <nav className="flex flex-1 flex-col gap-5">
        {nav.map((group) => (
          <div key={group.label} className="space-y-2">
            <div className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
              {group.label}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={pathname === item.href}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-indigo-500/10 to-transparent p-4">
        <div className="text-sm font-medium">Tip</div>
        <div className="mt-1 text-xs text-muted-foreground">
          Your best posting window is <span className="text-foreground">8:40–9:30 AM</span>. Schedule 2 tests next week.
        </div>
      </div>
    </aside>
  );
}

