import Link from 'next/link';
import Image from 'next/image';
import type { Post } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TagBadge } from './tag-badge';
import { formatDate } from '@/lib/data';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/posts/${post.slug}`} className="block">
        <Image
          src={post.coverImage}
          alt={`Cover image for ${post.title}`}
          width={400}
          height={210}
          className="w-full h-48 object-cover"
          data-ai-hint="tech blog"
        />
      </Link>
      <CardHeader>
        <CardTitle>
          <Link href={`/posts/${post.slug}`} className="hover:opacity-70 transition-opacity">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.authorImage} alt={post.author} />
            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{post.author}</span>
          <span>&bull;</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}


//added this to check if the site can reach firebase

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../firebaseConfig"; // your Firebase init

export default function TestFirestore() {
  async function checkFirestore() {
    try {
      const db = getFirestore(app);
      const snap = await getDoc(doc(db, "test", "testDoc"));
      console.log("Firestore data:", snap.data());
    } catch (err) {
      console.error("Firestore error:", err);
    }
  }

  return (
    <div>
      <button onClick={checkFirestore}>Test Firestore</button>
    </div>
  );
}

