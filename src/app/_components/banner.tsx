import { BannerBody } from "@/app/_components/banner-body";
import { getAllPosts } from "@/lib/api";

export async function Banner() {
  const bannerPost = getAllPosts().find((post) => post.banner);

  if (
    !bannerPost ||
    bannerPost.banner?.hide === true
  ) {
    return null;
  } else {
    const bannerData = bannerPost.banner!;
    return (
      <BannerBody
        text={bannerData.text}
        href={bannerData.href ? bannerData.href : `/posts/${bannerPost.slug}`}
      />
    );
  }
}
