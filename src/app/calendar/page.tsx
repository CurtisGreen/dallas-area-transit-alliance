import {
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay as isSameDayDateFns,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import {
  getCalendarEvents,
  isGoogleCalendarConfigured,
} from "@/lib/googleCalendar";
import EventsSection from "./_components/eventsSection";

// Invalidate the cache when a request comes in, at most once every hour
export const revalidate = 3600;

const PAST_EVENTS_PREVIEW_LIMIT = 6;
const UPCOMING_EVENTS_MONTH_LIMIT = 3;

type CalendarPageProps = {
  searchParams?: Promise<
    Record<string, string | string[] | undefined>
  >;
  params?: Promise<Record<string, string>>;
};

export default async function CalendarPage({ searchParams }: CalendarPageProps) {
  const resolvedSearchParams =
    ((await searchParams) ?? {}) as Record<string, string | string[] | undefined>;
  const configured = isGoogleCalendarConfigured();
  const events = configured ? await getCalendarEvents() : [];

  const now = new Date();
  const upcomingEvents: typeof events = [];
  const pastEvents: typeof events = [];

  events.forEach((event) => {
    const comparisonDate = event.end ?? event.start;
    if (comparisonDate.getTime() >= now.getTime()) {
      upcomingEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

  pastEvents.reverse();

  const rawShowAllPast = Array.isArray(resolvedSearchParams.showAllPast)
    ? resolvedSearchParams.showAllPast[0]
    : resolvedSearchParams.showAllPast;

  const showAllPast =
    rawShowAllPast === "1" ||
    rawShowAllPast === "true" ||
    rawShowAllPast === "yes";

  const rawShowAllUpcoming = Array.isArray(resolvedSearchParams.showAllUpcoming)
    ? resolvedSearchParams.showAllUpcoming[0]
    : resolvedSearchParams.showAllUpcoming;

  const showAllUpcoming =
    rawShowAllUpcoming === "1" ||
    rawShowAllUpcoming === "true" ||
    rawShowAllUpcoming === "yes";

  const {
    previewEvents: upcomingPreviewEvents,
    hasMore: hasMoreUpcomingToShow,
  } = getUpcomingEventPreview(upcomingEvents);

  const {
    previewEvents: pastPreviewEvents,
    hasMore: hasMorePastToShow,
  } = getPastEventPreview(pastEvents);

  const addToGoogleCalendarUrl = "https://go.ridewithdata.org/calendar";
  const calendarIcsUrl = "https://go.ridewithdata.org/public-ics";

  return (
    <div className="leading-snug mb-20">
      <div className="my-12 md:my-16 md:mb-12 text-5xl md:text-7xl font-bold tracking-tighter">
        Calendar
      </div>

      {!configured ? (
        <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          Google Calendar sync is not configured. Set the `GOOGLE_CALENDAR_ID`
          and `GOOGLE_CALENDAR_API_KEY` environment variables to display events.
        </div>
      ) : (
        <>
          <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
            <div className="font-semibold text-slate-800">Stay in sync</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {addToGoogleCalendarUrl ? (
                <li>
                  <a
                    href={addToGoogleCalendarUrl}
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add this calendar to your Google Calendar
                  </a>
                </li>
              ) : null}
              {calendarIcsUrl ? (
                <li>
                  <a
                    href={calendarIcsUrl}
                    className="underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Subscribe with iCal (.ics) compatible apps
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <CalendarMonthView events={events} />

          <EventsSection
            title="Upcoming events"
            previewEvents={upcomingPreviewEvents}
            allEvents={upcomingEvents}
            hasMore={hasMoreUpcomingToShow}
            expandLabel="Show additional future events"
            collapseLabel="Show fewer future events"
            emptyMessage="No upcoming events found."
            forceExpanded={showAllUpcoming}
          />

          <EventsSection
            title="Past events"
            previewEvents={pastPreviewEvents}
            allEvents={pastEvents}
            hasMore={hasMorePastToShow}
            expandLabel="Show older events"
            collapseLabel="Show fewer past events"
            emptyMessage="No past events found."
            forceExpanded={showAllPast}
          />
        </>
      )}
    </div>
  );
}

function getUpcomingEventPreview(
  upcomingEvents: Awaited<ReturnType<typeof getCalendarEvents>>,
) {
  if (upcomingEvents.length === 0) {
    return { previewEvents: upcomingEvents, hasMore: false };
  }

  const cutoffTime = addMonths(new Date(), UPCOMING_EVENTS_MONTH_LIMIT).getTime();
  let selected = upcomingEvents.filter((event) => {
    const eventTime = (event.end ?? event.start).getTime();
    return eventTime <= cutoffTime;
  });

  if (selected.length === 0) {
    selected = [upcomingEvents[0]];
  }

  const hasMore = selected.length < upcomingEvents.length;

  return { previewEvents: selected, hasMore };
}

type CalendarMonthViewProps = {
  events: Awaited<ReturnType<typeof getCalendarEvents>>;
};

function CalendarMonthView({ events }: CalendarMonthViewProps) {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const calendarDays = eachDayOfInterval({
    start: startOfWeek(monthStart, { weekStartsOn: 0 }),
    end: endOfWeek(monthEnd, { weekStartsOn: 0 }),
  });

  const eventsByDay = groupEventsByDay(events);
  const weekDayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="mt-8 md:mt-12">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div className="text-3xl md:text-4xl font-bold">Calendar view</div>
        <div className="text-slate-600">
          {format(monthStart, "MMMM yyyy")}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-px rounded-lg border border-slate-200 bg-slate-200 text-xs md:text-sm">
        {weekDayLabels.map((label) => (
          <div
            key={label}
            className="bg-slate-50 py-2 text-center font-semibold uppercase tracking-wide text-slate-600"
          >
            {label}
          </div>
        ))}

        {calendarDays.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const eventsForDay = eventsByDay.get(dayKey) ?? [];
          const displayEvents = eventsForDay.slice(0, 3);
          const extraEventsCount = eventsForDay.length - displayEvents.length;

          const isToday = isSameDayDateFns(day, today);
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <div
              key={dayKey}
              className="min-h-[120px] bg-white p-2"
              data-today={isToday ? "true" : undefined}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span
                  className={
                    isCurrentMonth ? "text-slate-900" : "text-slate-400"
                  }
                >
                  {format(day, "d")}
                </span>
                {isToday ? (
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white">
                    Today
                  </span>
                ) : null}
              </div>

              <ul className="mt-2 space-y-1">
                {displayEvents.map((event) => (
                  <li
                    key={`${event.id}-${dayKey}`}
                    className="rounded bg-slate-100 px-2 py-1 text-[11px] font-medium leading-tight text-slate-700"
                  >
                    {event.isAllDay
                      ? event.title
                      : `${format(event.start, "h:mm a")} · ${event.title}`}
                  </li>
                ))}
                {extraEventsCount > 0 ? (
                  <li className="px-2 py-1 text-[11px] text-slate-500">
                    +{extraEventsCount} more
                  </li>
                ) : null}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-xs text-slate-600">
        Need the full calendar?{" "}
        <a
          href="https://go.ridewithdata.org/calendar"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open it in Google Calendar
        </a>
        .
      </div>
    </div>
  );
}

function groupEventsByDay(
  events: Awaited<ReturnType<typeof getCalendarEvents>>,
) {
  const map = new Map<string, typeof events>();

  events.forEach((event) => {
    const start = startOfDay(event.start);
    const end = startOfDay(event.end ?? event.start);

    const days = eachDayOfInterval({
      start,
      end: endOfDay(end),
    });

    days.forEach((day) => {
      const key = format(day, "yyyy-MM-dd");
      if (!map.has(key)) {
        map.set(key, []);
      }

      map.get(key)!.push(event);
    });
  });

  return map;
}

function getPastEventPreview(
  pastEvents: Awaited<ReturnType<typeof getCalendarEvents>>,
) {
  if (pastEvents.length === 0) {
    return { previewEvents: pastEvents, hasMore: false };
  }

  const previewEvents = pastEvents.slice(0, PAST_EVENTS_PREVIEW_LIMIT);
  const hasMore = pastEvents.length > PAST_EVENTS_PREVIEW_LIMIT;

  return { previewEvents, hasMore };
}
