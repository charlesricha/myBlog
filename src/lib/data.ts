import type { Post, Comment, Like } from './types';
import { format } from 'date-fns';
import { db } from './firebase';
import { collection, getDocs, getDoc, doc, addDoc, updateDoc, increment, query, where, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';

const dummyPosts: Post[] = [
  {
    id: '1',
    slug: 'mastering-react-hooks',
    title: 'Mastering React Hooks: A Deep Dive',
    author: 'Charles',
    authorImage: 'https://placehold.co/100x100.png',
    date: new Date('2024-05-20T10:00:00Z').toISOString(),
    tags: ['React', 'Next.js', 'WebDev'],
    coverImage: 'https://placehold.co/400x210.png',
    content: 'A deep dive into React hooks, exploring useState, useEffect, and custom hooks for building powerful and efficient components.',
  },
  {
    id: '2',
    slug: 'getting-started-with-3d',
    title: 'Getting Started with 3D Modeling in Blender',
    author: 'Charles',
    authorImage: 'https://placehold.co/100x100.png',
    date: new Date('2024-05-18T14:30:00Z').toISOString(),
    tags: ['3D', 'Blender', 'Design'],
    coverImage: 'https://placehold.co/400x210.png',
    content: 'An introductory guide to 3D modeling using Blender. Learn the basic tools and techniques to create your first 3D model from scratch.',
  },
    {
    id: '3',
    slug: 'intro-to-networking',
    title: 'An Introduction to Computer Networking',
    author: 'Charles',
    authorImage: 'https://placehold.co/100x100.png',
    date: new Date('2024-05-15T09:00:00Z').toISOString(),
    tags: ['Networking', 'Tech'],
    coverImage: 'https://placehold.co/400x210.png',
    content: 'This post covers the fundamentals of computer networking, including the OSI model, TCP/IP, and basic network troubleshooting.',
  },
];


// --- API Functions ---

export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsCol = collection(db, 'posts');
    const q = query(postsCol, orderBy('date', 'desc'));
    const postsSnapshot = await getDocs(q);
    
    if (postsSnapshot.empty) {
      return dummyPosts;
    }

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
  } catch (error) {
    console.error("Error fetching posts, returning dummy data:", error);
    return dummyPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const postsCol = collection(db, 'posts');
  const q = query(postsCol, where('slug', '==', slug));
  const postSnapshot = await getDocs(q);
  if (postSnapshot.empty) {
    return dummyPosts.find(p => p.slug === slug);
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
  try {
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
  } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error);
      return [];
  }
}

export async function getLikesByPostId(postId: string): Promise<number> {
  try {
    const likeDocRef = doc(db, 'posts', postId);
    const likeDoc = await getDoc(likeDocRef);
    return likeDoc.data()?.likes || 0;
  } catch (error) {
    console.error(`Error fetching likes for post ${postId}:`, error);
    return 0;
  }
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
