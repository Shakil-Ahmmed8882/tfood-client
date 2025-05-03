import React from "react";

/**
 * List of available icons in this file:
 * - UserIcon:
 * - ToggleMenu
 * - LocationIcon
 *
 *
 */
interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

/**
 * UserIcon: A reusable user profile icon with configurable size and additional props.
 *
 * Props:
 * - size?: number (default: 16) - Controls the width and height of the icon.
 * - className?: string - Allows external styling.
 * - ...props - Supports all standard SVG props.
 */
export const UserIcon: React.FC<IconProps> = ({
  size = 16,
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
};

/**
 * MenuIcon: A reusable hamburger menu (toggle menu) icon with configurable size and additional props.
 *
 * Props:
 * - size?: number (default: 24) - Controls the width and height of the icon.
 * - className?: string - Allows external styling.
 * - ...props - Supports all standard SVG props.
 */

export const ToggleMenuIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
};

/**
 * LocationIcon: A reusable location (pin) icon with configurable size and additional props.
 *
 * Props:
 * - size?: number (default: 20) - Controls the width and height of the icon.
 * - className?: string - Allows external styling.
 * - ...props - Supports all standard SVG props.
 */
export const FilledLocationIcon: React.FC<IconProps> = ({
  size = 20,
  className = "",
  ...props
}) => {
  return (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="black"
      className={className}
      {...props}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  );
};



/**
 * SearchIcon: A reusable search (magnifying glass) icon with configurable size and additional props.
 */
export const SearchIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    );
  };
  

  export const ThinLocationIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    )
  }
  

  /**
 * StarIcon: A reusable star icon with configurable size and additional props.
 */
export const StarIcon: React.FC<IconProps> = ({ size = 16, className, ...props }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
  
  