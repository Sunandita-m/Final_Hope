"use client";

import * as React from "react";
import {
  User,
  AtSign,
  Palette,
  Link2,
  MapPin,
  Calendar,
  Camera,
  Save,
  Instagram,
  Youtube,
  Video,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { creator } from "@/lib/demo-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const NICHE_OPTIONS = [
  "AI + design tips",
  "Marketing & growth",
  "Productivity",
  "Fitness & wellness",
  "Finance",
  "Education",
  "Lifestyle",
  "Tech & dev",
  "Other",
];

const TIMEZONES = [
  "America/New_York",
  "America/Los_Angeles",
  "America/Chicago",
  "Europe/London",
  "Europe/Paris",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Australia/Sydney",
];

function FormField({ label, hint, children, icon: Icon }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium">
        {Icon && <Icon className="size-4 text-muted-foreground" />}
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
}

function SocialLinkInput({ platform, icon: Icon, placeholder, value, onChange }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <Icon className="size-4 shrink-0 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-9 border-0 bg-transparent p-0 focus-visible:ring-0"
        aria-label={platform}
      />
    </div>
  );
}

export default function ProfileSettingsPage() {
  const [saving, setSaving] = React.useState(false);
  const [profile, setProfile] = React.useState({
    displayName: creator.name,
    handle: creator.handle,
    bio: "Helping creators grow with AI-backed content strategy. Carousels, hooks, and systems.",
    niche: creator.niche,
    tagline: "Creator growth, simplified.",
    primaryColor: "#6366F1",
    location: "San Francisco, CA",
    timezone: "America/Los_Angeles",
    joinedDate: "Jan 2024",
    instagram: "https://instagram.com/ava.creates",
    tiktok: "",
    youtube: "",
    website: "",
  });

  const update = (key, value) => setProfile((p) => ({ ...p, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    toast.success("Profile saved", {
      description: "Your changes have been updated. The AI mentor will use this for personalization.",
    });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1
          className="text-2xl font-semibold"
          style={{ fontFamily: "var(--font-plus-jakarta)" }}
        >
          Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your public creator identity and brand. Used to personalize the AI mentor and insights.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="size-5" />
                Identity
              </CardTitle>
              <CardDescription>
                Name, handle, and bio shown across the product and in AI context.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="size-20 ring-2 ring-white/10">
                    <AvatarFallback 
                      className="text-xl text-white"
                      style={{
                        background: `linear-gradient(to bottom right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
                      }}
                    >
                      {profile.displayName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="secondary" size="sm" className="gap-2 rounded-full">
                    <Camera className="size-4" />
                    Change photo
                  </Button>
                </div>
                <div className="min-w-0 flex-1 space-y-4">
                  <FormField label="Display name" icon={User}>
                    <Input
                      value={profile.displayName}
                      onChange={(e) => update("displayName", e.target.value)}
                      placeholder="Ava"
                      className="rounded-xl border-white/10 bg-white/5"
                    />
                  </FormField>
                  <FormField label="Handle" icon={AtSign} hint="Used in mentions and share links.">
                    <Input
                      value={profile.handle}
                      onChange={(e) => update("handle", e.target.value)}
                      placeholder="@ava.creates"
                      className="rounded-xl border-white/10 bg-white/5"
                    />
                  </FormField>
                </div>
              </div>
              <FormField label="Short bio" hint="1–2 sentences. Helps the AI tailor tone and examples.">
                <Textarea
                  value={profile.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  placeholder="Tell the AI what you create and who it's for."
                  rows={3}
                  className="resize-none rounded-xl border-white/10 bg-white/5"
                />
              </FormField>
              <FormField label="Niche / category" icon={Palette}>
                <div className="flex flex-wrap gap-2">
                  {NICHE_OPTIONS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => update("niche", n)}
                      className={cn(
                        "rounded-full px-3 py-1.5 text-sm transition",
                        profile.niche === n
                          ? "text-white ring-1"
                          : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                      )}
                      style={profile.niche === n ? {
                        background: `rgba(var(--color-primary), 0.25)`,
                        color: `rgb(var(--color-primary))`,
                        ringColor: `rgba(var(--color-primary), 0.4)`
                      } : {}}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </FormField>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="size-5" />
                Social & links
              </CardTitle>
              <CardDescription>
                Connected accounts and links. Used for cross-platform insights and CTAs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField label="Instagram" icon={Instagram}>
                <SocialLinkInput
                  platform="Instagram"
                  icon={Instagram}
                  placeholder="https://instagram.com/..."
                  value={profile.instagram}
                  onChange={(v) => update("instagram", v)}
                />
              </FormField>
              <FormField label="TikTok" icon={Video}>
                <SocialLinkInput
                  platform="TikTok"
                  icon={Video}
                  placeholder="https://tiktok.com/@..."
                  value={profile.tiktok}
                  onChange={(v) => update("tiktok", v)}
                />
              </FormField>
              <FormField label="YouTube" icon={Youtube}>
                <SocialLinkInput
                  platform="YouTube"
                  icon={Youtube}
                  placeholder="https://youtube.com/@..."
                  value={profile.youtube}
                  onChange={(v) => update("youtube", v)}
                />
              </FormField>
              <FormField label="Website" icon={Link2}>
                <Input
                  value={profile.website}
                  onChange={(e) => update("website", e.target.value)}
                  placeholder="https://..."
                  className="rounded-xl border-white/10 bg-white/5"
                />
              </FormField>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="size-5" />
                Brand kit
              </CardTitle>
              <CardDescription>
                Tagline and accent color for generated content and exports.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField label="Tagline" hint="One short line for CTAs and bios.">
                <Input
                  value={profile.tagline}
                  onChange={(e) => update("tagline", e.target.value)}
                  placeholder="Creator growth, simplified."
                  className="rounded-xl border-white/10 bg-white/5"
                />
              </FormField>
              <FormField label="Primary color" hint="Used in charts and branded assets.">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={profile.primaryColor}
                    onChange={(e) => update("primaryColor", e.target.value)}
                    className="h-10 w-14 cursor-pointer rounded-xl border border-white/10 bg-white/5"
                    aria-label="Primary color"
                  />
                  <Input
                    value={profile.primaryColor}
                    onChange={(e) => update("primaryColor", e.target.value)}
                    placeholder="#6366F1"
                    className="rounded-xl border-white/10 bg-white/5 font-mono text-sm"
                  />
                </div>
              </FormField>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="size-5" />
                Location & time
              </CardTitle>
              <CardDescription>
                Used for “best time to post” and scheduling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField label="Location (optional)" icon={MapPin}>
                <Input
                  value={profile.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="City, Country"
                  className="rounded-xl border-white/10 bg-white/5"
                />
              </FormField>
              <FormField label="Timezone" icon={Calendar}>
                <select
                  value={profile.timezone}
                  onChange={(e) => update("timezone", e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{
                    '--tw-ring-color': `rgba(var(--color-primary), 0.5)`
                  }}
                  aria-label="Timezone"
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </FormField>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground">
                <span>Member since</span>
                <Badge variant="secondary" className="rounded-full">
                  {profile.joinedDate}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Changes apply to the AI mentor, insights, and any exported content.
        </p>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="gap-2 rounded-full text-white"
          style={{
            background: `linear-gradient(to right, rgb(var(--color-primary)), rgb(var(--color-secondary)))`
          }}
        >
          <Save className="size-4" />
          {saving ? "Saving…" : "Save profile"}
        </Button>
      </div>
    </div>
  );
}
