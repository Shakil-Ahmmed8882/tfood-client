import { useTableContext } from "@/components/table/hooks/useTableContext";
import { Badge } from "@/components/ui/badge";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TableActionButtons } from "@/components/table/TableActionButtons";
import { ConfirmModal } from "@/components/custom-ui/ConfirmModal";
import { useState } from "react";
import { TRestaurant } from "./type.restaurant";
import { useDeleteRestaurantMutation } from "@/store/features/restaurants/restaurantApi";
import { RestaurantFormModal } from "./components/RestaurantFormModal";
import { getStatusColor } from "@/components/table/utility";
import { formatDateGeneric,} from "@/lib/utils/datetime";
import { truncateText } from "@/utils/turncateText";

// import { calculateDaysBetweenISO } from "@/utils/calculateDaysBetweenISO";
import { SubscriptionCountdown } from "./components/SubscriptionCountdown";
const RestaurantTable = () => {
  const { data, pagination } = useTableContext<TRestaurant>();


  return (
    <>
      <TableBody>
        {data.map((restaurant: TRestaurant, index) => (
          <TableRow key={restaurant.id} className="text-gray-700 !h-12">
            <TableCell className="px-5">
              {(pagination?.currentPage - 1) * (pagination?.itemsPerPage || 0) +
                index +
                1}
            </TableCell>
            <TableCell>{truncateText(restaurant.name, 28)}</TableCell>
            <TableCell>{formatDateGeneric(restaurant.created_at, "d MMM, yy")} </TableCell>
            <TableCell>{truncateText(restaurant.location, 20)}</TableCell>
            <TableCell>{truncateText(restaurant.category, 10)}</TableCell>
            <TableCell className="">
            {formatDateGeneric(restaurant.subscription.startDate, "d MMM, yy")} -
            {formatDateGeneric(restaurant.subscription.endDate, "d MMM, yy")}
            
            <SubscriptionCountdown endDate={restaurant?.subscription.endDate} />
              {/* {calculateDaysBetweenISO(restaurant?.subscription.startDate, restaurant?.subscription.endDate)}-days left */}
            </TableCell>
            <TableCell>
              <Badge className={`${getStatusColor(restaurant.status)}`}>
                {restaurant.status} 
              </Badge>
            </TableCell>
            <TableCell>

            <TableActionWrapper restaurant={restaurant} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default RestaurantTable;

const TableActionWrapper = ({ restaurant }: { restaurant: TRestaurant }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteRestaurant] = useDeleteRestaurantMutation();

  const onEdit = () => {
    setIsModalOpen(true);
  };

  const onDelete = async () => {
    try {
      await deleteRestaurant(restaurant?.id).unwrap();
      setIsConfirmModalOpen(false);
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <>
      <TableActionButtons
        onEdit={onEdit}
        onDelete={() => setIsConfirmModalOpen(true)}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onConfirm={onDelete}
        title="Are you sure?"
        description="This action cannot be undone."
        confirmText="Yes, delete it"
        cancelText="No, cancel"
      />

      <RestaurantFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        restaurant={{
          ...restaurant,
          subscription: {
            ...restaurant.subscription,
            startDate: restaurant.subscription?.startDate
              ? new Date(restaurant.subscription.startDate)
              : null,
            endDate: restaurant.subscription?.endDate
              ? new Date(restaurant.subscription.endDate)
              : null,
          },
        }}
      />
    </>
  );
};
