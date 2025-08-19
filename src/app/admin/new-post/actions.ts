"use server";

import { suggestTags, type SuggestTagsInput } from "@/ai/flows/suggest-tags";
import { z } from "zod";

const SuggestionSchema = z.object({
  content: z.string().min(50, "Content must be at least 50 characters long."),
});

type SuggestionState = {
  success: boolean;
  tags?: string[];
  error?: string;
};

export async function getTagSuggestions(
  prevState: SuggestionState,
  formData: FormData
): Promise<SuggestionState> {
  const content = formData.get("content") as string;

  const validatedFields = SuggestionSchema.safeParse({ content });

  if (!validatedFields.success) {
    return {
      success: false,
      error: validatedFields.error.flatten().fieldErrors.content?.[0] || 'Invalid input.',
    };
  }

  try {
    const input: SuggestTagsInput = { content: validatedFields.data.content };
    const result = await suggestTags(input);
    return { success: true, tags: result.tags };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "An error occurred while generating tags. Please try again.",
    };
  }
}
