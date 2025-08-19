"use server";

import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "@/lib/firebase/server"; // Server-side auth
import { z } from "zod";
import { cookies } from "next/headers";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address."),
});

type LoginState = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email") as string;
  const validatedFields = LoginSchema.safeParse({ email });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.email?.[0] || "Invalid input.",
    };
  }
  
  const adminEmail = "charlesmuthui206@gmail.com";
  if (validatedFields.data.email.toLowerCase() !== adminEmail.toLowerCase()) {
      return { success: false, error: "You are not authorized to log in." };
  }

  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/admin/finish-login`,
    // This must be true.
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, validatedFields.data.email, actionCodeSettings);
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    cookies().set('emailForSignIn', validatedFields.data.email, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 15 * 60, path: '/' });
    window.localStorage.setItem('emailForSignIn', validatedFields.data.email);
    return { success: true, message: "A sign-in link has been sent to your email address." };
  } catch (e: any) {
    console.error(e);
    let error = "An unknown error occurred.";
    if (e.code) {
        error = e.code;
    }
    return {
      success: false,
      error,
    };
  }
}

export async function logout() {
    cookies().delete('firebaseIdToken');
    cookies().delete('emailForSignIn');
}

export async function completeLogin(idToken: string) {
    cookies().set('firebaseIdToken', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });
    cookies().delete('emailForSignIn');
}
