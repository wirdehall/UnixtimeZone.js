# Unixtime.js

Small js lib with a few functions to handel date and time with timezones with unix timestamps as a base.

## Base concept

The basic idéa is that you use unixtimestamps in UTC as base.
Then you set what timezone offset you want to use for outputing.
This will be set globaly.

## How to use

```
// Offset in hours
setTimezoneOffset(1); // UTC + 1 hour

const unixtime = 1576170268;

console.log(formatTimestamp(unixtime));
// Expected output:  2019-12-12 18:04:28

console.log(formatTimestamp(unixtime, '%y%m%d - %H:%I'));
// Expected output:  191212 - 18:04

console.log(toUnixtime('2019-12-12 18:04:28'));
// Expected output: 1576170268
```

formatTimestamp's second parameter uses syntax similar to strftime but all functionallity is not implemented.

## Known limitations

 * No support for daylight-saving time, you have to handel this on your own since you don't input timezone but timezone offset.
 * formatTimestamp is not fullfeatured for formatting

## Contributions

If you find that something is missing or wrong please submit a pull request. Please keep in mind that this is intended to be lightweight.
