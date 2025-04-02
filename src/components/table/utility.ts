


/**
 * 
 *  * Utility function to determine Tailwind class based on status.
 * - Purpose: Assign appropriate badge color for restaurant status.
 * - Example: "active" -> green badge, "inactive" -> red badge.
 *
 *
 * 
 * 
 *
 */
export const getStatusColor = (status:string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-400 px-[13px]";
    case "inactive":
      return "bg-pink-100 text-pink-500";
    default:
      return "bg-gray-100 text-gray-600";
  }
};