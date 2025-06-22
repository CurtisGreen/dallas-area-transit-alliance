import Image from "next/image";
import cn from "classnames";
import Link from "next/link";

import { getSubstackArticles } from "@/lib/substack-api";

export const SubstackFeed = async () => {
  const posts = await getSubstackArticles("ridewithdata", 3);

  return (
    <div className="mt-8 mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <div key={post.slug} className="justify-center">
          <Link href={post.canonical_url} aria-label={post.title}>
            <Image
              src={post.cover_image}
              alt={post.title}
              className={cn("shadow-sm rounded-md w-192 h-96 object-cover", {
                "hover:shadow-lg transition-shadow duration-200": post.slug,
              })}
              width={800}
              height={400}
              priority
            />
          </Link>

          <div className="mt-4">
            <Link href={post.canonical_url} className="text-xl leading-snug">
              <div>{post.title}</div>
              <div className="text-base text-slate-500">{post.description}</div>
              <div className="bm-2 flex text-base text-slate-500 gap-4">
                <div>{post.publishedBylines[0].name}</div>
                <div>{post.post_date}</div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
