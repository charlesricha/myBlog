import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h2 className="text-3xl font-bold mb-4">Post Not Found</h2>
      <p className="text-muted-foreground mb-6">Could not find the requested blog post.</p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
