import React from 'react';
import clsx from 'clsx';

type DashboardContainerProps = {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  padding?: '0' | '2' | '4' | '6' | '8' | '10' | '12';
  marginTop?: string; // For additional spacing on top
  marginBottom?: string; // For additional spacing at the bottom
};

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
  className = '',
  maxWidth = '7xl',
  padding = '4',
  marginTop = '0',
  marginBottom = '0',
}) => {
  return (
    <div
      className={clsx(
        'mx-auto', // Center the container
        `px-${padding}`, // Horizontal padding
        `max-w-${maxWidth}`, // Max width
        `mt-${marginTop}`, // Top margin
        `mb-${marginBottom}`, // Bottom margin
        className // Custom classes
      )}
    >
      {children}
    </div>
  );
};

export default DashboardContainer;