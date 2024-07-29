"use client";

import { useState } from "react";
import Link from "next/link";

import { Logo } from "@/app/_components/logo";
import { ThemeSwitcher } from "./theme-switcher";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between mx-auto py-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo className="w-24 max-lg:w-16 max-md:w-12" />
          <span className="self-center text-3xl max-lg:text-2xl max-md:text-xl max-sm:text-lg max-[420px]:text-sm font-semibold whitespace-nowrap">
            Dallas Area Transit Alliance
          </span>
        </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 rounded-lg md:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600"
          aria-expanded="false"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`md:mt-4 lg:mt-0 md:block md:w-auto max-md:mr-2 max-md:absolute top-16 right-0 ${
            isOpen ? "" : "hidden"
          }`}
        >
          <ul className="font-medium flex flex-col md:items-center p-4 md:p-0 mt-4 border border-slate-100 rounded-lg bg-slate-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-slate-800 md:dark:bg-slate-900 dark:border-slate-700 leading-none">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="https://www.change.org/p/protect-our-public-transit-say-no-to-dart-funding-cuts"
                target="_blank"
                className="block py-2 px-3 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                Petition
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block py-2 px-3 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block py-2 px-3 text-slate-900 rounded hover:bg-slate-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-slate-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Contact
              </a>
            </li>
            <li>
              <div className="flex items-center h-8 px-3 md:h-auto md:p-0">
                <ThemeSwitcher />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
