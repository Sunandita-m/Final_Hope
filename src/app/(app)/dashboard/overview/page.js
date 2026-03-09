"use client";

import Link from "next/link";
import { Sparkles, TrendingUp, Users, HeartHandshake, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { KpiCard } from "@/components/app/kpi-card";
import { ProgressRing } from "@/components/app/progress-ring";
import { creator, goals, insightOfTheDay, kpis, posts, timeline } from "@/lib/demo-data";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function num(n) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">
            Welcome back, <span className="text-foreground">{creator.name}</span>
          </div>
          <h1
            className="mt-1 text-2xl font-semibold tracking-tight md:text-3xl"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            Your growth is trending up.
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Realistic demo data • 30-day trajectory • AI insights that feel actionable.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            asChild
            className="rounded-full text-white shadow"
            style={{
              background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
            }}
          >
            <Link href="/ai-mentor/chat">
              <Sparkles className="mr-2 size-4" />
              Chat with mentor
            </Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-full">
            <Link href="/content/analyzer">Open analyzer</Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Followers"
          value={num(kpis.followers.value)}
          deltaPct={kpis.followers.deltaPct}
          icon={Users}
        />
        <KpiCard
          title="Engagement rate"
          value={kpis.engagementRate.value}
          suffix="%"
          deltaPct={kpis.engagementRate.deltaPct}
          icon={HeartHandshake}
        />
        <KpiCard
          title="Avg reach"
          value={num(kpis.avgReach.value)}
          deltaPct={kpis.avgReach.deltaPct}
          icon={TrendingUp}
        />
        <KpiCard
          title="Best content"
          value={kpis.bestContentType.value}
          deltaPct={kpis.bestContentType.deltaPct}
          icon={Trophy}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="glass border-white/10 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between gap-3">
              <span style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                Engagement trajectory (30 days)
              </span>
              <Badge 
                style={{
                  background: `rgba(var(--color-primary), 0.15)`,
                  color: `rgb(var(--color-primary))`
                }}
              >
                +8.4% followers
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[280px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeline} margin={{ left: 8, right: 8, top: 10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={38}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15,23,42,0.85)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                  }}
                  labelStyle={{ color: "rgba(255,255,255,0.7)" }}
                />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke={`rgb(var(--color-primary))`}
                  strokeWidth={3}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="reach"
                  stroke={`rgb(var(--color-secondary))`}
                  strokeWidth={2}
                  dot={false}
                  opacity={0.65}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Insight of the day
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-medium">{insightOfTheDay.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">
                {insightOfTheDay.body}
              </div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Confidence</span>
                  <span className="font-mono tabular-nums">
                    {Math.round(insightOfTheDay.confidence * 100)}%
                  </span>
                </div>
                <Progress
                  value={Math.round(insightOfTheDay.confidence * 100)}
                  className="mt-2 h-2 bg-white/10"
                />
              </div>
            </div>

            <Button asChild variant="secondary" className="w-full rounded-xl">
              <Link href="/ai-mentor/recommendations">See recommendations</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass border-white/10">
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Goal completion
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 px-6">
            {goals.map((g) => (
              <div key={g.id} className="grid place-items-center rounded-2xl border border-white/10 bg-white/5 p-3">
                <ProgressRing value={g.progress} label={g.label} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-white/10 md:col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Recent posts (high vs low signals)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {posts.map((p) => (
              <div
                key={p.id}
                className="flex flex-col justify-between gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="truncate text-sm font-medium">{p.title}</div>
                    <Badge
                      className={
                        p.performance === "high"
                          ? "bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20"
                          : "bg-amber-500/15 text-amber-200 hover:bg-amber-500/20"
                      }
                    >
                      {p.performance === "high" ? "High signal" : "Needs tweak"}
                    </Badge>
                    <Badge variant="secondary">{p.type}</Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Posted {p.postedAt} • Hook: “{p.hook}”
                  </div>
                </div>
                <div
                  className="flex shrink-0 gap-4 text-xs tabular-nums text-muted-foreground"
                  style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  <div>
                    <div className="text-foreground">{num(p.engagement)}</div>
                    <div>Engagement</div>
                  </div>
                  <div>
                    <div className="text-foreground">{num(p.saves)}</div>
                    <div>Saves</div>
                  </div>
                  <div>
                    <div className="text-foreground">{num(p.shares)}</div>
                    <div>Shares</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

