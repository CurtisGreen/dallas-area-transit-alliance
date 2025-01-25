import Link from "next/link";
import { ReactNode } from "react";
import { Logo } from "@/app/_components/logo";
import { SocialIcons } from "@/app/_components/social-icons";
import { DownloadButton } from "./download-button";

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => (
  <Link
    href={href}
    className="underline hover:text-gray-600 dark:hover:text-slate-300"
  >
    {children}
  </Link>
);

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <div className="container mx-auto px-5">
        <div className="py-16 flex flex-col lg:flex-row items-center">
          <div className="mb-10 lg:mb-0 lg:pr-4 lg:w-1/2 xl:w-2/3">
            <Logo className="w-64" />
          </div>
          <div className="flex flex-col justify-center items-center lg:items-start lg:pl-4 lg:w-1/2 xl:2-1/3">
            <div className="mb-2">&copy; 2025 Dallas Area Transit Alliance</div>
            <div className="mb-2 text-center lg:text-left">
              Dallas Area Transit Alliance (DATA) is a rider-run advocacy group
              that is not affiliated with Dallas Area Rapid Transit (DART) or
              any other transit or government agency.
            </div>
            <div i className="mb-4 text-center lg:text-left">
              In Honor and Dedication to Mary Collier – A Friend, Advocate, and Champion of DATA. Your passion and commitment will always be remembered.</i></div>
          <SocialIcons showGitHub={true} />

          <div className="py-4 flex flex-wrap flex-row max-sm:justify-center gap-x-8 gap-y-4">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="https://actionnetwork.org/groups/dallas-area-transit-alliance">
              Action Network
            </FooterLink>
            <FooterLink href="/calendar">Calendar</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <DownloadButton href="/logos/data-logos.zip">
              <div className="underline hover:text-gray-600 dark:hover:text-slate-300 cursor-pointer">
                Media Kit
              </div>
            </DownloadButton>
            <FooterLink href="https://docs.google.com/forms/d/e/1FAIpQLSeE-SrnsbjniO7I0BkdHourNdQYO_MKaYhKa6iQjN63_eubBg/viewform">
              Newsletter
            </FooterLink>
          </div>
        </div>
      </div>
    </div>
    </footer >
  );
}
