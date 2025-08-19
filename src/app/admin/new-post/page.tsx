import { NewPostForm } from "./new-post-form";
import { Sparkles } from "lucide-react";

export default function NewPostPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 font-headline flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-primary" />
          Create a New Post
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Write your blog post content, upload a cover image, and let AI suggest relevant tags.
        </p>
      </header>
      <NewPostForm />
    </div>
  );
}
