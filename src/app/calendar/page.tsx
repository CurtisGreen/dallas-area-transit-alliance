import { addMonths } from "date-fns";

import {
  getCalendarEvents,
  isGoogleCalendarConfigured,
} from "@/lib/googleCalendar";
import CalendarMonthView from "./_components/calendarMonthView";
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
