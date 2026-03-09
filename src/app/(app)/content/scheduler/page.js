"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Calendar,
  Clock,
  Plus,
  RefreshCw,
  Instagram,
  Youtube,
  Zap,
  Trash2,
  Edit,
  Send,
  CheckCircle2,
} from "lucide-react";

// Demo scheduled posts
const demoScheduledPosts = [
  {
    id: 1,
    title: "AI Content Tips",
    description: "5 AI tools every creator needs",
    platform: "instagram",
    scheduledDate: "2026-03-12",
    scheduledTime: "09:00",
    status: "scheduled",
    bestTime: true,
  },
  {
    id: 2,
    title: "Behind the Scenes",
    description: "A day in my creator life",
    platform: "tiktok",
    scheduledDate: "2026-03-13",
    scheduledTime: "14:30",
    status: "scheduled",
    bestTime: false,
  },
  {
    id: 3,
    title: "Tutorial Video",
    description: "How to edit like a pro",
    platform: "youtube",
    scheduledDate: "2026-03-15",
    scheduledTime: "10:00",
    status: "scheduled",
    bestTime: true,
  },
  {
    id: 4,
    title: "Product Review",
    description: "Reviewing the latest creator tools",
    platform: "instagram",
    scheduledDate: "2026-03-10",
    scheduledTime: "15:00",
    status: "scheduled",
    bestTime: false,
  },
];

const platforms = [
  { id: "instagram", name: "Instagram", icon: Instagram, color: "rgb(225, 48, 108)" },
  { id: "tiktok", name: "TikTok", icon: Zap, color: "rgb(0, 242, 234)" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "rgb(255, 0, 0)" },
];

export default function SchedulerPage() {
  const [scheduledPosts, setScheduledPosts] = useState(demoScheduledPosts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    platform: "instagram",
    scheduledDate: "",
    scheduledTime: "",
  });

  // Fetch scheduled posts from API
  const fetchScheduledPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://cmve5efqg3.execute-api.us-east-1.amazonaws.com/scheduler",
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
      console.log("Scheduler API Response:", apiData);

      let processedData;
      if (apiData.body) {
        const parsed =
          typeof apiData.body === "string" ? JSON.parse(apiData.body) : apiData.body;
        processedData = parsed;
      } else {
        processedData = apiData;
      }

      if (processedData.scheduledPosts || processedData.posts) {
        setScheduledPosts(processedData.scheduledPosts || processedData.posts);
      }

      setLastFetch(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Error fetching scheduled posts:", err);

      const isCorsError =
        err.message === "Failed to fetch" || err.message.includes("CORS");

      if (isCorsError) {
        setError("API endpoint needs CORS enabled. Showing demo data for now.");
      } else {
        setError("Using demo data. Enable CORS on API endpoint to see live data.");
      }

      setScheduledPosts(demoScheduledPosts);
    } finally {
      setLoading(false);
    }
  };

  // Schedule a new post
  const schedulePost = async () => {
    if (!formData.title || !formData.scheduledDate || !formData.scheduledTime) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://cmve5efqg3.execute-api.us-east-1.amazonaws.com/scheduler",
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            platform: formData.platform,
            scheduledDate: formData.scheduledDate,
            scheduledTime: formData.scheduledTime,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Schedule Post Response:", result);

      // Extract jobId from API response
      let jobId = Date.now();
      let processedResult;
      
      if (result.body) {
        processedResult = typeof result.body === "string" ? JSON.parse(result.body) : result.body;
      } else {
        processedResult = result;
      }
      
      // Use API-provided jobId if available
      if (processedResult.jobId || processedResult.id) {
        jobId = processedResult.jobId || processedResult.id;
      }

      const newPost = {
        id: jobId,
        ...formData,
        status: "scheduled",
        bestTime: false,
      };

      setScheduledPosts([...scheduledPosts, newPost]);

      setFormData({
        title: "",
        description: "",
        platform: "instagram",
        scheduledDate: "",
        scheduledTime: "",
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error scheduling post:", err);
      setError("Could not schedule post. API may need CORS enabled.");
    } finally {
      setLoading(false);
    }
  };

  // Delete scheduled post via API
  const deletePost = async (jobId) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://cmve5efqg3.execute-api.us-east-1.amazonaws.com/scheduler/${jobId}`,
        {
          method: "DELETE",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Delete Post Response:", result);

      // Remove from local state
      setScheduledPosts(scheduledPosts.filter((p) => p.id !== jobId));
    } catch (err) {
      console.error("Error deleting post:", err);
      
      // Still remove from local state in demo mode
      setScheduledPosts(scheduledPosts.filter((p) => p.id !== jobId));
      
      setError("Could not delete post from API. Removed locally.");
    } finally {
      setLoading(false);
    }
  };

  const sortedPosts = [...scheduledPosts].sort(
    (a, b) =>
      new Date(a.scheduledDate + " " + a.scheduledTime) -
      new Date(b.scheduledDate + " " + b.scheduledTime)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Content Scheduler</div>
          <h1 className="text-2xl font-semibold text-white">
            Schedule Your Posts
          </h1>
          {lastFetch && (
            <p className="text-xs text-gray-500 mt-1">Last updated: {lastFetch}</p>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={fetchScheduledPosts}
            disabled={loading}
            variant="outline"
            className="rounded-full"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="rounded-full text-white"
            style={{
              background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`,
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Post
          </Button>
        </div>
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

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Schedule Form */}
        <Card className={`glass border-white/10 ${showForm ? "lg:col-span-1" : "hidden"}`}>
          <CardHeader>
            <CardTitle className="text-white">New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white text-xs">
                Post Title *
              </Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="platform" className="text-white text-xs">
                Platform *
              </Label>
              <select
                id="platform"
                value={formData.platform}
                onChange={(e) =>
                  setFormData({ ...formData, platform: e.target.value })
                }
                className="w-full h-10 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm"
              >
                {platforms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white text-xs">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter post description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white min-h-[80px] text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-white text-xs">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) =>
                  setFormData({ ...formData, scheduledDate: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-white text-xs">
                Time *
              </Label>
              <Input
                id="time"
                type="time"
                value={formData.scheduledTime}
                onChange={(e) =>
                  setFormData({ ...formData, scheduledTime: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setShowForm(false)}
                className="rounded-full flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={schedulePost}
                disabled={loading}
                className="rounded-full flex-1 text-white"
                style={{
                  background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`,
                }}
              >
                <Send className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Scheduled Posts Timeline */}
        <Card className={`glass border-white/10 ${showForm ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-white">Scheduled Posts ({sortedPosts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-3">
              <div className="space-y-3">
                {sortedPosts.map((post) => {
                  const platform = platforms.find((p) => p.id === post.platform);
                  const PlatformIcon = platform?.icon || Calendar;
                  const postDate = new Date(post.scheduledDate + " " + post.scheduledTime);
                  const isUpcoming = postDate > new Date();

                  return (
                    <div
                      key={post.id}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        {/* Platform Icon */}
                        <div
                          className="p-3 rounded-xl flex-shrink-0"
                          style={{ background: `${platform?.color}20` }}
                        >
                          <PlatformIcon
                            className="w-5 h-5"
                            style={{ color: platform?.color }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <h3 className="text-white font-medium mb-1">{post.title}</h3>
                              <div className="text-xs text-gray-400">{platform?.name}</div>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full h-8 w-8 p-0"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deletePost(post.id)}
                                className="rounded-full h-8 w-8 p-0 text-rose-400 hover:text-rose-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>

                          {post.description && (
                            <p className="text-sm text-gray-400 mb-3">{post.description}</p>
                          )}

                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                borderColor: `rgba(var(--color-primary), 0.3)`,
                                background: `rgba(var(--color-primary), 0.1)`,
                              }}
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {postDate.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                borderColor: `rgba(var(--color-secondary), 0.3)`,
                                background: `rgba(var(--color-secondary), 0.1)`,
                              }}
                            >
                              <Clock className="w-3 h-3 mr-1" />
                              {postDate.toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </Badge>
                            {post.bestTime && (
                              <Badge className="bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20 text-xs">
                                <Zap className="w-3 h-3 mr-1" />
                                Best Time
                              </Badge>
                            )}
                            {isUpcoming && (
                              <Badge
                                variant="outline"
                                className="text-xs"
                                style={{
                                  borderColor: `rgba(var(--color-accent), 0.3)`,
                                  background: `rgba(var(--color-accent), 0.1)`,
                                }}
                              >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Scheduled
                              </Badge>
                            )}
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
      </div>
    </div>
  );
}
