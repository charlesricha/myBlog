"use client";

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { likePost } from '@/lib/actions';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  postId: string;
  slug: string;
  initialLikes: number;
}

export function LikeButton({ postId, slug, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleLike = async () => {
    if (isLiked || isPending) return;

    setIsPending(true);
    setIsLiked(true);
    setLikes((prev) => prev + 1);

    await likePost(postId, slug);

    setIsPending(false);
  };

  return (
    <Button onClick={handleLike} disabled={isLiked || isPending} variant="outline" size="lg" className="group transition-all duration-300">
      <Heart className={cn(
        "mr-2 h-5 w-5 transition-all duration-300",
        isLiked ? "text-red-500 fill-current" : "text-muted-foreground group-hover:text-red-500"
      )} />
      <span className="font-semibold">{likes}</span>
    </Button>
  );
}
