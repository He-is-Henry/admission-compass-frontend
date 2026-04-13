export default async function sitemap() {
  const baseUrl = "https://www.admissioncompass.com.ng";

  // fetch blogs
  const res = await fetch("https://api.admissioncompass.com.ng/blog?all=true");
  const blogs = await res.json();

  const blogUrls = blogs.map((b: { slug: string }) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/support`,
      lastModified: new Date(),
    },
    ...blogUrls,
  ];
}
