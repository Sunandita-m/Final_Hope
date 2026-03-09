import { Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { strategies } from "@/lib/demo-data";

export default function RecommendationsPage() {
  return (
    <div className="space-y-4">
      <header className="flex flex-col gap-1">
        <div className="text-sm text-muted-foreground">
          Personalized Strategy Generator
        </div>
        <h1
          className="text-2xl font-semibold"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Recommendations that feel implementable.
        </h1>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        {strategies.map((s) => (
          <Card key={s.id} className="glass border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-base leading-snug">
                {s.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Why this works for you
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.why}</p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Success probability</span>
                  <span
                    className="font-mono tabular-nums text-foreground"
                    style={{ fontFamily: "var(--font-jetbrains-mono)" }}
                  >
                    {Math.round(s.probability * 100)}%
                  </span>
                </div>
                <Progress
                  value={Math.round(s.probability * 100)}
                  className="mt-2 h-2 bg-white/10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {s.actions.map((a) => (
                  <Badge
                    key={a}
                    variant="secondary"
                    className="rounded-full bg-white/5"
                  >
                    {a}
                  </Badge>
                ))}
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-amber-200">
                  <Wand2 className="size-4" />
                  A/B test suggestion
                </div>
                <div className="mt-1 text-sm text-amber-100/80">{s.abTest}</div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  className="rounded-xl text-white"
                  style={{
                    background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                  }}
                >
                  Implement
                </Button>
                <Button variant="secondary" className="rounded-xl">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

