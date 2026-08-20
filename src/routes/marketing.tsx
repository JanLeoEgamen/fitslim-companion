import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Coffee,
  GraduationCap,
  HeartPulse,
  Leaf,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AskAiButton } from "@/components/fitslim/AskAiButton";
import { FAQAccordion } from "@/components/fitslim/FAQAccordion";
import { AlertBanner, HeroVisual } from "./marketing-helpers";

export const Route = createFileRoute("/marketing")({
  component: Marketing,
});

function Marketing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/chat" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-[14px] bg-gradient-to-br from-navy to-teal shadow-soft">
              <Sparkles className="h-5 w-5 text-white" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-navy">FitSlim AI™</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/chat"
              className="hidden rounded-[12px] border border-navy px-4 py-2 text-sm font-semibold text-navy transition hover:bg-pale-teal sm:inline-flex"
            >
              TRY FITSLIM AI™
            </Link>
            <Link
              to="/chat"
              className="rounded-[12px] bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-deep-navy"
            >
              START YOUR FREE ASSESSMENT
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_480px_at_12%_-8%,rgba(215,239,249,0.7),transparent_60%),radial-gradient(700px_420px_at_96%_6%,rgba(237,248,249,0.85),transparent_62%)]" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div className="max-w-[680px] text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-light-blue px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
                <Sparkles className="h-3.5 w-3.5 text-teal" /> FitSlim AI™
              </span>
              <h1 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
                Your questions don't only happen during appointments.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                FitSlim AI™ gives members practical educational support for nutrition, meals, movement, hydration,
                travel, healthy habits, and more.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button className="h-12 rounded-[14px] bg-navy px-6 text-[15px] font-bold text-white hover:bg-deep-navy" asChild>
                  <Link to="/chat">START YOUR FREE ASSESSMENT</Link>
                </Button>
                <Button variant="outline" className="h-12 rounded-[14px] border-teal px-6 text-[15px] font-bold text-teal hover:bg-pale-teal" asChild>
                  <Link to="/chat">EXPLORE THE FITSLIM METHOD™</Link>
                </Button>
              </div>
            </div>

            <HeroVisual />
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-teal">Why FitSlim AI Matters</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy">Support that fits real life.</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Most people don't struggle because they lack motivation — they struggle because questions come up between
            appointments without a place to go. FitSlim AI gives you a friendly place to get educational guidance any
            time.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: UtensilsCrossed, title: "Everyday nutrition", text: "Meal ideas, protein tips, restaurant and grocery help." },
              { icon: Coffee, title: "Built around your day", text: "Practical habits you can actually keep." },
              { icon: HeartPulse, title: "Human-first boundaries", text: "Educational support — never a replacement for your provider." },
            ].map((card) => (
              <div key={card.title} className="rounded-[20px] border border-border bg-card p-5 shadow-soft">
                <span className="grid size-11 place-items-center rounded-[14px] bg-pale-teal">
                  <card.icon className="h-5 w-5 text-teal" />
                </span>
                <h3 className="font-display mt-3 text-lg font-bold text-navy">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-pale-teal/50 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">What FitSlim AI Can Help With</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy">Practical, everyday wellness.</h2>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {[
                { icon: UtensilsCrossed, title: "Healthy meals", text: "Plan balanced plates and protein-forward meals." },
                { icon: UtensilsCrossed, title: "Recipes & groceries", text: "Quick recipes that turn into easy shopping lists." },
                { icon: MessageCircle, title: "Restaurants & travel", text: "Order with confidence and stay steady on trips." },
                { icon: Leaf, title: "Hydration & movement", text: "Simple anchors for water, walks and sustainable activity." },
                { icon: BookOpen, title: "Sleep & habits", text: "Calmer routines and habits that actually stick." },
                { icon: Sparkles, title: "Care team readiness", text: "Prep questions to discuss with your provider." },
              ].map((card) => (
                <div key={card.title} className="flex items-start gap-3 rounded-[20px] border border-border bg-card p-5 shadow-soft">
                  <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-light-blue">
                    <card.icon className="h-5 w-5 text-teal" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy">{card.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">See It In Action</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy">Ask anything, get a clear answer.</h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="rounded-[20px] border border-border bg-card p-6 shadow-soft">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-pale-teal px-3 py-1 text-xs font-medium text-navy">User</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground">
                What's a high-protein breakfast I can make in 10 minutes?
              </p>
            </div>
            <div className="rounded-[20px] border border-border bg-card p-6 shadow-soft rounded-tl-md">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-navy to-teal">
                  <Sparkles className="h-3 w-3 text-white" />
                </span>
                <span className="rounded-full bg-light-blue px-3 py-1 text-xs font-medium text-navy">FitSlim AI</span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground">
                Here's a simple option — the <strong>Greek Yogurt Power Bowl</strong>: Greek yogurt, berries, chia
                seeds and a small handful of nuts. Prep time: about 5 minutes. Want me to turn this into a grocery list?
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Create Grocery List", "Give Me 3 More", "Save Recipe"].map((label) => (
                  <span key={label} className="rounded-[12px] bg-navy px-3 py-1.5 text-xs font-semibold text-white">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-pale-teal/50 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">How It Works</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy">Answers when you need them.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { n: "01", title: "Ask", text: "Type any question about your wellness journey in the chat." },
                { n: "02", title: "Learn", text: "Get a clear, educational answer with practical steps." },
                { n: "03", title: "Act", text: "Save ideas, build grocery lists, and prep for your provider." },
              ].map((step) => (
                <div key={step.n} className="rounded-[20px] border border-border bg-card p-6 shadow-soft">
                  <span className="font-display text-3xl font-bold text-teal">{step.n}</span>
                  <h3 className="font-display mt-3 text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
{/* FitSlim-aligned education */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">FitSlim-Aligned Education</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy">Built to reinforce your care plan.</h2>
          <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            FitSlim AI focuses on general wellness education that complements — never replaces — the guidance from
            your provider and care team.
          </p>
          <div className="mt-8 flex flex-col gap-5 sm:flex-row">
            <div className="flex-1 rounded-[20px] border border-border bg-card p-6 shadow-soft">
              <span className="grid size-12 place-items-center rounded-[16px] bg-light-blue">
                <Sparkles className="h-6 w-6 text-teal" />
              </span>
              <h3 className="font-display mt-3 text-lg font-bold text-navy">Pairing with your care team</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                FitSlim AI works alongside the FitSlim Method™ and your Blueprint™ to answer questions and reinforce
                healthy habits in between visits.
              </p>
            </div>
            <div className="flex-1 rounded-[20px] border border-border bg-card p-6 shadow-soft">
              <span className="grid size-12 place-items-center rounded-[16px] bg-light-blue">
                <ShieldCheck className="h-6 w-6 text-teal" />
              </span>
              <h3 className="font-display mt-3 text-lg font-bold text-navy">General, not medical</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                FitSlim AI provides educational support. It does not diagnose, treat, interpret labs, or prescribe
                medication.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-pale-teal/50 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-light-blue px-3 py-1.5 text-xs font-bold text-navy">
              <GraduationCap className="h-4 w-4 text-teal" /> FitSlim Academy
            </span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-navy">Learn. Practice. Repeat.</h2>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              FitSlim AI recommends short Academy™ lessons, suggests follow-ups, and makes it easy to turn ideas into
              your next meals.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal">GLP-1</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy">General education to discuss with your provider.</h2>
          <AlertBanner tone="info" title="Medication decisions belong to your provider.">
            FitSlim AI shares general nutrition education to support your plan, but it cannot advise on medication,
            dosing or symptoms. Follow the guidance from your prescribing provider.
          </AlertBanner>
        </section>
{/* Technology + care team */}
        <section className="bg-pale-teal/50 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal">Technology + Your Care Team</p>
                <h2 className="font-display text-3xl font-bold tracking-tight text-navy">Ready to talk with your provider?</h2>
                <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
                  FitSlim AI helps you prep the questions you want to discuss, so you show up ready to make the most of
                  every visit.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <AskAiButton label="Prepare Provider Questions" className="rounded-[14px]" />
                  <Button variant="outline" className="rounded-[14px] border-teal text-teal hover:bg-pale-teal" asChild>
                    <Link to="/provider-questions">Open Tool</Link>
                  </Button>
                </div>
              </div>
              <div className="rounded-[20px] border border-border bg-card p-6 shadow-soft">
                <h3 className="font-display text-lg font-bold text-navy">A list you can actually use</h3>
                <ul className="mt-3 space-y-2.5">
                  {[
                    "Education fit to your current concerns",
                    "Quick action buttons: recipes, grocery, and safety",
                    "Optional provider question list",
                    "Respectful, judgment-free guidance",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-green" />
                      <span className="text-sm leading-relaxed text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy">A boundary we take seriously.</h2>
          <div className="mt-6">
            <AlertBanner tone="urgent" title="FitSlim AI is not an emergency service.">
              For urgent or emergency symptoms, seek appropriate medical care through your local resources. FitSlim AI
              never receives or responds to live health events.
            </AlertBanner>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy">Frequently asked questions</h2>
          <div className="mt-6">
            <FAQAccordion />
          </div>
        </section>
{/* CTA */}
        <section className="bg-navy py-16">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white">Ready to see what FitSlim AI™ can do?</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-pale-teal">
              FitSlim AI™ gives you practical educational support when real life happens — from meal planning and
              restaurant choices to hydration and questions for your care team.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button className="h-12 rounded-[14px] bg-white px-6 text-[15px] font-bold text-navy hover:bg-pale-teal" asChild>
                <Link to="/chat">TRY FITSLIM AI™</Link>
              </Button>
              <Button className="h-12 rounded-[14px] border border-white px-6 text-[15px] font-bold text-white hover:bg-deep-navy" asChild>
                <Link to="/chat">START YOUR FREE ASSESSMENT</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-[12px] bg-gradient-to-br from-navy to-teal">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </span>
            <span className="font-display text-base font-bold text-navy">FitSlim AI™</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 FitSlim USA. All rights reserved.</p>
          <p className="max-w-[300px] text-xs leading-snug text-muted-foreground">
            FitSlim AI provides educational support and does not replace your provider.
          </p>
        </div>
      </footer>
    </div>
  );
}