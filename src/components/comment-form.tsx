"use client";

import { useRef, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addComment } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CommentFormProps {
  postId: string;
  slug: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Comment'}
    </Button>
  );
}

export function CommentForm({ postId, slug }: CommentFormProps) {
  const [state, formAction] = useFormState(addComment.bind(null, postId, slug), { success: false, error: null });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-4 p-6 bg-card rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="author">Name</Label>
          <Input id="author" name="author" placeholder="Your name" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Comment</Label>
        <Textarea id="content" name="content" placeholder="Share your thoughts..." required rows={4} />
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
  );
}
