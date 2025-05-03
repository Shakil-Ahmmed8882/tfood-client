import { parse, format } from 'date-fns';

export class TimeFormatter {
  /**
   * Converts a 24-hour time string (e.g., "13:45")
   * into 12-hour format with AM/PM (e.g., "01:45 PM")
   * 
   * @param time string - Time in "HH:mm" format
   * @returns string - Time in "hh:mm a" format
   */
  static toAmPm(time: string): string {
    return format(parse(time, 'HH:mm', new Date()), 'hh:mm a');
  }
}
