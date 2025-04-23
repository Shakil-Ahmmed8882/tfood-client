import { SelectField } from "@/components/form/fields/SelectField";
import { useGetAllUsersQuery } from "@/store/features/user/userApi";
import { TUser } from "@/types/user.type";

/**
 * Component: ShopownerDropdown
 * Purpose: Fetches all users and filters shop owners for a dropdown selection.
 * Use Case: Used in forms where an admin assigns a shop owner to a shop.
 * Output: A Select dropdown with shop owner options.
 */

export const ShopOwnerDropdown = () => {
  /**
   * Fetch Data: Retrieves all users from the API.
   * Purpose: Filters out users with the role of shop owner.
   * Loading State: Displays "loading..." while fetching data.
   */
  const { data, isLoading } = useGetAllUsersQuery({ queryParams: [{name:"role",value: "shop_owner"}] });

  if (isLoading) return "loading...";

  /**
   * Process Data: Maps user data into dropdown options.
   * Purpose: Extracts relevant fields (`id` and `name`) for selection.
   * Output: [{ value: "1", text: "John Doe" }, { value: "2", text: "Jane Smith" }]
   */
  const shopOwnerOptions = (data?.data as TUser[])?.map((owner: TUser) => ({
    value: owner.id,
    text: owner.email,
  }));

  /**
   * Render UI: Displays the dropdown with shop owner options.
   * Purpose: Enables selection of a shop owner in a form.
   * Components: Uses `SelectField` for standard dropdown styling.
   */
  return (
    <section>
      <SelectField
        name="user"
        label="Shop owner"
        placeholder="Select shop owner"
        options={shopOwnerOptions}
      />
    </section>
  );
};
