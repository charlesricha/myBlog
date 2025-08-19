import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagBadgeProps {
  tag: string;
  href?: string;
  isActive?: boolean;
}

export function TagBadge({ tag, href, isActive = false }: TagBadgeProps) {
  const badge = (
    <Badge
      variant={isActive ? 'default' : 'secondary'}
      className={cn(
        'transition-all duration-200',
        href && 'hover:bg-primary/80 hover:text-primary-foreground',
        isActive && 'bg-primary text-primary-foreground'
      )}
    >
      {tag}
    </Badge>
  );

  if (href) {
    return <Link href={href}>{badge}</Link>;
  }

  return badge;
}
