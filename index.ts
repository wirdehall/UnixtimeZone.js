declare global {
  interface Window { unixtime_js_prefix_impossible_collision_timezone_offset: number; }
}

window.unixtime_js_prefix_impossible_collision_timezone_offset = window.unixtime_js_prefix_impossible_collision_timezone_offset || 0;

const HOUR = 3600;

export const toTimezone = (unixtime: number, timezoneOffset: number) => unixtime + timezoneOffset * HOUR;
export const fromTimezone = (timestamp: number, timezoneOffset: number) => timestamp + -timezoneOffset * HOUR;

export const formatTimestamp = (unixTimestamp: number, format?: string) => {
  const timezoneConvertedTimestamp = toTimezone(unixTimestamp, window.unixtime_js_prefix_impossible_collision_timezone_offset);
  const date = new Date(timezoneConvertedTimestamp * 1000);
  if (typeof format === 'undefined') {
    const iso = date.toISOString().match(/(\d{4})\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/);
    return iso[1] + ' ' + iso[2];
  } else {
    return strftime(date, format);
  }
};

export const toUnixtime = (datetime: string) => {
  const timestamp = Math.floor(new Date(datetime).getTime() / 1000);
  const unixtime = toTimezone(timestamp, window.unixtime_js_prefix_impossible_collision_timezone_offset);
  return unixtime;
};

export const setTimezoneOffset = (timezoneOffset: number) => {
  (window as any).unixtime_js_prefix_impossible_collision_timezone_offset = timezoneOffset;
};


const strftime = (date: Date, sFormat: string) => {
  const nDay = date.getDay();
  const nDate = date.getDate();
  const nMonth = date.getMonth();
  const nYear = date.getFullYear();
  const nHour = date.getHours();
  const aDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const aMonths = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  const aDayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  const isLeapYear = () => {
    // tslint:disable-next-line:no-bitwise
    if ((nYear & 3) !== 0) { return false; }
    return nYear % 100 !== 0 || nYear % 400 === 0;
  };
  const zeroPad = (nNum: number, nPad: number) => {
    return ('' + (Math.pow(10, nPad) + nNum)).slice(1);
  };
  return sFormat.replace(/%[a-z]/gi, (sMatch: string) => {
    return {
      '%a': aDays[nDay].slice(0, 3),
      '%A': aDays[nDay],
      '%b': aMonths[nMonth].slice(0, 3),
      '%B': aMonths[nMonth],
      '%c': date.toUTCString(),
      '%C': Math.floor(nYear / 100),
      '%d': zeroPad(nDate, 2),
      '%e': nDate,
      '%F': date.toISOString().slice(0, 10),
      '%H': zeroPad(nHour, 2),
      '%I': zeroPad((nHour + 11) % 12 + 1, 2),
      '%j': zeroPad(aDayCount[nMonth] + nDate + ((nMonth > 1 && isLeapYear()) ? 1 : 0), 3),
      '%k': '' + nHour,
      '%l': (nHour + 11) % 12 + 1,
      '%m': zeroPad(nMonth + 1, 2),
      '%M': zeroPad(date.getMinutes(), 2),
      '%p': (nHour < 12) ? 'AM' : 'PM',
      '%P': (nHour < 12) ? 'am' : 'pm',
      '%s': Math.round(date.getTime() / 1000),
      '%S': zeroPad(date.getSeconds(), 2),
      '%u': nDay || 7,
      '%w': '' + nDay,
      '%y': ('' + nYear).slice(2),
      '%Y': nYear,
    }[sMatch] || sMatch;
  });
};
