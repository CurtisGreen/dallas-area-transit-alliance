'use client';

import { useMemo, useState } from "react";

import {
  CalendarEvent,
  formatEventDateRange,
} from "@/lib/googleCalendar";

type EventsSectionProps = {
  title: string;
  previewEvents: CalendarEvent[];
  allEvents: CalendarEvent[];
  hasMore: boolean;
  expandLabel: string;
  collapseLabel: string;
  emptyMessage: string;
  forceExpanded?: boolean;
};

export default function EventsSection({
  title,
  previewEvents,
  allEvents,
  hasMore,
  expandLabel,
  collapseLabel,
  emptyMessage,
  forceExpanded = false,
}: EventsSectionProps) {
  const [expanded, setExpanded] = useState(forceExpanded);

  const eventsToRender = useMemo(() => {
    if (expanded || !hasMore) {
      return allEvents;
    }

    return previewEvents;
  }, [expanded, hasMore, allEvents, previewEvents]);

  const showToggle = hasMore;

  return (
    <section className="mt-8 md:mt-12" aria-labelledby={titleId(title)}>
      <div
        id={titleId(title)}
        className="text-3xl md:text-4xl mb-4 font-bold"
      >
        {title}
      </div>

      {eventsToRender.length === 0 ? (
        <p>{emptyMessage}</p>
      ) : (
        eventsToRender.map((event) => <EventDetails key={event.id} event={event} />)
      )}

      {showToggle ? (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 underline decoration-slate-500 underline-offset-4 hover:text-slate-900"
          aria-expanded={expanded}
        >
          <span aria-hidden>{expanded ? "▴" : "▾"}</span>
          {expanded ? collapseLabel : expandLabel}
        </button>
      ) : null}
    </section>
  );
}

type EventDetailsProps = {
  event: CalendarEvent;
};

function EventDetails({ event }: EventDetailsProps) {
  const { title, location, descriptionLines, htmlLink } = event;

  const points = useMemo(
    () =>
      [
        formatEventDateRange(event),
        location ? `Location: ${location}` : null,
        ...descriptionLines,
      ].filter(Boolean) as string[],
    [event, location, descriptionLines],
  );

  return (
    <div>
      <div className="text-lg mt-8 font-semibold">{title}</div>
      <ul>
        {points.map((point, index) => (
          <li key={`${event.id}-${index}`}>{renderLine(point)}</li>
        ))}
        {htmlLink ? (
          <li key={`${event.id}-link`}>
            <a
              href={htmlLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              View in Google Calendar
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

function renderLine(line: string) {
  const segments = line.split(/(https?:\/\/\S+)/g);

  if (segments.length === 1) {
    return line;
  }

  return segments.map((segment, index) => {
    if (segment.match(/^https?:\/\/\S+$/)) {
      return (
        <a
          key={`${segment}-${index}`}
          href={segment}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          {segment}
        </a>
      );
    }

    return <span key={`${segment}-${index}`}>{segment}</span>;
  });
}

function titleId(title: string) {
  return title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
