"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Target,
  Users,
  Clock,
  Zap,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Demo insights data
const demoInsights = {
  summary: {
    totalInsights: 12,
    actionableItems: 5,
    growthOpportunities: 3,
    warnings: 2,
  },
  insights: [
    {
      id: 1,
      type: "opportunity",
      priority: "high",
      title: "Peak Engagement Window Detected",
      description: "Your audience is 3x more active between 8-10 AM on Tuesdays and Thursdays",
      metric: "+285% engagement",
      action: "Schedule posts during this window",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "trend",
      priority: "high",
      title: "Carousel Posts Outperforming",
      description: "Carousel posts are getting 2.4x more saves than single-image posts",
      metric: "+140% saves",
      action: "Create more carousel content",
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "warning",
      priority: "medium",
      title: "Engagement Rate Declining",
      description: "Your engagement rate has dropped 15% over the last 7 days",
      metric: "-15% engagement",
      action: "Review content strategy",
      timestamp: "1 day ago",
    },
    {
      id: 4,
      type: "opportunity",
      priority: "medium",
      title: "Hashtag Performance Insight",
      description: "#ContentCreator and #AITools are driving 60% of your reach",
      metric: "+60% reach",
      action: "Use these hashtags consistently",
      timestamp: "1 day ago",
    },
    {
      id: 5,
      type: "success",
      priority: "low",
      title: "Follower Growth Accelerating",
      description: "You gained 450 new followers this week, up 35% from last week",
      metric: "+35% growth",
      action: "Keep current content strategy",
      timestamp: "2 days ago",
    },
  ],
  audienceInsights: {
    topLocations: ["United States", "United Kingdom", "Canada", "Australia"],
    topAgeGroup: "25-34",
    peakActivityTime: "8:00 AM - 10:00 AM",
    mostActiveDay: "Tuesday",
  },
  contentPerformance: [
    { type: "Carousel", engagement: 4200, reach: 12000 },
    { type: "Reel", engagement: 3800, reach: 9500 },
    { type: "Single", engagement: 2100, reach: 6200 },
    { type: "Video", engagement: 5200, reach: 15000 },
  ],
  weeklyTrends: [
    { day: "Mon", engagement: 2400, followers: 120 },
    { day: "Tue", engagement: 3200, followers: 180 },
    { day: "Wed", engagement: 2800, followers: 150 },
    { day: "Thu", engagement: 3500, followers: 200 },
    { day: "Fri", engagement: 3100, followers: 170 },
    { day: "Sat", engagement: 2600, followers: 140 },
    { day: "Sun", engagement: 2200, followers: 110 },
  ],
  heatmapData: [
    // Monday
    [12, 15, 18, 22, 28, 35, 42, 58, 72, 65, 48, 38, 32, 28, 35, 42, 55, 68, 72, 58, 42, 32, 22, 15],
    // Tuesday
    [15, 18, 22, 28, 35, 42, 55, 68, 85, 92, 78, 62, 48, 42, 52, 65, 78, 88, 82, 65, 48, 35, 25, 18],
    // Wednesday
    [18, 22, 25, 32, 38, 45, 52, 62, 75, 68, 55, 45, 38, 35, 42, 55, 68, 75, 68, 52, 38, 28, 22, 18],
    // Thursday
    [15, 18, 25, 32, 42, 52, 65, 78, 88, 95, 82, 68, 52, 45, 55, 68, 82, 92, 85, 68, 48, 35, 25, 18],
    // Friday
    [18, 22, 28, 35, 42, 48, 58, 68, 78, 72, 62, 52, 45, 42, 48, 58, 72, 82, 78, 62, 45, 32, 25, 18],
    // Saturday
    [22, 25, 28, 32, 35, 38, 42, 48, 55, 52, 48, 42, 38, 35, 42, 48, 55, 62, 58, 48, 38, 32, 28, 22],
    // Sunday
    [18, 22, 25, 28, 32, 35, 38, 42, 48, 45, 42, 38, 35, 32, 38, 42, 48, 52, 48, 42, 35, 28, 25, 18],
  ],
};

const insightTypeConfig = {
  opportunity: {
    icon: Lightbulb,
    color: "rgb(var(--color-primary))",
    bgColor: "rgba(var(--color-primary), 0.1)",
    borderColor: "rgba(var(--color-primary), 0.3)",
  },
  trend: {
    icon: TrendingUp,
    color: "rgb(var(--color-secondary))",
    bgColor: "rgba(var(--color-secondary), 0.1)",
    borderColor: "rgba(var(--color-secondary), 0.3)",
  },
  warning: {
    icon: AlertCircle,
    color: "rgb(251, 146, 60)",
    bgColor: "rgba(251, 146, 60, 0.1)",
    borderColor: "rgba(251, 146, 60, 0.3)",
  },
  success: {
    icon: CheckCircle2,
    color: "rgb(34, 197, 94)",
    bgColor: "rgba(34, 197, 94, 0.1)",
    borderColor: "rgba(34, 197, 94, 0.3)",
  },
};

export default function DashboardInsightsPage() {
  const [insights, setInsights] = useState(demoInsights);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://wv1yywutpf.execute-api.us-east-1.amazonaws.com/insights",
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData = await response.json();
      console.log("Insights API Response:", apiData);

      let processedData;
      if (apiData.body) {
        const parsed =
          typeof apiData.body === "string" ? JSON.parse(apiData.body) : apiData.body;
        processedData = parsed;
      } else {
        processedData = apiData;
      }

      setInsights({
        summary: processedData.summary || demoInsights.summary,
        insights: processedData.insights || demoInsights.insights,
        audienceInsights: processedData.audienceInsights || demoInsights.audienceInsights,
        contentPerformance: processedData.contentPerformance || demoInsights.contentPerformance,
        weeklyTrends: processedData.weeklyTrends || demoInsights.weeklyTrends,
        heatmapData: processedData.heatmapData || demoInsights.heatmapData,
      });

      setLastFetch(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching insights:", err);

      const isCorsError =
        err.message === "Failed to fetch" || err.message.includes("CORS");

      if (isCorsError) {
        setError("API endpoint needs CORS enabled. Showing demo data for now.");
      } else {
        setError("Using demo data. Enable CORS on API endpoint to see live data.");
      }

      setInsights(demoInsights);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">AI-Powered Analytics</div>
          <h1 className="text-2xl font-semibold text-white">Smart Insights</h1>
          {lastFetch && (
            <p className="text-xs text-gray-500 mt-1">Last updated: {lastFetch}</p>
          )}
        </div>

        <Button
          onClick={fetchInsights}
          disabled={loading}
          className="rounded-full text-white"
          style={{
            background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`,
          }}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Insights
        </Button>
      </header>

      {/* Error/Info Message */}
      {error && (
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="text-amber-400">ℹ️</div>
              <div>
                <div className="font-semibold text-amber-300 text-sm">Demo Mode</div>
                <div className="text-xs text-amber-400">{error}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl"
                style={{ background: `rgba(var(--color-primary), 0.2)` }}
              >
                <Lightbulb
                  className="w-5 h-5"
                  style={{ color: `rgb(var(--color-primary))` }}
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {insights.summary.totalInsights}
                </div>
                <div className="text-xs text-gray-400">Total Insights</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl"
                style={{ background: `rgba(var(--color-secondary), 0.2)` }}
              >
                <Target
                  className="w-5 h-5"
                  style={{ color: `rgb(var(--color-secondary))` }}
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {insights.summary.actionableItems}
                </div>
                <div className="text-xs text-gray-400">Actionable Items</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl"
                style={{ background: `rgba(34, 197, 94, 0.2)` }}
              >
                <TrendingUp className="w-5 h-5" style={{ color: `rgb(34, 197, 94)` }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {insights.summary.growthOpportunities}
                </div>
                <div className="text-xs text-gray-400">Growth Opportunities</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div
                className="p-3 rounded-xl"
                style={{ background: `rgba(251, 146, 60, 0.2)` }}
              >
                <AlertCircle className="w-5 h-5" style={{ color: `rgb(251, 146, 60)` }} />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {insights.summary.warnings}
                </div>
                <div className="text-xs text-gray-400">Warnings</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Insights Feed */}
        <Card className="glass border-white/10 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">AI Insights Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-3">
              <div className="space-y-3">
                {insights.insights.map((insight) => {
                  const config = insightTypeConfig[insight.type];
                  const Icon = config.icon;

                  return (
                    <div
                      key={insight.id}
                      className="rounded-2xl border p-4 hover:bg-white/5 transition-all"
                      style={{
                        borderColor: config.borderColor,
                        background: config.bgColor,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="p-2 rounded-lg flex-shrink-0"
                          style={{ background: config.bgColor }}
                        >
                          <Icon className="w-5 h-5" style={{ color: config.color }} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-white font-medium">{insight.title}</h3>
                            <Badge
                              variant="outline"
                              className="text-xs flex-shrink-0"
                              style={{
                                borderColor: config.borderColor,
                                color: config.color,
                              }}
                            >
                              {insight.priority}
                            </Badge>
                          </div>

                          <p className="text-sm text-gray-400 mb-3">
                            {insight.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <Badge
                              className="text-xs"
                              style={{
                                background: config.bgColor,
                                color: config.color,
                              }}
                            >
                              {insight.metric.startsWith("+") ? (
                                <ArrowUpRight className="w-3 h-3 mr-1" />
                              ) : (
                                <ArrowDownRight className="w-3 h-3 mr-1" />
                              )}
                              {insight.metric}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {insight.timestamp}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              className="rounded-full text-xs h-8"
                              style={{
                                background: config.color,
                                color: "white",
                              }}
                            >
                              <Zap className="w-3 h-3 mr-1" />
                              {insight.action}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Audience & Performance */}
        <div className="space-y-6">
          {/* Audience Insights */}
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="w-5 h-5" />
                Audience Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-gray-400 mb-1">Peak Activity</div>
                <div className="text-white font-medium">
                  {insights.audienceInsights.peakActivityTime}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {insights.audienceInsights.mostActiveDay}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-gray-400 mb-1">Top Age Group</div>
                <div className="text-white font-medium">
                  {insights.audienceInsights.topAgeGroup}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-gray-400 mb-2">Top Locations</div>
                <div className="space-y-1">
                  {insights.audienceInsights.topLocations.map((location, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: `rgb(var(--color-primary))` }}
                      />
                      <div className="text-sm text-white">{location}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Content Performance */}
          <Card className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Content Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={insights.contentPerformance}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis
                    dataKey="type"
                    tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={35}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.85)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: 12,
                    }}
                  />
                  <Bar
                    dataKey="engagement"
                    fill={`rgb(var(--color-primary))`}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Engagement Heatmap */}
      <Card className="glass border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Engagement Heatmap - Best Times to Post
          </CardTitle>
          <p className="text-xs text-gray-400 mt-1">
            Darker colors indicate higher engagement rates
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Hour labels */}
              <div className="flex mb-2">
                <div className="w-16"></div>
                <div className="flex-1 grid grid-cols-24 gap-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div
                      key={i}
                      className="text-[10px] text-gray-400 text-center"
                    >
                      {i}
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap grid */}
              <div className="space-y-1">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dayIndex) => (
                  <div key={day} className="flex items-center gap-2">
                    <div className="w-14 text-xs text-gray-400 font-medium">
                      {day}
                    </div>
                    <div className="flex-1 grid grid-cols-24 gap-1">
                      {insights.heatmapData[dayIndex].map((value, hourIndex) => {
                        const intensity = value / 100;
                        const isPeak = value >= 80;
                        
                        return (
                          <div
                            key={hourIndex}
                            className="aspect-square rounded transition-all hover:scale-110 cursor-pointer relative group"
                            style={{
                              background: isPeak
                                ? `rgb(var(--color-primary))`
                                : `rgba(var(--color-primary), ${intensity * 0.8})`,
                              opacity: intensity < 0.2 ? 0.3 : 1,
                            }}
                            title={`${day} ${hourIndex}:00 - ${value}% engagement`}
                          >
                            {isPeak && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Zap className="w-2 h-2 text-white" />
                              </div>
                            )}
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                              {day} {hourIndex}:00
                              <br />
                              {value}% engagement
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[0.2, 0.4, 0.6, 0.8, 1].map((intensity) => (
                      <div
                        key={intensity}
                        className="w-6 h-6 rounded"
                        style={{
                          background: `rgba(var(--color-primary), ${intensity * 0.8})`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-400">
                    Low → High Engagement
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center"
                    style={{ background: `rgb(var(--color-primary))` }}
                  >
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <div className="text-xs text-gray-400">Peak Time (80%+)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Trends */}
      <Card className="glass border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Weekly Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={insights.weeklyTrends}>
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
                width={40}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(15,23,42,0.85)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="engagement"
                stroke={`rgb(var(--color-primary))`}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 0 }}
                name="Engagement"
              />
              <Line
                type="monotone"
                dataKey="followers"
                stroke={`rgb(var(--color-secondary))`}
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 0 }}
                name="New Followers"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
