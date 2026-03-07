import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ConnectAccountsPage() {
  return (
    <div className="glass rounded-3xl p-6">
      <h1
        className="text-2xl font-semibold"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        Onboarding: Connect accounts
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Demo step: connect social accounts and import the last 90 days of posts.
      </p>
      <div className="mt-4">
        <Button asChild className="rounded-full">
          <Link href="/onboarding/ai-training">Continue</Link>
        </Button>
      </div>
    </div>
  );
}

