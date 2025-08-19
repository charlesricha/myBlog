import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import { cookies } from 'next/headers';
import { AuthButton } from './auth-components';

export function Header() {
  const isSignedIn = cookies().has('firebaseIdToken');

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PenSquare className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">
            Charles.dev
          </span>
        </Link>
        <nav>
          <AuthButton isSignedIn={isSignedIn} />
        </nav>
      </div>
    </header>
  );
}
