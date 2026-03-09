"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw, TrendingUp, Users, Heart, Share2, Bookmark, Eye } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function num(n) {
  return new Intl.NumberFormat("en-US").format(n);
}

// Demo data fallback
const demoData = {
  stats: {
    totalFollowers: 125000,
    totalEngagement: 45000,
    avgEngagementRate: 8.5,
    totalPosts: 156,
    topPerformingPlatform: "Instagram"
  },
  timeline: [
    { day: "Day 1", engagement: 2400, reach: 4200, saves: 800 },
    { day: "Day 2", engagement: 2800, reach: 4800, saves: 950 },
    { day: "Day 3", engagement: 3200, reach: 5200, saves: 1100 },
    { day: "Day 4", engagement: 2900, reach: 4900, saves: 900 },
    { day: "Day 5", engagement: 3500, reach: 5800, saves: 1200 },
    { day: "Day 6", engagement: 3800, reach: 6200, saves: 1350 },
    { day: "Day 7", engagement: 4200, reach: 6800, saves: 1500 },
  ],
  posts: [
    {
      id: 1,
      title: "AI Content Creation Tips",
      type: "Carousel",
      performance: "high",
      hook: "5 AI tools that changed my workflow",
      engagement: 4500,
      saves: 1200,
      shares: 450,
      likes: 3800,
      comments: 250,
      reach: 12000,
      platform: "Instagram"
    },
    {
      id: 2,
      title: "Behind the Scenes Vlog",
      type: "Reel",
      performance: "high",
      hook: "A day in my creator life",
      engagement: 3800,
      saves: 890,
      shares: 320,
      likes: 3200,
      comments: 180,
      reach: 9500,
      platform: "Instagram"
    },
    {
      id: 3,
      title: "Quick Tutorial",
      type: "Short",
      performance: "low",
      hook: "Learn this editing trick",
      engagement: 1200,
      saves: 340,
      shares: 120,
      likes: 980,
      comments: 60,
      reach: 4200,
      platform: "TikTok"
    },
    {
      id: 4,
      title: "Product Review",
      type: "Video",
      performance: "high",
      hook: "This tool is a game changer",
      engagement: 5200,
      saves: 1500,
      shares: 680,
      likes: 4300,
      comments: 420,
      reach: 15000,
      platform: "YouTube"
    },
    {
      id: 5,
      title: "Productivity Hacks",
      type: "Carousel",
      performance: "high",
      hook: "10 hacks for content creators",
      engagement: 4100,
      saves: 1350,
      shares: 520,
      likes: 3500,
      comments: 280,
      reach: 11000,
      platform: "Instagram"
    }
  ],
  patterns: {
    bestPostingTime: "8:40–9:30 AM (Tue/Thu)",
    bestContentType: "Carousels",
    audienceType: "Saves-heavy audience",
    topPerformingFormat: "Educational content",
    engagementBoost: "+27% first-hour velocity",
    savesMultiplier: "2.1× saves vs videos"
  }
};

export default function ContentAnalyzerPage() {
  const [data, setData] = useState(demoData); // Start with demo data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  const fetchCreatorStats = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://hp2y6p2qoi.execute-api.us-east-1.amazonaws.com/prod/creator-stats', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiData = await response.json();
      console.log('Creator Stats API Response:', apiData);

      // Process API response - handle different formats
      let processedData;
      if (apiData.body) {
        const parsed = typeof apiData.body === 'string' ? JSON.parse(apiData.body) : apiData.body;
        processedData = parsed;
      } else {
        processedData = apiData;
      }

      // Merge with demo data structure if API data is different
      setData({
        stats: processedData.stats || demoData.stats,
        timeline: processedData.timeline || demoData.timeline,
        posts: processedData.posts || demoData.posts,
        patterns: processedData.patterns || demoData.patterns
      });

      setLastFetch(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching creator stats:', err);
      
      // Check if it's a CORS error
      const isCorsError = err.message === 'Failed to fetch' || err.message.includes('CORS');
      
      if (isCorsError) {
        setError('API endpoint needs CORS enabled. Showing demo data for now.');
      } else {
        setError('Using demo data. Enable CORS on API endpoint to see live data.');
      }
      
      setData(demoData);
    } finally {
      setLoading(false);
    }
  };

  // Removed auto-fetch to prevent console errors
  // Click "Refresh Data" button to fetch from API
  // useEffect(() => {
  //   fetchCreatorStats();
  // }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Content Analysis Hub</div>
          <h1 className="text-2xl font-semibold text-white">
            Post Performance Analytics
          </h1>
          {lastFetch && (
            <p className="text-xs text-gray-500 mt-1">
              Last updated: {lastFetch}
            </p>
          )}
        </div>

        <Button
          onClick={fetchCreatorStats}
          disabled={loading}
          className="rounded-full text-white"
          style={{
            background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
          }}
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh Data
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

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl"
                style={{ background: `rgba(var(--color-primary), 0.2)` }}
              >
                <Users 
                  className="w-5 h-5"
                  style={{ color: `rgb(var(--color-primary))` }}
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{num(data.stats.totalFollowers)}</div>
                <div className="text-xs text-gray-400">Total Followers</div>
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
                <Heart 
                  className="w-5 h-5"
                  style={{ color: `rgb(var(--color-secondary))` }}
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{num(data.stats.totalEngagement)}</div>
                <div className="text-xs text-gray-400">Total Engagement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl"
                style={{ background: `rgba(var(--color-accent), 0.2)` }}
              >
                <TrendingUp 
                  className="w-5 h-5"
                  style={{ color: `rgb(var(--color-accent))` }}
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{data.stats.avgEngagementRate}%</div>
                <div className="text-xs text-gray-400">Avg Engagement Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div 
                className="p-3 rounded-xl"
                style={{ background: `rgba(var(--color-primary), 0.2)` }}
              >
                <Eye 
                  className="w-5 h-5"
                  style={{ color: `rgb(var(--color-primary))` }}
                />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{data.stats.totalPosts}</div>
                <div className="text-xs text-gray-400">Total Posts</div>
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
                <Share2 
                  className="w-5 h-5"
                  style={{ color: `rgb(var(--color-secondary))` }}
                />
              </div>
              <div>
                <div className="text-lg font-bold text-white">{data.stats.topPerformingPlatform}</div>
                <div className="text-xs text-gray-400">Top Platform</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass border-white/10 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeline} margin={{ left: 8, right: 8, top: 10 }}>
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
                <Legend />
                <Line
                  type="monotone"
                  dataKey="engagement"
                  stroke={`rgb(var(--color-primary))`}
                  strokeWidth={3}
                  dot={{ r: 2, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  name="Engagement"
                />
                <Line
                  type="monotone"
                  dataKey="reach"
                  stroke={`rgb(var(--color-secondary))`}
                  strokeWidth={2}
                  dot={false}
                  name="Reach"
                />
                <Line
                  type="monotone"
                  dataKey="saves"
                  stroke={`rgb(var(--color-accent))`}
                  strokeWidth={2}
                  dot={false}
                  name="Saves"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-white">AI Pattern Detection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Best Posting Time
              </div>
              <div className="mt-2 text-white font-medium">{data.patterns.bestPostingTime}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge 
                  style={{
                    background: `rgba(var(--color-primary), 0.15)`,
                    color: `rgb(var(--color-primary))`
                  }}
                >
                  {data.patterns.engagementBoost}
                </Badge>
                <Badge variant="secondary">{data.patterns.audienceType}</Badge>
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
                Content Type
              </div>
              <div className="mt-2 text-white font-medium">
                {data.patterns.bestContentType} outperform other formats
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge 
                  style={{
                    background: `rgba(var(--color-primary), 0.15)`,
                    color: `rgb(var(--color-primary))`
                  }}
                >
                  {data.patterns.savesMultiplier}
                </Badge>
                <Badge variant="secondary">{data.patterns.topPerformingFormat}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts List */}
      <Card className="glass border-white/10">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Recent Posts Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-3">
            <div className="space-y-3">
              {data.posts.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all"
                >
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="text-sm font-medium text-white">{p.title}</div>
                    <Badge variant="secondary">{p.type}</Badge>
                    <Badge
                      className={
                        p.performance === "high"
                          ? "bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20"
                          : "bg-amber-500/15 text-amber-200 hover:bg-amber-500/20"
                      }
                    >
                      {p.performance === "high" ? "High Performance" : "Needs Optimization"}
                    </Badge>
                    <Badge 
                      variant="outline"
                      style={{
                        borderColor: `rgba(var(--color-primary), 0.3)`,
                        background: `rgba(var(--color-primary), 0.1)`
                      }}
                    >
                      {p.platform}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400 mb-3">
                    Hook: "{p.hook}"
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs">
                    <div>
                      <div className="text-white font-semibold">{num(p.engagement)}</div>
                      <div className="text-gray-400">Engagement</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{num(p.likes)}</div>
                      <div className="text-gray-400">Likes</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{num(p.saves)}</div>
                      <div className="text-gray-400">Saves</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{num(p.shares)}</div>
                      <div className="text-gray-400">Shares</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{num(p.comments)}</div>
                      <div className="text-gray-400">Comments</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{num(p.reach)}</div>
                      <div className="text-gray-400">Reach</div>
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
