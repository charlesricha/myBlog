import { redirect } from 'next/navigation';

// This will be the admin dashboard page in the future.
// For now, we redirect to the new post page if logged in,
// or to the login page if not.
// The actual logic for checking auth state will be in a middleware.
export default function AdminPage() {
  // For now, we'll just redirect to the new post page.
  // In the future, this would be a dashboard.
  redirect('/admin/new-post');
}
