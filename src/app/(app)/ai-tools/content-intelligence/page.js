'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, TrendingUp, Target, Hash, Clock, Users, BarChart3 } from 'lucide-react';

export default function ContentIntelligencePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const analyzeContent = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Please enter both title and description');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch('https://kr3lvcflc7.execute-api.us-east-1.amazonaws.com', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title,
          description: description
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Content Intelligence API Response:', data);

      // Handle different response formats
      let analysisData;
      if (data.body) {
        const parsed = typeof data.body === 'string' ? JSON.parse(data.body) : data.body;
        analysisData = parsed;
      } else {
        analysisData = data;
      }

      setAnalysis(analysisData);
    } catch (err) {
      console.error('Error analyzing content:', err);
      setError('Failed to analyze content. Please check your API endpoint and try again.');
      
      // Demo response for testing
      setAnalysis({
        viralScore: 85,
        sentiment: 'Positive',
        targetAudience: 'Content Creators, Entrepreneurs, Tech Enthusiasts',
        suggestedHashtags: ['#ContentCreation', '#AITools', '#DigitalMarketing', '#CreatorEconomy', '#TechTrends'],
        bestPlatforms: ['Instagram', 'TikTok', 'LinkedIn'],
        contentType: 'Educational',
        engagementPrediction: 'High',
        bestPostingTime: '6:00 PM - 8:00 PM',
        keyTopics: ['AI', 'Content Strategy', 'Audience Growth', 'Engagement'],
        recommendations: [
          'Add a strong hook in the first 3 seconds',
          'Include a call-to-action at the end',
          'Use trending audio for better reach',
          'Post during peak engagement hours'
        ],
        competitorAnalysis: {
          similarContent: 'High competition',
          uniqueAngle: 'Focus on AI-powered insights',
          differentiator: 'Actionable tips with data'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-orange-400';
  };

  const getScoreBadge = (score) => {
    if (score >= 80) return { label: '🔥 Viral Potential', color: 'bg-green-500/20 text-green-300 border-green-500/30' };
    if (score >= 60) return { label: '📈 Good Potential', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' };
    return { label: '⚡ Needs Work', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' };
  };

  return (
    <div className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center gap-3 mb-8">
        <div 
          className="p-3 rounded-xl"
          style={{ background: `rgba(var(--color-primary), 0.2)` }}
        >
          <Sparkles 
            className="w-6 h-6"
            style={{ color: `rgb(var(--color-primary))` }}
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">AI Content Intelligence Engine</h1>
          <p className="text-gray-400">Analyze your content ideas with AI-powered insights</p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[500px_1fr]">
        {/* Left Side - Input Form */}
        <Card className="glass border-white/10 h-fit">
          <CardContent className="p-6 space-y-6">
            {/* Content Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Content Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your content title..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/20"
              />
            </div>

            {/* Content Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Content Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your content idea in detail..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-white/20 min-h-[150px] resize-none"
              />
            </div>

            {/* Analyze Button */}
            <Button
              onClick={analyzeContent}
              disabled={loading}
              className="w-full rounded-xl text-white h-12 text-base font-semibold"
              style={{
                background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
              }}
            >
              <Sparkles className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              {loading ? 'Analyzing...' : 'Analyze Content'}
            </Button>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-300 text-sm">
                {error}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Side - Results */}
        <Card className="glass border-white/10">
          <CardContent className="p-6">
            {!analysis && !loading && (
              <div className="flex flex-col items-center justify-center h-[400px] text-center">
                <div 
                  className="p-6 rounded-2xl mb-4"
                  style={{ background: `rgba(var(--color-primary), 0.1)` }}
                >
                  <Zap 
                    className="w-16 h-16"
                    style={{ color: `rgb(var(--color-primary))` }}
                  />
                </div>
                <p className="text-gray-400 max-w-md">
                  Enter your content details and click analyze to get AI-powered insights
                </p>
              </div>
            )}

            {loading && (
              <div className="flex flex-col items-center justify-center h-[400px]">
                <div className="animate-spin mb-4">
                  <Sparkles 
                    className="w-12 h-12"
                    style={{ color: `rgb(var(--color-primary))` }}
                  />
                </div>
                <p className="text-gray-400">Analyzing your content...</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* Viral Score */}
                <div className="text-center p-6 rounded-2xl border border-white/10 bg-white/5">
                  <div className="text-sm text-gray-400 mb-2">Viral Score</div>
                  <div className={`text-6xl font-bold ${getScoreColor(analysis.viralScore)}`}>
                    {analysis.viralScore}
                  </div>
                  <Badge className={`mt-3 ${getScoreBadge(analysis.viralScore).color} border`}>
                    {getScoreBadge(analysis.viralScore).label}
                  </Badge>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-gray-400" />
                      <div className="text-xs text-gray-400">Content Type</div>
                    </div>
                    <div className="text-white font-semibold">{analysis.contentType}</div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-gray-400" />
                      <div className="text-xs text-gray-400">Engagement</div>
                    </div>
                    <div className="text-white font-semibold">{analysis.engagementPrediction}</div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div className="text-xs text-gray-400">Best Time</div>
                    </div>
                    <div className="text-white font-semibold text-sm">{analysis.bestPostingTime}</div>
                  </div>

                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <div className="text-xs text-gray-400">Sentiment</div>
                    </div>
                    <div className="text-white font-semibold">{analysis.sentiment}</div>
                  </div>
                </div>

                {/* Target Audience */}
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div className="text-sm font-semibold text-white">Target Audience</div>
                  </div>
                  <p className="text-gray-300 text-sm">{analysis.targetAudience}</p>
                </div>

                {/* Best Platforms */}
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-sm font-semibold text-white mb-3">Best Platforms</div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.bestPlatforms.map((platform) => (
                      <Badge 
                        key={platform}
                        variant="outline"
                        style={{
                          borderColor: `rgba(var(--color-primary), 0.3)`,
                          background: `rgba(var(--color-primary), 0.1)`
                        }}
                      >
                        {platform}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Suggested Hashtags */}
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <Hash className="w-4 h-4 text-gray-400" />
                    <div className="text-sm font-semibold text-white">Suggested Hashtags</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.suggestedHashtags.map((tag) => (
                      <Badge 
                        key={tag}
                        variant="outline"
                        className="text-xs"
                        style={{
                          borderColor: `rgba(var(--color-secondary), 0.3)`,
                          background: `rgba(var(--color-secondary), 0.1)`
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Key Topics */}
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-sm font-semibold text-white mb-3">Key Topics</div>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keyTopics.map((topic) => (
                      <Badge 
                        key={topic}
                        variant="secondary"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="text-sm font-semibold text-white mb-3">AI Recommendations</div>
                  <ul className="space-y-2">
                    {analysis.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                        <span 
                          className="mt-1"
                          style={{ color: `rgb(var(--color-primary))` }}
                        >
                          •
                        </span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Competitor Analysis */}
                {analysis.competitorAnalysis && (
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                    <div className="text-sm font-semibold text-white mb-3">Competitor Analysis</div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Similar Content:</span>
                        <span className="text-white">{analysis.competitorAnalysis.similarContent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Unique Angle:</span>
                        <span className="text-white">{analysis.competitorAnalysis.uniqueAngle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Differentiator:</span>
                        <span className="text-white">{analysis.competitorAnalysis.differentiator}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    className="flex-1 rounded-xl text-white"
                    style={{
                      background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                    }}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Post
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="flex-1 rounded-xl"
                    onClick={() => {
                      setAnalysis(null);
                      setTitle('');
                      setDescription('');
                    }}
                  >
                    New Analysis
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
