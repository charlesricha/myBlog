import type { Comment } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/data';
import { CommentForm } from './comment-form';
import { MessageCircle } from 'lucide-react';

interface CommentSectionProps {
  postId: string;
  slug: string;
  comments: Comment[];
}

export function CommentSection({ postId, slug, comments }: CommentSectionProps) {
  return (
    <section className="space-y-8">
      <h2 className="text-3xl font-bold flex items-center gap-3 font-headline">
        <MessageCircle className="h-8 w-8 text-primary" />
        Comments ({comments.length})
      </h2>
      
      <CommentForm postId={postId} slug={slug} />

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <Avatar>
                <AvatarImage src={`https://i.pravatar.cc/40?u=${comment.author}`} />
                <AvatarFallback>{comment.author.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <p className="font-semibold">{comment.author}</p>
                  <time dateTime={comment.timestamp} className="text-xs text-muted-foreground">
                    {formatDate(comment.timestamp)}
                  </time>
                </div>
                <p className="text-muted-foreground">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">Be the first to comment!</p>
        )}
      </div>
    </section>
  );
}
