"use client";

import * as React from "react";
import { Search, Sparkles, User, LogOut, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/app/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/contexts/user-profile-context";

export function Topbar() {
  const router = useRouter();
  const { profile } = useUserProfile();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    router.push("/login");
  };

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
          className="hidden rounded-full text-white shadow md:inline-flex"
          style={{
            background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `linear-gradient(to right, rgba(var(--color-primary), 0.9), rgba(var(--color-secondary), 0.9))`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`;
          }}
          onClick={() => router.push("/ai-mentor/chat")}
        >
          <Sparkles className="mr-2 size-4" />
          Ask mentor
        </Button>

        <ThemeToggle />

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-10 w-10 rounded-full"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback
                  className="text-white font-medium"
                  style={{
                    background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                  }}
                >
                  AT
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 glass border-white/10" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-white">
                  {profile.name}
                </p>
                <p className="text-xs leading-none text-gray-400">
                  alex@techcreator.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={() => router.push("/settings/profile")}
              className="cursor-pointer text-gray-300 hover:text-white"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/settings/preferences")}
              className="cursor-pointer text-gray-300 hover:text-white"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-rose-400 hover:text-rose-300"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

