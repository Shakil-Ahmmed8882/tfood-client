import React, { useState, useEffect } from "react";
import { differenceInDays, parseISO, isValid } from "date-fns";

interface SubscriptionCountdownProps {
  endDate?: string | null;
}

export const SubscriptionCountdown: React.FC<SubscriptionCountdownProps> = ({
  endDate,
}) => {
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null); // Initialize to null

  useEffect(() => {
    const calculateDaysRemaining = (): void => {
      if (!endDate) {
        setDaysRemaining(null); // Set to null when no end date
        return;
      }

      const end: Date = parseISO(endDate);
      const now: Date = new Date();

      if (!isValid(end)) {
        setDaysRemaining(null); // Set to null for invalid date
        return;
      }

      const days: number = differenceInDays(end, now);
      setDaysRemaining(days > 0 ? days : 0);
    };

    calculateDaysRemaining();

    const interval: NodeJS.Timeout = setInterval(
      calculateDaysRemaining,
      24 * 60 * 60 * 1000
    );

    return (): void => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="mb-3 mt-2 text-pink-400">
      {daysRemaining === null ? (
        <p className="text-gray-500">Subscription status unavailable</p>
      ) : daysRemaining === 0 ? (
        <p>Subscription expired</p>
      ) : (
        <p className=" text-green-400">{daysRemaining} days left</p>
      )}
    </div>
  );
};