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
  TrendingUp,
  Zap,
  Lightbulb,
  Activity,
  LineChart,
  MessageCircle,
  GraduationCap,
  Calendar,
  FlaskConical,
} from "lucide-react";

export const nav = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    items: [
      { label: "Overview", href: "/dashboard/overview", icon: Sparkles },
      { label: "Insights", href: "/dashboard/insights", icon: Lightbulb },
      { label: "Performance", href: "/dashboard/performance", icon: Activity },
    ],
  },
  {
    label: "AI Tools",
    icon: Zap,
    items: [
      { label: "Content Intelligence", href: "/ai-tools/content-intelligence", icon: BrainCircuit },
    ],
  },
  {
    label: "AI Mentor",
    icon: MessageSquare,
    items: [
      { label: "Chat", href: "/ai-mentor/chat", icon: MessageCircle },
      {
        label: "Recommendations",
        href: "/ai-mentor/recommendations",
        icon: Wand2,
      },
      {
        label: "Learning progress",
        href: "/ai-mentor/learning-progress",
        icon: GraduationCap,
      },
    ],
  },
  {
    label: "Content",
    icon: LineChart,
    items: [
      { label: "Analyzer", href: "/content/analyzer", icon: BarChart3 },
      { label: "Trend Calendar", href: "/content/trend-calendar", icon: TrendingUp },
      { label: "Scheduler", href: "/content/scheduler", icon: Calendar },
      { label: "Simulator", href: "/content/simulator", icon: FlaskConical },
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

