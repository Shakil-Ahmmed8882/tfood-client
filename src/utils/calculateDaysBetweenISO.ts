import { parseISO, differenceInDays } from 'date-fns';

/**
 * Calculates the number of days between two ISO 8601 date strings with type safety.
 *
 * @param startDateISO - The starting date in ISO 8601 format (e.g., "2023-10-26T10:00:00.000Z").
 * @param endDateISO - The ending date in ISO 8601 format (e.g., "2023-10-29T18:00:00.000Z").
 * @returns The number of days between the two dates, or NaN if either input is invalid.
 */
export function calculateDaysBetweenISO(startDateISO: string, endDateISO: string): number {
  try {
    const startDate = parseISO(startDateISO);
    const endDate = parseISO(endDateISO);
    return differenceInDays(endDate, startDate);
  } catch (error) {
    console.error("Error parsing date strings:", error);
    return NaN;
  }
}

// Example usage:
const subscription: { endDate: string; startDate: string } = {
  endDate: "2026-04-29T18:00:00.000Z",
  startDate: "2025-03-31T18:00:00.000Z"
};

const days: number = calculateDaysBetweenISO(subscription.startDate, subscription.endDate);

if (!isNaN(days)) {
  console.log(`The number of days between ${subscription.startDate} and ${subscription.endDate} is: ${days} days`);
} else {
  console.log("Could not calculate the number of days due to invalid date strings.");
}