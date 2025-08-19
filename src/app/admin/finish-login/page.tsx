"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getCookie } from 'cookies-next';
import { completeLogin } from '../actions';
import { LoaderCircle } from 'lucide-react';

export default function FinishLoginPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const finishSignIn = async () => {
            if (isSignInWithEmailLink(auth, window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    // If the email is not in localStorage, we have to ask the user for it.
                    // For this implementation, we will show an error. In a real app, you might show a form.
                    setError('Login failed: Email not found. Please try logging in again from the same device and browser.');
                    setLoading(false);
                    return;
                }
                
                try {
                    const result = await signInWithEmailLink(auth, email, window.location.href);
                    const idToken = await result.user.getIdToken();
                    
                    // The user is signed in. Now set the session cookie on the server.
                    await completeLogin(idToken);

                    window.localStorage.removeItem('emailForSignIn');
                    router.push('/admin/new-post');
                } catch (e: any) {
                    console.error('Sign in with email link error:', e);
                    setError(`Failed to sign in. Please try again. Error: ${e.message}`);
                    setLoading(false);
                }
            } else {
                setError("Invalid sign-in link.");
                setLoading(false);
            }
        };

        finishSignIn();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            {loading && (
                <>
                    <LoaderCircle className="w-12 h-12 animate-spin text-primary mb-4" />
                    <h1 className="text-2xl font-bold">Finishing sign in...</h1>
                    <p className="text-muted-foreground">Please wait while we securely log you in.</p>
                </>
            )}
            {error && (
                <div className="max-w-md p-6 bg-destructive/10 border border-destructive rounded-lg">
                    <h1 className="text-2xl font-bold text-destructive mb-2">Login Failed</h1>
                    <p className="text-destructive/80">{error}</p>
                </div>
            )}
        </div>
    );
}
