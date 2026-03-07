import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GoalSettingPage() {
  return (
    <div className="glass rounded-3xl p-6">
      <h1
        className="text-2xl font-semibold"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        Onboarding: Goal setting
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Demo step: set a 30-day growth goal, cadence, and content mix.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild className="rounded-full">
          <Link href="/dashboard/overview">Finish onboarding</Link>
        </Button>
        <Button asChild variant="secondary" className="rounded-full">
          <Link href="/ai-mentor/chat">Talk to mentor</Link>
        </Button>
      </div>
    </div>
  );
}

