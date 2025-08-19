"use client";

import { logout } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AuthButton({ isSignedIn }: { isSignedIn: boolean }) {
  const pathname = usePathname();

  if (isSignedIn) {
    return (
      <form action={logout}>
        <Button variant="ghost" size="sm" type="submit">
            <LogOut className="mr-2" />
            Log Out
        </Button>
      </form>
    );
  }

  return (
    <Button asChild variant="ghost" size="sm">
      <Link href={`/admin?redirect=${pathname}`}>
        <LogIn className="mr-2" />
        Admin Login
      </Link>
    </Button>
  );
}
