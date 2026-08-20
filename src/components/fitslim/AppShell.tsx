import { useState } from "react";
import { Outlet, useLocation } from "@tanstack/react-router";
import { PanelRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ContextPanel } from "./ContextPanel";
import { useFitSlim } from "@/lib/fitslim/store";
import { cn } from "@/lib/utils";

// Standalone (public) pages render without the app shell.
const STANDALONE_PATHS = ["/", "/login", "/marketing"];

export function AppShell() {
  const { panelOpen, togglePanel } = useFitSlim();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const isStandalone = STANDALONE_PATHS.includes(location.pathname);

  if (isStandalone) {
    return <Outlet />;
  }

  return (
    <div className="fs-surface flex h-screen flex-col overflow-hidden">
      <MobileNav />
      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="min-h-0 flex-1 overflow-hidden">
            <Outlet />
          </div>

          {/* Floating panel toggle for tablet / small screens */}
          <div className="absolute bottom-24 right-4 z-20 xl:hidden">
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full bg-navy text-white shadow-lift hover:bg-deep-navy"
                  aria-label="Open context panel"
                >
                  <PanelRight className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[340px] overflow-y-auto rounded-l-[20px] bg-background">
                <SheetHeader className="px-4">
                  <SheetTitle className="font-display text-base font-bold text-navy">Your Context</SheetTitle>
                </SheetHeader>
                <div className="pt-2">
                  <ContextPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </main>

        {/* Right context panel — visible on large screens */}
        <aside
          className={cn(
            "hidden w-[340px] shrink-0 border-l bg-background/60 backdrop-blur transition-all duration-200 xl:flex",
            panelOpen ? "translate-x-0" : "translate-x-full",
          )}
          aria-label="Context panel"
        >
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-end p-2 pr-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePanel}
                className="rounded-full text-muted-foreground hover:bg-pale-teal hover:text-navy"
                aria-label="Close context panel"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="min-h-0 flex-1">
              <ContextPanel />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}