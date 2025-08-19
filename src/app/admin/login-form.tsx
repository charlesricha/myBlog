"use client";

import { useActionState, useEffect } from "react";
import * as React from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircle, CheckCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Sending link...
        </>
      ) : (
        "Sign in with Email Link"
      )}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, { success: false, error: undefined });
  const [email, setEmail] = React.useState('');

  useEffect(() => {
    if (state.success && email) {
        window.localStorage.setItem('emailForSignIn', email);
    }
  }, [state.success, email]);

  const handleFormAction = (formData: FormData) => {
    const emailValue = formData.get("email") as string;
    setEmail(emailValue);
    formAction(formData);
  };

  return (
    <div className="mt-8">
      {state.success ? (
         <Alert variant="default" className="border-green-500">
            <CheckCircle className="h-4 w-4 text-green-500"/>
            <AlertTitle className="text-green-500">Check your inbox!</AlertTitle>
            <AlertDescription>
              {state.message}
            </AlertDescription>
        </Alert>
      ) : (
        <form action={handleFormAction} className="space-y-6">
          <div>
            <Label htmlFor="email">Email address</Label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="johndoe@email.com"
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
      )}
    </div>
  );
}
