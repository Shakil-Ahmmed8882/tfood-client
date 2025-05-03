
import {
  ComboboxField,
} from "@/components/form/fields/ComboboxField";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import useMenuCategories from "../hooks/useMenuCategories";
import { TMenuCategory } from "../menu.type";

export const CategoryOptionsDropdown = ({restaurantId}:{restaurantId: string}) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const {data, isLoading} = useMenuCategories({filters: {  restaurant: restaurantId,searchQuery:debouncedQuery}});
  // if(!restaurantId) return null
  const Options = useMemo(() => {
    if (data && Array.isArray(data) && restaurantId) {
      return data.map((menu:TMenuCategory) => ({
        value: menu.name,
        label: menu.name,
      }));
    }
    return [];
  }, [data,restaurantId]);
  


  
  const handleSearch = (value: string) => {
    setQuery(value);
  };
// console.log(data);
  return (
    <ComboboxField
      name="food_category"
      label="Food Category"
      loading={isLoading}
      options={Options}
      onInputValueChange={handleSearch}
    />
  );
};
