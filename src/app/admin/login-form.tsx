"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign in"
      )}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, { success: false, error: undefined });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      // Redirect to the new post page on successful login
      router.push('/admin/new-post');
    }
  }, [state.success, router]);


  return (
    <div className="mt-8">
      <form action={formAction} className="space-y-6">
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@example.com"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="********"
            />
          </div>
        </div>
        
        {state.error && (
            <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
        )}

        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
