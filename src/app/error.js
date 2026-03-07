"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-dvh grid place-items-center px-4">
      <div className="glass w-full max-w-lg rounded-3xl p-8 text-center">
        <div
          className="text-2xl font-semibold"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Something broke.
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          In production, this would be a friendly, branded error page with a
          helpful action.
        </div>
        <div className="mt-6 flex justify-center gap-2">
          <Button className="rounded-full" onClick={() => reset()}>
            Try again
          </Button>
          <Button asChild variant="secondary" className="rounded-full">
            <Link href="/dashboard/overview">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

