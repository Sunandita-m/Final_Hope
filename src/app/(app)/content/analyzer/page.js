"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { posts, timeline } from "@/lib/demo-data";
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

export default function ContentAnalyzerPage() {
  return (
    <div className="space-y-4">
      <header>
        <div className="text-sm text-muted-foreground">Content Analysis Hub</div>
        <h1
          className="text-2xl font-semibold"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Post performance timeline
        </h1>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass border-white/10 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Engagement over time
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[320px] pt-2">
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
                  stroke="#8B5CF6"
                  strokeWidth={3}
                  dot={{ r: 2, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Pattern detection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Best posting time
              </div>
              <div className="mt-2 text-foreground">8:40–9:30 AM (Tue/Thu)</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20">
                  +27% first-hour velocity
                </Badge>
                <Badge variant="secondary">Saves-heavy audience</Badge>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Content type
              </div>
              <div className="mt-2 text-foreground">
                Carousels outperform short videos on saves
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge className="bg-indigo-500/15 text-indigo-200 hover:bg-indigo-500/20">
                  2.1× saves
                </Badge>
                <Badge variant="secondary">Frameworks</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-white/10">
        <CardHeader className="pb-2">
          <CardTitle style={{ fontFamily: "var(--font-plus-jakarta)" }}>
            Clickable post points (demo list)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[240px] pr-3">
            <div className="space-y-2">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-sm font-medium">{p.title}</div>
                    <Badge variant="secondary">{p.type}</Badge>
                    <Badge
                      className={
                        p.performance === "high"
                          ? "bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20"
                          : "bg-amber-500/15 text-amber-200 hover:bg-amber-500/20"
                      }
                    >
                      {p.performance === "high" ? "High" : "Low"}
                    </Badge>
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    Hook: “{p.hook}”
                  </div>
                  <div
                    className="mt-3 flex flex-wrap gap-4 text-xs tabular-nums text-muted-foreground"
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
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

