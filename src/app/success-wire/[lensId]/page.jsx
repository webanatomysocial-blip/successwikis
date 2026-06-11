import { successLensMetadata } from "../../../success-lens/metadata";
import SuccessWireSlugClient from "./SuccessWireSlugClient";
import { getApiBaseUrl } from "../../../lib/api";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const params = [];
  successLensMetadata.forEach(s => {
    if (s.slug) params.push({ lensId: s.slug });
    if (s.id) params.push({ lensId: String(s.id) });
  });

  try {
    const apiBase = getApiBaseUrl();
    const res = await fetch(`${apiBase}/api/posts.php?type=success_lens`, { cache: 'no-store' });
    const data = await res.json();
    if (data.status === 'success' && Array.isArray(data.data)) {
      data.data.forEach(p => { if (p.slug) params.push({ lensId: p.slug }); });
    }
  } catch (e) {
    // PHP server not available at build time — index.php category-shell fallback handles these
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { lensId } = await params;

  // Try static metadata first
  const staticMeta = successLensMetadata.find(s => s.slug === lensId || s.id === lensId);
  if (staticMeta) {
    return {
      title: `${staticMeta.title} | SuccessWikis`,
      description: staticMeta.metaDescription || staticMeta.excerpt || "",
    };
  }

  // Try fetching dynamic DB post metadata
  try {
    const apiBase = getApiBaseUrl();
    const res = await fetch(`${apiBase}/api/posts.php?slug=${lensId}`);
    const data = await res.json();
    if (data.status === 'success' && data.data) {
      return {
        title: `${data.data.title} | SuccessWikis`,
        description: data.data.meta_description || "",
      };
    }
  } catch (e) {
    console.error("Failed to fetch SSR metadata for success wire:", lensId, e.message);
  }

  return {
    title: "Success Wire Article | SuccessWikis",
    description: "Read the latest update on Success Wire.",
  };
}

export default async function SuccessWireSlugPage({ params }) {
  const { lensId } = await params;

  const isStatic = successLensMetadata.some(s => s.slug === lensId || s.id === lensId);

  let initialDbPost = null;
  if (!isStatic) {
    try {
      const apiBase = getApiBaseUrl();
      const res = await fetch(`${apiBase}/api/posts.php?slug=${lensId}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.status === 'success' && data.data && data.data.post_type === 'success_lens') {
        initialDbPost = data.data;
      }
    } catch (e) {}
  }

  return <SuccessWireSlugClient initialDbPost={initialDbPost} />;
}
