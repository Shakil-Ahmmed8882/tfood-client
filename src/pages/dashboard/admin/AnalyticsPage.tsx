import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import userIcon from "../../../assets/icons/img/user.png";
import menuIcon from "../../../assets/icons/img/menu.png";
import customerIcon from "../../../assets/icons/img/customer.png";
import shop_ownerIcon from "../../../assets/icons/img/shop_owner.png";
import restaurantIcon from "../../../assets/icons/img/restaurant.png";
import { useGetAnalyticsQuery } from "@/store/features/analytics/analyticsApi";

/**
 * Type definition for metadata analytics.
 * Represents each analytics card with title and count.
 */
export type TMetaData = {
  title: string;
  count: number;
};

/**
 * Main Analytics Page Component
 * Renders the analytics section with metadata cards.
 */
const AnalyticsPage = () => {
  return (
    <section className="bg-[#f7f8fe] min-h-screen">
      <MetaDataCards />
    </section>
  );
};

/**
 * Fetches and displays analytics metadata as a grid of cards.
 * Shows a loading skeleton until data is available.
 */
const MetaDataCards = () => {
  const { data, isLoading } = useGetAnalyticsQuery(undefined);

  if (isLoading) return <SkeletonCardDemo />;

  const analytics: TMetaData[] = data || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {analytics?.map(({ title, count }) => (
        <MetaDataCard key={title} {...{ count, title }} />
      ))}
    </div>
  );
};

/**
 * Individual card component displaying analytics data.
 * Shows an icon, count, and title.
 */
const MetaDataCard = ({ title, count }: { title: string; count: number }) => (
  <Card
    className="p-4 shadow-none border-0 border-l-4 bg-white rounded-lg"
    style={{ borderLeftColor: getColor(title) }}
  >
    <CardHeader className="flex space-x-2 p-0">
      <div
        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg"
        style={{ backgroundColor: `${getColor(title)}20` }}
      >
        <img src={getIcon(title)} alt={title} className="w-6 h-6 sm:w-8 sm:h-8" />
      </div>
      <div>
        <p className="text-md sm:text-[20px] font-semibold py-2 text-gray-900">{count}</p>
        <CardTitle className="text-sm font-light sm:font-normal sm:text-[15px] text-gray-400"><strong>Total:</strong> {title}</CardTitle>
      </div>
    </CardHeader>
  </Card>
);

/**
 * Returns the corresponding icon based on the title.
 * Used for visually representing different analytics data.
 */
const getIcon = (title: string) => {
  switch (title) {
    case "Users":
      return userIcon;
    case "Restaurants":
      return restaurantIcon;
    case "Menus":
      return menuIcon;
    case "Customers":
      return customerIcon;
    case "Shop Owners":
      return shop_ownerIcon;
    default:
      return userIcon;
  }
};

/**
 * Returns a unique color for each analytics category.
 * Used for styling card borders and backgrounds.
 */
const getColor = (title: string) => {
  switch (title) {
    case "Users":
      return "#F96E2A";
    case "Restaurants":
      return "#A294F9";
    case "Menus":
      return "#7ED4AD";
    case "Customers":
      return "#3D3BF3";
    case "Shop Owners":
      return "#08c2ff";
    default:
      return "#ccc";
  }
};

import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loading card component for analytics cards.
 * Displays placeholders while data is being fetched.
 */
export function LoadingSkeletonCard() {
  return (
    <Card className="relative h-[180px] overflow-hidden p-4 shadow-none">
      <div className="flex flex-col gap-3">
        <Skeleton className="h-10 w-10 rounded bg-gray-100" />
        <div className="space-y-2 pt-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </Card>
  );
}

/**
 * Displays a grid of skeleton cards as a placeholder.
 * Used during data loading state.
 */
function SkeletonCardDemo() {
  return (
    <div className="grid grid-cols-1 px-3 pt-4 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <LoadingSkeletonCard />
      <LoadingSkeletonCard />
      <LoadingSkeletonCard />
      <LoadingSkeletonCard />
      <LoadingSkeletonCard />
    </div>
  );
}

export default AnalyticsPage;
