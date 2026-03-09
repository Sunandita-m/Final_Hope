"use client";

import * as React from "react";
import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context";
import { ThemeProvider } from "@/contexts/theme-context";

function AppShellContent({ children }) {
  const { collapsed } = useSidebar();

  return (
    <>
      <Sidebar />
      <div 
        className="flex min-h-dvh flex-col transition-all duration-300"
        style={{ marginLeft: collapsed ? '80px' : '280px' }}
      >
        <Topbar />
        <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
      </div>
    </>
  );
}

export function AppShell({ children }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-dvh bg-[radial-gradient(900px_circle_at_10%_0%,rgba(var(--color-primary),0.35),transparent_60%),radial-gradient(700px_circle_at_80%_10%,rgba(var(--color-secondary),0.25),transparent_55%),radial-gradient(700px_circle_at_40%_90%,rgba(var(--color-accent),0.18),transparent_55%)]">
          <AppShellContent>{children}</AppShellContent>
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}

