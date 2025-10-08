'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import type { CalendarEvent } from "@/lib/googleCalendar";

type CalendarMonthViewProps = {
  events: CalendarEvent[];
};

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type ActiveEventState = {
  event: CalendarEvent;
  dayKey: string;
  anchorRect: DOMRect;
  anchorNode: HTMLElement;
};

export default function CalendarMonthView({ events }: CalendarMonthViewProps) {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(() => startOfMonth(today));
  const [expandedDays, setExpandedDays] = useState<Record<string, boolean>>(
    {},
  );
  const [activeEvent, setActiveEvent] = useState<ActiveEventState | null>(null);

  const eventsByDay = useMemo(() => groupEventsByDay(events), [events]);

  const calendarDays = useMemo(() => {
    const monthEnd = endOfMonth(currentMonth);
    return eachDayOfInterval({
      start: startOfWeek(currentMonth, { weekStartsOn: 0 }),
      end: endOfWeek(monthEnd, { weekStartsOn: 0 }),
    });
  }, [currentMonth]);

  useEffect(() => {
    setExpandedDays({});
  }, [currentMonth]);

  useEffect(() => {
    setActiveEvent(null);
  }, [currentMonth, events]);

  const monthLabel = format(currentMonth, "MMMM yyyy");

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => startOfMonth(addMonths(prev, -1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => startOfMonth(addMonths(prev, 1)));
  };

  const toggleDay = (dayKey: string) => {
    setExpandedDays((prev) => {
      const next = { ...prev, [dayKey]: !prev[dayKey] };

      if (!next[dayKey]) {
        delete next[dayKey];
      }

      return next;
    });
  };

  const handleEventClick = (
    calendarEvent: CalendarEvent,
    dayKey: string,
    target: HTMLButtonElement,
  ) => {
    setActiveEvent((previous) => {
      if (
        previous &&
        previous.event.id === calendarEvent.id &&
        previous.dayKey === dayKey
      ) {
        return null;
      }

      return {
        event: calendarEvent,
        dayKey,
        anchorRect: target.getBoundingClientRect(),
        anchorNode: target,
      };
    });
  };

  return (
    <div className="mt-8 md:mt-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="text-3xl md:text-4xl font-bold">Calendar view</div>
        <div className="flex items-center justify-between gap-3 md:justify-end">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="View previous month"
          >
            Prev
          </button>
          <div className="min-w-[140px] text-center text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">
            {monthLabel}
          </div>
          <button
            type="button"
            onClick={handleNextMonth}
            className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="View next month"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-px rounded-3xl border border-slate-200 bg-slate-200 text-xs md:text-sm overflow-hidden">
        {WEEKDAY_LABELS.map((label) => (
          <div
            key={label}
            className="bg-slate-50 py-2 text-center font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300"
          >
            {label}
          </div>
        ))}

        {calendarDays.map((day) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const eventsForDay = eventsByDay.get(dayKey) ?? [];
          const isExpanded = Boolean(expandedDays[dayKey]);
          const visibleEvents = isExpanded
            ? eventsForDay
            : eventsForDay.slice(0, 3);
          const extraCount = Math.max(eventsForDay.length - 3, 0);

          const isToday = isSameDay(day, today);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          const listClasses = `mt-2 space-y-1 list-none${
            isExpanded ? " max-h-36 overflow-y-auto pr-1" : ""
          }`;

          return (
            <div
              key={dayKey}
              className="min-h-[120px] bg-white p-2 dark:bg-slate-900 dark:text-slate-200"
              data-today={isToday ? "true" : undefined}
            >
              <div className="flex items-center justify-between text-xs font-semibold">
                <span
                  className={
                    isCurrentMonth
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-400 dark:text-slate-500"
                  }
                >
                  {format(day, "d")}
                </span>
                {isToday ? (
                  <span className="rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-semibold uppercase text-slate-900">
                    Today
                  </span>
                ) : null}
              </div>

              <ul className={listClasses}>
                {visibleEvents.map((event) => (
                  <li
                    key={`${event.id}-${dayKey}`}
                    className="rounded bg-slate-100 text-[11px] font-medium leading-tight text-slate-700 shadow-sm ring-1 ring-slate-200/70 transition hover:ring-yellow-400/80 focus-within:ring-yellow-400/80 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700/60"
                  >
                    <button
                      type="button"
                      onClick={(eventDetails) =>
                        handleEventClick(
                          event,
                          dayKey,
                          eventDetails.currentTarget,
                        )
                      }
                      className="flex w-full items-start gap-1 text-left"
                      aria-label={`View details for ${event.title} on ${format(
                        day,
                        "MMMM d, yyyy",
                      )}`}
                    >
                      <span className="whitespace-pre-wrap break-words leading-tight">
                        {renderEventLabel(event, day)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {extraCount > 0 ? (
                <button
                  type="button"
                  onClick={() => toggleDay(dayKey)}
                  className="mt-1 text-[11px] font-semibold text-slate-600 underline underline-offset-2 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                  aria-expanded={isExpanded}
                >
                  {isExpanded
                    ? "Show fewer events"
                    : `Show ${extraCount} more`}
                </button>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-3 text-xs text-slate-600 dark:text-slate-300">
        Need the full calendar?{" "}
        <a
          href="https://go.ridewithdata.org/calendar"
          className="underline hover:text-slate-800 dark:text-slate-100 dark:hover:text-slate-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open it in Google Calendar
        </a>
        .
      </div>

      {activeEvent ? (
        <EventDetailsBubble
          event={activeEvent.event}
          anchorRect={activeEvent.anchorRect}
          anchorNode={activeEvent.anchorNode}
          onClose={() => setActiveEvent(null)}
        />
      ) : null}
    </div>
  );
}

function groupEventsByDay(events: CalendarEvent[]) {
  const map = new Map<string, CalendarEvent[]>();

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

function renderEventLabel(event: CalendarEvent, day: Date) {
  const endDate = event.end ?? event.start;
  const isStart = isSameDay(day, event.start);
  const isEnd = isSameDay(day, endDate);
  const spansMultiple = !isSameDay(event.start, endDate);

  if (event.isAllDay) {
    if (!spansMultiple) {
      return event.title;
    }

    if (isStart) {
      return `${event.title} (begins)`;
    }

    if (isEnd) {
      return `${event.title} (ends)`;
    }

    return `${event.title} (continues)`;
  }

  const startLabel = format(event.start, "h:mm a");

  if (!spansMultiple) {
    return `${startLabel} - ${event.title}`;
  }

  if (isStart) {
    return `${startLabel} - ${event.title}`;
  }

  if (isEnd && event.end) {
    return `${event.title} (ends ${format(event.end, "h:mm a")})`;
  }

  return `${event.title} (continues)`;
}

type EventDetailsBubbleProps = {
  event: CalendarEvent;
  anchorRect: DOMRect;
  anchorNode: HTMLElement;
  onClose: () => void;
};

type BubblePosition = {
  top: number;
  left: number;
  width: number;
  placement: "top" | "bottom";
};

function EventDetailsBubble({
  event,
  anchorRect,
  anchorNode,
  onClose,
}: EventDetailsBubbleProps) {
  const { title, location, descriptionLines, htmlLink } = event;
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState<BubblePosition>(() =>
    computeBubblePosition(anchorRect),
  );

  const recomputePosition = useCallback(() => {
    if (!anchorNode.isConnected) {
      onClose();
      return;
    }

    const rect = anchorNode.getBoundingClientRect();
    setPosition(computeBubblePosition(rect));
  }, [anchorNode, onClose]);

  useEffect(() => {
    recomputePosition();
  }, [recomputePosition]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (
        bubbleRef.current?.contains(target) ||
        anchorNode.contains(target)
      ) {
        return;
      }

      onClose();
    }

    window.addEventListener("resize", recomputePosition);
    window.addEventListener("scroll", recomputePosition, true);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("resize", recomputePosition);
      window.removeEventListener("scroll", recomputePosition, true);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [anchorNode, onClose, recomputePosition]);

  const arrowClass =
    position.placement === "bottom"
      ? "top-0 -translate-y-1/2 border-b-0 border-r-0"
      : "bottom-0 translate-y-1/2 border-t-0 border-l-0";

  return (
    <div
      ref={bubbleRef}
      className="fixed z-50"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
      }}
      role="dialog"
      aria-label={`Details for ${title}`}
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        style={{ overflowWrap: "anywhere" }}
      >
        <span
          className={`absolute left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 ${arrowClass}`}
        />

        <div className="p-6 pb-5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5 break-words whitespace-pre-wrap">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 break-words whitespace-pre-wrap">
                {title}
              </h2>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300 break-words whitespace-pre-wrap">
                {formatEventMetaLine(event)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-800 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Close event details"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="mt-4 space-y-3 text-sm text-slate-700 break-words whitespace-pre-wrap dark:text-slate-200">
            {location ? (
              <DetailRow icon={<LocationIcon />} text={location} />
            ) : null}

            {descriptionLines.length > 0 ? (
              <DetailRow
                icon={<NoteIcon />}
                text={descriptionLines.map((line, index) => (
                  <span key={`${event.id}-description-${index}`}>
                    {renderDescriptionLine(line)}
                    {index < descriptionLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              />
            ) : null}

            {htmlLink ? (
              <DetailRow
                icon={<LinkIcon />}
                text={
                  <a
                    href={htmlLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold underline hover:text-slate-600 dark:hover:text-slate-300"
                  >
                    View in Google Calendar
                  </a>
                }
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function computeBubblePosition(rect: DOMRect): BubblePosition {
  if (typeof window === "undefined") {
    return { top: rect.bottom, left: rect.left, width: 320, placement: "bottom" };
  }

  const margin = 12;
  const gap = 10;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const rawWidth = viewportWidth - margin * 2;
  const width = Math.min(320, Math.max(rawWidth, 220));
  const estimatedHeight = 220;

  let placement: "top" | "bottom" = "bottom";
  let top = rect.bottom + gap;

  if (top + estimatedHeight > viewportHeight - margin) {
    placement = "top";
    top = Math.max(margin, rect.top - gap - estimatedHeight);
  }

  let left = rect.left + rect.width / 2 - width / 2;
  left = Math.min(
    viewportWidth - width - margin,
    Math.max(margin, left),
  );

  return { top, left, width, placement };
}

function renderDescriptionLine(line: string) {
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
          className="underline hover:text-slate-500 dark:hover:text-slate-300 break-words"
          style={{ overflowWrap: "anywhere" }}
        >
          {segment}
        </a>
      );
    }

    return (
      <span
        key={`${segment}-${index}`}
        className="break-words"
        style={{ overflowWrap: "anywhere" }}
      >
        {segment}
      </span>
    );
  });
}

function formatEventMetaLine(event: CalendarEvent) {
  const start = event.start;
  const rawEnd = event.end;
  const end = rawEnd ?? event.start;
  const hasDistinctEnd = Boolean(rawEnd && rawEnd.getTime() !== start.getTime());
  const baseDateFormat = "EEEE, MMMM d, yyyy";

  if (event.isAllDay) {
    if (isSameDay(start, end)) {
      return format(start, baseDateFormat);
    }

    return `${format(start, baseDateFormat)} - ${format(end, baseDateFormat)}`;
  }

  const startTime = format(start, "h:mm a");
  if (!hasDistinctEnd) {
    return `${format(start, baseDateFormat)} - ${startTime}`;
  }

  if (isSameDay(start, end)) {
    const endTime = format(end, "h:mm a");
    return `${format(start, baseDateFormat)} - ${startTime} to ${endTime}`;
  }

  const endTime = format(end, "h:mm a");
  return `${format(start, baseDateFormat)} ${startTime} to ${format(end, baseDateFormat)} ${endTime}`;
}

type DetailRowProps = {
  icon: ReactNode;
  text: ReactNode;
};

function DetailRow({ icon, text }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-slate-400 dark:text-slate-500">{icon}</span>
      <div
        className="break-words whitespace-pre-wrap"
        style={{ overflowWrap: "anywhere" }}
      >
        {text}
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M10.59 13.41a1 1 0 0 0 1.41 0l4.29-4.3v2.59a1 1 0 1 0 2 0V6.51a1 1 0 0 0-1-1h-5.19a1 1 0 1 0 0 2h2.58l-4.29 4.3a1 1 0 0 0 0 1.4ZM18 12a1 1 0 0 0-1 1v4H7v-4a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h13a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1Z" />
    </svg>
  );
}

function NoteIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M6 3a2 2 0 0 0-2 2v14l4-2 4 2 4-2 4 2V5a2 2 0 0 0-2-2H6Zm3.5 5h5a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2Zm0 4h5a1 1 0 1 1 0 2h-5a1 1 0 1 1 0-2Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </svg>
  );
}
