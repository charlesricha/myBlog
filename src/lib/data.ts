import type { Post, Comment, Like } from './types';
import { format } from 'date-fns';

const POSTS: Post[] = [
  {
    id: '1',
    slug: 'exploring-nextjs-14',
    title: 'Exploring the New Features in Next.js 14',
    author: 'Alex Doe',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2023-11-15T10:00:00Z',
    tags: ['Next.js', 'Web Development', 'React'],
    coverImage: 'https://placehold.co/1200x630.png',
    content: `
# Diving Deep into Next.js 14

Next.js 14 has arrived, bringing a host of new features and improvements. In this post, we'll explore some of the most exciting updates, including Server Actions, Partial Prerendering, and more.

## Server Actions: A New Paradigm

Server Actions are a game-changer. They allow you to run server code directly from your components, simplifying data mutations and form handling.

\`\`\`javascript
// app/actions.ts
'use server'
 
export async function create() {
  // ...
}
\`\`\`

This eliminates the need for separate API routes for many common tasks.

## Partial Prerendering (Preview)

Partial Prerendering is a new rendering model that combines the best of static and dynamic rendering. It allows for a fast initial static response, with dynamic "holes" streamed in.

![Diagram of partial prerendering](https://placehold.co/800x400.png)
*A visual representation of how Partial Prerendering works.*

This is still in preview, but it promises to revolutionize how we build dynamic applications with Next.js.
    `,
  },
  {
    id: '2',
    slug: 'blender-for-beginners',
    title: 'Getting Started with Blender: A Beginner\'s Guide',
    author: 'Jane Smith',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2023-10-28T14:30:00Z',
    tags: ['3D', 'Blender', 'Design'],
    coverImage: 'https://placehold.co/1200x630.png',
    content: `
# Your First Steps in Blender

Blender can seem intimidating, but with a few key concepts, you can start creating amazing 3D models. This guide will walk you through the interface, basic modeling, and rendering your first scene.

## Navigating the Viewport

- **Middle Mouse Button (MMB):** Rotate the view.
- **Shift + MMB:** Pan the view.
- **Scroll Wheel:** Zoom in and out.

## Modeling a Simple Object

Let's start by modeling a simple table. We'll use the default cube and scale it.

1.  Select the cube.
2.  Press \`S\` to scale, then \`Z\` to constrain to the Z-axis.
3.  Add four new cubes for the legs.

\`\`\`python
# You can also script in Blender!
import bpy

# Add a cube
bpy.ops.mesh.primitive_cube_add()
\`\`\`

Stay tuned for more advanced tutorials!
    `,
  },
  {
    id: '3',
    slug: 'the-power-of-tailwind-css',
    title: 'Why I Love Tailwind CSS for Rapid Prototyping',
    author: 'Alex Doe',
    authorImage: 'https://placehold.co/100x100.png',
    date: '2023-09-05T09:00:00Z',
    tags: ['CSS', 'Web Development', 'Tailwind CSS'],
    coverImage: 'https://placehold.co/1200x630.png',
    content: `
# Supercharge Your Workflow with Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows for rapid UI development without ever leaving your HTML.

## Key Advantages

*   **Speed:** Build complex components quickly.
*   **Consistency:** A constrained set of utilities helps maintain a consistent design system.
*   **Customization:** It's highly customizable via the \`tailwind.config.js\` file.

Here's an example of a simple card component:

\`\`\`html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
\`\`\`
    `,
  },
];

let COMMENTS: Comment[] = [
  { id: 1, postId: '1', author: 'Chris', content: 'Great overview! Server actions are indeed a fantastic addition.', timestamp: '2023-11-15T12:05:00Z' },
  { id: 2, postId: '1', author: 'Sarah', content: 'Partial Prerendering looks very promising. Can\'t wait for it to be stable.', timestamp: '2023-11-15T13:20:00Z' },
  { id: 3, postId: '2', author: 'Mike', content: 'Thanks for the beginner tips! This helped me get over my initial fear of Blender.', timestamp: '2023-10-29T10:00:00Z' },
];

let LIKES: Like[] = [
  { postId: '1', count: 128 },
  { postId: '2', count: 256 },
  { postId: '3', count: 512 },
];

// --- API Functions ---

export function getAllPosts(): Post[] {
  return POSTS.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  POSTS.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getCommentsByPostId(postId: string): Comment[] {
  return COMMENTS.filter((comment) => comment.postId === postId).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}

export function getLikesByPostId(postId: string): number {
    return LIKES.find(like => like.postId === postId)?.count || 0;
}

// In-memory update functions (for simulation)
export function addComment(postId: string, author: string, content: string): Comment {
  const newComment: Comment = {
    id: COMMENTS.length + 1,
    postId,
    author: author || 'Anonymous',
    content,
    timestamp: new Date().toISOString(),
  };
  COMMENTS.unshift(newComment);
  return newComment;
}

export function addLike(postId: string): number {
  const likeData = LIKES.find(like => like.postId === postId);
  if (likeData) {
    likeData.count += 1;
    return likeData.count;
  } else {
    LIKES.push({ postId, count: 1});
    return 1;
  }
}

export function formatDate(dateString: string): string {
    return format(new Date(dateString), "MMMM d, yyyy");
}
