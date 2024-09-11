import Link from "next/link";

const scheduleData = [
  {
    title: "Week Without Driving",
    date: new Date("2024-09-30 00:00-05:00"),
    points: [
      "Monday, September 30th - Sunday October 6th, 2024",
      "Partnering with Dallas Bicycle Coalition",
      <a href="https://weekwithoutdriving.org/" className="underline">
        Week Without Driving website
      </a>,
    ],
  },
  {
    title: "DATA September General Meeting",
    date: new Date("2024-09-21 00:00-05:00"),
    points: [
      "Saturday, September 21, 2024 from 1:30 - 3:30PM",
      "J. Erik Jonsson Central Library at 1515 Young Street, Dallas",
      "Hamon Training Room, 5th floor",
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
    <div className="leading-tight mb-10">
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
            <div className="text-lg mt-8 font-medium">{title}</div>
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
            <div className="text-lg mt-5">{title}</div>
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
