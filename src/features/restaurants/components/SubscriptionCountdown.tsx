import React, { useState, useEffect } from 'react';

// Define interface for props
interface SubscriptionCountdownProps {
    endDate: string;
    // startDate: string;
}

// Define interface for subscription data (for context/example usage)


export const SubscriptionCountdown: React.FC<SubscriptionCountdownProps> = ({ endDate }) => {
  const [daysRemaining, setDaysRemaining] = useState<number>(0);

  useEffect(() => {
    const calculateDaysRemaining = (): void => {
      const end: Date = new Date(endDate);
      const now: Date = new Date();
      
      // Validate date
      if (isNaN(end.getTime())) {
        setDaysRemaining(0);
        return;
      }

      const timeDiff: number = end.getTime() - now.getTime();
      const days: number = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setDaysRemaining(days > 0 ? days : 0);
    };

    calculateDaysRemaining();
    
    // Update every day
    const interval: NodeJS.Timeout = setInterval(calculateDaysRemaining, 24 * 60 * 60 * 1000);
    
    return (): void => clearInterval(interval);
  }, [endDate]);

  return (
    <div>
      <p className='font-semibold'>{daysRemaining} days left</p>
      {daysRemaining === 0 && <p>Subscription has expired</p>}
    </div>
  );
};

