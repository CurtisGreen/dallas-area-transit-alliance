import Container from "@/app/_components/container";
import { Logo } from "@/app/_components/logo";
import { SocialIcons } from "@/app/_components/social-icons";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-16 flex flex-col lg:flex-row items-center">
          <div className="mb-10 lg:mb-0 lg:pr-4 lg:w-1/2 xl:w-2/3">
            <Logo className="w-64" />
          </div>
          <div className="flex flex-col justify-center items-center lg:items-start lg:pl-4 lg:w-1/2 xl:2-1/3">
            <div className="mb-2">&copy; 2024 Dallas Area Transit Alliance</div>
            <div className="mb-4 text-center lg:text-left">
              Dallas Area Transit Alliance (DATA) is a rider-run advocacy group
              that is not affiliated with Dallas Area Rapid Transit (DART) or
              any other transit or government agency.
            </div>
            <SocialIcons showGitHub={true} />
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
