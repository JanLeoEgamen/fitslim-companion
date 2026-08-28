import { Outlet, useLocation } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

// Standalone (public + admin console) pages render without the app shell.
const STANDALONE_PATHS = ["/", "/login", "/signup", "/marketing", "/admin"];

export function AppShell() {
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
        </main>
      </div>
    </div>
  );
}
