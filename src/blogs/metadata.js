import one from '../blogs/blogs-images/1.png';
import two from '../blogs/blogs-images/2.png';
import three from '../blogs/blogs-images/3.jpeg';
import four from '../blogs/blogs-images/4.jpeg';


export const blogMetadata = [
  {
    id: "AmbitionPost",
    title: "Ambition Is Changing — And That's a Good Thing",
    slug: "ambition-is-changing",
    metaDescription: "Ambition is no longer just about climbing the corporate ladder. It's about finding purpose and redefining success on your own terms.",
    excerpt: "Ambition used to look like a straight line up a corporate ladder. Today, it’s a web of meaningful pursuits. We are redefining what it means to be ambitious.",
    image: one,
    date: "2025-08-30",
  },
  {
    id: "FearFounderPost",
    title: "The Fear Every Founder Has (But Nobody Talks About)",
    slug: "fear-every-founder-has",
    metaDescription: "Imposter syndrome and the fear of failure are common among founders. Learn why these feelings are normal and how to overcome them.",
    excerpt: "There is a silent anxiety that runs through the veins of every founder. The fear of being found out. Imposter syndrome is real, and it is rampant.",
    image: two,
    date: "2025-09-02",
  },
  {
    id: "FiguredOutPost",
    title: "You Don't Need to Have It All Figured Out",
    slug: "dont-need-figured-out",
    metaDescription: "The pressure to have a perfect 5-year plan can be paralyzing. Discover the power of iteration and starting before you're ready.",
    excerpt: "We live in a world that demands certainty. But the best things in life often come from the unknown. Pressure to have a 5-year plan can be paralyzing.",
    image: three,
    date: "2025-09-05",
  },
  {
    id: "TellStoryPost",
    title: "How to Tell Your Story Without Feeling Like PR",
    slug: "how-to-tell-story",
    metaDescription: "Authenticity wins in modern marketing. Learn how to share your journey and connect with your audience without sounding corporate.",
    excerpt: "Marketing often feels transactional. But storytelling is human. When you share your authentic journey, you connect on a deeper level.",
    image: four,
    date: "2025-09-08",
  }
];

// Preload images with error handling
if (typeof Image !== 'undefined') {
  blogMetadata.forEach(blog => {
    const img = new Image();
    img.src = blog.image;
    img.onload = () => console.log(`Successfully preloaded image: ${blog.image}`);
    img.onerror = () => {
      // console.error(`Failed to preload image: ${blog.image}`);
      // blog.image = "/images/placeholder.jpg"; // Optional fallback
    };
  });
}