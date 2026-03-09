"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Instagram,
  Youtube,
  Twitter,
  Zap,
  CheckCircle2,
  XCircle,
  ExternalLink,
  RefreshCw,
  Settings,
} from "lucide-react";

const integrations = [
  {
    id: "instagram",
    name: "Instagram",
    icon: Instagram,
    color: "rgb(225, 48, 108)",
    description: "Connect your Instagram account to analyze posts and stories",
    connected: false,
    features: ["Post Analytics", "Story Insights", "Audience Data", "Engagement Metrics"],
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: Zap,
    color: "rgb(0, 242, 234)",
    description: "Sync your TikTok content and track viral trends",
    connected: true,
    lastSync: "2 hours ago",
    features: ["Video Analytics", "Trend Detection", "Hashtag Performance", "Follower Growth"],
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: Youtube,
    color: "rgb(255, 0, 0)",
    description: "Import YouTube videos and monitor channel performance",
    connected: true,
    lastSync: "5 hours ago",
    features: ["Video Performance", "Watch Time", "Subscriber Analytics", "Revenue Tracking"],
  },
  {
    id: "twitter",
    name: "X (Twitter)",
    icon: Twitter,
    color: "rgb(29, 155, 240)",
    description: "Connect X to track tweets and engagement",
    connected: false,
    features: ["Tweet Analytics", "Engagement Rate", "Follower Insights", "Trending Topics"],
  },
];

export default function IntegrationsSettingsPage() {
  const [platforms, setPlatforms] = useState(integrations);
  const [autoSync, setAutoSync] = useState(true);

  const toggleConnection = (id) => {
    setPlatforms(
      platforms.map((p) =>
        p.id === id ? { ...p, connected: !p.connected } : p
      )
    );
  };

  const syncNow = (id) => {
    console.log(`Syncing ${id}...`);
    // Add sync logic here
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-white">Integrations</h1>
        <p className="text-sm text-gray-400 mt-1">
          Connect Instagram, TikTok, YouTube, X, and analytics sources here.
        </p>
      </header>

      {/* Auto-sync Settings */}
      <Card className="glass border-white/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Auto-sync Data</h3>
              <p className="text-sm text-gray-400 mt-1">
                Automatically sync data from connected platforms every hour
              </p>
            </div>
            <Switch
              checked={autoSync}
              onCheckedChange={setAutoSync}
              className="data-[state=checked]:bg-[rgb(var(--color-primary))]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Platform Integrations */}
      <div className="grid gap-4 md:grid-cols-2">
        {platforms.map((platform) => {
          const Icon = platform.icon;

          return (
            <Card key={platform.id} className="glass border-white/10">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="p-3 rounded-xl"
                      style={{ background: `${platform.color}20` }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: platform.color }}
                      />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">
                        {platform.name}
                      </CardTitle>
                      {platform.connected && platform.lastSync && (
                        <p className="text-xs text-gray-400 mt-1">
                          Last synced: {platform.lastSync}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    className={
                      platform.connected
                        ? "bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/20"
                        : "bg-gray-500/15 text-gray-400 hover:bg-gray-500/20"
                    }
                  >
                    {platform.connected ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 mr-1" />
                        Not Connected
                      </>
                    )}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-gray-400">{platform.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Features
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {platform.features.map((feature, i) => (
                      <div
                        key={i}
                        className="text-xs text-gray-300 flex items-center gap-1"
                      >
                        <div
                          className="w-1 h-1 rounded-full"
                          style={{ background: platform.color }}
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {platform.connected ? (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => syncNow(platform.id)}
                        className="flex-1 rounded-full"
                      >
                        <RefreshCw className="w-3 h-3 mr-2" />
                        Sync Now
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        <Settings className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleConnection(platform.id)}
                        className="rounded-full text-rose-400 hover:text-rose-300"
                      >
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => toggleConnection(platform.id)}
                      className="flex-1 rounded-full text-white"
                      style={{
                        background: platform.color,
                      }}
                    >
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Connect {platform.name}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Integrations */}
      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Analytics & Tools</CardTitle>
          <p className="text-sm text-gray-400 mt-1">
            Connect third-party analytics and creator tools
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { name: "Google Analytics", status: "Available" },
              { name: "Meta Business Suite", status: "Available" },
              { name: "Hootsuite", status: "Coming Soon" },
              { name: "Buffer", status: "Coming Soon" },
              { name: "Canva", status: "Available" },
              { name: "Adobe Creative Cloud", status: "Coming Soon" },
            ].map((tool, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-white">
                    {tool.name}
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs"
                    style={{
                      borderColor:
                        tool.status === "Available"
                          ? "rgba(var(--color-primary), 0.3)"
                          : "rgba(255,255,255,0.2)",
                      background:
                        tool.status === "Available"
                          ? "rgba(var(--color-primary), 0.1)"
                          : "rgba(255,255,255,0.05)",
                    }}
                  >
                    {tool.status}
                  </Badge>
                </div>
                {tool.status === "Available" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full rounded-full text-xs"
                  >
                    Connect
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="glass border-white/10 bg-white/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div
              className="p-3 rounded-xl flex-shrink-0"
              style={{ background: "rgba(var(--color-primary), 0.2)" }}
            >
              <ExternalLink
                className="w-5 h-5"
                style={{ color: "rgb(var(--color-primary))" }}
              />
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">
                Need help connecting?
              </h3>
              <p className="text-sm text-gray-400 mb-3">
                Check our integration guides for step-by-step instructions on
                connecting each platform.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                style={{
                  borderColor: "rgba(var(--color-primary), 0.3)",
                  color: "rgb(var(--color-primary))",
                }}
              >
                View Documentation
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
