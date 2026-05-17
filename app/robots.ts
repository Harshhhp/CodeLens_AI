export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://code-lens-ai-iota.vercel.app/sitemap.xml",
  };
}