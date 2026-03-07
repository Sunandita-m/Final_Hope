"use client";

import * as React from "react";
import { Sidebar } from "@/components/app/sidebar";
import { Topbar } from "@/components/app/topbar";

export function AppShell({ children }) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(900px_circle_at_10%_0%,rgba(99,102,241,0.35),transparent_60%),radial-gradient(700px_circle_at_80%_10%,rgba(139,92,246,0.25),transparent_55%),radial-gradient(700px_circle_at_40%_90%,rgba(16,185,129,0.18),transparent_55%)]">
      <div className="mx-auto flex min-h-dvh w-full max-w-7xl">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

