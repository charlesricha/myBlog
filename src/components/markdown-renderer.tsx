"use client";

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypePrismPlus from 'rehype-prism-plus';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "prose prose-invert prose-lg max-w-none",
        "prose-headings:font-headline prose-headings:tracking-tighter",
        "prose-a:text-accent prose-a:no-underline hover:prose-a:underline",
        "prose-blockquote:border-primary prose-blockquote:text-muted-foreground",
        "prose-code:bg-card prose-code:text-foreground prose-code:p-1 prose-code:rounded-md",
        "prose-img:rounded-lg prose-img:shadow-md"
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypePrismPlus, { ignoreMissing: true }]]}
        components={{
          p: (paragraph) => {
            const { node } = paragraph;
            if (node.children[0].type === 'image') {
              const image = node.children[0];
              return (
                <span className="block text-center">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    width={800}
                    height={400}
                    className="rounded-lg shadow-lg mx-auto"
                    data-ai-hint="blog illustration"
                  />
                  {image.alt && <em className="mt-2 block text-sm text-muted-foreground">{image.alt}</em>}
                </span>
              );
            }
            return <p>{paragraph.children}</p>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
