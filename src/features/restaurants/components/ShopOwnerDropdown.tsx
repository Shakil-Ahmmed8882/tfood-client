
import { TUser } from "@/types/user.type";
import {
  ComboboxField,
} from "@/components/form/fields/ComboboxField";
import { useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import useGetShopOwners from "../hooks/useGetShopOwners";

export const ShopOwnerDropdown = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  
  const {data, isLoading} = useGetShopOwners( {filters:{role:"shop_owner"}, searchQuery:debouncedQuery});

  const Options = useMemo(() => {
    if (data && Array.isArray(data)) {
      return data.map((owner: TUser) => ({
        value: owner.id,
        label: owner.email,
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
      name="user"
      label="Shop owner"
      loading={isLoading}
      options={Options}
      onInputValueChange={handleSearchShopOwner}
    />
  );
};
