import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bookmark,
  ChefHat,
  Droplets,
  Dumbbell,
  History,
  Home,
  LayoutGrid,
  LogOut,
  Menu,
  MessageCircle,
  MessagesSquare,
  Salad,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  Syringe,
  Target,
  UserCog,
  UtensilsCrossed,
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandMark } from "./BrandMark";
import { SignOutConfirmDialog } from "./SignOutConfirmDialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const BOTTOM_NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/nutrition", label: "Nutrition", icon: Salad },
  { to: "/recipes", label: "Recipes", icon: ChefHat },
  { to: "/restaurants", label: "Restaurants", icon: UtensilsCrossed },
] as const;

const SECTIONS_NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/nutrition", label: "Nutrition", icon: Salad },
  { to: "/restaurants", label: "Restaurants", icon: UtensilsCrossed },
  { to: "/recipes", label: "Recipes", icon: ChefHat },
  { to: "/glp1", label: "GLP-1 Education", icon: Syringe },
  { to: "/exercise", label: "Exercise & Movement", icon: Dumbbell },
  { to: "/hydration", label: "Hydration", icon: Droplets },
  { to: "/habits", label: "Healthy Habits", icon: Sprout },
] as const;

const MORE_NAV = [
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/grocery-list", label: "Grocery List", icon: ShoppingBasket },
  { to: "/provider-questions", label: "Provider Questions", icon: MessagesSquare },
  { to: "/blueprint", label: "My Blueprint", icon: Target },
  { to: "/history", label: "History", icon: History },
] as const;

// Admins get their own navigation, separate from member (wellness) nav.
const ADMIN_NAV = [{ to: "/admin", label: "Admin", icon: UserCog }] as const;

const SETTINGS_NAV = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/safety", label: "Help & Safety", icon: ShieldCheck },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = profile?.role === "admin";

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    navigate({ to: "/login" });
  };

  const drawerLinkClass = (active: boolean) =>
    cn(
      "flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm",
      active
        ? "bg-sidebar-accent font-semibold text-navy"
        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-navy",
    );

  return (
    <>
      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between border-b bg-background/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <BrandMark className="origin-left scale-90" />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-navy hover:bg-pale-teal"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] overflow-y-auto rounded-l-[20px] bg-sidebar text-sidebar-foreground"
          >
            <SheetHeader className="px-2 pt-2">
              <SheetTitle className="font-display text-lg font-bold text-navy">
                FitSlim AI™
              </SheetTitle>
              <p className="text-xs text-muted-foreground">Powered by FitSlim USA</p>
            </SheetHeader>
            {isAdmin ? (
              <nav className="mt-4 space-y-0.5" aria-label="Admin">
                <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Admin
                </p>
                {ADMIN_NAV.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: true }}
                    activeProps={{ className: drawerLinkClass(true) }}
                    inactiveProps={{ className: drawerLinkClass(false) }}
                    className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm"
                  >
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            ) : (
              <>
                <nav className="mt-4 space-y-0.5" aria-label="Wellness guides">
                  <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Wellness Guides
                  </p>
                  {SECTIONS_NAV.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: true }}
                      activeProps={{ className: drawerLinkClass(true) }}
                      inactiveProps={{ className: drawerLinkClass(false) }}
                      className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm"
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <nav className="mt-5 space-y-0.5" aria-label="More">
                  <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    More
                  </p>
                  {MORE_NAV.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      activeOptions={{ exact: true }}
                      activeProps={{ className: drawerLinkClass(true) }}
                      inactiveProps={{ className: drawerLinkClass(false) }}
                      className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm"
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </>
            )}
            <nav
              className="mt-3 space-y-0.5 border-t border-sidebar-border pt-3 pb-2"
              aria-label="Settings"
            >
              {SETTINGS_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: drawerLinkClass(true) }}
                  inactiveProps={{ className: drawerLinkClass(false) }}
                  className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm"
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  {item.label}
                </Link>
              ))}
              <SignOutConfirmDialog onConfirm={handleSignOut}>
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-sidebar-accent/60 hover:text-destructive"
                >
                  <LogOut className="h-[18px] w-[18px]" /> Sign out
                </button>
              </SignOutConfirmDialog>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Bottom nav */}
      {!isAdmin && (
        <nav
          className="shrink-0 border-t bg-card px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="mx-auto flex max-w-xl items-center justify-around">
            {BOTTOM_NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: true }}
                className="flex min-w-[56px] flex-col items-center gap-0.5 rounded-[14px] px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition hover:text-navy"
                activeProps={{ className: "text-teal" }}
                aria-label={item.label}
              >
                <item.icon className="h-5 w-5" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex min-w-[56px] flex-col items-center gap-0.5 rounded-[14px] px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition hover:text-navy"
              aria-label="More"
            >
              <LayoutGrid className="h-5 w-5" aria-hidden="true" />
              More
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
