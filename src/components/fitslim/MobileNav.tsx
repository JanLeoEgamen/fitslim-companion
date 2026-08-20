import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bookmark, Compass, GraduationCap, History, Menu, MessageCircle, Settings, ShieldCheck, Target, User } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BrandMark } from "./BrandMark";
import { Button } from "@/components/ui/button";
import { useFitSlim } from "@/lib/fitslim/store";
import { cn } from "@/lib/utils";

const BOTTOM_NAV = [
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/blueprint", label: "My Blueprint", icon: Target },
  { to: "/profile", label: "Profile", icon: User },
];

const DRAWER_NAV = [
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/blueprint", label: "My Blueprint", icon: Target },
  { to: "/academy", label: "FitSlim Academy", icon: GraduationCap },
  { to: "/history", label: "History", icon: History },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/safety", label: "Help & Safety", icon: ShieldCheck },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between border-b bg-background/95 px-4 py-2.5 backdrop-blur lg:hidden">
        <BrandMark className="scale-90 origin-left" />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full text-navy hover:bg-pale-teal" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] rounded-l-[20px] bg-sidebar text-sidebar-foreground">
            <SheetHeader className="px-2 pt-2">
              <SheetTitle className="font-display text-lg font-bold text-navy">FitSlim AI™</SheetTitle>
              <p className="text-xs text-muted-foreground">Powered by FitSlim USA</p>
            </SheetHeader>
            <nav className="mt-4 space-y-0.5" aria-label="Menu">
              {DRAWER_NAV.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "bg-sidebar-accent text-navy font-semibold" }}
                  inactiveProps={{ className: "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-navy" }}
                  className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 text-sm"
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* Bottom nav */}
      <nav className="shrink-0 border-t bg-card px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1.5 lg:hidden" aria-label="Mobile navigation">
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
        </div>
      </nav>
    </>
  );
}