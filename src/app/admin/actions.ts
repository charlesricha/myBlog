"use server";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/server"; // Server-side auth
import { z } from "zod";
import { cookies } from "next/headers";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginState = {
  success: boolean;
  error?: string;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validatedFields = LoginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;
    return {
      success: false,
      error: errors.email?.[0] || errors.password?.[0] || "Invalid input.",
    };
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      validatedFields.data.email,
      validatedFields.data.password
    );
    
    const idToken = await userCredential.user.getIdToken();

    // Set cookie for session management
    cookies().set('firebaseIdToken', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    return { success: true };
  } catch (e: any) {
    let error = "An unknown error occurred.";
    if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-not-found' || e.code === 'auth/wrong-password') {
        error = "Invalid email or password. Please try again.";
    }
    return {
      success: false,
      error,
    };
  }
}

export async function logout() {
    cookies().delete('firebaseIdToken');
}
