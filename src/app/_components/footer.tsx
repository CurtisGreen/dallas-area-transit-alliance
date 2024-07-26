import Container from "@/app/_components/container";
import { Logo } from "@/app/_components/logo";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
      <Container>
        <div className="py-16 flex flex-col lg:flex-row items-center">
          <div className="mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            <Logo className="w-64" />
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="/about"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Read More
            </a>
            <a
              href={
                "https://github.com/CurtisGreen/dallas-area-transit-alliance"
              }
              className="mx-3 font-bold hover:underline"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
