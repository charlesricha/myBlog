"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createPost, getTagSuggestions } from "./actions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, LoaderCircle, Sparkles, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        "Create Post"
      )}
    </Button>
  );
}

function SuggestTagsButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="outline" disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Suggest Tags
        </>
      )}
    </Button>
  );
}

export function NewPostForm() {
  const [createState, createFormAction] = useFormState(createPost, { success: false, error: undefined });
  const [suggestState, suggestFormAction] = useFormState(getTagSuggestions, { success: false, tags: [], error: undefined });
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form action={createFormAction} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
                <Label htmlFor="title" className="text-lg font-medium">Title</Label>
                <Input id="title" name="title" placeholder="Post title" required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="slug" className="text-lg font-medium">Slug</Label>
                <Input id="slug" name="slug" placeholder="post-title-slug" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverImage" className="text-lg font-medium">Cover Image</Label>
            <div className="flex items-center gap-4">
              <Input id="coverImage" name="coverImage" type="file" required onChange={handleImageChange} className="w-full" />
              {preview && <Image src={preview} alt="Cover preview" width={100} height={50} className="rounded-md object-cover" />}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-lg font-medium">
              Blog Post Content
            </Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Paste or write your blog post content here. The more text you provide, the better the tag suggestions will be."
              rows={15}
              required
              className="text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-lg font-medium">Tags</Label>
            <Input id="tags" name="tags" placeholder="e.g. Next.js, React, WebDev" defaultValue={suggestState.tags?.join(', ')} />
             <p className="text-sm text-muted-foreground">Separate tags with commas.</p>
          </div>

          {(createState?.error || suggestState?.error) && (
            <Alert variant="destructive">
                <AlertDescription>{createState?.error || suggestState?.error}</AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between items-center">
            <div className="text-center">
                <SubmitButton />
            </div>
            <div className="text-center">
                <form action={suggestFormAction}>
                    <input type="hidden" name="content" value={typeof window !== 'undefined' ? (document.getElementById('content') as HTMLTextAreaElement)?.value : ''} />
                    <SuggestTagsButton />
                </form>
            </div>
          </div>
        </form>

        {suggestState.success && suggestState.tags && suggestState.tags.length > 0 && (
          <div className="mt-8">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle className="font-bold">Suggested Tags!</AlertTitle>
              <AlertDescription>
                <p className="mb-2">Click the tags to add them to the input above. Or copy them here:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {suggestState.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-base px-3 py-1 cursor-pointer"
                      onClick={() => {
                        const input = document.getElementById('tags') as HTMLInputElement;
                        if (input.value) {
                            input.value += `, ${tag}`;
                        } else {
                            input.value = tag;
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {createState.success && (
             <Alert className="mt-8">
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>Your post has been created.</AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
