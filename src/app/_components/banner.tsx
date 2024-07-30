import { getAllPosts } from "@/lib/api";
import { BannerBody } from "./banner-body";

export async function Banner() {
  const bannerPost = getAllPosts().find((p) => p.banner !== undefined);

  if (!bannerPost || !bannerPost.banner) {
    return null;
  } else if (typeof bannerPost.banner === "object") {
    return (
      <BannerBody text={bannerPost.banner.text} href={bannerPost.banner.href} />
    );
  } else {
    return (
      <BannerBody
        text={bannerPost.banner.toString()}
        href={`/posts/${bannerPost.slug}`}
      />
    );
  }
}
