"use client";

import { useState } from "react";
import Link from "next/link";

import { Logo } from "@/app/_components/logo";
import { ThemeSwitcher } from "./theme-switcher";
import { NavbarLink } from "./navbar-link";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      {/* invisible div to catch clicking out of the mobile menu */}
      <div
        className={`fixed inset-0 ${isOpen ? "" : "hidden"}`}
        onClick={() => setIsOpen(false)}
      />
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
        <div className="relative">
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-500 rounded-lg lg:hidden hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-slate-400 dark:hover:bg-slate-700 dark:focus:ring-slate-600"
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
            className={`lg:block lg:w-auto max-lg:absolute top-12 right-0 ${
              isOpen ? "" : "hidden"
            }`}
          >
            <ul className="font-medium flex flex-col max-lg:gap-2 lg:items-center p-3 lg:p-0 border border-slate-100 rounded-lg bg-slate-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:border-0 lg:bg-white dark:bg-slate-800 lg:dark:bg-slate-900 dark:border-slate-700 leading-none">
              <li>
                <NavbarLink href="/">Home</NavbarLink>
              </li>
              <li>
                <NavbarLink
                  href="https://www.change.org/p/protect-our-public-transit-say-no-to-dart-funding-cuts"
                  target="_blank"
                >
                  Petition
                </NavbarLink>
              </li>
              <li>
                <NavbarLink href="/about">About</NavbarLink>
              </li>
              <li>
                <NavbarLink href="/contact">Contact</NavbarLink>
              </li>
              <li>
                <div className="flex items-center h-8 px-4 lg:h-auto lg:p-0">
                  <ThemeSwitcher />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
