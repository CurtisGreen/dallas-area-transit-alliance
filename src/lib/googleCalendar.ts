import { addDays, isSameDay, parseISO } from "date-fns";

const DEFAULT_TIME_ZONE =
  process.env.GOOGLE_CALENDAR_TIMEZONE ?? "America/Chicago";

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date | null;
  isAllDay: boolean;
  location?: string;
  descriptionLines: string[];
  htmlLink?: string;
  timeZone: string;
}

interface GoogleCalendarListResponse {
  items?: GoogleCalendarEvent[];
}

interface GoogleCalendarEvent {
  id?: string;
  status?: string;
  summary?: string;
  start?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  end?: {
    date?: string;
    dateTime?: string;
    timeZone?: string;
  };
  location?: string;
  description?: string;
  htmlLink?: string;
}

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;

const SIX_MONTHS_IN_MS = 1000 * 60 * 60 * 24 * 30 * 6;

export function isGoogleCalendarConfigured() {
  return Boolean(CALENDAR_ID && API_KEY);
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  if (!isGoogleCalendarConfigured()) {
    return [];
  }

  const timeMin = new Date(Date.now() - SIX_MONTHS_IN_MS).toISOString();
  const timeMax = addDays(new Date(), 365).toISOString();

  const url = new URL(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
      CALENDAR_ID!,
    )}/events`,
  );

  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("timeMin", timeMin);
  url.searchParams.set("timeMax", timeMax);
  url.searchParams.set("maxResults", "250");
  url.searchParams.set("showDeleted", "false");
  url.searchParams.set("key", API_KEY!);

  const response = await fetch(url, {
    // Cache on the server for an hour to match the page revalidation.
    next: { revalidate: 3600, tags: ["calendar-events"] },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to load Google Calendar events: ${response.status} ${response.statusText}`,
    );
  }

  const payload = (await response.json()) as GoogleCalendarListResponse;
  const items = payload.items ?? [];

  return items
    .filter((event) => event.status !== "cancelled")
    .map(normalizeCalendarEvent)
    .filter((event): event is CalendarEvent => Boolean(event))
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}

function normalizeCalendarEvent(event: GoogleCalendarEvent): CalendarEvent | null {
  if (!event.id || !event.summary || !event.start) {
    return null;
  }

  const isAllDay = Boolean(event.start.date && !event.start.dateTime);
  const start = parseDatePart(event.start);
  const rawEnd = parseDatePart(event.end);

  if (!start) {
    return null;
  }

  const end = normalizeEndDate(rawEnd, isAllDay);
  const timeZone =
    event.start?.timeZone || event.end?.timeZone || DEFAULT_TIME_ZONE;

  return {
    id: event.id,
    title: event.summary.trim(),
    start,
    end,
    isAllDay,
    location: event.location?.trim(),
    descriptionLines: extractDescriptionLines(event.description),
    htmlLink: event.htmlLink,
    timeZone,
  };
}

function parseDatePart(part?: { date?: string; dateTime?: string }) {
  if (!part) {
    return null;
  }

  if (part.dateTime) {
    return new Date(part.dateTime);
  }

  if (part.date) {
    return parseISO(part.date);
  }

  return null;
}

function normalizeEndDate(date: Date | null, isAllDay: boolean) {
  if (!date) {
    return null;
  }

  if (!isAllDay) {
    return date;
  }

  // Google represents all-day events with the end date set to the following day.
  const previousDay = addDays(date, -1);
  return previousDay;
}

function extractDescriptionLines(description?: string) {
  if (!description) {
    return [];
  }

  const normalized = description
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return normalized;
}

export function formatEventDateRange(event: CalendarEvent) {
  const { start, end, isAllDay, timeZone } = event;

  if (!end) {
    return formatSingleDate(start, isAllDay, timeZone);
  }

  if (isAllDay) {
    if (isSameDay(start, end)) {
      return formatSingleDate(start, true, timeZone);
    }

    return `${formatSingleDate(start, true, timeZone)} - ${formatSingleDate(
      end,
      true,
      timeZone,
    )}`;
  }

  if (isSameDay(start, end)) {
    return `${formatSingleDate(start, false, timeZone)} - ${formatTime(
      end,
      timeZone,
    )}`;
  }

  return `${formatSingleDate(start, false, timeZone)} - ${formatSingleDate(
    end,
    false,
    timeZone,
  )}`;
}

function formatSingleDate(date: Date, isAllDay: boolean, timeZone: string) {
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone,
  });

  const formattedDate = dateFormatter.format(date);

  if (isAllDay) {
    return formattedDate;
  }

  return `${formattedDate} ${formatTime(date, timeZone)}`;
}

function formatTime(date: Date, timeZone: string) {
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });

  return timeFormatter.format(date);
}
