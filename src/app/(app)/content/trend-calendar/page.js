'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Calendar, TrendingUp, Sparkles, Instagram, Youtube, 
  Clock, Hash, Music, Target, ChevronLeft, ChevronRight,
  Zap, BarChart3, Filter, RefreshCw
} from 'lucide-react';

// Mock AI trend data
const generateTrendData = () => ({
  10: {
    trend: "AI Portrait Reel",
    platform: "Instagram Reels",
    format: "Reel",
    strength: 95,
    hook: "Watch AI transform my photo into art",
    time: "6:30 PM",
    hashtags: ["#AIArt", "#PortraitReel", "#AITransform"],
    category: "viral",
    description: "AI portrait transformations are trending heavily. Users love seeing before/after AI art transformations.",
    caption: "I tried the viral AI portrait trend and the results are insane! 🤯✨ Which style is your favorite? Drop a number below! 👇\n\n#AIArt #PortraitReel #AITransform #ViralTrend #ContentCreator",
    contentFormat: "15-30 second reel showing multiple AI portrait styles with trending audio"
  },
  11: {
    trend: "Street Food Shorts",
    platform: "TikTok",
    format: "Short Video",
    strength: 88,
    hook: "This street food spot is hidden gem",
    time: "7:00 PM",
    hashtags: ["#StreetFood", "#FoodTok", "#HiddenGem"],
    category: "rising",
    description: "Street food content is performing exceptionally well, especially with 'hidden gem' angles.",
    caption: "Found this hidden street food spot and it's INCREDIBLE 🔥 The flavors are unmatched! Have you tried it?\n\n#StreetFood #FoodTok #HiddenGem #FoodReview",
    contentFormat: "Quick cuts of food preparation, close-ups of dishes, and reaction shots"
  },
  12: {
    trend: "Day in My Life Mini Vlog",
    platform: "Instagram Reels",
    format: "Reel",
    strength: 92,
    hook: "Spend a productive day with me",
    time: "6:30 PM",
    hashtags: ["#MiniVlog", "#ReelTrend", "#ContentCreator"],
    category: "viral",
    description: "Mini vlogs showing productive routines are getting massive engagement.",
    caption: "Spend a productive day with me as a content creator 📱✨ What's your morning routine like?\n\n#MiniVlog #ReelTrend #ContentCreator #DayInMyLife #ProductivityTips",
    contentFormat: "Fast-paced clips showing morning routine, work setup, content creation, and evening wind-down"
  },
  13: {
    trend: "Productivity Carousel",
    platform: "Instagram",
    format: "Carousel",
    strength: 85,
    hook: "5 productivity hacks that changed my life",
    time: "8:00 AM",
    hashtags: ["#ProductivityHacks", "#LifeHacks", "#ContentTips"],
    category: "rising",
    description: "Educational carousels with numbered tips are performing well in morning hours.",
    caption: "5 productivity hacks that actually changed my life 🚀 Save this for later!\n\n1. Time blocking\n2. 2-minute rule\n3. Digital detox\n4. Morning routine\n5. Weekly planning\n\nWhich one will you try first?\n\n#ProductivityHacks #LifeHacks #ContentTips",
    contentFormat: "5-7 slide carousel with clean design, each slide covering one productivity tip"
  },
  14: {
    trend: "Behind the Scenes",
    platform: "YouTube Shorts",
    format: "Short",
    strength: 79,
    hook: "How I actually create content",
    time: "5:00 PM",
    hashtags: ["#BTS", "#ContentCreation", "#CreatorLife"],
    category: "stable",
    description: "Behind-the-scenes content showing the reality of content creation resonates with audiences.",
    caption: "The reality of being a content creator 😅 It's not always glamorous but I love it!\n\n#BTS #ContentCreation #CreatorLife #YouTubeShorts",
    contentFormat: "Raw, unedited clips showing the process, mistakes, and reality of content creation"
  },
  15: {
    trend: "Quick Tutorial",
    platform: "TikTok",
    format: "Tutorial",
    strength: 91,
    hook: "Learn this in 30 seconds",
    time: "12:00 PM",
    hashtags: ["#Tutorial", "#LearnOnTikTok", "#QuickTips"],
    category: "viral",
    description: "Quick, actionable tutorials under 30 seconds are getting high saves and shares.",
    caption: "Learn this editing trick in 30 seconds! 🎬✨ Save this for your next video!\n\n#Tutorial #LearnOnTikTok #QuickTips #EditingHacks",
    contentFormat: "Fast-paced tutorial with on-screen text, showing before/after results"
  },
  16: {
    trend: "Transformation Story",
    platform: "Instagram Reels",
    format: "Reel",
    strength: 87,
    hook: "My journey from 0 to 100K",
    time: "7:30 PM",
    hashtags: ["#Transformation", "#GrowthJourney", "#Motivation"],
    category: "rising",
    description: "Personal transformation and growth stories are highly engaging and shareable.",
    caption: "My journey from 0 to 100K followers 📈 The ups, downs, and everything in between. Your turn is coming!\n\n#Transformation #GrowthJourney #Motivation #CreatorGrowth",
    contentFormat: "Timeline-style reel showing progression with key milestones and lessons learned"
  },
  17: {
    trend: "Trending Audio Challenge",
    platform: "TikTok",
    format: "Challenge",
    strength: 94,
    hook: "Trying the viral audio trend",
    time: "6:00 PM",
    hashtags: ["#TrendingAudio", "#ViralChallenge", "#TikTokTrend"],
    category: "viral",
    description: "Participating in trending audio challenges early gives maximum visibility.",
    caption: "Had to try this trending audio before it's too late! 🎵 Who else is doing this?\n\n#TrendingAudio #ViralChallenge #TikTokTrend #ForYouPage",
    contentFormat: "Creative take on trending audio with your unique spin or niche angle"
  }
});

const trendInsights = {
  trendingHashtags: ["#AIArt", "#MiniVlog", "#StreetFood", "#ProductivityHacks", "#ContentCreator"],
  trendingAudio: "Chill Morning Beat - Lo-fi Vibes",
  bestPostingTime: "6 PM – 8 PM",
  topCategory: "Lifestyle & Productivity",
  weeklyTrends: [
    { day: "Mon", engagement: 65 },
    { day: "Tue", engagement: 72 },
    { day: "Wed", engagement: 85 },
    { day: "Thu", engagement: 78 },
    { day: "Fri", engagement: 92 },
    { day: "Sat", engagement: 88 },
    { day: "Sun", engagement: 70 }
  ]
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function TrendCalendarPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [view, setView] = useState('month');
  const [currentMonth, setCurrentMonth] = useState(2); // March = 2 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2024);
  const [trendData, setTrendData] = useState(generateTrendData());
  const [loading, setLoading] = useState(false);

  // Fetch trends from API
  const fetchTrends = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://yfdvjug9nh.execute-api.us-east-1.amazonaws.com/trending-content', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        // Process API data here if needed
        // For now, keeping mock data
      }
    } catch (err) {
      console.log('Using demo data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const getDaysInMonth = (month, year) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const getTrendBadge = (strength) => {
    if (strength >= 90) return { label: '🔥 Viral', color: 'bg-red-500/20 text-red-300 border-red-500/30' };
    if (strength >= 80) return { label: '📈 Rising', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
    return { label: '⭐ Stable', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
  };

  const getPlatformIcon = (platform) => {
    if (platform?.toLowerCase().includes('instagram')) return <Instagram className="w-3 h-3" />;
    if (platform?.toLowerCase().includes('tiktok')) return <Music className="w-3 h-3" />;
    if (platform?.toLowerCase().includes('youtube')) return <Youtube className="w-3 h-3" />;
    return <Target className="w-3 h-3" />;
  };

  const filterTrendsByPlatform = (trend) => {
    if (selectedPlatform === 'all') return true;
    return trend?.platform?.toLowerCase().includes(selectedPlatform.toLowerCase());
  };

  const days = getDaysInMonth(currentMonth, currentYear);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="p-2 rounded-xl"
              style={{ background: `rgba(var(--color-primary), 0.2)` }}
            >
              <Sparkles 
                className="w-5 h-5"
                style={{ color: `rgb(var(--color-primary))` }}
              />
            </div>
            <h1 className="text-3xl font-bold text-white">AI Trend Calendar</h1>
          </div>
          <p className="text-gray-400">
            AI-powered suggestions for your next viral post
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={fetchTrends}
            disabled={loading}
            variant="secondary"
            className="rounded-full"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant={view === 'month' ? 'default' : 'secondary'}
            onClick={() => setView('month')}
            className="rounded-full text-white"
            style={view === 'month' ? {
              background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
            } : {}}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Month
          </Button>
          <Button
            variant={view === 'week' ? 'default' : 'secondary'}
            onClick={() => setView('week')}
            className="rounded-full text-white"
            style={view === 'week' ? {
              background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
            } : {}}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Week
          </Button>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Main Calendar Section */}
        <div className="space-y-4">
          {/* Calendar Controls */}
          <Card className="glass border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-white/10"
                    onClick={goToPreviousMonth}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-lg font-semibold text-white min-w-[150px] text-center">
                    {monthNames[currentMonth]} {currentYear}
                  </h2>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full hover:bg-white/10"
                    onClick={goToNextMonth}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="px-3 py-1.5 bg-white/5 text-white text-sm rounded-lg border border-white/10 focus:outline-none focus:ring-2"
                    style={{ '--tw-ring-color': 'rgb(var(--color-primary))' }}
                  >
                    <option value="all" className="bg-gray-900 text-white">All Platforms</option>
                    <option value="instagram" className="bg-gray-900 text-white">Instagram</option>
                    <option value="tiktok" className="bg-gray-900 text-white">TikTok</option>
                    <option value="youtube" className="bg-gray-900 text-white">YouTube</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calendar Grid */}
          <Card className="glass border-white/10">
            <CardContent className="p-6">
              {/* Week day headers */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {weekDays.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className="grid grid-cols-7 gap-2">
                {days.map((day, index) => {
                  const trend = day && currentMonth === 2 && currentYear === 2024 ? trendData[day] : null;
                  const showTrend = trend && filterTrendsByPlatform(trend);
                  const badge = showTrend ? getTrendBadge(trend.strength) : null;

                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[120px] rounded-xl border transition-all
                        ${day ? 'cursor-pointer hover:scale-[1.02] hover:shadow-lg' : 'opacity-0'}
                        ${showTrend ? 'border-white/20 bg-white/5' : 'border-white/10 bg-white/[0.02]'}
                      `}
                      onClick={() => day && showTrend && setSelectedDate(day)}
                      style={showTrend ? {
                        borderColor: `rgba(var(--color-primary), 0.3)`,
                        background: `linear-gradient(135deg, rgba(var(--color-primary), 0.05), rgba(var(--color-secondary), 0.05))`
                      } : {}}
                    >
                      {day && (
                        <div className="p-3 h-full flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold text-white">{day}</span>
                            {showTrend && (
                              <div className="flex items-center gap-1">
                                {getPlatformIcon(trend.platform)}
                              </div>
                            )}
                          </div>

                          {showTrend && (
                            <div className="flex-1 space-y-2">
                              <Badge className={`text-[10px] px-1.5 py-0.5 ${badge.color} border`}>
                                {badge.label}
                              </Badge>
                              <p className="text-xs font-medium text-white line-clamp-2">
                                {trend.trend}
                              </p>
                              <div className="flex items-center gap-1 text-[10px] text-gray-400">
                                <Clock className="w-3 h-3" />
                                {trend.time}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Side Panel - Trend Insights */}
        <div className="space-y-4">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp 
                  className="w-5 h-5"
                  style={{ color: `rgb(var(--color-primary))` }}
                />
                Trend Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Trending Hashtags */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                  <Hash className="w-4 h-4" />
                  Trending Hashtags
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendInsights.trendingHashtags.map((tag) => (
                    <Badge 
                      key={tag}
                      variant="outline"
                      className="text-xs"
                      style={{
                        borderColor: `rgba(var(--color-primary), 0.3)`,
                        background: `rgba(var(--color-primary), 0.1)`
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Trending Audio */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                  <Music className="w-4 h-4" />
                  Trending Audio
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="text-sm text-white">{trendInsights.trendingAudio}</p>
                </div>
              </div>

              {/* Best Posting Time */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                  <Clock className="w-4 h-4" />
                  Best Time to Post Today
                </div>
                <div 
                  className="rounded-lg border p-3"
                  style={{
                    borderColor: `rgba(var(--color-accent), 0.3)`,
                    background: `rgba(var(--color-accent), 0.1)`
                  }}
                >
                  <p 
                    className="text-sm font-semibold"
                    style={{ color: `rgb(var(--color-accent))` }}
                  >
                    {trendInsights.bestPostingTime}
                  </p>
                </div>
              </div>

              {/* Top Category */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                  <Target className="w-4 h-4" />
                  Top Content Category Today
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                  <p className="text-sm text-white">{trendInsights.topCategory}</p>
                </div>
              </div>

              {/* Weekly Engagement */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                  <Zap className="w-4 h-4" />
                  Weekly Engagement
                </div>
                <div className="flex items-end justify-between gap-1 h-20">
                  {trendInsights.weeklyTrends.map((item, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div 
                        className="w-full rounded-t transition-all hover:opacity-80"
                        style={{
                          height: `${item.engagement}%`,
                          background: `linear-gradient(to top, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                        }}
                      />
                      <span className="text-[10px] text-gray-500">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass border-white/10">
            <CardContent className="p-4 space-y-2">
              <Button 
                className="w-full rounded-xl text-white"
                style={{
                  background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                }}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Post from Trend
              </Button>
              <Button variant="secondary" className="w-full rounded-xl">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trend Detail Modal */}
      <Dialog open={selectedDate !== null} onOpenChange={() => setSelectedDate(null)}>
        <DialogContent className="glass border-white/10 max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedDate && trendData[selectedDate] && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3 text-2xl">
                  <div 
                    className="p-2 rounded-xl"
                    style={{ background: `rgba(var(--color-primary), 0.2)` }}
                  >
                    {getPlatformIcon(trendData[selectedDate].platform)}
                  </div>
                  {trendData[selectedDate].trend}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Trend Strength */}
                <div className="flex items-center gap-3">
                  <Badge className={getTrendBadge(trendData[selectedDate].strength).color + ' border'}>
                    {getTrendBadge(trendData[selectedDate].strength).label}
                  </Badge>
                  <span className="text-sm text-gray-400">
                    {trendData[selectedDate].strength}% Trend Strength
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Why This Trend?</h3>
                  <p className="text-white">{trendData[selectedDate].description}</p>
                </div>

                {/* Suggested Caption */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Suggested Caption</h3>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-white whitespace-pre-line">{trendData[selectedDate].caption}</p>
                  </div>
                </div>

                {/* Content Format */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Suggested Content Format</h3>
                  <p className="text-white">{trendData[selectedDate].contentFormat}</p>
                </div>

                {/* Hashtags */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">Suggested Hashtags</h3>
                  <div className="flex flex-wrap gap-2">
                    {trendData[selectedDate].hashtags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="outline"
                        style={{
                          borderColor: `rgba(var(--color-primary), 0.3)`,
                          background: `rgba(var(--color-primary), 0.1)`
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Best Time */}
                <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5">
                  <Clock 
                    className="w-5 h-5"
                    style={{ color: `rgb(var(--color-accent))` }}
                  />
                  <div>
                    <div className="text-sm text-gray-400">Best Time to Post</div>
                    <div 
                      className="font-semibold"
                      style={{ color: `rgb(var(--color-accent))` }}
                    >
                      {trendData[selectedDate].time}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 rounded-xl text-white"
                    style={{
                      background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Auto Generate Post
                  </Button>
                  <Button variant="secondary" className="flex-1 rounded-xl">
                    Schedule Post
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
