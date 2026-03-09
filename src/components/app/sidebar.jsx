"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { nav } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/contexts/sidebar-context";

function NavItem({ href, icon: Icon, label, active, collapsed }) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
        "hover:bg-white/10 dark:hover:bg-white/10",
        active ? "text-white" : "text-muted-foreground",
        collapsed && "justify-center"
      )}
      title={collapsed ? label : undefined}
    >
      {active && (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-0 -z-10 rounded-xl"
          style={{ 
            background: `linear-gradient(to right, rgba(var(--color-primary), 0.35), rgba(var(--color-secondary), 0.35))`
          }}
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
      {!collapsed && <span className="truncate">{label}</span>}
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebar();

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 hidden h-screen flex-col gap-4 border-r border-white/10 bg-background/40 p-4 backdrop-blur-xl transition-all duration-300 md:flex",
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border border-white/10 bg-background/80 backdrop-blur-xl hover:bg-white/10"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className={cn(
        "glass flex items-center gap-3 rounded-2xl px-3 py-3",
        collapsed && "justify-center px-2"
      )}>
        <Avatar className="size-10 ring-1 ring-white/10">
          <AvatarFallback 
            style={{ 
              background: `linear-gradient(to bottom right, rgba(var(--color-primary), 1), rgba(var(--color-secondary), 1))`
            }}
            className="text-white"
          >
            CA
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate font-semibold" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Craftantra AI
            </div>
            <div className="truncate text-xs text-muted-foreground">
              Premium creator dashboard
            </div>
          </div>
        )}
      </div>

      <Separator className="bg-white/10" />

      <nav className="flex flex-1 flex-col gap-5 overflow-y-auto scrollbar-thin">
        {nav.map((group) => (
          <div key={group.label} className="space-y-2">
            {!collapsed && (
              <div className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/80">
                {group.label}
              </div>
            )}
            {collapsed && group.items.length > 0 && (
              <div className="h-px bg-white/10 mx-2" />
            )}
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  active={pathname === item.href}
                  collapsed={collapsed}
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div 
          className="rounded-2xl border border-white/10 p-4"
          style={{
            background: `linear-gradient(to bottom, rgba(var(--color-primary), 0.1), transparent)`
          }}
        >
          <div className="text-sm font-medium">Tip</div>
          <div className="mt-1 text-xs text-muted-foreground">
            Your best posting window is <span className="text-foreground">8:40–9:30 AM</span>. Schedule 2 tests next week.
          </div>
        </div>
      )}
    </aside>
  );
}

