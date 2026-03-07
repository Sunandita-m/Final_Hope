export const creator = {
  name: "Ava",
  handle: "@ava.creates",
  niche: "AI + design tips",
};

export const kpis = {
  followers: { value: 48210, deltaPct: 8.4 },
  engagementRate: { value: 6.8, deltaPct: 1.2 },
  avgReach: { value: 75200, deltaPct: 5.1 },
  bestContentType: { value: "Carousels", deltaPct: 12.9 },
};

export const goals = [
  { id: "growth", label: "30-day follower goal", progress: 72, target: 50000 },
  { id: "engagement", label: "Engagement consistency", progress: 58, target: 7.5 },
  { id: "cadence", label: "Posting cadence", progress: 85, target: 20 },
];

export const insightOfTheDay = {
  title: "Your audience is in “save mode”.",
  body: "Posts with 3-step frameworks are getting 2.1× more saves than your average. Double down on carousel hooks and add a “save this” CTA.",
  confidence: 0.86,
};

export const timeline = Array.from({ length: 30 }).map((_, i) => {
  const day = i + 1;
  const base = 5200 + i * 90;
  const spike = [7, 14, 22, 28].includes(day) ? 1800 : 0;
  return {
    day,
    date: `Day ${day}`,
    engagement: Math.round(base + spike + Math.sin(i / 3) * 450),
    reach: Math.round(62000 + i * 420 + spike * 18),
  };
});

export const posts = [
  {
    id: "p-102",
    title: "3 prompts to turn comments into content",
    type: "Carousel",
    postedAt: "Tue 9:10 AM",
    engagement: 10420,
    saves: 2310,
    shares: 642,
    hook: "Steal my comment-to-content system",
    performance: "high",
  },
  {
    id: "p-101",
    title: "Why your hooks feel generic (fix in 10s)",
    type: "Short video",
    postedAt: "Fri 6:40 PM",
    engagement: 4820,
    saves: 610,
    shares: 210,
    hook: "Your hook is a promise, not a title",
    performance: "low",
  },
  {
    id: "p-100",
    title: "The “before/after” template that converts",
    type: "Carousel",
    postedAt: "Mon 8:05 AM",
    engagement: 9120,
    saves: 1988,
    shares: 512,
    hook: "Before: chaos. After: system.",
    performance: "high",
  },
];

export const strategies = [
  {
    id: "s-1",
    title: "Lock in a repeatable Tuesday/Thursday “framework” series",
    why: "Your saves spike when you teach in 3–5 steps. A weekly series trains expectation and increases returning viewers.",
    probability: 0.78,
    actions: ["Pick 4 topics", "Write 8 hooks", "Batch design 4 carousels"],
    abTest: "Hook A: pain-first vs Hook B: result-first",
  },
  {
    id: "s-2",
    title: "Move high-value posts 45 minutes earlier",
    why: "Your audience peaks at 8:30–9:30 AM. Posting earlier improves first-hour velocity which the algorithm rewards.",
    probability: 0.71,
    actions: ["Schedule 2 posts at 8:40 AM", "Compare 1h engagement vs baseline"],
    abTest: "CTA A: “Save this” vs CTA B: “Comment ‘plan’ for template”",
  },
  {
    id: "s-3",
    title: "Add a ‘micro-proof’ slide to every carousel",
    why: "Your best performers include credibility cues (numbers, screenshots). It reduces skepticism and increases shares.",
    probability: 0.66,
    actions: ["Add a proof slide", "Use one metric (reach/saves)", "Keep it under 12 words"],
    abTest: "Proof A: screenshot vs Proof B: plain text number",
  },
];

export const mentorSeedThread = [
  {
    id: "m1",
    role: "mentor",
    text: "Hey Ava — I reviewed your last 30 days. Your audience is telling you something: they *save* when you simplify. Want to boost saves or comments next?",
  },
  {
    id: "m2",
    role: "user",
    text: "Saves. I want more evergreen reach.",
  },
  {
    id: "m3",
    role: "mentor",
    text: "Perfect. We'll optimize for ‘bookmarkable’ content. Start with: 1) a specific promise in the hook, 2) a 3-step framework, 3) a one-line recap. I can generate 5 hooks for your next carousel—what topic?",
  },
];

