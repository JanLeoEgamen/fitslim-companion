import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiMark } from "@/components/fitslim/AiMark";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  component: SignUp,
});

function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password too short", { description: "Use at least 8 characters." });
      return;
    }
    if (!agree) {
      toast.error("Please accept the Terms & Privacy Policy to continue.");
      return;
    }
    setLoading(true);
    const firstName = name.trim().split(" ")[0] ?? "";
    const { error, needsConfirmation } = await signUp({ email, password, name, firstName });
    setLoading(false);
    if (error) {
      toast.error("Could not create account", { description: error });
      return;
    }
    if (needsConfirmation) {
      toast.success("Account created — check your email", {
        description: "Confirm your email address to sign in.",
      });
      navigate({ to: "/login" });
      return;
    }
    toast.success("Welcome to FitSlim AI!");
    navigate({ to: "/home" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-navy via-deep-navy to-dark-teal lg:flex lg:w-[46%] lg:flex-col lg:justify-between lg:p-12">
          <div className="absolute -right-24 -top-24 size-96 rounded-full bg-teal/20 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-32 -left-20 size-80 rounded-full bg-light-blue/10 blur-3xl" aria-hidden="true" />
          <Link to="/" className="relative flex items-center gap-2.5 text-white">
            <span className="grid size-10 place-items-center rounded-[14px] bg-white/10">
              <AiMark size={28} />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">FitSlim AI™</span>
          </Link>
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal">Join FitSlim</p>
            <h1 className="font-display mt-3 text-4xl font-bold leading-tight text-white">
              Your everyday health &amp; wellness companion.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-pale-teal">
              Create your account to get practical educational support for meals, hydration,
              movement, travel, healthy habits, and questions for your care team.
            </p>
          </div>
          <p className="relative flex items-center gap-2 text-xs text-pale-teal">
            <ShieldCheck className="h-4 w-4 text-teal" /> Educational support — not a substitute for your healthcare provider.
          </p>
        </aside>
{/* Form panel */}
        <main className="flex flex-1 items-center justify-center bg-background p-4 sm:p-8">
          <div className="w-full max-w-md">
            <div className="mb-6 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2 text-white">
                <span className="grid size-9 place-items-center rounded-[14px] bg-gradient-to-br from-navy to-teal">
                  <AiMark size={22} />
                </span>
                <span className="font-display text-lg font-bold tracking-tight text-navy">FitSlim AI™</span>
              </Link>
            </div>

            <h1 className="font-display text-2xl font-bold text-navy">Create your account</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign up as a member to start your wellness journey with FitSlim AI.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    autoComplete="name"
                    className="rounded-[12px] border-border bg-background py-2.5 pl-9"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="rounded-[12px] border-border bg-background py-2.5 pl-9"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
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

              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted-foreground">
                <Checkbox checked={agree} onCheckedChange={(v) => setAgree(!!v)} className="mt-0.5" />
                <span>
                  I agree to the Terms &amp; Privacy Policy. FitSlim AI provides educational support
                  and does not replace my healthcare provider.
                </span>
              </label>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full gap-1.5 rounded-[12px] bg-teal text-[15px] font-semibold text-white hover:bg-bright-teal"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Create account <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-5 text-center text-sm text-muted-foreground">
              Already a member?{" "}
              <Link to="/login" className="font-semibold text-teal transition hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}