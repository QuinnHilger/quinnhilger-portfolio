export interface BlogMeta {
  title: string;
  slug: string;
  publishedDate: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
  summary: string;
}

export interface BlogPost extends BlogMeta {
  rawContent: string;
  polishedContent: string;
  readingTime: number;
}

// Import all blog metadata and content files
const blogMetas = import.meta.glob('/markdown/blogs/*/meta.json', { eager: true }) as Record<string, { default: BlogMeta }>;
const rawContents = import.meta.glob('/markdown/blogs/*/raw.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;
const polishedContents = import.meta.glob('/markdown/blogs/*/polished.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>;

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function extractSlugFromPath(path: string): string {
  const match = path.match(/\/markdown\/blogs\/([^/]+)\//);
  return match ? match[1] : '';
}

export function getAllBlogPosts(): BlogPost[] {
  const posts: BlogPost[] = [];

  for (const [path, module] of Object.entries(blogMetas)) {
    const slug = extractSlugFromPath(path);
    const meta = (module as { default: BlogMeta }).default;
    
    // Find corresponding content files
    const rawPath = `/markdown/blogs/${slug}/raw.md`;
    const polishedPath = `/markdown/blogs/${slug}/polished.md`;
    
    const rawContent = rawContents[rawPath] || '';
    const polishedContent = polishedContents[polishedPath] || '';
    
    posts.push({
      ...meta,
      rawContent,
      polishedContent,
      readingTime: calculateReadingTime(polishedContent),
    });
  }

  // Sort by date, newest first
  return posts.sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find(post => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured);
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, count);
}

export function getAdjacentPosts(slug: string): { prev: BlogPost | null; next: BlogPost | null } {
  const posts = getAllBlogPosts();
  const currentIndex = posts.findIndex(post => post.slug === slug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  return {
    prev: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}

export function getAllTags(): string[] {
  const posts = getAllBlogPosts();
  const tagSet = new Set<string>();
  
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

export function getPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter(post => post.tags.includes(tag));
}
