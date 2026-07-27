import Link from "next/link";
import cn from "classnames";

import {
  CalendarItem,
  getGoogleCalendarEvents,
} from "@/lib/google-calendar-api";
import { Card } from "./card";

export const CalendarFeed = async () => {
  const events = await getGoogleCalendarEvents();
  if (events.length === 0) return null;

  return (
    <div>
      <div className="text-3xl md:text-4xl mt-8 md:mt-12 mb-4 font-bold">
        Upcoming events (All times in Central Time)
        <div className="text-2xl md:text-3xl mt-8 md:mt-12 mb-4 italic">
        All times in Central Time
        </div>
      </div>
      <CalendarEvents
        events={events.slice(0, 10)}
        className="sm:hidden lg:grid"
      />
      <CalendarEvents
        events={events.slice(0, 4)}
        className="hidden sm:grid lg:hidden"
      />
      <div className="2xl:mt-6 xl:mt-2 md:mt-4 mt-6">
        <Link
          href="/calendar"
          className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black"
        >
          See more on our calendar
        </Link>
        </div>
      </div>
  );
};

const CalendarEvents = ({
  events,
  className,
}: {
  events: CalendarItem[];
  className?: string;
}) => (
  <div
    className={cn(
      "mt-8 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4",
      className,
    )}
  >
    {events.map(({ summary, formattedTime, htmlLink, location }) => (
      <Link key={summary + events.length} target="_blank" href={htmlLink}>
        <Card className="h-full min-w-[220px] hover:shadow-yellow-500/30 dark:hover:shadow-yellow-500/20 transition-shadow duration-200">
          <div className="text-lg font-semibold">{summary}</div>
          <div className="text-sm text-slate-500">{location || "-"}</div>
          <div>{formattedTime}</div>
        </Card>
      </Link>
    ))}
  </div>
);
