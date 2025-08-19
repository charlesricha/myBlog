"use server";

import { suggestTags, type SuggestTagsInput } from "@/ai/flows/suggest-tags";
import { z } from "zod";
import { storage, db } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { revalidatePath } from "next/cache";

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

const PostSchema = z.object({
    title: z.string().min(1, "Title is required."),
    slug: z.string().min(1, "Slug is required."),
    content: z.string().min(50, "Content must be at least 50 characters."),
    coverImage: z.instanceof(File).refine(file => file.size > 0, 'Cover image is required.'),
    tags: z.string(),
});

type CreatePostState = {
    success: boolean;
    error?: string;
}

export async function createPost(prevState: CreatePostState, formData: FormData): Promise<CreatePostState> {
    const validatedFields = PostSchema.safeParse({
        title: formData.get('title'),
        slug: formData.get('slug'),
        content: formData.get('content'),
        coverImage: formData.get('coverImage'),
        tags: formData.get('tags'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            error: Object.values(validatedFields.error.flatten().fieldErrors).flat().join(', ') || 'Invalid input.',
        };
    }

    const { title, slug, content, coverImage, tags } = validatedFields.data;

    try {
        const imageRef = ref(storage, `covers/${uuidv4()}-${coverImage.name}`);
        await uploadBytes(imageRef, coverImage);
        const imageUrl = await getDownloadURL(imageRef);

        const tagsArray = tags.split(',').map(tag => tag.trim()).filter(Boolean);

        await addDoc(collection(db, "posts"), {
            title,
            slug,
            content,
            coverImage: imageUrl,
            tags: tagsArray,
            author: "Admin", // Or get from auth
            authorImage: "https://placehold.co/100x100.png",
            date: serverTimestamp(),
            likes: 0,
        });

        revalidatePath('/');
        revalidatePath('/admin/new-post');

        return { success: true };

    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
        return {
            success: false,
            error: `Failed to create post: ${errorMessage}`,
        };
    }
}
