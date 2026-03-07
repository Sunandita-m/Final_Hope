import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AiTrainingPage() {
  return (
    <div className="glass rounded-3xl p-6">
      <h1
        className="text-2xl font-semibold"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        Onboarding: AI training
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Demo step: choose tone, goals, and what “success” means (saves vs
        comments vs reach).
      </p>
      <div className="mt-4">
        <Button asChild className="rounded-full">
          <Link href="/onboarding/goal-setting">Continue</Link>
        </Button>
      </div>
    </div>
  );
}

