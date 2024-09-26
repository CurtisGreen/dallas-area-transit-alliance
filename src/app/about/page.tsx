export default function Index() {
  return (
    <div className="leading-tight">
      <div className="my-12 md:my-16 md:mb-12 text-5xl md:text-7xl font-bold tracking-tighter">
        About Us
      </div>
      <div className="text-2xl md:text-3xl mt-8 md:mt-12 mb-4 font-bold">
        Our Mission
      </div>
      <div className="text-lg">
        Advocate for better public transit in the Greater Dallas area.
      </div>
      <div className="text-2xl md:text-3xl mt-8 md:mt-12 mb-4 font-bold">
        Our Executive Committee
      </div>
      <ol className="mb-16 md:mb-12 text-lg">
        <li className="mb-1">
          Connor Hulla, President
        </li>
        <li className="mb-1">
          Tyler Wright, Vice President
        </li>
        <li className="mb-1">
          Alexander Dunn, Secretary
        </li>
        <li classname="mb-1">
          Evan Rosner, Media and Government Relations Chair
        </li>
        <li classname="mb-1">
          Rohan Kodibagkar, Social Media and Outreach Chair
        </li>
        <li classname="mb-1">
          Keun Lee, Policy Research Chair
        </li>
        <li classname="mb-1">
          Mary Collier, Event Planning Chair
        </li>
      </ol>
      <div className="text-2xl md:text-3xl mt-8 md:mt-12 mb-4 font-bold">
        History
      </div>
      <div className="text-lg">
        <p>
          <i>Dallas Area Transit Alliance</i>, or <i>DATA</i>, was formed in
          response to a wave of{" "}
          <a href="/posts/dart-cuts">city council resolutions</a> aimed at
          reducing DART funding. Our organization represents all 13 DART member
          cities: Dallas, Addison, Carrollton, Cockrell Hill, Farmers Branch,
          Garland, Glenn Heights, Highland Park, Irving, Plano, Richardson,
          Rowlett, and University Park.
        </p>

        <p>
          The idea for DATA emerged during a meeting on June 15, 2024, at Cole
          Park in Uptown Dallas, where approximately 15 people gathered to
          explore the possibility of forming an advocacy group. A second meeting
          on July 20, 2024, at the Metropolitan Building in Downtown Dallas saw
          over 50 attendees, during which interim co-chairs Tyler Wright and
          Connor Hulla were elected and our organization's priorities were set.
          Our organization’s official name was selected 5 days later after 137
          people cast their votes.
        </p>

        <p>
          As part of our advocacy efforts, Dallas transportation advocate Hexel
          Colorado started a{" "}
          <a href="https://www.change.org/p/protect-our-public-transit-say-no-to-dart-funding-cuts">
            petition on Change.org
          </a>
          , urging the DART Board of Directors to reject proposed funding cuts.
          Since its launch on July 16, the petition garnered over 1,160
          signatures in two weeks. The petition called upon the DART Board of
          Directors to reject any proposals to reduce the sales tax
          contributions from the thirteen member cities.
        </p>
      </div>
      <div className="text-2xl md:text-3xl mt-8 md:mt-12 mb-4 font-bold">
        Goals
      </div>
      <ol className="mb-16 md:mb-12 text-lg">
        <li className="mb-1">
          1. Safeguard the future of public transit in Greater Dallas.
        </li>
        <li className="mb-1">
          2. Compel elected officials to prioritize public transit.
        </li>
        <li className="mb-1">
          3. Offer practical solutions to enhance public transit.
        </li>
      </ol>
    </div>
  );
}
