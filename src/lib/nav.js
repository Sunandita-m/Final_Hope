import {
  LayoutDashboard,
  Sparkles,
  MessageSquare,
  BarChart3,
  BrainCircuit,
  Wand2,
  CalendarClock,
  Beaker,
  Settings,
  UserRound,
  Plug,
  SlidersHorizontal,
  Rocket,
} from "lucide-react";

export const nav = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    items: [
      { label: "Overview", href: "/dashboard/overview", icon: Sparkles },
      { label: "Insights", href: "/dashboard/insights", icon: BarChart3 },
      { label: "Performance", href: "/dashboard/performance", icon: BarChart3 },
    ],
  },
  {
    label: "AI Mentor",
    icon: MessageSquare,
    items: [
      { label: "Chat", href: "/ai-mentor/chat", icon: MessageSquare },
      {
        label: "Recommendations",
        href: "/ai-mentor/recommendations",
        icon: Wand2,
      },
      {
        label: "Learning progress",
        href: "/ai-mentor/learning-progress",
        icon: BrainCircuit,
      },
    ],
  },
  {
    label: "Content",
    icon: BarChart3,
    items: [
      { label: "Analyzer", href: "/content/analyzer", icon: BarChart3 },
      { label: "Scheduler", href: "/content/scheduler", icon: CalendarClock },
      { label: "Simulator", href: "/content/simulator", icon: Beaker },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    items: [
      { label: "Profile", href: "/settings/profile", icon: UserRound },
      { label: "Integrations", href: "/settings/integrations", icon: Plug },
      { label: "Preferences", href: "/settings/preferences", icon: SlidersHorizontal },
    ],
  },
  {
    label: "Onboarding",
    icon: Rocket,
    items: [
      { label: "Connect accounts", href: "/onboarding/connect-accounts" },
      { label: "AI training", href: "/onboarding/ai-training" },
      { label: "Goal setting", href: "/onboarding/goal-setting" },
    ],
  },
];

