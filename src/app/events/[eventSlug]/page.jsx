import { eventMetadata } from "../../../events/metadata";
import EventSlugClient from "./EventSlugClient";
import { getApiBaseUrl } from "../../../lib/api";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const params = [];
  eventMetadata.forEach(e => {
    if (e.slug) params.push({ eventSlug: e.slug });
    if (e.id) params.push({ eventSlug: String(e.id) });
  });

  try {
    const apiBase = getApiBaseUrl();
    const res = await fetch(`${apiBase}/api/posts.php?type=event`, { cache: 'no-store' });
    const data = await res.json();
    if (data.status === 'success' && Array.isArray(data.data)) {
      data.data.forEach(p => { if (p.slug) params.push({ eventSlug: p.slug }); });
    }
  } catch (e) {
    // PHP server not available at build time — index.php category-shell fallback handles these
  }

  return params;
}

export async function generateMetadata({ params }) {
  const { eventSlug } = await params;

  // Try static metadata first
  const staticMeta = eventMetadata.find(e => e.slug === eventSlug || e.id === eventSlug);
  if (staticMeta) {
    return {
      title: `${staticMeta.title} | SuccessWikis`,
      description: staticMeta.description || "",
    };
  }

  // Try fetching dynamic DB post metadata
  try {
    const apiBase = getApiBaseUrl();
    const res = await fetch(`${apiBase}/api/posts.php?slug=${eventSlug}`);
    const data = await res.json();
    if (data.status === 'success' && data.data) {
      return {
        title: `${data.data.title} | SuccessWikis`,
        description: data.data.meta_description || "",
      };
    }
  } catch (e) {
    console.error("Failed to fetch SSR metadata for event:", eventSlug, e.message);
  }

  return {
    title: "Event | SuccessWikis",
    description: "Join our next event.",
  };
}

export default async function EventSlugPage({ params }) {
  const { eventSlug } = await params;

  const isStatic = eventMetadata.some(e => e.slug === eventSlug || e.id === eventSlug);

  let initialDbPost = null;
  if (!isStatic) {
    try {
      const apiBase = getApiBaseUrl();
      const res = await fetch(`${apiBase}/api/posts.php?slug=${eventSlug}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.status === 'success' && data.data && data.data.post_type === 'event') {
        initialDbPost = data.data;
      }
    } catch (e) {}
  }

  return <EventSlugClient initialDbPost={initialDbPost} />;
}
