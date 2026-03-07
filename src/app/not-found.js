import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-dvh grid place-items-center px-4">
      <div className="glass w-full max-w-lg rounded-3xl p-8 text-center">
        <div
          className="text-4xl font-semibold"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          404
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          That page ghosted us. Let’s get you back to growth.
        </div>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild className="rounded-full">
            <Link href="/dashboard/overview">Go to dashboard</Link>
          </Button>
          <Button asChild variant="secondary" className="rounded-full">
            <Link href="/ai-mentor/chat">Ask the mentor</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

