type GoogleCalendarResponse = {
  items: GoogleCalendarItem[];
};

type GoogleCalendarItem = {
  status: string; // "confirmed"
  htmlLink: string;
  summary: string;
  location: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end: {
    dateTime?: string;
    date?: string;
  };
};

export type CalendarItem = {
  htmlLink: string;
  summary: string;
  location: string;
  start: string;
  end: string;
};

const getDateFormat = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) return { start: "-", end: "-" };

  const start = new Date(startDate).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    weekday: "short",
    timeZone: "UTC",
  });
  const end = new Date(endDate).toLocaleString("en-US", {
    day: "numeric",
    timeZone: "UTC",
  });
  return { start, end };
};

const getDateTimeFormat = (startDate?: string, endDate?: string) => {
  if (!startDate || !endDate) return { start: "-", end: "-" };

  const start = new Date(startDate).toLocaleString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "short",
    weekday: "short",
    timeZone: "America/Chicago",
  });
  const end = new Date(endDate).toLocaleString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    timeZone: "America/Chicago",
  });
  return { start, end };
};

export const getGoogleCalendarEvents = async () => {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const oneWeekLater = new Date(startOfDay);
  oneWeekLater.setDate(oneWeekLater.getDate() + 8); // Use 8 since we're looking at start of day

  const url = `
    https://clients6.google.com/calendar/v3/calendars/c_b84185fb0c5798bfc8d926ac5013d4ed1fdbd0c3fb79a960686fbb9250037595@group.calendar.google.com/events
    ?calendarId=c_b84185fb0c5798bfc8d926ac5013d4ed1fdbd0c3fb79a960686fbb9250037595@group.calendar.google.com
    &singleEvents=true
    &eventTypes=default
    &eventTypes=focusTime
    &eventTypes=outOfOffice
    &timeZone=America/Chicago
    &maxAttendees=1
    &maxResults=50
    &sanitizeHtml=true
    &timeMin=${startOfDay.toISOString()}
    &timeMax=${oneWeekLater.toISOString()}
    &key=AIzaSyDOtGM5jr8bNp1utVpG2_gSRH03RNGBkI8
    &$unique=gc237
  `;
  const cleanUrl = url.replaceAll("\n", "").replaceAll(" ", "");
  const data = await fetch(cleanUrl, { next: { revalidate: 0 } });
  const res: GoogleCalendarResponse = await data.json();

  const formattedArticles: CalendarItem[] = res.items
    .filter(({ status }) => status === "confirmed")
    .map((item) => {
      const hasTime = !!item.start.dateTime && !!item.end.dateTime;
      const { start, end } = hasTime
        ? getDateTimeFormat(item.start.dateTime, item.end.dateTime)
        : getDateFormat(item.start.date, item.end.date);

      const centralTime = " 0:00-5:00";
      const sd = new Date(item.start.dateTime || item.start.date + centralTime);

      return {
        htmlLink: item.htmlLink,
        summary: item.summary,
        location: item.location,
        date: sd,
        start: start,
        end: end,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return formattedArticles;
};
