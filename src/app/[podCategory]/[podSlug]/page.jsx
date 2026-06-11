import { podMetadata } from "../../../pod/metadata";
import PodSlugClient from "./PodSlugClient";
import { getApiBaseUrl } from "../../../lib/api";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const params = [];

  // 1. Static Metadata Paths
  podMetadata.forEach(p => {
    const cat = p.categorySlug || "driven-by-purpose";
    if (p.slug) params.push({ podCategory: cat, podSlug: p.slug });
    if (p.id) params.push({ podCategory: cat, podSlug: String(p.id) });
  });

  // 2. Dynamic posts from the database — pre-render their HTML at build time
  const postTypeToCategory = {
    driven_by_purpose: 'driven-by-purpose',
    founders_unfiltered: 'founders-unfiltered',
    stage_behind_story: 'stage-behind-the-story',
  };
  try {
    const apiBase = getApiBaseUrl();
    for (const [postType, catSlug] of Object.entries(postTypeToCategory)) {
      const res = await fetch(`${apiBase}/api/posts.php?type=${postType}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.status === 'success' && Array.isArray(data.data)) {
        data.data.forEach(p => {
          if (p.slug) params.push({ podCategory: catSlug, podSlug: p.slug });
        });
      }
    }
  } catch (e) {
    // PHP server not available at build time — index.php category-shell fallback handles these
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { podSlug } = await params;

  // Try static metadata first
  const staticMeta = podMetadata.find(p => p.slug === podSlug || p.id === podSlug);
  if (staticMeta) {
    return {
      title: `${staticMeta.title} | SuccessWikis`,
      description: staticMeta.metaDescription || staticMeta.excerpt || "",
    };
  }

  // Try fetching dynamic DB post metadata
  try {
    const apiBase = getApiBaseUrl();
    const res = await fetch(`${apiBase}/api/posts.php?slug=${podSlug}`);
    const data = await res.json();
    if (data.status === 'success' && data.data) {
      return {
        title: `${data.data.title} | SuccessWikis`,
        description: data.data.meta_description || "",
      };
    }
  } catch (e) {
    console.error("Failed to fetch SSR metadata for pod story:", podSlug, e.message);
  }

  return {
    title: "Success Story | SuccessWikis",
    description: "Read this success story on SuccessWikis.",
  };
}

export default async function PodSlugPage({ params }) {
  const { podSlug } = await params;

  const isStatic = podMetadata.some(p => p.slug === podSlug || p.id === podSlug);

  let initialDbPost = null;
  if (!isStatic) {
    try {
      const apiBase = getApiBaseUrl();
      const res = await fetch(`${apiBase}/api/posts.php?slug=${podSlug}`, { cache: 'no-store' });
      const data = await res.json();
      const podTypes = ['driven_by_purpose', 'founders_unfiltered', 'stage_behind_story', 'pod'];
      if (data.status === 'success' && data.data && podTypes.includes(data.data.post_type)) {
        initialDbPost = data.data;
      }
    } catch (e) {}
  }

  return <PodSlugClient initialDbPost={initialDbPost} />;
}
