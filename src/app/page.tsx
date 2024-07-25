import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <h1 className="my-16 md:mb-12 text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        We are the ridership.
      </h1>
      <HeroPost {...heroPost} />
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </>
  );
}
