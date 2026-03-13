"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Sparkles, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Node({ x, y, delay = 0 }) {
  return (
    <motion.circle
      cx={x}
      cy={y}
      r="6"
      fill="rgba(255,255,255,0.9)"
      initial={{ opacity: 0.3, scale: 0.9 }}
      animate={{ opacity: [0.35, 1, 0.35], scale: [0.9, 1.05, 0.9] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function Edge({ x1, y1, x2, y2, delay = 0 }) {
  return (
    <motion.line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#edge)"
      strokeWidth="2"
      initial={{ opacity: 0.15 }}
      animate={{ opacity: [0.15, 0.75, 0.15] }}
      transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

function LearningProgressPage() {
  const nodes = React.useMemo(
    () => [
      [40, 42],
      [40, 110],
      [40, 178],
      [160, 76],
      [160, 144],
      [280, 52],
      [280, 116],
      [280, 180],
    ],
    []
  );

  const edges = [
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 5],
    [3, 6],
    [4, 6],
    [4, 7],
  ];

  const [messages, setMessages] = React.useState([
    { id: '1', role: 'mentor', text: 'Hi! I\'m analyzing your learning patterns. Ask me anything about your progress or how to improve your content strategy.' }
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(m => [...m, { id: Date.now().toString(), role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('https://yfdvjug9nh.execute-api.us-east-1.amazonaws.com/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!response.ok) throw new Error('API error');
      const data = await response.json();

      setMessages(m => [...m, {
        id: Date.now().toString() + '-ai',
        role: 'mentor',
        text: data.aiResponse || 'I couldn\'t process that. Please try again.'
      }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(m => [...m, {
        id: Date.now().toString(),
        role: 'mentor',
        text: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <header className="flex items-end justify-between gap-3">
        <div>
          <div className="text-sm text-muted-foreground">
            Learning Engine Visualization
          </div>
          <h1
            className="text-2xl font-semibold"
            style={{ fontFamily: "var(--font-plus-jakarta)" }}
          >
            The AI is adapting to your style.
          </h1>
        </div>
        <Badge
          style={{
            background: `rgba(var(--color-primary), 0.15)`,
            color: `rgb(var(--color-primary))`
          }}
        >
          <Sparkles className="mr-1 size-3" />
          Live adaptation (demo)
        </Badge>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="glass border-white/10 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit
                className="size-5"
                style={{ color: `rgb(var(--color-primary))` }}
              />
              <span style={{ fontFamily: "var(--font-plus-jakarta)" }}>
                AI Brain Dashboard
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <svg
                viewBox="0 0 320 220"
                className="h-[280px] w-full"
                role="img"
                aria-label="Neural network visualization"
              >
                <defs>
                  <linearGradient id="edge" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {edges.map(([a, b], i) => (
                  <Edge
                    key={i}
                    x1={nodes[a][0]}
                    y1={nodes[a][1]}
                    x2={nodes[b][0]}
                    y2={nodes[b][1]}
                    delay={i * 0.12}
                  />
                ))}

                {nodes.map(([x, y], i) => (
                  <Node key={i} x={x} y={y} delay={i * 0.08} />
                ))}
              </svg>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Pattern confidence
                </div>
                <div className="mt-2 text-2xl font-semibold tabular-nums">
                  86%
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  "Save-heavy frameworks"
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Best window
                </div>
                <div className="mt-2 text-2xl font-semibold tabular-nums">
                  8:40 AM
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Tue/Thu velocity peak
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Adaptation
                </div>
                <div className="mt-2 text-2xl font-semibold tabular-nums">
                  +12
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  New signals this week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle style={{ fontFamily: "var(--font-plus-jakarta)" }}>
              Ask Your Mentor
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col space-y-3">
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[300px]">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-white/10 text-white'
                      : 'bg-white/5 text-gray-300'
                  }`}>
                    {msg.role === 'mentor' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose prose-invert prose-sm max-w-none">
                        {msg.text}
                      </ReactMarkdown>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 text-gray-300 rounded-lg p-2 text-sm">
                    Thinking...
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask me..."
                className="bg-white/5 border-white/10 text-white text-sm"
                disabled={loading}
              />
              <Button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                size="sm"
                className="text-white"
                style={{
                  background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LearningProgressPage;