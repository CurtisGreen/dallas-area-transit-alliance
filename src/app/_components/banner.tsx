import { getAllPosts } from "@/lib/api";
import Container from "./container";
import markdownToHtml from "@/lib/markdownToHtml";

export async function Banner() {
  const bannerPost = getAllPosts().find((p) => p.banner !== undefined);

  if (!bannerPost || !bannerPost.banner) return null;

  const bannerContent = await markdownToHtml(
    bannerPost.banner
      .toString()
      .replaceAll("$slug", `/posts/${bannerPost.slug}`)
  );

  return (
    <div className="text-slate-900 dark:text-white bg-neutral-300 dark:bg-slate-950 border-b border-neutral-800 dark:border-neutral-200">
      <Container>
        <div
          className={"py-3 text-center [&_a]:underline"}
          dangerouslySetInnerHTML={{ __html: bannerContent }}
        />
      </Container>
    </div>
  );
}
