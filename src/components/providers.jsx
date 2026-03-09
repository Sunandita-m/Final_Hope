"use client";

import * as React from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { UserProfileProvider } from "@/contexts/user-profile-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, refetchOnWindowFocus: false, retry: 1 },
  },
});

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <QueryClientProvider client={queryClient}>
        <UserProfileProvider>
          <TooltipProvider delayDuration={250}>
            {children}
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </UserProfileProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

