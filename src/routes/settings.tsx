import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Brain, ChevronRight, Eraser, Palette, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PageLayout } from "@/components/fitslim/PageLayout";
import { PageHeader } from "@/components/fitslim/PageHeader";
import { useFitSlim } from "@/lib/fitslim/store";

export const Route = createFileRoute("/settings")({
  component: Settings,
});

function Settings() {
  const { prefs, setPrefs, theme, setTheme, clearGrocery } = useFitSlim();

  return (
    <PageLayout>
      <PageHeader
        icon={<Palette className="h-4.5 w-4.5 text-teal" />}
        title="Settings"
        subtitle="Appearance, notifications, and AI preferences."
      />

      <div className="space-y-4">
        <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
            <Palette className="h-4.5 w-4.5 text-teal" /> Appearance
          </h2>
          <div className="mt-3 space-y-4">
            <Row label="Theme" hint="Light, dark, or follow your system.">
              <Select value={theme} onValueChange={(v) => setTheme(v as typeof theme)}>
                <SelectTrigger className="w-full rounded-[12px] border-border bg-background sm:w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </Row>
            <Row label="Reduced motion" hint="Minimize animations.">
              <Switch checked={prefs.reducedMotion} onCheckedChange={(v) => setPrefs({ reducedMotion: v })} />
            </Row>
          </div>
        </section>

        <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
            <Brain className="h-4.5 w-4.5 text-teal" /> AI Preferences &amp; Memory
          </h2>
          <div className="mt-3 space-y-4">
            <Row label="Allow FitSlim AI to remember my preferences" hint="Your goals and food preferences.">
              <Switch checked={prefs.remember} onCheckedChange={(v) => setPrefs({ remember: v })} />
            </Row>
            <Row label="Use previous conversations for personalization" hint="Better, more relevant suggestions.">
              <Switch checked={prefs.usePastConversations} onCheckedChange={(v) => setPrefs({ usePastConversations: v })} />
            </Row>
            <Row label="Preferred response style">
              <Select value={prefs.responseStyle} onValueChange={(v) => setPrefs({ responseStyle: v })}>
                <SelectTrigger className="w-full rounded-[12px] border-border bg-background sm:w-56">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Simple and encouraging">Simple and encouraging</SelectItem>
                  <SelectItem value="Detailed and structured">Detailed and structured</SelectItem>
                  <SelectItem value="Brief and direct">Brief and direct</SelectItem>
                </SelectContent>
              </Select>
            </Row>
          </div>
          <div className="mt-4 rounded-[14px] border border-border bg-background p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Stored preferences</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {prefs.favoriteFoods.map((food) => (
                <span key={food} className="rounded-full bg-soft-green px-2.5 py-1 text-xs text-foreground">{food}</span>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            className="mt-4 gap-1.5 rounded-[12px] border-destructive/30 text-destructive hover:bg-destructive/10"
            onClick={() => toast("AI memory cleared", { description: "Preferences and conversation history cleared." })}
          >
            <Eraser className="h-4 w-4" /> Clear AI memory
          </Button>
        </section>

        <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
          <h2 className="flex items-center gap-2 font-display text-base font-bold text-navy">
            <Bell className="h-4.5 w-4.5 text-teal" /> Notifications
          </h2>
          <div className="mt-3">
            <Row label="Reminders and encouragement" hint="Optional daily nudges.">
              <Switch checked={prefs.notifications} onCheckedChange={(v) => setPrefs({ notifications: v })} />
            </Row>
          </div>
        </section>

        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-base font-bold text-navy">Privacy &amp; Security</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-teal" /> Your data stays private by default.</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-teal" /> You can clear AI memory anytime.</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 shrink-0 text-teal" /> No medical records are shared.</li>
            </ul>
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 gap-1.5 rounded-[12px] text-destructive hover:text-destructive"
              onClick={() => {
                clearGrocery();
                toast("Demo data reset");
              }}
            >
              <Trash2 className="h-4 w-4" /> Reset demo data
            </Button>
          </section>
          <section className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
            <h2 className="font-display text-base font-bold text-navy">Help &amp; Legal</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link to="/safety" className="flex items-center gap-1 text-teal hover:underline">
                  Help &amp; Safety <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </li>
              <li><Link to="/safety" className="text-muted-foreground hover:text-navy">Terms</Link></li>
              <li><Link to="/safety" className="text-muted-foreground hover:text-navy">Privacy Policy</Link></li>
            </ul>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  );
}