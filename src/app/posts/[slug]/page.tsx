import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';

import { getAllPosts, getPostBySlug, formatDate, getCommentsByPostId, getLikesByPostId } from '@/lib/data';
import { TagBadge } from '@/components/tag-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { MarkdownRenderer } from '@/components/markdown-renderer';
import { CommentSection } from '@/components/comment-section';
import { LikeButton } from '@/components/like-button';

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {};
  }
  return {
    title: `${post.title} | Pixel Chronicles`,
    description: post.content.substring(0, 150),
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const comments = getCommentsByPostId(post.id);
  const likes = getLikesByPostId(post.id);

  return (
    <article className="max-w-4xl mx-auto py-8">
      <header className="mb-8 text-center">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4 font-headline">{post.title}</h1>
        <div className="flex items-center justify-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.authorImage} alt={post.author} />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{post.author}</span>
          </div>
          <span>&bull;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </header>

      <Image
        src={post.coverImage}
        alt={`Cover image for ${post.title}`}
        width={1200}
        height={630}
        className="w-full rounded-xl shadow-lg mb-8 aspect-video object-cover"
        priority
        data-ai-hint="tech concept"
      />

      <div className="mb-12">
        <MarkdownRenderer content={post.content} />
      </div>

      <div className="flex justify-center mb-8">
        <LikeButton postId={post.id} slug={post.slug} initialLikes={likes} />
      </div>
      
      <Separator className="my-12" />

      <CommentSection postId={post.id} slug={post.slug} comments={comments} />
    </article>
  );
}
