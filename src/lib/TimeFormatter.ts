import { parse, format, isValid } from 'date-fns';

export class TimeFormatter {
  /**
   * Converts a 24-hour time string (e.g., "13:45")
   * into 12-hour format with AM/PM (e.g., "01:45 PM")
   * 
   * @param time string - Time in "HH:mm" format
   * @returns string - Time in "hh:mm a" format, or original string if invalid
   */
  static toAmPm(time: string): string {
    if (!time) return time;

    const parsed = parse(time, 'HH:mm', new Date());

    if (!isValid(parsed)) {
      console.warn(`Invalid time format: "${time}"`);
      return time; // Or return a fallback like 'Invalid time'
    }

    return format(parsed, 'hh:mm a');
  }
}
