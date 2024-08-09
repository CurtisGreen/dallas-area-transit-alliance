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
          ? "block py-3 px-4 text-white bg-blue-700 rounded-md lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white lg:dark:text-blue-500"
          : "block py-3 px-4 text-slate-900 rounded-md hover:bg-slate-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-white lg:dark:hover:text-blue-500 dark:hover:bg-slate-700 dark:hover:text-white lg:dark:hover:bg-transparent"
      }
      aria-current={isCurrentPage ? "page" : undefined}
    >
      {props.children}
    </a>
  );
};
