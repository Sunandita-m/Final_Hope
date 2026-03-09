export const personalizedTrendSuggestions = [
  {
    id: 1,
    date: "2026-03-10",
    title: "Top 5 AI Tools Developers Should Use in 2026",
    platform: "YouTube",
    category: "AI Tools",
    engagement: "High",
    viralScore: 87,
    description: "Comprehensive review of cutting-edge AI development tools",
    hashtags: ["#AItools", "#developers", "#coding"],
  },
  {
    id: 2,
    date: "2026-03-12",
    title: "Build a SaaS Using AI in 10 Minutes",
    platform: "YouTube",
    category: "Tutorial",
    engagement: "Very High",
    viralScore: 92,
    description: "Quick tutorial on rapid SaaS development with AI assistance",
    hashtags: ["#buildinpublic", "#AItools", "#coding"],
  },
  {
    id: 3,
    date: "2026-03-13",
    title: "Best VS Code Extensions for Developers",
    platform: "LinkedIn",
    category: "Productivity",
    engagement: "High",
    viralScore: 85,
    description: "Essential VS Code extensions that boost developer productivity",
    hashtags: ["#programmingtips", "#developers", "#coding"],
  },
  {
    id: 4,
    date: "2026-03-15",
    title: "AI Agents Explained for Programmers",
    platform: "Twitter/X",
    category: "Education",
    engagement: "High",
    viralScore: 88,
    description: "Breaking down AI agents in simple terms for developers",
    hashtags: ["#AItools", "#techcreator", "#developers"],
  },
  {
    id: 5,
    date: "2026-03-17",
    title: "Developer Productivity Tools That Save 10 Hours a Week",
    platform: "YouTube",
    category: "Productivity",
    engagement: "Very High",
    viralScore: 90,
    description: "Time-saving tools every developer should know about",
    hashtags: ["#programmingtips", "#developers", "#buildinpublic"],
  },
];

export const personalizedInsights = [
  {
    id: 1,
    type: "opportunity",
    priority: "high",
    title: "Peak Developer Engagement Window",
    description: "Your tech audience is 3x more active on Tuesday evenings at 7 PM",
    metric: "+285% engagement",
    action: "Schedule AI tool reviews during this window",
    timestamp: "2 hours ago",
  },
  {
    id: 2,
    type: "trend",
    priority: "high",
    title: "AI Development Tools Trending",
    description: "Content about AI coding assistants is getting 2.4x more engagement in tech communities",
    metric: "+140% engagement",
    action: "Create content about AI development tools",
    timestamp: "5 hours ago",
  },
  {
    id: 3,
    type: "opportunity",
    priority: "medium",
    title: "Developer Hashtag Performance",
    description: "#AItools and #buildinpublic are driving 60% of your reach among developers",
    metric: "+60% reach",
    action: "Use these hashtags consistently in tech content",
    timestamp: "1 day ago",
  },
  {
    id: 4,
    type: "success",
    priority: "low",
    title: "Tech Content Performing Well",
    description: "Your programming productivity content gained 450 new developer followers this week",
    metric: "+35% growth",
    action: "Continue creating developer-focused content",
    timestamp: "2 days ago",
  },
];

export const personalizedRecommendations = [
  {
    id: 1,
    title: "Focus on AI Development Tools",
    description: "Your audience shows high interest in AI coding assistants and development automation. Create more content around practical AI tools for developers.",
    priority: "high",
    category: "Content Strategy",
  },
  {
    id: 2,
    title: "Optimize for Developer Schedule",
    description: "Post technical tutorials on Tuesday and Thursday evenings when developers are most active after work hours.",
    priority: "high",
    category: "Timing",
  },
  {
    id: 3,
    title: "Leverage Tech Community Hashtags",
    description: "Use #AItools, #buildinpublic, and #programmingtips to reach more developers in your niche.",
    priority: "medium",
    category: "Reach",
  },
  {
    id: 4,
    title: "Create Tutorial Series",
    description: "Your quick tutorial format performs well. Consider a series on 'AI Tools for Developers' with 5-10 minute episodes.",
    priority: "medium",
    category: "Content Format",
  },
];

export const personalizedContentIdeas = [
  {
    title: "Top 5 AI Tools Developers Should Use in 2026",
    viralScore: 87,
    potential: "High",
    reasoning: "Developer-focused AI tools have strong engagement trends and high search demand among technology audiences.",
    suggestedPlatform: "YouTube",
    estimatedReach: "15K-25K",
  },
  {
    title: "Build a SaaS Using AI in 10 Minutes",
    viralScore: 92,
    potential: "Very High",
    reasoning: "Quick build tutorials resonate strongly with developers looking for practical AI applications.",
    suggestedPlatform: "YouTube",
    estimatedReach: "20K-35K",
  },
  {
    title: "Best VS Code Extensions for Developers",
    viralScore: 85,
    potential: "High",
    reasoning: "Productivity tools for developers consistently perform well, especially VS Code content.",
    suggestedPlatform: "LinkedIn",
    estimatedReach: "10K-18K",
  },
];

export const getPersonalizedHeatmapData = () => {
  const baseData = [
    [12, 15, 18, 22, 28, 35, 42, 58, 72, 65, 48, 38, 32, 28, 35, 42, 55, 68, 72, 58, 42, 32, 22, 15],
    [15, 18, 22, 28, 35, 42, 55, 68, 85, 92, 78, 62, 48, 42, 52, 65, 78, 88, 95, 82, 65, 48, 35, 25],
    [18, 22, 25, 32, 38, 45, 52, 62, 75, 68, 55, 45, 38, 35, 42, 55, 68, 75, 68, 52, 38, 28, 22, 18],
    [15, 18, 25, 32, 42, 52, 65, 78, 88, 95, 82, 68, 52, 45, 55, 68, 82, 92, 98, 85, 72, 55, 38, 25],
    [18, 22, 28, 35, 42, 48, 58, 68, 78, 72, 62, 52, 45, 42, 48, 58, 72, 82, 78, 62, 45, 32, 25, 18],
    [22, 25, 28, 32, 35, 38, 42, 48, 55, 62, 68, 72, 65, 58, 62, 68, 75, 82, 78, 68, 55, 42, 35, 28],
    [18, 22, 25, 28, 32, 35, 38, 42, 48, 45, 42, 38, 35, 32, 38, 42, 48, 52, 48, 42, 35, 28, 25, 18],
  ];
  
  return baseData;
};
