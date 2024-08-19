const scheduleData = [
  {
    title: "Week Without Driving",
    date: new Date("2024-09-30 00:00-05:00"),
    points: [
      "Monday, September 30th - Sunday October 6th, 2024",
      "Partnering with Dallas Bicycle Coalition",
      <a href="https://weekwithoutdriving.org/" className="underline">
        More info
      </a>,
    ],
  },
  {
    title: "Speak at Dallas City Council meeting to oppose cuts/caps",
    date: new Date("2024-08-28 09:00-05:00"),
    points: [
      "Wednesday, August 28th, 9AM",
      "Dallas City Hall at 1500 Marilla Street, Dallas",
      "Dallas residents should prioritize attending this over the 27th DART board meeting",
      <a href="/posts/august-2024-newsletter" className="underline">
        More info
      </a>,
    ],
  },
  {
    title: "Speak at DART board meeting to oppose cuts/caps",
    date: new Date("2024-08-27 17:30-05:00"),
    points: [
      "Tuesday, August 27th, 5:30PM",
      "DART Headquarters at Akard Station, 1401 Pacific Avenue",
      <a href="/posts/august-2024-newsletter" className="underline">
        More info
      </a>,
    ],
  },
  {
    title: "Trash Pickup & Brunch at Farmers Branch Station",
    date: new Date("2024-08-18 15:00-05:00"),
    points: ["Sunday, August 4th, 9AM", "12800 Denton Drive, Farmers Branch"],
  },
  {
    title: "DATA general meeting",
    date: new Date("2024-08-18 15:00-05:00"),
    points: [
      "Sunday, August 18th, 3PM - 5PM",
      "The Metropolitan, 1200 Main Street, Dallas",
    ],
  },
  {
    title: "DATA general meeting",
    date: new Date("2024-07-27 12:00-05:00"),
    points: [
      "Saturday, July 27th, 12PM - 3PM",
      "The Metropolitan, 1200 Main Street, Dallas",
    ],
  },
];

export default function Index() {
  return (
    <div className="leading-tight">
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
            <div className="text-lg mt-8">{title}</div>
            <ul>
              {points.map((point) => (
                <li>{point}</li>
              ))}
            </ul>
          </div>
        ))}

      <div className="text-2xl md:text-3xl mt-8 md:mt-12 mb-4 font-bold">
        Past events
      </div>
      {scheduleData
        .filter(({ date }) => date.valueOf() < Date.now())
        .sort((a, b) => a.date.valueOf() - b.date.valueOf())
        .map(({ title, date, points }) => (
          <div key={date.valueOf()}>
            <div className="text-lg mt-5">{title}</div>
            <ul>
              {points.map((point) => (
                <li>{point}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
