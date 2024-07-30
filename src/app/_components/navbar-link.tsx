"use client";

import { usePathname } from "next/navigation";

type Props = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "aria-current"
>;

export const NavbarLink = (props: Props) => {
  const pathname = usePathname();
  const isCurrentPage =
    pathname === props.href ||
    (pathname.startsWith("/posts/") && props.href === "/");

  return (
    <a
      {...props}
      className={
        isCurrentPage
          ? "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
          : "block py-2 px-3 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent"
      }
      aria-current={isCurrentPage ? "page" : undefined}
    >
      {props.children}
    </a>
  );
};
