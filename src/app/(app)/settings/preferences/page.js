export default function PreferencesSettingsPage() {
  return (
    <div className="glass rounded-3xl p-6">
      <h1
        className="text-2xl font-semibold"
        style={{ fontFamily: "var(--font-plus-jakarta)" }}
      >
        Preferences
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        High contrast mode, notification preferences, and AI tone settings would
        live here.
      </p>
    </div>
  );
}

