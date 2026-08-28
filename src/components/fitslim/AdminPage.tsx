import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Lock,
  Mail,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Unlock,
  UserCog,
  UserPlus,
  Users,
  UserX,
  LogOut,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PageLayout } from "./PageLayout";
import { PageHeader } from "./PageHeader";
import { BrandMark } from "./BrandMark";
import { SignOutConfirmDialog } from "./SignOutConfirmDialog";
import { useFitSlim } from "@/lib/fitslim/store";
import { useAuth } from "@/lib/auth";
import type { AdminUserInput } from "@/lib/fitslim/store";
import type { AdminUser, AdminUserRole, AdminUserStatus } from "@/lib/fitslim/data";
import { cn } from "@/lib/utils";

type Filter = "all" | AdminUserRole | AdminUserStatus;

const ROLE_STYLE: Record<AdminUserRole, string> = {
  admin: "bg-indigo/10 text-indigo",
  member: "bg-pale-teal text-navy",
};

const STATUS_STYLE: Record<AdminUserStatus, string> = {
  active: "bg-soft-green text-navy",
  invited: "bg-light-blue text-navy",
  suspended: "bg-destructive/10 text-destructive",
};

const emptyInput: AdminUserInput = {
  name: "",
  firstName: "",
  email: "",
  role: "member",
  status: "active",
  goals: [],
};

function fmtDate(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AdminPage() {
  const navigate = useNavigate();
  const { usersApi, member } = useFitSlim();
  const { users, createUser, updateUser, removeUser, setUserStatus } = usersApi;
  const { profile, signOut } = useAuth();
  const adminName = profile?.name || member.name;

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/login" });
  };

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | AdminUserRole>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | AdminUserStatus>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [deleting, setDeleting] = useState<AdminUser | null>(null);
  const [sendInvite, setSendInvite] = useState(false);

  const total = users.length;
  const active = users.filter((u) => u.status === "active").length;
  const invited = users.filter((u) => u.status === "invited").length;
  const suspended = users.filter((u) => u.status === "suspended").length;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (statusFilter !== "all" && u.status !== statusFilter) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.memberId.toLowerCase().includes(q)
      );
    });
  }, [users, query, roleFilter, statusFilter]);

  const openCreate = () => {
    setEditing(null);
    setSendInvite(false);
    setDialogOpen(true);
  };

  const openEdit = (user: AdminUser) => {
    setEditing(user);
    setSendInvite(false);
    setDialogOpen(true);
  };

  const handleSubmit = (input: AdminUserInput) => {
    if (editing) {
      updateUser(editing.id, input);
    } else {
      createUser(input, sendInvite);
    }
    setDialogOpen(false);
    setEditing(null);
    setSendInvite(false);
  };

  const handleDelete = () => {
    if (!deleting) return;
    const isLastAdmin =
      users.filter((u) => u.role === "admin" && u.status !== "suspended").length === 1 &&
      deleting.role === "admin";
    if (isLastAdmin || deleting.id === member.memberId) {
      toast.error("Cannot remove this account", {
        description: "There must be at least one active admin.",
      });
      setDeleting(null);
      return;
    }
    removeUser(deleting.id);
    setDeleting(null);
  };

  const toggleStatus = (user: AdminUser) => {
    const next: AdminUserStatus = user.status === "suspended" ? "active" : "suspended";
    if (
      next === "suspended" &&
      user.role === "admin" &&
      users.filter((u) => u.role === "admin" && u.status === "active").length === 1
    ) {
      toast.error("Cannot suspend the last active admin");
      return;
    }
    setUserStatus(user.id, next);
    toast.success(next === "suspended" ? "Account suspended" : "Account reactivated", {
      description: `${user.name} is now ${next}.`,
    });
  };

  return (
    <div className="fs-surface flex h-screen flex-col overflow-hidden">
      {/* Standalone admin header — no member app-shell navigation */}
      <header className="flex shrink-0 items-center justify-between border-b bg-background/95 px-4 py-2.5 backdrop-blur sm:px-6">
        <BrandMark />
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold leading-tight text-navy">{adminName}</p>
            <p className="text-[11px] text-muted-foreground">Administrator</p>
          </div>
          <SignOutConfirmDialog onConfirm={handleSignOut}>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-[12px] border-border text-foreground hover:bg-pale-teal"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </Button>
          </SignOutConfirmDialog>
        </div>
      </header>

      <PageLayout>
      <PageHeader
        icon={<UserCog className="h-4.5 w-4.5 text-teal" />}
        title="Admin"
        subtitle="Create accounts and manage members."
        action={
          <Button
            onClick={openCreate}
            className="gap-1.5 rounded-[12px] bg-teal text-white hover:bg-bright-teal"
          >
            <Plus className="h-4 w-4 text-teal" /> New account
          </Button>
        }
      />

      {/* Stats */}
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Users} label="Total accounts" value={String(total)} />
        <StatCard icon={ShieldCheck} label="Active" value={String(active)} tone="green" />
        <StatCard icon={Mail} label="Invited" value={String(invited)} tone="blue" />
        <StatCard icon={UserX} label="Suspended" value={String(suspended)} tone="red" />
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 rounded-[18px] border border-border bg-card p-4 shadow-soft sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or Member ID..."
            className="rounded-[12px] border-border bg-background pl-9"
            aria-label="Search users"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={roleFilter}
            onValueChange={(v) => setRoleFilter(v as "all" | AdminUserRole)}
          >
            <SelectTrigger
              className="w-full rounded-[12px] border-border bg-background sm:w-32"
              aria-label="Filter by role"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="member">Members</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as "all" | AdminUserStatus)}
          >
            <SelectTrigger
              className="w-full rounded-[12px] border-border bg-background sm:w-36"
              aria-label="Filter by status"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="invited">Invited</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          {(query || roleFilter !== "all" || statusFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              className="rounded-[12px] text-muted-foreground hover:text-navy"
              onClick={() => {
                setQuery("");
                setRoleFilter("all");
                setStatusFilter("all");
              }}
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Users table */}
      <div className="overflow-hidden rounded-[18px] border border-border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="px-4">User</TableHead>
                <TableHead className="px-4">Role</TableHead>
                <TableHead className="px-4">Status</TableHead>
                <TableHead className="hidden px-4 md:table-cell">Member since</TableHead>
                <TableHead className="hidden px-4 lg:table-cell">Last active</TableHead>
                <TableHead className="px-4 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={6} className="px-4 py-12 text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                      No accounts match your filters.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="px-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            "grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold",
                            user.role === "admin"
                              ? "bg-gradient-to-br from-navy to-teal text-white"
                              : "bg-pale-teal text-navy",
                          )}
                          aria-hidden="true"
                        >
                          {initials(user.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-navy">{user.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                          <p className="text-[11px] text-muted-foreground/70">{user.memberId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4">
                      <Badge
                        className={cn("rounded-full border-transparent", ROLE_STYLE[user.role])}
                      >
                        {user.role === "admin" ? "Admin" : "Member"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4">
                      <Badge
                        className={cn("rounded-full border-transparent", STATUS_STYLE[user.status])}
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden px-4 md:table-cell">
                      {fmtDate(user.memberSince)}
                    </TableCell>
                    <TableCell className="hidden px-4 lg:table-cell">
                      {fmtDate(user.lastActive)}
                    </TableCell>
                    <TableCell className="px-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(user)}
                          className="rounded-full text-muted-foreground hover:bg-pale-teal hover:text-navy"
                          aria-label={`Edit ${user.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleStatus(user)}
                          className="rounded-full text-muted-foreground hover:bg-pale-teal hover:text-navy"
                          aria-label={
                            user.status === "suspended"
                              ? `Reactivate ${user.name}`
                              : `Suspend ${user.name}`
                          }
                        >
                          {user.status === "suspended" ? (
                            <Unlock className="h-4 w-4" />
                          ) : (
                            <Lock className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleting(user)}
                          className="rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          aria-label={`Delete ${user.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Create / edit dialog */}
      <UserFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editing={editing}
        sendInvite={sendInvite}
        setSendInvite={setSendInvite}
        onSubmit={handleSubmit}
      />

      {/* Delete confirmation */}
      <AlertDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)}>
        <AlertDialogContent className="max-w-md rounded-[20px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove {deleting?.name}?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently removes the account for {deleting?.email || "this member"}. This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-[12px] border-border">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="gap-1.5 rounded-[12px] bg-destructive text-white hover:bg-destructive/90"
            >
              <Trash2 className="h-4 w-4" /> Delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </PageLayout>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  tone?: "default" | "green" | "blue" | "red";
}) {
  const toneClass =
    tone === "green"
      ? "bg-soft-green text-green"
      : tone === "blue"
        ? "bg-light-blue text-cobalt"
        : tone === "red"
          ? "bg-destructive/10 text-destructive"
          : "bg-pale-teal text-teal";
  return (
    <Card className="rounded-[18px] border-border shadow-soft">
      <CardContent className="flex items-center gap-3 p-4">
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-[12px]", toneClass)}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="font-display text-xl font-bold leading-none text-navy">{value}</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function UserFormDialog({
  open,
  onOpenChange,
  editing,
  sendInvite,
  setSendInvite,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editing: AdminUser | null;
  sendInvite: boolean;
  setSendInvite: (v: boolean) => void;
  onSubmit: (input: AdminUserInput) => void;
}) {
  const [form, setForm] = useState<AdminUserInput>(emptyInput);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleOpenChange = (v: boolean) => {
    if (!v) {
      onOpenChange(false);
      return;
    }
    if (editing) {
      setForm({
        name: editing.name,
        firstName: editing.firstName,
        email: editing.email,
        role: editing.role,
        status: editing.status,
        goals: editing.goals,
      });
    } else {
      setForm({ ...emptyInput });
    }
    setSendInvite(false);
    setValidationError(null);
    onOpenChange(true);
  };

  const set = <K extends keyof AdminUserInput>(key: K, value: AdminUserInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const normalizedGoals = (raw: string) =>
    raw
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);

  const submit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      setValidationError("Name and email are required.");
      return;
    }
    onSubmit(form);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md rounded-[20px]">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit account" : "Create account"}</DialogTitle>
          <DialogDescription>
            {editing
              ? `Update ${editing.name}'s details.`
              : sendInvite
                ? "Send an invitation to this email."
                : "Add a new member to FitSlim AI."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="rounded-[12px] border-border bg-background"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="first">First name</Label>
            <Input
              id="first"
              value={form.firstName}
              onChange={(e) => set("firstName", e.target.value)}
              placeholder="Optional"
              className="rounded-[12px] border-border bg-background"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              placeholder="name@example.com"
              className="rounded-[12px] border-border bg-background"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Role</Label>
              <Select value={form.role} onValueChange={(v) => set("role", v as AdminUserRole)}>
                <SelectTrigger className="w-full rounded-[12px] border-border bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => set("status", v as AdminUserStatus)}
                disabled={sendInvite}
              >
                <SelectTrigger className="w-full rounded-[12px] border-border bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="invited">Invited</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="goals">Goals (comma separated)</Label>
            <Input
              id="goals"
              value={form.goals.join(", ")}
              onChange={(e) => set("goals", normalizedGoals(e.target.value))}
              placeholder="Hydration, Sleep, Movement"
              className="rounded-[12px] border-border bg-background"
            />
            {!editing && (
              <label className="flex items-center gap-2 pt-1 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={sendInvite}
                  onChange={(e) => setSendInvite(e.target.checked)}
                  className="size-4 accent-teal"
                />
                Send an invite email (create as "Invited")
              </label>
            )}
          </div>

          {validationError && (
            <p className="text-xs font-medium text-destructive">{validationError}</p>
          )}
        </div>

        <DialogFooter className="mt-2 gap-2">
          <Button
            variant="outline"
            className="rounded-[12px] border-border text-foreground hover:bg-pale-teal"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={submit}
            disabled={!form.name.trim() || !form.email.trim()}
            className="gap-1.5 rounded-[12px] bg-teal text-white hover:bg-bright-teal"
          >
            {sendInvite && !editing ? (
              <Mail className="h-4 w-4 text-teal" />
            ) : (
              <UserPlus className="h-4 w-4 text-teal" />
            )}
            {editing ? "Save changes" : sendInvite ? "Send invite" : "Create account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
