
import { TUser } from "@/types/user.type";
import {
  ComboboxField,
  ComboboxOption,
} from "@/components/form/fields/ComboboxField";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import useGetShopOwners from "../hooks/useGetShopOwners";

export const ShopOwnerDropdown = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [shopOwnerOptions, setShopOwnerOptions] = useState<ComboboxOption[]>([]);
  const {data, isLoading} = useGetShopOwners( {filters:{}, searchQuery:debouncedQuery});

  const Options = useMemo(() => {
    if (data && Array.isArray(data)) {
      return data.map((owner: TUser) => ({
        value: owner.id,
        label: owner.email,
      }));
    }
    return [];
  }, [data]);
  
  useEffect(() => {
    setShopOwnerOptions(Options);
  }, [Options]);
  const handleSearchShopOwner = (value: string) => {
    setQuery(value);
  };
// console.log(data);
  return (
    <ComboboxField
      name="user"
      label="Shop owner"
      loading={isLoading}
      options={shopOwnerOptions}
      onInputValueChange={handleSearchShopOwner}
    />
  );
};
