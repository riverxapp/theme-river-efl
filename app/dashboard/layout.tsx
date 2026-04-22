import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { signOutAction } from "@/app/dashboard/actions";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { UserMenu } from "@/components/dashboard/user-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";

export default async function DashboardLayout({
  children


}: {children: React.ReactNode;}) {
  const session = await getAuthSession();
  if (!session) {
    redirect("/auth#signin");
  }

  const [user] = await db.
  select({
    firstName: users.firstName,
    lastName: users.lastName,
    email: users.email
  }).
  from(users).
  where(eq(users.id, session.userId)).
  limit(1);

  if (!user) {
    redirect("/auth#signin");
  }

  const fullName = `${user.firstName} ${user.lastName}`.trim();
  const initials =
  `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">LiteStack









































      </div>
    </div>);

}