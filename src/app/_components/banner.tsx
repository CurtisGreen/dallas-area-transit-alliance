import Container from "./container";

export const Banner = () => (
  <div className="text-slate-900 dark:text-white bg-neutral-300 dark:bg-slate-950 border-b border-neutral-800 dark:border-neutral-200">
    <Container>
      <span className="block py-3 text-center">
        SIGN OUR PETITION PLS (
        <a
          href="https://www.change.org/p/protect-our-public-transit-say-no-to-dart-funding-cuts"
          target="_blank"
          className="underline"
        >
          {/* TODO: external link icon */}
          LINK HERE
        </a>
        )
      </span>
    </Container>
  </div>
);
