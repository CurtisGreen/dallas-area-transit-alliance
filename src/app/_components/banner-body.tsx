"use client";

import { usePathname } from "next/navigation";
import Container from "./container";

type Props = {
  content: String;
  sourcePostSlug: String;
};

export const BannerBody = ({ content, sourcePostSlug }: Props) => {
  const pathname = usePathname();

  if (pathname === sourcePostSlug) {
    return null;
  } else {
    return (
      <div className="text-slate-900 dark:text-white bg-neutral-300 dark:bg-slate-950 border-b border-neutral-800 dark:border-neutral-200">
        <Container>
          <div
            className={"py-3 text-center [&_a]:underline"}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
      </div>
    );
  }
}
