import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Container Component: Wraps child components with a consistent layout.
 *
 * Features:
 * - Centers content with a max width of 1200px.
 * - Adds horizontal padding for better spacing.
 * - Accepts additional class names for customization.
 */

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`${className} mx-auto max-w-[1250px] px-2 lg:px-2`}>{children}</div>
  );
};
