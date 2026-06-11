import { blogMetadata } from "../../../blogs/metadata";
import BlogSlugClient from "./BlogSlugClient";
import { getApiBaseUrl } from "../../../lib/api";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const params = [];
  blogMetadata.forEach(b => {
    if (b.slug) params.push({ blogId: b.slug });
    if (b.id) params.push({ blogId: String(b.id) });
  });

  // Also include dynamic posts from the database so they get pre-rendered HTML
  try {
    const apiBase = getApiBaseUrl();
    const res = await fetch(`${apiBase}/api/posts.php?type=blog`, { cache: 'no-store' });
    const data = await res.json();
    if (data.status === 'success' && Array.isArray(data.data)) {
      data.data.forEach(p => {
        if (p.slug) params.push({ blogId: p.slug });
      });
    }
  } catch (e) {
    // PHP server not available at build time — index.php category-shell fallback handles these
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { blogId } = await params;
  
  // Try static metadata first
  const staticMeta = blogMetadata.find(b => b.slug === blogId || b.id === blogId);
  if (staticMeta) {
    return {
      title: `${staticMeta.title} | SuccessWikis`,
      description: staticMeta.metaDescription || staticMeta.excerpt || "",
    };
  }

  // Try fetching dynamic DB post metadata
  try {
    const apiBase = getApiBaseUrl();
    const res = await fetch(`${apiBase}/api/posts.php?slug=${blogId}`);
    const data = await res.json();
    if (data.status === 'success' && data.data) {
      return {
        title: `${data.data.title} | SuccessWikis`,
        description: data.data.meta_description || "",
      };
    }
  } catch (e) {
    console.error("Failed to fetch SSR metadata for blog:", blogId, e.message);
  }

  return {
    title: "Blog Post | SuccessWikis",
    description: "Read the latest post on SuccessWikis.",
  };
}

export default async function BlogSlugPage({ params }) {
  const { blogId } = await params;

  // Static posts are rendered from JSX — no DB fetch needed
  const isStatic = blogMetadata.some(b => b.slug === blogId || b.id === blogId);

  let initialDbPost = null;
  if (!isStatic) {
    try {
      const apiBase = getApiBaseUrl();
      const res = await fetch(`${apiBase}/api/posts.php?slug=${blogId}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.status === 'success' && data.data && data.data.post_type === 'blog') {
        initialDbPost = data.data;
      }
    } catch (e) {}
  }

  return <BlogSlugClient initialDbPost={initialDbPost} />;
}
