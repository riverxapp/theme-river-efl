"use client";
import {
  Clock,
  Mail,
  Pencil,
  Shield,
  UserMinus,
  UserPlus,
  UsersRound,
} from "lucide-react";

import {
  inviteTeamMemberAction,
  revokeInvitationAction,
  removeTeamMemberAction,
  updateMemberRoleAction,
  updateTeamNameAction,
} from "@/app/dashboard/team/actions";

import { InviteLogger } from "@/components/dashboard/invite-logger";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { useEffect, useState } from "react";

// Purpose: Client UI for /dashboard/team.
// Use this file for interactive team management and browser-only UI logic.

type ClientProps = {
  currentUserId: string;
  membership: {
    role: string;
  } | null;
  team: {
    name: string;
  } | null;
  members: Array<{
    id: string;
    role: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  }>;
  pendingInvitations: Array<{
    id: string;
    email: string;
    role: string;
  }>;
  status: "success" | "error" | null;
  message: string | null;
  inviteUrl: string | null;
};

const roleBadgeClasses: Record<string, string> = {
  owner:
    "bg-primary/10 text-primary border-primary/20 dark:bg-primary/15",
  admin:
    "bg-amber-500/10 text-amber-700 border-amber-500/20 dark:text-amber-400 dark:bg-amber-500/15",
  member:
    "bg-muted text-muted-foreground border-border",
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "Lead" | "Active" | "Inactive";
  notes: string;
};

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

export default function Client({
  currentUserId,
  membership,
  team,
  members,
  pendingInvitations,
  status,
  message,
  inviteUrl,
}: ClientProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Lead" as Customer["status"],
    notes: "",
  });
  const [formError, setFormError] = useState<string | null>(null);

  const canManage = membership?.role === "owner" || membership?.role === "admin";
  const isOwner = membership?.role === "owner";

  // Load customers from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("dashboard_customers");
    if (stored) {
      try {
        setCustomers(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Sync customers to localStorage
  useEffect(() => {
    localStorage.setItem("dashboard_customers", JSON.stringify(customers));
  }, [customers]);

  function resetForm() {
    setFormData({
      name: "",
      email: "",
      phone: "",
      status: "Lead",
      notes: "",
    });
    setEditingCustomer(null);
    setFormError(null);
  }

  function onEdit(customer: Customer) {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || "",
      status: customer.status,
      notes: customer.notes,
    });
    setFormError(null);
  }

  function onDelete(customerId: string) {
    if (confirm("Are you sure you want to delete this customer?")) {
      setCustomers((cs) => cs.filter((c) => c.id !== customerId));
      if (editingCustomer?.id === customerId) resetForm();
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError("Name and Email are required.");
      return;
    }
    if (editingCustomer) {
      // update existing
      setCustomers((cs) =>
        cs.map((c) =>
          c.id === editingCustomer.id
            ? {
                ...c,
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                status: formData.status,
                notes: formData.notes,
              }
            : c,
        ),
      );
    } else {
      // create new
      setCustomers((cs) => [
        ...cs,
        {
          id: generateId(),
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          status: formData.status,
          notes: formData.notes,
        },
      ]);
    }
    resetForm();
  }

  if (!membership) {
    return (
      <>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You are not a member of any team yet.
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-muted">
              <UsersRound className="size-6 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm font-medium">No team found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Sign up for a new account to automatically create your team.
            </p>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <InviteLogger url={inviteUrl} />
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage members, roles, and invitations for{" "}
          <span className="font-medium text-foreground">{team?.name}</span>.
        </p>
      </div>

      {status && message ? (
        <div
          className={`mb-6 rounded-lg border px-4 py-3 text-sm ${
            status === "success"
              ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400"
              : "border-destructive/20 bg-destructive/5 text-destructive"
          }`}
        >
          {message}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          {/* Team name settings */}
          {canManage ? (
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <Pencil className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">Team Settings</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <form
                  action={updateTeamNameAction}
                  className="flex items-end gap-3"
                >
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="teamName">Team name</Label>
                    <Input
                      id="teamName"
                      name="name"
                      defaultValue={team?.name}
                      required
                    />
                  </div>
                  <Button type="submit" variant="outline">
                    Save
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : null}

          {/* Customers CRM section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UsersRound className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">Customers</CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {customers.length} customer{customers.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y mb-4 max-h-96 overflow-y-auto">
                {customers.length === 0 ? (
                  <p className="py-4 text-center text-sm text-muted-foreground">
                    No customers added yet.
                  </p>
                ) : (
                  customers.map((customer) => (
                    <div
                      key={customer.id}
                      className="flex justify-between items-center py-2 first:pt-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium text-sm">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {customer.email}
                          {customer.phone ? ` • ${customer.phone}` : ""}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Status: <span className="capitalize">{customer.status}</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit(customer)}
                          title="Edit customer"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(customer.id)}
                          title="Delete customer"
                          className="text-destructive hover:text-destructive"
                        >
                          <UserMinus className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <Separator />
              <form onSubmit={onSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label htmlFor="customerName">Name</Label>
                    <Input
                      id="customerName"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, name: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Email</Label>
                    <Input
                      id="customerEmail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, email: e.target.value }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">Phone</Label>
                    <Input
                      id="customerPhone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerStatus">Status</Label>
                    <select
                      id="customerStatus"
                      name="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((f) => ({
                          ...f,
                          status: e.target.value as Customer["status"],
                        }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="Lead">Lead</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="customerNotes">Notes</Label>
                    <textarea
                      id="customerNotes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData((f) => ({ ...f, notes: e.target.value }))
                      }
                      className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Optional notes about this customer"
                    />
                  </div>
                </div>
                {formError ? (
                  <p className="text-xs text-destructive">{formError}</p>
                ) : null}
                <Button type="submit" className="w-full">
                  {editingCustomer ? "Update Customer" : "Add Customer"}
                </Button>
                {editingCustomer ? (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={resetForm}
                    type="button"
                  >
                    Cancel
                  </Button>
                ) : null}
              </form>
            </CardContent>
          </Card>

          {/* Members list */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="size-4 text-muted-foreground" />
                  <CardTitle className="text-base">Members</CardTitle>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {members.length} member{members.length !== 1 ? "s" : ""}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="divide-y">
                {members.map((member) => {
                  const initials =
                    `${member.firstName[0] ?? ""}${member.lastName[0] ?? ""}`.toUpperCase() || "U";
                  const fullName =
                    `${member.firstName} ${member.lastName}`.trim();
                  const isSelf = member.userId === currentUserId;

                  return (
                    <div
                      key={member.id}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="size-9 border">
                          <AvatarFallback className="text-xs font-medium bg-muted">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-none">
                            {fullName}
                            {isSelf ? (
                              <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                                (you)
                              </span>
                            ) : null}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {member.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs capitalize ${roleBadgeClasses[member.role] ?? ""}`}
                        >
                          {member.role}
                        </Badge>

                        {isOwner && member.role !== "owner" ? (
                          <div className="flex items-center gap-1">
                            <form action={updateMemberRoleAction}>
                              <input
                                type="hidden"
                                name="memberId"
                                value={member.id}
                              />
                              <input
                                type="hidden"
                                name="role"
                                value={
                                  member.role === "admin" ? "member" : "admin"
                                }
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                type="submit"
                                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                                title={`Make ${member.role === "admin" ? "member" : "admin"}`}
                              >
                                {member.role === "admin"
                                  ? "Demote"
                                  : "Promote"}
                              </Button>
                            </form>
                            <form action={removeTeamMemberAction}>
                              <input
                                type="hidden"
                                name="memberId"
                                value={member.id}
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                type="submit"
                                className="size-8 text-muted-foreground hover:text-destructive"
                                title="Remove member"
                              >
                                <UserMinus className="size-4" />
                              </Button>
                            </form>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Pending invitations */}
          {pendingInvitations.length > 0 ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-muted-foreground" />
                    <CardTitle className="text-base">
                      Pending Invitations
                    </CardTitle>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {pendingInvitations.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {pendingInvitations.map((invite) => (
                    <div
                      key={invite.id}
                      className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid size-9 place-items-center rounded-full bg-muted">
                          <Mail className="size-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {invite.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Invited as{" "}
                            <span className="capitalize">{invite.role}</span>
                          </p>
                        </div>
                      </div>

                      {canManage ? (
                        <form action={revokeInvitationAction}>
                          <input
                            type="hidden"
                            name="invitationId"
                            value={invite.id}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            type="submit"
                            className="h-8 text-xs text-destructive hover:text-destructive"
                          >
                            Revoke
                          </Button>
                        </form>
                      ) : null}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>

        {/* Invite member card */}
        {canManage ? (
          <Card className="h-fit xl:sticky xl:top-20">
            <CardHeader>
              <div className="flex items-center gap-2">
                <UserPlus className="size-4 text-muted-foreground" />
                <CardTitle className="text-base">Invite Member</CardTitle>
              </div>
              <CardDescription>
                Send an email invitation to add a new team member.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={inviteTeamMemberAction} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inviteEmail">Email address</Label>
                  <Input
                    id="inviteEmail"
                    name="email"
                    type="email"
                    placeholder="colleague@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inviteRole">Role</Label>
                  <select
                    id="inviteRole"
                    name="role"
                    defaultValue="member"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    Admins can invite and manage members. Members have
                    standard access.
                  </p>
                </div>
                <Separator />
                <Button type="submit" className="w-full">
                  <Mail className="mr-2 size-4" />
                  Send Invitation
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  );
}
