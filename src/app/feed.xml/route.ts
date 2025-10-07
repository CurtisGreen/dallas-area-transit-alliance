import { getAllPosts } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";

const SITE_URL = "https://dallasareatransitalliance.org";
const SITE_TITLE = "Dallas Area Transit Alliance";
const SITE_DESCRIPTION =
  "Updates and stories from the Dallas Area Transit Alliance.";

const MAX_FEED_ITEMS = 20;

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export async function GET() {
  const posts = getAllPosts()
    .filter((post) => !post.preview)
    .slice(0, MAX_FEED_ITEMS);

  const items = await Promise.all(
    posts.map(async (post) => {
      const url = `${SITE_URL}/posts/${post.slug}`;
      const content = await markdownToHtml(post.content);
      const description = post.excerpt ?? "";
      const published = new Date(post.date).toUTCString();

      return `
        <item>
          <title>${escapeXml(post.title)}</title>
          <link>${url}</link>
          <guid isPermaLink="true">${url}</guid>
          <pubDate>${published}</pubDate>
          <description><![CDATA[${description}]]></description>
          <content:encoded><![CDATA[${content}]]></content:encoded>
        </item>
      `;
    }),
  );

  const latestPostDate = posts[0]
    ? new Date(posts[0].date).toUTCString()
    : new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${latestPostDate}</lastBuildDate>
    <ttl>180</ttl>
    ${items.join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}
