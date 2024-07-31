"use client";

import Container from "@/app/_components/container";
import { usePathname } from "next/navigation";

type Props = {
  text: string;
  href: string;
};

export const BannerBody = ({ text, href }: Props) => {
  const pathname = usePathname();
  const isExternalHref = href.startsWith("http");

  if (pathname === href && !isExternalHref) {
    return null;
  } else {
    return (
      <div className="text-slate-900 dark:text-white bg-neutral-300 dark:bg-slate-950 border-b border-neutral-800 dark:border-neutral-200">
        <Container>
          <div className="py-3 text-center">
            <a
              className="underline"
              href={href}
              target={isExternalHref ? "_blank" : undefined}
            >
              {text}
            </a>
          </div>
        </Container>
      </div>
    );
  }
};
