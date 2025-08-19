import type { Post, Comment, Like } from './types';
import { format } from 'date-fns';
import { db } from './firebase';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, increment, query, where, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';

// --- API Functions ---

export async function getAllPosts(): Promise<Post[]> {
  const postsCol = collection(db, 'posts');
  const q = query(postsCol, orderBy('date', 'desc'));
  const postsSnapshot = await getDocs(q);
  const postList = postsSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      slug: data.slug,
      title: data.title,
      author: data.author,
      authorImage: data.authorImage,
      date: (data.date as Timestamp).toDate().toISOString(),
      tags: data.tags,
      coverImage: data.coverImage,
      content: data.content,
    } as Post;
  });
  return postList;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const postsCol = collection(db, 'posts');
  const q = query(postsCol, where('slug', '==', slug));
  const postSnapshot = await getDocs(q);
  if (postSnapshot.empty) {
    return undefined;
  }
  const postDoc = postSnapshot.docs[0];
  const data = postDoc.data();
  return {
    id: postDoc.id,
    slug: data.slug,
    title: data.title,
    author: data.author,
    authorImage: data.authorImage,
    date: (data.date as Timestamp).toDate().toISOString(),
    tags: data.tags,
    coverImage: data.coverImage,
    content: data.content,
  } as Post;
}

export function getAllTags(posts: Post[]): string[] {
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  const commentsCol = collection(db, 'posts', postId, 'comments');
  const q = query(commentsCol, orderBy('timestamp', 'desc'));
  const commentsSnapshot = await getDocs(q);
  const commentList = commentsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        postId,
        author: data.author,
        content: data.content,
        timestamp: (data.timestamp as Timestamp).toDate().toISOString(),
      }
  });
  return commentList;
}

export async function getLikesByPostId(postId: string): Promise<number> {
    const likeDocRef = doc(db, 'posts', postId);
    const likeDoc = await getDoc(likeDocRef);
    return likeDoc.data()?.likes || 0;
}

export async function addComment(postId: string, author: string, content: string): Promise<Comment> {
    const commentsCol = collection(db, 'posts', postId, 'comments');
    const newCommentRef = await addDoc(commentsCol, {
        author: author || 'Anonymous',
        content,
        timestamp: serverTimestamp(),
    });

    const newCommentSnap = await getDoc(newCommentRef);
    const data = newCommentSnap.data()!;

    return {
        id: newCommentRef.id,
        postId,
        author: data.author,
        content: data.content,
        timestamp: (data.timestamp as Timestamp).toDate().toISOString(),
    };
}

export async function addLike(postId: string): Promise<number> {
  const postRef = doc(db, 'posts', postId);
  await updateDoc(postRef, {
      likes: increment(1)
  });
  const updatedPost = await getDoc(postRef);
  return updatedPost.data()?.likes || 0;
}

export function formatDate(dateString: string): string {
    return format(new Date(dateString), "MMMM d, yyyy");
}
