import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { SubstackFeed } from "./_components/substack-feed";

export default async function Index() {
  const allPosts = getAllPosts();

  return (
    <>
      <SubstackFeed />
      {allPosts.length > 0 && <MoreStories posts={allPosts} />}
    </>
  );
}
