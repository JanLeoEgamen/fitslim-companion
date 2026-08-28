import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Coffee,
  HeartPulse,
  Leaf,
  MessageCircle,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AiMark } from "./AiMark";
import { HeroVisual } from "./HeroVisual";
import { FAQAccordion } from "./FAQAccordion";

const FEATURES = [
  {
    icon: UtensilsCrossed,
    title: "Everyday nutrition",
    text: "Balanced meals, protein ideas, and simple swaps.",
  },
  {
    icon: MessageCircle,
    title: "Restaurants & travel",
    text: "Order with confidence and stay steady on trips.",
  },
  {
    icon: Leaf,
    title: "Hydration & movement",
    text: "Simple anchors for water, walks, and sustainable activity.",
  },
  {
    icon: BookOpen,
    title: "Sleep & habits",
    text: "Calmer routines and habits that actually stick.",
  },
  {
    icon: Coffee,
    title: "Built around your day",
    text: "Practical support that fits your real life.",
  },
  { icon: HeartPulse, title: "Provider-ready", text: "Prepare questions for your next visit." },
];

const STEPS = [
  { n: "01", title: "Ask", text: "Type a question about meals, wellness, or travel." },
  { n: "02", title: "Learn", text: "Get a clear, educational answer with practical steps." },
  { n: "03", title: "Act", text: "Save ideas, build grocery lists, and get ready for visits." },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-[14px] shadow-soft">
              <AiMark size={30} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-navy">
              FitSlim AI™
            </span>
          </Link>
          <nav
            className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex"
            aria-label="Landing"
          >
            <a href="#features" className="transition hover:text-navy">
              Features
            </a>
            <a href="#how" className="transition hover:text-navy">
              How it works
            </a>
            <a href="#faq" className="transition hover:text-navy">
              FAQ
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="rounded-[12px] border-navy text-navy hover:bg-pale-teal"
              asChild
            >
              <Link to="/login">Log in</Link>
            </Button>
            <Button className="rounded-[12px] bg-teal text-white hover:bg-bright-teal" asChild>
              <Link to="/login">Start free assessment</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 -z-10 bg-[radial-gradient(900px_480px_at_12%_-8%,rgba(215,239,249,0.7),transparent_60%),radial-gradient(700px_420px_at_96%_6%,rgba(237,248,249,0.85),transparent_62%)]"
            aria-hidden="true"
          />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-light-blue px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-navy">
                <Sparkles className="h-3.5 w-3.5 text-teal" /> FitSlim AI™
              </span>
              <h1 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
                Your everyday health &amp; wellness companion.
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Your questions don't only happen during appointments. FitSlim AI gives members
                practical educational support when real life happens — from meal planning and
                restaurant choices to hydration and questions for your care team.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="h-12 rounded-[14px] bg-teal px-6 text-[15px] font-bold text-white hover:bg-bright-teal"
                  asChild
                >
                  <Link to="/login">
                    Log in to FitSlim AI
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 rounded-[14px] border-teal px-6 text-[15px] font-bold text-teal hover:bg-pale-teal"
                  asChild
                >
                  <Link to="/home">See the app in action</Link>
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
                {[
                  "Educational support, 24/7",
                  "Built to complement your care team",
                  "Backed by FitSlim USA",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-green" /> {item}
                  </span>
                ))}
              </div>
            </div>
            <HeroVisual />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">
              What FitSlim AI can help with
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-navy">
              Practical, everyday wellness.
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((card) => (
              <div
                key={card.title}
                className="rounded-[20px] border border-border bg-card p-5 shadow-soft"
              >
                <span className="grid size-11 place-items-center rounded-[14px] bg-pale-teal">
                  <card.icon className="h-5 w-5 text-teal" />
                </span>
                <h3 className="font-display mt-3 text-lg font-bold text-navy">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="bg-pale-teal/50 py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal">
                How it works
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-navy">
                Answers when you need them.
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {STEPS.map((step) => (
                <div
                  key={step.n}
                  className="rounded-[20px] border border-border bg-card p-6 shadow-soft"
                >
                  <span className="font-display text-3xl font-bold text-teal">{step.n}</span>
                  <h3 className="font-display mt-3 text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Care team */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="rounded-[20px] border border-border bg-card p-8 shadow-soft lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-xl">
              <span className="grid size-12 place-items-center rounded-[16px] bg-pale-teal">
                <HeartPulse className="h-6 w-6 text-teal" />
              </span>
              <h2 className="font-display mt-4 text-2xl font-bold text-navy">
                Ready to talk to your provider?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                FitSlim AI helps you prepare the questions you want to discuss, so you get the most
                out of every visit.
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-5 rounded-[12px] border-teal px-5 text-teal hover:bg-pale-teal lg:mt-0"
              asChild
            >
              <Link to="/provider-questions">Prepare questions</Link>
            </Button>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-pale-teal/50 py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal">FAQ</p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-navy">
                Frequently asked questions
              </h2>
            </div>
            <div className="mt-8">
              <FAQAccordion />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-navy py-16">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white">
              Your questions don't only happen during appointments.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-pale-teal">
              Log in to FitSlim AI for practical educational support whenever real life happens.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-12 rounded-[14px] bg-teal px-6 text-[15px] font-bold text-white hover:bg-bright-teal"
                asChild
              >
                <Link to="/login">
                  Log in now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                className="h-12 rounded-[14px] border border-white px-6 text-[15px] font-bold text-white hover:bg-deep-navy"
                asChild
              >
                <Link to="/login">Start your free assessment</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5">
            <AiMark size={30} />
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
