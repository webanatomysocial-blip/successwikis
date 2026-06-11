/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSR mode — no static export. Runs as a Node.js server on Hostinger.

  // Allow images from any domain (for db posts with external image_url)
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '**' },
      { protocol: 'https', hostname: '**' },
    ],
    unoptimized: true,
  },

  // Allow importing CSS from node_modules
  transpilePackages: ['react-quill-new', '@uiw/react-md-editor'],
};

export default nextConfig;
