import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2 mb-8">
      <div className="mb-2">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <div>
        <h3 className="text-3xl mb-3 leading-snug">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-lg leading-relaxed"><DateFormatter dateString={date} /> &mdash; {excerpt}</p>
        <Avatar name={author.name} picture={author.picture} />
      </div>      
    </div>
  );
}
