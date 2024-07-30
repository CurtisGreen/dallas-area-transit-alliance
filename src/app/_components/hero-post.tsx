import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 mt-8 mb-8 md:mb-16">
          <div className="mb-2">
            <CoverImage title={title} src={coverImage} slug={slug} />
          </div>
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <p className="text-lg leading-relaxed mb-4"><DateFormatter dateString={date} /> &mdash; {excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </section>
  );
}
