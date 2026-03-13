'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Youtube, CheckCircle2, AlertCircle } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = {
  youtube_views: 'rgb(var(--color-primary))',
  instagram_views: 'rgb(var(--color-secondary))',
  youtube_likes: 'rgb(var(--color-accent))',
  instagram_likes: '#00C49F'
};

// Mock data for demo
const mockMetrics = [
  { date: '2024-01-01', youtube_views: 1200, instagram_views: 800, youtube_likes: 150, instagram_likes: 200 },
  { date: '2024-01-02', youtube_views: 1500, instagram_views: 950, youtube_likes: 180, instagram_likes: 240 },
  { date: '2024-01-03', youtube_views: 1800, instagram_views: 1100, youtube_likes: 220, instagram_likes: 280 },
  { date: '2024-01-04', youtube_views: 2100, instagram_views: 1300, youtube_likes: 260, instagram_likes: 320 },
  { date: '2024-01-05', youtube_views: 2400, instagram_views: 1500, youtube_likes: 300, instagram_likes: 360 },
];

const PerformanceDashboard = () => {
  const searchParams = useSearchParams();
  const [metrics, setMetrics] = useState(mockMetrics);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [platform, setPlatform] = useState('all');
  const [chartType, setChartType] = useState('line');
  const [youtubeConnected, setYoutubeConnected] = useState(false);
  const [youtubeToken, setYoutubeToken] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const fetchMetrics = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with your actual API endpoint
      // const response = await fetch('YOUR_PERFORMANCE_API_ENDPOINT', {
      //   method: 'GET',
      //   mode: 'cors',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      
      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }
      
      // const data = await response.json();
      // setMetrics(data);
      
      // For now, using mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      setMetrics(mockMetrics);
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError(err.message || 'Failed to fetch metrics');
      setMetrics(mockMetrics);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
    
    // Check if YouTube token exists in localStorage
    const storedToken = localStorage.getItem('youtube_token');
    if (storedToken) {
      try {
        const token = JSON.parse(storedToken);
        if (token.expires_at > Date.now()) {
          setYoutubeToken(token);
          setYoutubeConnected(true);
        } else {
          localStorage.removeItem('youtube_token');
        }
      } catch (e) {
        console.error('Error parsing stored token:', e);
      }
    }
    
    // Handle OAuth callback
    const youtubeStatus = searchParams.get('youtube');
    const tokens = searchParams.get('tokens');
    
    if (youtubeStatus === 'connected' && tokens) {
      try {
        const tokenData = JSON.parse(decodeURIComponent(tokens));
        localStorage.setItem('youtube_token', JSON.stringify(tokenData));
        setYoutubeToken(tokenData);
        setYoutubeConnected(true);
        setConnectionStatus('success');
        
        // Clear URL parameters
        window.history.replaceState({}, '', '/dashboard/performance');
        
        // Clear status after 5 seconds
        setTimeout(() => setConnectionStatus(null), 5000);
      } catch (e) {
        console.error('Error storing tokens:', e);
        setConnectionStatus('error');
      }
    } else if (youtubeStatus === 'error') {
      setConnectionStatus('error');
      setTimeout(() => setConnectionStatus(null), 5000);
    }
  }, [searchParams]);
  
  const handleYoutubeConnect = () => {
    window.location.href = '/api/auth/youtube';
  };
  
  const handleYoutubeDisconnect = () => {
    localStorage.removeItem('youtube_token');
    setYoutubeToken(null);
    setYoutubeConnected(false);
    setConnectionStatus('disconnected');
    setTimeout(() => setConnectionStatus(null), 3000);
  };

  const getPlatformStats = () => {
    const totals = metrics.reduce((acc, m) => ({
      youtube: {
        views: acc.youtube.views + m.youtube_views,
        likes: acc.youtube.likes + m.youtube_likes,
      },
      instagram: {
        views: acc.instagram.views + m.instagram_views,
        likes: acc.instagram.likes + m.instagram_likes,
      }
    }), {
      youtube: { views: 0, likes: 0 },
      instagram: { views: 0, likes: 0 }
    });

    return {
      youtube: { 
        ...totals.youtube, 
        comments: 450, 
        engagement: ((totals.youtube.likes / totals.youtube.views) * 100).toFixed(1)
      },
      instagram: { 
        ...totals.instagram, 
        comments: 380, 
        engagement: ((totals.instagram.likes / totals.instagram.views) * 100).toFixed(1)
      }
    };
  };

  const platformStats = getPlatformStats();

  const renderChart = () => {
    if (metrics.length === 0) {
      return <div className="text-white text-center py-8">No data available</div>;
    }

    const lines = platform === 'all' 
      ? ['youtube_views', 'instagram_views', 'youtube_likes', 'instagram_likes']
      : [`${platform}_views`, `${platform}_likes`];

    if (chartType === 'line') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={metrics}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
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
            {lines.map((line) => (
              <Line 
                key={line}
                type="monotone" 
                dataKey={line} 
                stroke={COLORS[line] || '#8B5CF6'} 
                strokeWidth={2}
                dot={false}
                name={line.replace('_', ' ').toUpperCase()}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (chartType === 'bar') {
      return (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={metrics}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
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
            {lines.map((bar) => (
              <Bar 
                key={bar} 
                dataKey={bar} 
                fill={COLORS[bar] || '#8B5CF6'} 
                name={bar.replace('_', ' ').toUpperCase()} 
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  const renderPlatformCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass border-white/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255, 0, 0, 0.2)' }}
              >
                <span className="text-2xl">▶</span>
              </div>
              <CardTitle>YouTube Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">{platformStats.youtube.views.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Likes</p>
                <p className="text-2xl font-bold text-white">{platformStats.youtube.likes.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Comments</p>
                <p className="text-2xl font-bold text-white">{platformStats.youtube.comments.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Engagement Rate</p>
                <p className="text-2xl font-bold text-white">{platformStats.youtube.engagement}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass border-white/10">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(255, 0, 128, 0.2)' }}
              >
                <span className="text-2xl">📷</span>
              </div>
              <CardTitle>Instagram Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-white">{platformStats.instagram.views.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Likes</p>
                <p className="text-2xl font-bold text-white">{platformStats.instagram.likes.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Comments</p>
                <p className="text-2xl font-bold text-white">{platformStats.instagram.comments.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Engagement Rate</p>
                <p className="text-2xl font-bold text-white">{platformStats.instagram.engagement}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  if (loading && metrics.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white">Loading performance data...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Social Media Performance</h1>
          <p className="text-gray-400">
            Track your YouTube and Instagram metrics in real-time
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button
            onClick={fetchMetrics}
            disabled={loading}
            className="rounded-full text-white"
            style={{
              background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
            }}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh Data
          </Button>
        </div>
      </header>

      {connectionStatus === 'success' && (
        <Card className="bg-emerald-500/10 border-emerald-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <div className="text-emerald-300 font-medium">
                YouTube connected successfully!
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {connectionStatus === 'error' && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div className="text-red-300 font-medium">
                Failed to connect YouTube. Please try again.
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {connectionStatus === 'disconnected' && (
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <div className="text-amber-300 font-medium">
                YouTube disconnected
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!youtubeConnected && (
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255, 0, 0, 0.2)' }}
                >
                  <Youtube className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    Connect YouTube to See Your Real Data
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Link your YouTube account to get personalized performance insights and analytics
                  </p>
                </div>
              </div>
              <Button
                onClick={handleYoutubeConnect}
                className="bg-red-600 hover:bg-red-700 text-white rounded-full px-6"
              >
                <Youtube className="w-4 h-4 mr-2" />
                Connect YouTube
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {youtubeConnected && (
        <Card className="bg-emerald-500/10 border-emerald-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(16, 185, 129, 0.2)' }}
                >
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    YouTube Connected
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Your YouTube account is connected and syncing data
                  </p>
                </div>
              </div>
              <Button
                onClick={handleYoutubeDisconnect}
                variant="outline"
                className="border-white/10 text-gray-300 hover:bg-white/5 rounded-full px-6"
              >
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="text-red-400">⚠️</div>
              <div>
                <div className="font-semibold text-red-300">Error loading metrics</div>
                <div className="text-sm text-red-400">{error}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 text-white rounded-xl border border-white/10 focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': 'rgb(var(--color-primary))' }}
            >
              <option value="all">All Platforms</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
            </select>
          </CardContent>
        </Card>
        
        <Card className="glass border-white/10 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-400">Chart Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <button
                onClick={() => setChartType('line')}
                className={`flex-1 px-4 py-2 rounded-xl transition ${
                  chartType === 'line' 
                    ? 'text-white' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
                style={chartType === 'line' ? {
                  background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                } : {}}
              >
                Line Chart
              </button>
              <button
                onClick={() => setChartType('bar')}
                className={`flex-1 px-4 py-2 rounded-xl transition ${
                  chartType === 'bar' 
                    ? 'text-white' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
                style={chartType === 'bar' ? {
                  background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                } : {}}
              >
                Bar Chart
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-white/10">
        <CardHeader>
          <CardTitle>Performance Trends</CardTitle>
        </CardHeader>
        <CardContent>
          {renderChart()}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Platform Overview</h2>
        {renderPlatformCards()}
      </div>
    </div>
  );
};

export default PerformanceDashboard;
