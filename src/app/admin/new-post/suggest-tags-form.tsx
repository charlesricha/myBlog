"use client";

import { useFormState, useFormStatus } from "react-dom";
import { getTagSuggestions } from "./actions";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, LoaderCircle } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        "Suggest Tags"
      )}
    </Button>
  );
}

export function SuggestTagsForm() {
  const initialState = { success: false, tags: [], error: undefined };
  const [state, formAction] = useFormState(getTagSuggestions, initialState);

  return (
    <Card>
      <CardContent className="p-6">
        <form action={formAction} className="space-y-6">
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

          {state.error && (
            <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <div className="text-center">
            <SubmitButton />
          </div>
        </form>

        {state.success && state.tags && state.tags.length > 0 && (
          <div className="mt-8">
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle className="font-bold">Suggested Tags!</AlertTitle>
              <AlertDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  {state.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-base px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
