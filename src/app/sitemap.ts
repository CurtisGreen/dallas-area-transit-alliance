import { getAllPosts } from "@/lib/api";
import type { MetadataRoute } from "next";

const baseUrl = "https://dallasareatransitalliance.org";
type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

const staticRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "yearly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/calendar", changeFrequency: "daily", priority: 0.7 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
] as const satisfies ReadonlyArray<{
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as ChangeFrequency,
      priority: 0.5,
    })),
  ];
}
