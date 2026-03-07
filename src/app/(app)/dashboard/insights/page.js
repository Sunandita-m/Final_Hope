import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardInsightsPage() {
  return (
    <div className="glass rounded-3xl p-6">
      <h1
        className="text-2xl font-semibold"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        Insights
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This page is scaffolded for your “AI insight feeds”, heatmaps, and smart
        notifications.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button asChild className="rounded-full">
          <Link href="/dashboard/overview">Back to overview</Link>
        </Button>
        <Button asChild variant="secondary" className="rounded-full">
          <Link href="/ai-mentor/recommendations">Recommendations</Link>
        </Button>
      </div>
    </div>
  );
}

