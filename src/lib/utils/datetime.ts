import { format, FormatOptions, Locale, parseISO } from 'date-fns';

export const genMonths = (
	locale: Pick<Locale, 'options' | 'localize' | 'formatLong'>
) => {
	return Array.from({ length: 12 }, (_, i) => ({
		value: i,
		label: format(new Date(2021, i), 'MMMM', { locale }),
	}));
};

export const genYears = (yearRange = 50) => {
	const today = new Date();
	return Array.from({ length: yearRange * 2 + 1 }, (_, i) => ({
		value: today.getFullYear() - yearRange + i,
		label: (today.getFullYear() - yearRange + i).toString(),
	}));
};




/**
 * Formats a date range from two ISO strings into the "d MMM, yy - d MMM, yy" format.
 * Example: "12 Nov, 24 - 20 Feb, 25"
 *
 * @param startDateIso - The start date in ISO 8601 format string (e.g., "2024-11-12T00:00:00.000Z").
 * @param endDateIso - The end date in ISO 8601 format string (e.g., "2025-02-20T00:00:00.000Z").
 * @param options - Optional object, potentially including locale for future use.
 * @returns The formatted date range string.
 */
export const formatDateRange = (
    startDateIso: string,
    endDateIso: string,
    options?: { locale?: Locale } // Optional locale if needed later
): string => {
    try {
        // Parse the ISO strings into Date objects.
        // new Date() usually works for valid ISO strings.
        // parseISO from date-fns is generally more robust.
        const startDate = parseISO(startDateIso);
        const endDate = parseISO(endDateIso);

        // Define the desired format token based on the example:
        // d: day of the month (e.g., 12, 20)
        // MMM: abbreviated month name (e.g., Nov, Feb)
        // yy: two-digit year (e.g., 24, 25)
        const dateFormatString = 'd MMM, yy';

        // Format the start and end dates
        const formattedStartDate = format(startDate, dateFormatString, options);
        const formattedEndDate = format(endDate, dateFormatString, options);

        // Combine them into the final string
        return `${formattedStartDate} - ${formattedEndDate}`;

    } catch (error) {
        console.error("Error formatting date range:", error);
        // Return a fallback string or re-throw the error depending on desired behavior
        return "Invalid Date Range";
    }
};




/**
 * Formats a single date from an ISO string with a customizable format.
 *
 * @param dateIso - The date in ISO 8601 format string.
 * @param formatString - The desired date format string (e.g., 'd MMM, yy').
 * @param options - Optional format options (e.g., locale).
 * @returns The formatted date string.
 */
export const formatDateGeneric = (
    dateIso: string,
    formatString: string,
    options?: FormatOptions
): string => {
    try {
        const date = parseISO(dateIso);
        return format(date, formatString, options);
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
    }
};