// src/lib/utils.ts
export const convertTo12HourFormat = (time: string): string => {
    const [hours, minutes] = time.split(':');
    const period = parseInt(hours, 10) >= 12 ? 'PM' : 'AM';
    const formattedHours = parseInt(hours, 10) % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };
  