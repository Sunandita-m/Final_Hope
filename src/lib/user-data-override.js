import * as baseData from './demo-data';
import { personalizedTrendSuggestions, personalizedInsights, personalizedRecommendations, personalizedContentIdeas } from './personalized-data';

export const creator = {
  name: "Alex Tech",
  handle: "@alextech",
  niche: "Technology & AI tools for developers",
};

export const kpis = baseData.kpis;
export const goals = baseData.goals;
export const timeline = baseData.timeline;

export const insightOfTheDay = {
  title: "Developer audience engagement peak detected",
  body: "Your AI tool tutorials are getting 2.4× more engagement on Tuesday and Thursday evenings. Schedule technical content during these windows for maximum reach among developers.",
  confidence: 0.87,
};

export const posts = [
  {
    id: "p-105",
    title: "Top 5 AI Tools Developers Should Use in 2026",
    type: "Video",
    postedAt: "Tue 7:00 PM",
    engagement: 12420,
    saves: 3210,
    shares: 842,
    hook: "These AI tools will change how you code",
    performance: "high",
  },
  {
    id: "p-104",
    title: "Build a SaaS Using AI in 10 Minutes",
    type: "Tutorial",
    postedAt: "Thu 6:00 PM",
    engagement: 15820,
    saves: 4110,
    shares: 1210,
    hook: "Watch me build a complete SaaS with AI",
    performance: "high",
  },
  {
    id: "p-103",
    title: "Best VS Code Extensions for Developers",
    type: "Carousel",
    postedAt: "Sat 11:00 AM",
    engagement: 9120,
    saves: 2388,
    shares: 612,
    hook: "10 VS Code extensions that save hours",
    performance: "high",
  },
];

export const strategies = [
  {
    id: "s-1",
    title: "Focus on AI development tool tutorials",
    why: "Your developer audience shows 78% higher engagement with AI coding assistant content. Quick tutorials (5-10 min) perform best.",
    probability: 0.87,
    actions: ["Create AI tool review series", "Focus on practical coding examples", "Post on Tuesday/Thursday evenings"],
    abTest: "Format A: Quick tutorial vs Format B: Deep dive comparison",
  },
  {
    id: "s-2",
    title: "Optimize posting schedule for developer timezone",
    why: "Developers engage most after work hours (6-8 PM) and Saturday mornings. Your Tuesday 7 PM posts get 2.4× more reach.",
    probability: 0.82,
    actions: ["Schedule technical content for evening slots", "Use Saturday AM for productivity tips"],
    abTest: "Time A: 7 PM vs Time B: 8 PM",
  },
  {
    id: "s-3",
    title: "Leverage tech community hashtags",
    why: "#AItools and #buildinpublic drive 60% of your reach. Developer-focused hashtags increase discoverability significantly.",
    probability: 0.75,
    actions: ["Use #AItools #coding #developers consistently", "Engage with #buildinpublic community"],
    abTest: "Hashtag set A: AI-focused vs Set B: General tech",
  },
];

export const mentorSeedThread = [
  {
    id: "m1",
    role: "mentor",
    text: "Hey Alex — I analyzed your tech content performance. Your AI tool tutorials are resonating strongly with developers. Want to focus on growing reach or deepening engagement?",
  },
  {
    id: "m2",
    role: "user",
    text: "I want to grow my developer audience and increase engagement.",
  },
  {
    id: "m3",
    role: "mentor",
    text: "Perfect. Your sweet spot is practical AI tool content for developers. I recommend: 1) Tuesday/Thursday evening posts for max developer engagement, 2) Quick 5-10 min tutorials, 3) Use #AItools and #buildinpublic hashtags. Want me to suggest 5 content ideas for next week?",
  },
];

export { personalizedTrendSuggestions, personalizedInsights, personalizedRecommendations, personalizedContentIdeas };
