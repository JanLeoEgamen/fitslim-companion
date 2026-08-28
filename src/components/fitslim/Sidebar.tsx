import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bookmark,
  ChefHat,
  ChevronsLeft,
  Droplets,
  Dumbbell,
  History,
  Home,
  LogOut,
  MessageCircle,
  MessagesSquare,
  Salad,
  Settings,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Sprout,
  Syringe,
  Target,
  UserCog,
  UtensilsCrossed,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { SignOutConfirmDialog } from "./SignOutConfirmDialog";
import { Button } from "@/components/ui/button";
import { useFitSlim } from "@/lib/fitslim/store";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

const PRIMARY_NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/nutrition", label: "Nutrition", icon: Salad },
  { to: "/restaurants", label: "Restaurants", icon: UtensilsCrossed },
  { to: "/recipes", label: "Recipes", icon: ChefHat },
  { to: "/glp1", label: "GLP-1 Education", icon: Syringe },
  { to: "/exercise", label: "Exercise & Movement", icon: Dumbbell },
  { to: "/hydration", label: "Hydration", icon: Droplets },
  { to: "/habits", label: "Healthy Habits", icon: Sprout },
] as const;

const SECONDARY_NAV = [
  { to: "/chat", label: "Chat", icon: MessageCircle },
  { to: "/saved", label: "Saved", icon: Bookmark },
  { to: "/grocery-list", label: "Grocery List", icon: ShoppingBasket },
  { to: "/provider-questions", label: "Provider Questions", icon: MessagesSquare },
  { to: "/blueprint", label: "My Blueprint", icon: Target },
  { to: "/history", label: "History", icon: History },
] as const;

// Admins get their own navigation, separate from member (wellness) nav.
const ADMIN_NAV = [{ to: "/admin", label: "Admin", icon: UserCog }] as const;

const FOOTER_NAV = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/safety", label: "Help & Safety", icon: ShieldCheck },
] as const;

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, member } = useFitSlim();
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const isAdmin = profile?.role === "admin";

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  return (
    <aside
      className={cn(
        "relative z-30 hidden h-full shrink-0 flex-col border-r bg-sidebar text-sidebar-foreground transition-[width] duration-200 lg:flex",
        sidebarCollapsed ? "w-[76px]" : "w-[264px]",
      )}
    >
      <div className={cn("flex items-center px-4 pt-4", sidebarCollapsed && "px-3")}>
        <BrandMark
          className={cn(sidebarCollapsed && "opacity-0")}
          subtitle="Powered by FitSlim USA"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto rounded-full text-muted-foreground hover:bg-sidebar-accent hover:text-navy"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronsLeft
            className={cn("h-4 w-4 transition-transform", sidebarCollapsed && "rotate-180")}
          />
        </Button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4" aria-label="Primary">
        {isAdmin ? (
          <>
            {!sidebarCollapsed && (
              <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Admin
              </p>
            )}
            {ADMIN_NAV.map((item) => (
              <SideLink
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                collapsed={sidebarCollapsed}
              />
            ))}
          </>
        ) : (
          <>
            {!sidebarCollapsed && (
              <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Wellness Guides
              </p>
            )}
            {PRIMARY_NAV.map((item) => (
              <SideLink
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                collapsed={sidebarCollapsed}
              />
            ))}

            {!sidebarCollapsed && (
              <p className="mb-1.5 mt-5 px-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                More
              </p>
            )}
            {SECONDARY_NAV.map((item) => (
              <SideLink
                key={item.to}
                to={item.to}
                label={item.label}
                icon={item.icon}
                collapsed={sidebarCollapsed}
              />
            ))}
          </>
        )}
      </nav>

      <div className="space-y-0.5 px-3 pb-3">
        {!sidebarCollapsed && (
          <div className="mb-3 rounded-[16px] border border-teal/20 bg-gradient-to-br from-pale-teal to-card p-3">
            <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-navy">
              <Sparkles className="h-3.5 w-3.5 text-teal" />
              AI Educational Support
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
              FitSlim AI helps reinforce your wellness journey. It does not replace your care team.
            </p>
          </div>
        )}
        {FOOTER_NAV.map((item) => (
          <SideLink
            key={item.to}
            to={item.to}
            label={item.label}
            icon={item.icon}
            collapsed={sidebarCollapsed}
          />
        ))}
      </div>

      <div className="border-t p-3">
        <Link
          to="/profile"
          className={cn(
            "flex items-center gap-2.5 rounded-[14px] p-2 transition hover:bg-sidebar-accent",
            sidebarCollapsed && "justify-center",
          )}
          aria-label="Open profile"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-navy to-teal text-sm font-bold text-white">
            {member.firstName[0]}
          </span>
          {!sidebarCollapsed && (
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-sm font-semibold text-sidebar-foreground">
                {member.name}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">
                Member since {member.memberSince}
              </span>
            </span>
          )}
        </Link>
        {!sidebarCollapsed && (
          <SignOutConfirmDialog onConfirm={handleSignOut}>
            <button
              type="button"
              className="mt-1 flex w-full items-center gap-2.5 rounded-[12px] px-3 py-2 text-sm text-muted-foreground transition hover:bg-sidebar-accent/60 hover:text-destructive"
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
              Sign out
            </button>
          </SignOutConfirmDialog>
        )}
      </div>
    </aside>
  );
}

type SideLinkProps = {
  to:
    | (typeof PRIMARY_NAV)[number]["to"]
    | (typeof SECONDARY_NAV)[number]["to"]
    | (typeof ADMIN_NAV)[number]["to"]
    | (typeof FOOTER_NAV)[number]["to"];
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  collapsed?: boolean;
};

function SideLink({ to, label, icon: Icon, collapsed }: SideLinkProps) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: true }}
      activeProps={{ className: "bg-sidebar-accent text-navy font-semibold shadow-inner" }}
      inactiveProps={{
        className: "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-navy",
      }}
      className={cn(
        "relative flex items-center gap-2.5 rounded-[12px] px-3 py-2 text-sm transition",
        collapsed && "justify-center",
      )}
      aria-label={label}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-teal" />
          )}
          <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          {!collapsed && <span className="truncate">{label}</span>}
        </>
      )}
    </Link>
  );
}
