import { LoginForm } from "./login-form";
import { PenSquare } from "lucide-react";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <PenSquare className="mx-auto h-12 w-auto text-primary" />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Enter your admin credentials to access the dashboard.
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
