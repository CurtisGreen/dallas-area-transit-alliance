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
            <div className="mb-4 text-center lg:text-left">
              <i>
                In Honor and Dedication to Mary Collier – A Friend, Advocate,
                and Champion of DATA. Your passion and commitment will always be
                remembered.
              </i>
            </div>
            <SocialIcons showGitHub={true} />

            <div className="py-4 flex flex-wrap flex-row max-sm:justify-center gap-x-8 gap-y-4">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="https://actionnetwork.org/groups/dallas-area-transit-alliance">
                Action Network
              </FooterLink>
              <FooterLink href="/documents/DATA_Bylaws_2025-09-27.pdf">
                Bylaws
              </FooterLink>
              <FooterLink href="/calendar">Calendar</FooterLink>
              <FooterLink href="/documents/DATA_Code_of_Conduct_2025-05-17.pdf">
                Code of Conduct
              </FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
              <FooterLink href="/logos/data-logos.zip">Media Kit</FooterLink>
              <FooterLink href="https://docs.google.com/forms/d/e/1FAIpQLSeE-SrnsbjniO7I0BkdHourNdQYO_MKaYhKa6iQjN63_eubBg/viewform">
                Newsletter
              </FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
              <FooterLink href="https://go.ridewithdata.org/bonfire?utm_source=footer&utm_medium=website&utm_campaign=data-store">
                Store
              </FooterLink>
              <FooterLink href="https://ridewithdata.substack.com">
                Substack
              </FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
