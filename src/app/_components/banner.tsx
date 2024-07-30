import { getAllPosts } from "@/lib/api";
import markdownToHtml from "@/lib/markdownToHtml";
import { BannerBody } from "./banner-body";

export async function Banner() {
  const bannerPost = getAllPosts().find((p) => p.banner !== undefined);

  if (!bannerPost || !bannerPost.banner) return null;

  const postSlug = `/posts/${bannerPost.slug}`;
  const bannerContent = await markdownToHtml(
    bannerPost.banner.toString().replaceAll("$slug", postSlug)
  );

  return <BannerBody content={bannerContent} sourcePostSlug={postSlug} />;
}
