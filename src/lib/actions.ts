"use server";

import { revalidatePath } from 'next/cache';
import { addLike as dbAddLike, addComment as dbAddComment } from './data';

export async function likePost(postId: string, slug: string) {
  try {
    await dbAddLike(postId);
    revalidatePath(`/posts/${slug}`);
    revalidatePath('/');
    return { success: true, message: 'Post liked!' };
  } catch (error) {
    return { success: false, message: 'Failed to like post.' };
  }
}

export async function addComment(postId: string, slug: string, prevState: { success: boolean, error: string | null }, formData: FormData) {
  const author = formData.get('author') as string;
  const content = formData.get('content') as string;

  if (!author.trim() || !content.trim()) {
    return { success: false, error: 'Name and comment cannot be empty.' };
  }
  
  try {
    await dbAddComment(postId, author, content);
    revalidatePath(`/posts/${slug}`);
    return { success: true, error: null };
  }
  catch (error) {
    return { success: false, error: 'Failed to add comment.' };
  }
}
