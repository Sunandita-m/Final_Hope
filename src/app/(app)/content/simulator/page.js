"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Zap, BarChart3, Trash2 } from "lucide-react";

export default function SimulatorPage() {
  const [activeTab, setActiveTab] = useState("ab-test");
  const [scenarios, setScenarios] = useState([
    {
      id: 1,
      name: "Scenario A",
      title: "10 JavaScript Tips You Need to Know",
      description: "Learn essential JavaScript concepts that every developer should master.",
      hashtags: "#JavaScript #WebDevelopment #Coding",
      platform: "LinkedIn",
      predictedEngagement: 87,
      predictedReach: 2400,
      predictedClicks: 156,
    },
    {
      id: 2,
      name: "Scenario B",
      title: "JavaScript Hacks That Will Blow Your Mind 🤯",
      description: "Discover mind-bending JavaScript tricks that will level up your coding game instantly.",
      hashtags: "#JavaScript #DevTips #Programming",
      platform: "TikTok",
      predictedEngagement: 92,
      predictedReach: 5200,
      predictedClicks: 312,
    },
  ]);

  const [newScenario, setNewScenario] = useState({
    name: "",
    title: "",
    description: "",
    hashtags: "",
    platform: "LinkedIn",
  });

  const addScenario = () => {
    if (newScenario.name && newScenario.title) {
      const engagement = Math.floor(Math.random() * 20) + 75;
      const reach = Math.floor(Math.random() * 3000) + 1500;
      const clicks = Math.floor(reach * (engagement / 100) * 0.15);

      setScenarios([
        ...scenarios,
        {
          id: Date.now(),
          ...newScenario,
          predictedEngagement: engagement,
          predictedReach: reach,
          predictedClicks: clicks,
        },
      ]);

      setNewScenario({
        name: "",
        title: "",
        description: "",
        hashtags: "",
        platform: "LinkedIn",
      });
    }
  };

  const deleteScenario = (id) => {
    setScenarios(scenarios.filter((s) => s.id !== id));
  };

  const getBestScenario = () => {
    return scenarios.reduce((best, current) =>
      current.predictedEngagement > best.predictedEngagement ? current : best
    );
  };

  const getEngagementColor = (engagement) => {
    if (engagement >= 90) return "bg-emerald-500/20 text-emerald-700";
    if (engagement >= 80) return "bg-blue-500/20 text-blue-700";
    if (engagement >= 70) return "bg-amber-500/20 text-amber-700";
    return "bg-rose-500/20 text-rose-700";
  };

  const bestScenario = getBestScenario();

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-6">
        <h1
          className="text-2xl font-semibold"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Content Simulator
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Test different content variations and predict performance before publishing.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass rounded-2xl p-1">
          <TabsTrigger value="ab-test">A/B Testing</TabsTrigger>
          <TabsTrigger value="insights">Performance Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="ab-test" className="space-y-6">
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                Create New Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Scenario name (e.g., Scenario C)"
                  value={newScenario.name}
                  onChange={(e) =>
                    setNewScenario({ ...newScenario, name: e.target.value })
                  }
                  className="glass border-0"
                />
                <select
                  value={newScenario.platform}
                  onChange={(e) =>
                    setNewScenario({ ...newScenario, platform: e.target.value })
                  }
                  className="glass border-0 rounded-lg px-3 py-2 text-sm"
                >
                  <option>LinkedIn</option>
                  <option>TikTok</option>
                  <option>Instagram</option>
                  <option>YouTube</option>
                  <option>Twitter/X</option>
                </select>
              </div>

              <Input
                placeholder="Content title"
                value={newScenario.title}
                onChange={(e) =>
                  setNewScenario({ ...newScenario, title: e.target.value })
                }
                className="glass border-0"
              />

              <Textarea
                placeholder="Content description"
                value={newScenario.description}
                onChange={(e) =>
                  setNewScenario({ ...newScenario, description: e.target.value })
                }
                className="glass border-0 min-h-20"
              />

              <Input
                placeholder="Hashtags (e.g., #JavaScript #WebDev)"
                value={newScenario.hashtags}
                onChange={(e) =>
                  setNewScenario({ ...newScenario, hashtags: e.target.value })
                }
                className="glass border-0"
              />

              <Button
                onClick={addScenario}
                className="w-full"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                Add Scenario
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {scenarios.map((scenario) => (
              <Card key={scenario.id} className="glass border-0">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{scenario.name}</h3>
                        <Badge variant="outline">{scenario.platform}</Badge>
                        {scenario.id === bestScenario.id && (
                          <Badge
                            className="bg-emerald-500/20 text-emerald-700"
                          >
                            Best Performer
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium text-sm mb-1">{scenario.title}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {scenario.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {scenario.hashtags}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteScenario(scenario.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Engagement
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span
                          className={`text-xl font-bold px-2 py-1 rounded-lg ${getEngagementColor(
                            scenario.predictedEngagement
                          )}`}
                        >
                          {scenario.predictedEngagement}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Predicted Reach
                      </p>
                      <p className="text-lg font-semibold">
                        {scenario.predictedReach.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Predicted Clicks
                      </p>
                      <p className="text-lg font-semibold">
                        {scenario.predictedClicks.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <Card className="glass border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
                Performance Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {scenarios.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {scenarios.map((scenario) => (
                      <div key={scenario.id}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {scenario.name} - {scenario.platform}
                          </span>
                          <span className="text-sm font-semibold">
                            {scenario.predictedEngagement}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${scenario.predictedEngagement}%`,
                              backgroundColor: "var(--color-primary)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border/50 pt-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      Recommendation
                    </h4>
                    <div className="glass rounded-lg p-4 bg-emerald-500/10 border border-emerald-500/20">
                      <p className="text-sm">
                        <span className="font-semibold text-emerald-700">
                          {bestScenario.name}
                        </span>{" "}
                        shows the highest predicted engagement at{" "}
                        <span className="font-semibold">
                          {bestScenario.predictedEngagement}%
                        </span>
                        . This variation is optimized for{" "}
                        <span className="font-semibold">
                          {bestScenario.platform}
                        </span>{" "}
                        and is recommended for publishing.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Create scenarios to see performance insights
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
