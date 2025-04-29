
import {
  ComboboxField,
} from "@/components/form/fields/ComboboxField";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import useRestaurants from "@/features/restaurants/hooks/useRestaurants";
import { TRestaurant } from "@/features/restaurants";
import { useAppSelector } from "@/store/hooks";
import { selectCurrentUser } from "@/store/features/auth/authSlice";

export const RestaurantOptionsDropdown = ({handleSelectChange}:{handleSelectChange?:(value: string) => void}) => {
  const user = useAppSelector(selectCurrentUser);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading } = useRestaurants({
    filters:  { owner_email: user?.role === "shop_owner" ? user?.email : "" },searchQuery:debouncedQuery
  });

  const Options = useMemo(() => {
    if (data && Array.isArray(data)) {
      return data.map((restaurant:TRestaurant ) => ({
        value: restaurant.id,
        label: restaurant.name,
      }));
    }
    return [];
  }, [data]);
  


  
  const handleSearchShopOwner = (value: string) => {
    setQuery(value);
  };
// console.log(data);
  return (
    <ComboboxField
      name="restaurant"
      label="Select Restaurant"
      loading={isLoading}
      onChange={handleSelectChange}
      options={Options}
      onInputValueChange={handleSearchShopOwner}
    />
  );
};
