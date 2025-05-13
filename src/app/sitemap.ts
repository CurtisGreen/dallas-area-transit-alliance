import { getAllPosts } from "@/lib/api";
import type { MetadataRoute } from "next";

const baseUrl = "https://dallasareatransitalliance.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const postSitemaps: MetadataRoute.Sitemap = posts.map((post) => ({
    key: post.date,
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/calendar`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...postSitemaps,
  ];
}
