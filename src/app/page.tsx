import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { PostCard } from '@/components/post-card';
import { TagBadge } from '@/components/tag-badge';
import { getAllPosts, getAllTags } from '@/lib/data';
import type { Post } from '@/lib/types';
import { PlusCircle } from 'lucide-react';

interface HomeProps {
  searchParams: {
    tag?: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const selectedTag = searchParams.tag;
  const allPosts: Post[] = await getAllPosts();
  const allTags = getAllTags(allPosts);

  const filteredPosts = selectedTag
    ? allPosts.filter((post) => post.tags.includes(selectedTag))
    : allPosts;

  return (
    <div className="space-y-12">
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tighter font-headline">Pixel Chronicles</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          My learning journey through graphic design, 3D, networking, and web development. Everything I learn, I post.
        </p>
        <div className="flex justify-center">
            <Button asChild>
                <Link href="/admin/new-post">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Post
                </Link>
            </Button>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-bold mb-4 font-headline">Filter by Tag</h2>
        <div className="flex flex-wrap gap-2">
          <TagBadge tag="All" href="/" isActive={!selectedTag} />
          {allTags.map((tag) => (
            <TagBadge key={tag} tag={tag} href={`/?tag=${tag}`} isActive={tag === selectedTag} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-2xl font-bold font-headline">{selectedTag ? `Posts tagged with "${selectedTag}"` : 'Latest Posts'}</h2>
        <Suspense fallback={<p>Loading posts...</p>}>
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <div key={post.id} style={{ animationDelay: `${index * 100}ms` }} className="opacity-0 animate-fade-in-up">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">No posts found. Create one to get started!</p>
          )}
        </Suspense>
      </section>
    </div>
  );
}
