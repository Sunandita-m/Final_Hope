"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, ThumbsDown, ThumbsUp, Mic } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { mentorSeedThread, creator } from "@/lib/demo-data";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const quickActions = [
  "Generate 5 carousel hooks",
  "Best time to post this week?",
  "Why did my last post flop?",
  "Give me an A/B test plan",
];

function Bubble({ role, children }) {
  const isMentor = role === "mentor";
  return (
    <div className={cn("flex gap-3", isMentor ? "" : "justify-end")}>
      {isMentor ? (
        <Avatar className="mt-0.5 size-9 ring-1 ring-white/10">
          <AvatarFallback 
            style={{
              background: 'linear-gradient(to bottom right, rgb(var(--color-primary)), rgb(var(--color-secondary)))'
            }}
            className="text-white"
          >
            AI
          </AvatarFallback>
        </Avatar>
      ) : null}
      <div
        className={cn(
          "max-w-[78%] rounded-2xl border px-4 py-3 text-sm leading-relaxed",
          isMentor
            ? "border-white/10 bg-white/5"
            : ""
        )}
        style={!isMentor ? {
          borderColor: 'rgba(var(--color-primary), 0.25)',
          background: 'linear-gradient(to right, rgba(var(--color-primary), 0.2), rgba(var(--color-secondary), 0.2))'
        } : {}}
      >
        {isMentor ? (
          typeof children === 'string' ? (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-3 text-white" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2" style={{ color: 'rgb(var(--color-primary))' }} {...props} />,
                h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-2" style={{ color: 'rgba(var(--color-primary), 0.8)' }} {...props} />,
                h4: ({node, ...props}) => <h4 className="text-sm font-semibold mb-1 text-white/90" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-3 space-y-1" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-4 mb-3 space-y-1" {...props} />,
                li: ({node, ...props}) => <li className="text-white/90" {...props} />,
                p: ({node, ...props}) => <p className="mb-3 text-white/90 last:mb-0" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold" style={{ color: 'rgb(var(--color-primary))' }} {...props} />,
                code: ({node, inline, ...props}) => 
                  inline ? (
                    <code className="px-1.5 py-0.5 rounded bg-white/10 text-white font-mono text-xs" {...props} />
                  ) : (
                    <code className="block p-3 rounded-lg bg-white/10 text-white font-mono text-xs overflow-x-auto" {...props} />
                  ),
              }}
            >
              {children}
            </ReactMarkdown>
          ) : (
            <div className="text-white/90">{children}</div>
          )
        ) : (
          <div className="text-white">{children}</div>
        )}
      </div>
    </div>
  );
}

export function MentorChat() {
  const [messages, setMessages] = React.useState(mentorSeedThread);
  const [text, setText] = React.useState("");
  const [typing, setTyping] = React.useState(false);

  async function send(userText) {
  const t = (userText ?? text).trim();
  if (!t) return;

  setMessages((m) => [...m, { id: Date.now().toString(), role: "user", text: t }]);
  setText("");
  setTyping(true);

  try {
    // Try with proxy first
    let response = await fetch("/api/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: t }),
    });

    // If proxy fails, try direct with different CORS settings
    if (!response.ok) {
      response = await fetch("https://8o1dkzbrlc.execute-api.us-east-1.amazonaws.com/dev/ai-chat", {
        method: "POST",
        mode: 'cors',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ prompt: t }),
      });
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    const aiResponse = data.aiResponse || data.message || JSON.stringify(data);

    setMessages((m) => [
      ...m,
      {
        id: Date.now().toString() + "-ai",
        role: "mentor",
        text: aiResponse,
      },
    ]);
  } catch (error) {
    console.error("Error calling AI:", error);
    
    // Show a more user-friendly error message
    let errorMessage = "Sorry, I couldn't connect to the AI service. ";
    
    if (error.message.includes('Failed to fetch')) {
      errorMessage += "This might be a CORS issue. Please try the proxy solution above.";
    } else {
      errorMessage += error.message;
    }
    
    setMessages((m) => [
      ...m,
      {
        id: Date.now().toString(),
        role: "mentor",
        text: errorMessage,
      },
    ]);
  } finally {
    setTyping(false);
  }
}

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
      <div className="glass flex min-h-[70dvh] flex-col rounded-3xl border-white/10">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="min-w-0">
            <div className="text-sm font-medium">
              Mentor{" "}
              <span className="text-muted-foreground">
                • personalized for {creator.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Voice-like responses • typing indicator • response ratings
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" className="rounded-full">
              <Mic className="mr-2 size-4" />
              Voice
            </Button>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-auto px-5 py-5">
          {messages.map((m) => (
            <Bubble key={m.id} role={m.role}>
              {m.text}
            </Bubble>
          ))}

          <AnimatePresence>
            {typing ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
              >
                <Bubble role="mentor">
                  <span className="inline-flex items-center gap-2 text-muted-foreground">
                    <Sparkles 
                      className="size-4"
                      style={{ color: 'rgb(var(--color-primary))' }}
                    />
                    Thinking
                    <span className="inline-flex gap-1">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.2s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40 [animation-delay:-0.1s]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/40" />
                    </span>
                  </span>
                </Bubble>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/10 p-4">
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask anything about your growth…"
              className="h-11 rounded-2xl glass"
              aria-label="Chat message"
            />
            <Button
              type="submit"
              className="h-11 rounded-2xl text-white"
              style={{
                background: 'linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))'
              }}
            >
              Send
            </Button>
          </form>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickActions.map((q) => (
              <button
                key={q}
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-muted-foreground transition hover:bg-white/10 hover:text-foreground"
                onClick={() => send(q)}
              >
                {q}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
            Rate response:
            <Button variant="ghost" size="icon" className="size-8 rounded-full" aria-label="Thumbs up">
              <ThumbsUp className="size-4" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8 rounded-full" aria-label="Thumbs down">
              <ThumbsDown className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl border-white/10 p-5">
        <div className="text-sm font-medium">Mentor shortcuts</div>
        <div className="mt-2 text-sm text-muted-foreground">
          In the full product, this panel would show live "what I noticed" signals,
          saved prompts, and recommended next actions.
        </div>

        <div className="mt-4 space-y-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            <div className="font-medium">Next best action</div>
            <div className="mt-1 text-muted-foreground">
              Draft a carousel with a result-first hook + 3-step framework. Post
              Tuesday 8:40 AM.
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm">
            <div className="font-medium">Streak</div>
            <div className="mt-1 text-muted-foreground">
              9 days consistent posting • 2 days to next badge.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
