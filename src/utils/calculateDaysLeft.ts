interface Subscription {
    startDate: string;
    endDate: string;
}

export function calculateDaysLeft(subscription: Subscription): number | string {
    const { startDate, endDate } = subscription;

    // Check if startDate or endDate is an empty string
    // if (startDate.trim() === '' || endDate.trim() === '') {
    //     return 0
    // }

    // Parse the start and end dates
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
    const currentDate = new Date();

    // Check if the dates are valid
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
        throw new Error("Invalid date format. Please use 'YYYY-MM-DD'.");
    }

    // Calculate the difference in time
    const differenceInTime = parsedEndDate.getTime() - currentDate.getTime();

    // Calculate the difference in days
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

    return differenceInDays;
}

// Example usage:
// const subscription: Subscription = {
//     startDate: '',
//     endDate: '2023-12-31'
// };

// const daysLeft = calculateDaysLeft(subscription);
// console.log(daysLeft); // Output: Start date and end date must not be empty.
