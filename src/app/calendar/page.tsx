import Link from "next/link";

// Invalidate the cache when a request comes in, at most once every hour
export const revalidate = 3600;

const scheduleData = [
  {
    title: "DATA February General Meeting",
    date: new Date("2025-02-22 16:00-05:00"),
    points: [
      "Saturday, February 22 from 1:00PM - 4:00PM",
      "J. Erik Jonsson Central Library at 1515 Young Street, Dallas",
      "Hamon Training Room, 5th floor",
      <i>
        Disclosure: This event is not sponsored by the Dallas Public Library
      </i>,
    ],
  },
  {
    title: "DATA January General Meeting",
    date: new Date("2025-01-18 16:00-05:00"),
    points: [
      "Saturday, January 18 from 2:00PM - 4:00PM",
      "J. Erik Jonsson Central Library at 1515 Young Street, Dallas",
      "Hamon Training Room, 5th floor",
      <i>
        Disclosure: This event is not sponsored by the Dallas Public Library
      </i>,
    ],
  },
  {
    title: "DART Board Workshop",
    date: new Date("2025-01-13 22:00-05:00"),
    points: [
      "Monday, January 13, Time TBD",
      "DART Headquarters at Akard Station, 1401 Pacific Avenue",
      "Workshop to address Plano's demands and potential governance changes",
    ],
  },
  {
    title: "Speak at Plano City Council Meeting",
    date: new Date("2025-01-13 22:00-05:00"),
    points: [
      "Wednesday, January 8, 7:00PM - 10:00PM",
      "1520 K Ave, Plano",
      "Do you live or work in Plano? Show up or comment over zoom to show your support for DART",
      <Link
        href="https://docs.google.com/document/d/1St9CluXzDuQ0GcypXZreNAVkr2kL71O0qkOZV_6o3wk/edit?tab=t.0"
        className="underline"
      >
        Please fill out this form to let us know you are going to comment
      </Link>,
    ],
  },
  {
    title: "Tabling events at Parker Road Station",
    date: new Date("2025-01-09 12:00-05:00"),
    points: [
      "Tuesday - Thursday, January 7 - 9 from 6:00AM - 9:00AM",
      "Parker Road Station, Plano",
      "Tabling during rush hour at Parker Road station. " +
        "If you can only help for 30m or an hour during this time it would still be extremely helpful!",
    ],
  },
  {
    title: "Plano Hangout at 1418 Coffee",
    date: new Date("2025-01-04 16:00-05:00"),
    points: [
      "Saturday, January 4 from 1:00PM - 4:00PM",
      "1418 K Ave, Plano",
      "A chill social hangout at 1418 coffee in Downtown Plano. Invite your friends from Plano!",
    ],
  },
  {
    title: "DATA Holiday Social",
    date: new Date("2024-12-15 17:00-05:00"),
    points: [
      "Sunday, December 15, 2024 from 2:00PM - 5:00PM",
      "1508 Commerce St, Dallas",
      "Holiday social at Pegasus City Brewery",
    ],
  },
  {
    title: "DATA November General Meeting",
    date: new Date("2024-11-16 16:00-05:00"),
    points: [
      "Saturday, November 16, 2024 from 1:30PM - 4:00PM",
      "J. Erik Jonsson Central Library at 1515 Young Street, Dallas",
      "Hamon Training Room, 5th floor",
      <i>
        Disclosure: This event is not sponsored by the Dallas Public Library
      </i>,
      <Link
        href="https://docs.google.com/document/d/1St9CluXzDuQ0GcypXZreNAVkr2kL71O0qkOZV_6o3wk/edit?tab=t.0"
        className="underline"
      >
        Agenda
      </Link>,
      <Link
        href="https://drive.google.com/file/d/18SQQaRO3-QF_bM621SlqNByy5em8jchj/view"
        className="underline"
      >
        Recording
      </Link>,
      <Link
        href="https://docs.google.com/document/d/17ng6F8GmilgPP4dMpzQAqt-ygDfh6ZmBz_qVlgRd92g/edit?usp=sharing"
        className="underline"
      >
        Transcript
      </Link>,
      <Link
        href="https://drive.google.com/file/d/16Z7G_uqV5-lwlsXk-auaGnW3RsK5D6Ao/view?usp=sharing"
        className="underline"
      >
        Slides
      </Link>,
    ],
  },
  {
    title: "DATA October General Meeting",
    date: new Date("2024-10-19 00:00-05:00"),
    points: [
      "Saturday, October 19, 2024 from 2:00 - 4:00PM",
      "J. Erik Jonsson Central Library at 1515 Young Street, Dallas",
      "Hamon Training Room, 5th floor",
      <i>
        Disclosure: This event is not sponsored by the Dallas Public Library
      </i>,
      <Link
        href="https://docs.google.com/document/d/e/2PACX-1vQnUY6UbuIx1m5rX8eJnzp6CRlEYEe4XXkBOPdsCoXm2fzrzSFfKORe3AhpTLyWiqrdfEwN-38xaT31/pub"
        className="underline"
      >
        Agenda
      </Link>,
      <Link
        href="https://drive.google.com/file/d/1QlmEhxOhUI3ZMFiN32fOtvYGdXUSAhfI/view?usp=sharing"
        className="underline"
      >
        Recording
      </Link>,
      <Link
        href="https://docs.google.com/document/d/e/2PACX-1vR6a3KGKdJzVHfQwe5IC0m-tC9NG690ByBI335GlMU841QjZc_7Os1GfI5j-PgGIruZUjH6GPkRUtvz/pub"
        className="underline"
      >
        Minutes
      </Link>,
      <Link
        href="https://docs.google.com/document/d/e/2PACX-1vSlLwpU4GrjALEvaYKLVMQjHAw2e7BbiXy_0gJVUY1k7UTEtq5_uyx-u1FtDvD05rL3WaUy7lAmbVQF/pub"
        className="underline"
      >
        Transcript
      </Link>,
      <Link
        href="https://drive.google.com/file/d/16Z7G_uqV5-lwlsXk-auaGnW3RsK5D6Ao/view?usp=sharing"
        className="underline"
      >
        Slides
      </Link>,
    ],
  },
  {
    title: "Week Without Driving",
    date: new Date("2024-10-07 00:00-05:00"),
    points: [
      "Monday, September 30th - Sunday October 6th, 2024",
      "Partnering with Dallas Bicycle Coalition",
      <a href="https://weekwithoutdriving.org/" className="underline">
        Week Without Driving website
      </a>,
    ],
  },
  {
    title: "Speak at DART board meeting to support staff recommended budget",
    date: new Date("2024-09-25 00:00-05:00"),
    points: [
      "Tuesday, September 24th, 5:45PM",
      "DART Headquarters at Akard Station, 1401 Pacific Avenue",
      <Link href="/posts/august-2024-newsletter" className="underline">
        Speaking info & advice
      </Link>,
    ],
  },
  {
    title: "DATA September General Meeting",
    date: new Date("2024-09-21 00:00-05:00"),
    points: [
      "Saturday, September 21, 2024 from 1:30 - 3:30PM",
      "J. Erik Jonsson Central Library at 1515 Young Street, Dallas",
      "Hamon Training Room, 5th floor",
      <i>
        Disclosure: This event is not sponsored by the Dallas Public Library
      </i>,
      <>
        <b>DATA Election Info</b>
        <div className="ml-8 grid grid-cols-2 w-fit gap-1">
          <div>- Candidacy period</div>
          <div>Sept 2 - Sept 10</div>

          <div>- Early Voting</div>
          <div>Sept 16 - Sept 20</div>

          <div>- Voting</div>
          <div>Sept 21, 2:00 - 2:30PM</div>

          <div>- Tabulation</div>
          <div>Sept 21, 2:45PM</div>

          <div>- Results announced</div>
          <div>Sept 21 2:50PM</div>
        </div>
      </>,
      <Link
        href="https://docs.google.com/document/d/1M7-IS2JjXPPeE9pMLfwlhCjHqUlHczwBEYSWs1e316k"
        className="underline"
      >
        Meeting agenda
      </Link>,
      <Link
        href="https://drive.google.com/file/d/1dBjeae9kadSivVdb90S0wb2eAitrLRNv"
        className="underline"
      >
        Meeting recording
      </Link>,
      <Link
        href="https://docs.google.com/document/d/1A6VkltTQvLb_tDSgPfe9DDb7Ee4JmDatXhn4AdVgb2M"
        className="underline"
      >
        Meeting transcript
      </Link>,
    ],
  },
  {
    title: "Speak at Dallas City Council meeting to oppose cuts/caps",
    date: new Date("2024-08-28 09:00-05:00"),
    points: [
      "Wednesday, August 28th, 9AM",
      "Dallas City Hall at 1500 Marilla Street, Dallas",
      "Dallas residents should prioritize attending this over the DART board meeting",
      <Link href="/posts/august-2024-newsletter" className="underline">
        Speaking info & advice
      </Link>,
    ],
  },
  {
    title: "Speak at DART board meeting to oppose cuts/caps",
    date: new Date("2024-08-27 17:30-05:00"),
    points: [
      "Tuesday, August 27th, 5:30PM",
      "DART Headquarters at Akard Station, 1401 Pacific Avenue",
      <Link href="/posts/august-2024-newsletter" className="underline">
        Speaking info & advice
      </Link>,
    ],
  },
  {
    title: "Trash Pickup & Brunch at Farmers Branch Station",
    date: new Date("2024-08-04 09:00-05:00"),
    points: ["Sunday, August 4th, 9AM", "12800 Denton Drive, Farmers Branch"],
  },
  {
    title: "DATA August General Meeting",
    date: new Date("2024-08-18 15:00-05:00"),
    points: [
      "Sunday, August 18th, 3PM - 5PM",
      "The Metropolitan, 1200 Main Street, Dallas",
      <a
        href="https://go.ridewithdata.org/august2024-vod"
        className="underline"
      >
        Recording
      </a>,
      <a
        href="https://go.ridewithdata.org/august2024-minutes"
        className="underline"
      >
        Minutes
      </a>,
      <a
        href="https://go.ridewithdata.org/august2024-transcript"
        className="underline"
      >
        Transcript
      </a>,
    ],
  },
  {
    title: "DATA July General Meeting",
    date: new Date("2024-07-27 12:00-05:00"),
    points: [
      "Saturday, July 27th, 12PM - 3PM",
      "The Metropolitan, 1200 Main Street, Dallas",
    ],
  },
];

export default function Index() {
  return (
    <div className="leading-snug mb-20">
      <div className="my-12 md:my-16 md:mb-12 text-5xl md:text-7xl font-bold tracking-tighter">
        Calendar
      </div>

      <div className="text-2xl md:text-3xl mt-8 md:mt-12 mb-4 font-bold">
        Upcoming events
      </div>
      {scheduleData
        .filter(({ date }) => date.valueOf() > Date.now())
        .sort((a, b) => a.date.valueOf() - b.date.valueOf())
        .map(({ title, date, points }) => (
          <div key={date.valueOf()}>
            <div className="text-lg mt-8 font-semibold">{title}</div>
            <ul>
              {points.map((point) => (
                <li key={point.toString()}>{point}</li>
              ))}
            </ul>
          </div>
        ))}

      <div className="text-2xl md:text-3xl mt-8 md:mt-12 mb-4 font-bold">
        Past events
      </div>
      {scheduleData
        .filter(({ date }) => date.valueOf() < Date.now())
        .sort((a, b) => b.date.valueOf() - a.date.valueOf())
        .map(({ title, date, points }) => (
          <div key={date.valueOf()}>
            <div className="text-lg mt-8 font-semibold">{title}</div>
            <ul>
              {points.map((point) => (
                <li key={point.toString()}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
