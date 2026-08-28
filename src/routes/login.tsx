import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiMark } from "@/components/fitslim/AiMark";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { signIn, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter your email and password.");
      return;
    }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast.error("Sign-in failed", { description: error });
      return;
    }
    // AuthGate handles the post-auth redirect based on role (admin → /admin, member → /home).
    toast.success("Welcome back!", { description: "You're signed in to FitSlim AI." });
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error("Enter your email above to receive a reset link.");
      return;
    }
    const { error } = await resetPassword(email);
    toast(error ? "Could not send reset link" : "Password reset link sent", {
      description: error ?? "Check your inbox for a secure reset link.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-navy via-deep-navy to-dark-teal lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:p-12">
          <div
            className="absolute -right-24 -top-24 size-96 rounded-full bg-teal/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-32 -left-20 size-80 rounded-full bg-light-blue/10 blur-3xl"
            aria-hidden="true"
          />
          <Link to="/" className="relative flex items-center gap-2.5 text-white">
            <span className="grid size-10 place-items-center rounded-[14px] bg-white/10">
              <AiMark size={28} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">FitSlim AI™</span>
          </Link>

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">Members</p>
            <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white">
              Bring your everyday questions about health.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-pale-teal">
              Log in to get practical educational support for meals, hydration, movement, travel,
              healthy habits, and questions for your care team.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-pale-teal">
              {[
                "Educational support — never a replacement for your provider",
                "Ask anything, any time",
                "Save recipes, plans, and helpful answers",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative text-xs text-pale-teal/70">
            Best on desktop &amp; mobile · Mock demo — no real accounts are stored.
          </p>
        </aside>

        {/* Form */}
        <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
              <span className="grid size-10 place-items-center rounded-[14px] shadow-soft">
                <AiMark size={28} />
              </span>
              <span className="font-display text-lg font-bold text-navy">FitSlim AI™</span>
            </Link>

            <div className="rounded-[24px] border border-border bg-card p-6 shadow-lift sm:p-8">
              <h2 className="font-display text-2xl font-bold text-navy">Welcome back</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Log in to your FitSlim AI companion.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="rounded-[12px] border-border bg-background py-2.5 pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your password"
                      className="rounded-[12px] border-border bg-background py-2.5 pl-9 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-navy"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
                    Remember me
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm font-medium text-teal transition hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 w-full gap-1.5 rounded-[12px] bg-teal text-[15px] font-semibold text-white hover:bg-bright-teal"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
                    </>
                  ) : (
                    <>
                      Log in <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <p className="mt-5 text-center text-sm text-muted-foreground">
                New to FitSlim?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-teal transition hover:underline"
                >
                  Create a member account
                </Link>
              </p>
            </div>

            <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
              By continuing you agree to the Terms &amp; Privacy Policy. FitSlim AI provides
              educational support and does not replace your healthcare provider.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
