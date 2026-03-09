"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Target,
  Users,
  Heart,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  Rocket,
} from "lucide-react";

const goalOptions = [
  {
    id: "followers",
    icon: Users,
    label: "Grow Followers",
    description: "Increase your audience size",
    color: "rgb(var(--color-primary))",
  },
  {
    id: "engagement",
    icon: Heart,
    label: "Boost Engagement",
    description: "Get more likes, comments, shares",
    color: "rgb(var(--color-secondary))",
  },
  {
    id: "reach",
    icon: TrendingUp,
    label: "Expand Reach",
    description: "Get your content seen by more people",
    color: "rgb(var(--color-accent))",
  },
  {
    id: "monetization",
    icon: DollarSign,
    label: "Monetize Content",
    description: "Turn your content into revenue",
    color: "rgb(34, 197, 94)",
  },
];

export default function GoalSettingPage() {
  const router = useRouter();
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [targets, setTargets] = useState({
    followers: "",
    posts: "",
    timeframe: "3",
  });

  const toggleGoal = (id) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    // Save onboarding data
    console.log("Goals:", selectedGoals);
    console.log("Targets:", targets);
    
    // Redirect to dashboard
    router.push("/dashboard/overview");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div
            className="p-4 rounded-2xl"
            style={{ background: "rgba(var(--color-primary), 0.2)" }}
          >
            <Target
              className="w-8 h-8"
              style={{ color: "rgb(var(--color-primary))" }}
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Set Your Goals</h1>
        <p className="text-gray-400">
          Define what success looks like for your content journey
        </p>
      </div>

      {/* Goal Selection */}
      <div>
        <h2 className="text-white font-medium mb-4">What do you want to achieve?</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {goalOptions.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoals.includes(goal.id);

            return (
              <Card
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`glass border-white/10 cursor-pointer transition-all hover:scale-105 ${
                  isSelected ? "ring-2" : ""
                }`}
                style={{
                  ringColor: isSelected ? goal.color : "transparent",
                }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{
                        background: isSelected
                          ? `${goal.color}30`
                          : "rgba(255,255,255,0.05)",
                      }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: isSelected ? goal.color : "rgba(255,255,255,0.5)" }}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">{goal.label}</h3>
                        {isSelected && (
                          <CheckCircle2
                            className="w-4 h-4"
                            style={{ color: goal.color }}
                          />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">{goal.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Target Numbers */}
      <Card className="glass border-white/10">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-white font-medium">Set your targets</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="followers" className="text-white text-sm">
                Follower Goal
              </Label>
              <Input
                id="followers"
                type="number"
                placeholder="10,000"
                value={targets.followers}
                onChange={(e) =>
                  setTargets({ ...targets, followers: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="posts" className="text-white text-sm">
                Posts per Week
              </Label>
              <Input
                id="posts"
                type="number"
                placeholder="5"
                value={targets.posts}
                onChange={(e) => setTargets({ ...targets, posts: e.target.value })}
                className="bg-white/5 border-white/10 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeframe" className="text-white text-sm">
                Timeframe (months)
              </Label>
              <Input
                id="timeframe"
                type="number"
                placeholder="3"
                value={targets.timeframe}
                onChange={(e) =>
                  setTargets({ ...targets, timeframe: e.target.value })
                }
                className="bg-white/5 border-white/10 text-white"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Message */}
      <Card className="glass border-white/10 bg-white/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Rocket
              className="w-5 h-5 flex-shrink-0"
              style={{ color: "rgb(var(--color-primary))" }}
            />
            <div>
              <h3 className="text-white font-medium mb-1">
                You're all set!
              </h3>
              <p className="text-sm text-gray-400">
                We'll track your progress and provide personalized recommendations to
                help you achieve these goals. You can update them anytime in settings.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Link href="/onboarding/ai-training">
          <Button variant="outline" className="rounded-full">
            Back
          </Button>
        </Link>

        <Button
          onClick={handleComplete}
          disabled={selectedGoals.length === 0}
          className="rounded-full text-white px-8"
          style={{
            background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`,
          }}
        >
          Complete Setup
          <Rocket className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
