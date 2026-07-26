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
      const hasTime = !!item.start.dateTime;
      const centralTime = " 0:00-5:00";
      const sd = new Date(item.start.dateTime || item.start.date + centralTime);
      const ed = new Date(item.end.dateTime || item.end.date + centralTime);

      const startDateTimeFormat: Intl.DateTimeFormatOptions = hasTime
        ? {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            day: "numeric",
            month: "short",
            weekday: "short",
            timeZone: "America/Chicago",
          }
        : {
            day: "numeric",
            month: "short",
            weekday: "short",
            timeZone: "America/Chicago",
          };
      const endDateTimeFormat: Intl.DateTimeFormatOptions = hasTime
        ? {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            timeZone: "America/Chicago",
          }
        : {
            day: "numeric",
            timeZone: "America/Chicago",
          };

      const s = sd.toLocaleString("en-US", startDateTimeFormat);
      const e = ed.toLocaleString("en-US", endDateTimeFormat);

      return {
        htmlLink: item.htmlLink,
        summary: item.summary,
        location: item.location,
        date: sd,
        start: s,
        end: e,
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  return formattedArticles;
};
