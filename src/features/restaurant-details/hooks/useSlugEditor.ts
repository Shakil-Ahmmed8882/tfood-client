import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useAutoFocus } from "@/hooks/useAutoFocus";
import { useCheckSlugAvailabilityQuery } from "@/store/features/slug/slugApi";
import { useUpdateRestaurantMutation } from "@/store/features/restaurants/restaurantApi";
import { toast } from "sonner";

/**
 * =====================================
 * USE SLUG EDITOR HOOK
 * =====================================
 * Purpose: Manages the state and logic for editing a URL slug. This hook handles input changes,
 * debouncing, checking slug availability via API, and updating the slug.
 * Use Case: Used within components that allow users to modify the URL slug of a resource (e.g., a restaurant).
 * Output: Returns various state variables (editing status, input value, loading states, etc.) and handler functions
 * (for input change, save, cancel) to control the slug editing UI and functionality.
 */

export const useSlugEditor = (res_id?: string) => {
  const { slug } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(slug);
  const [originalValue] = useState(slug);
  const { inputRef, isEmpty } = useAutoFocus(isEditing);
  const editAreaRef = useClickOutside(() => setIsEditing(false));
  const goTo = useNavigate();

  const [debouncedSlug, setDebouncedSlug] = useState("");

  /**
   * =====================================
   * DEBOUNCE SLUG INPUT
   * =====================================
   * Purpose: Delays the execution of the slug availability check API call until the user has stopped typing for a certain period.
   * Use Case: Prevents excessive API calls on every keystroke, improving performance and reducing server load.
   * Output: Updates the `debouncedSlug` state after a 500ms delay if the input value has changed from the original value.
   */

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== originalValue) {
        setDebouncedSlug(inputValue || "");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, originalValue]);

  /**
   * =====================================
   * CHECK SLUG AVAILABILITY QUERY
   * =====================================
   * Purpose: Fetches data from the `useCheckSlugAvailabilityQuery` API endpoint to determine if the `debouncedSlug` already exists.
   * Use Case: Provides real-time feedback to the user about the uniqueness of the entered slug.
   * Output: Returns data indicating whether the slug exists (`slugCheckData`), loading states (`isLoading`, `isFetching`),
   * and automatically refetches when the `debouncedSlug` changes. The query is skipped if `debouncedSlug` is empty.
   */
  const {
    data: slugCheckData,
    isLoading,
    isFetching,
  } = useCheckSlugAvailabilityQuery(debouncedSlug, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: !debouncedSlug,
  });

  /**
   * =====================================
   * UPDATE RESTAURANT MUTATION
   * =====================================
   * Purpose: Sends a mutation request to the `useUpdateRestaurantMutation` API endpoint to update the restaurant's slug.
   * Use Case: Persists the new slug to the backend when the user saves their changes.
   * Output: Returns the mutation function (`updateSlug`) and a loading state (`isUpdatingSlug`) indicating if the update request is in progress.
   */
  const [updateSlug, { isLoading: isUpdatingSlug }] =
    useUpdateRestaurantMutation();

  const isSlugAlreadyExist = slugCheckData?.data?.exists;
  const isChecking = isLoading || isFetching;

  /**
   * =====================================
   * HANDLE INPUT CHANGE
   * =====================================
   * Purpose: Updates the `inputValue` state with the sanitized value entered by the user.
   * Use Case: Processes user input to ensure the slug contains only lowercase alphanumeric characters, hyphens, and underscores.
   * Output: Updates the `inputValue` state with the sanitized string.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, "-");
    setInputValue(sanitizedValue);
  };
  /**
   * =====================================
   * HANDLE CANCEL EDIT
   * =====================================
   * Purpose: Resets the `inputValue` to the `originalValue` and exits the editing mode.
   * Use Case: Discards any changes made by the user and reverts to the previously saved slug.
   * Output: Updates `inputValue` to the original slug and sets `isEditing` to `false`.
   */
  const handleCancel = () => {
    setInputValue(originalValue);
    setIsEditing(false);
  };
  /**
   * =====================================
   * HANDLE SAVE SLUG
   * =====================================
   * Purpose: Validates the new slug and, if valid and unique, sends an API request to update the restaurant's slug.
   * Use Case: Saves the user's changes to the slug on the backend and navigates the user to the new URL.
   * Output: If successful, displays a success toast and navigates to the updated URL. If an error occurs, logs the error.
   * Disables saving if the slug already exists or is empty.
   */
  const handleSave = async () => {
    if (!isSlugAlreadyExist && inputValue?.trim() !== "") {
      if (!res_id) return console.error("Restaurant ID is undefined");

      const formData = new FormData();
      formData.append("id", res_id);
      formData.append("data", JSON.stringify({ slug: inputValue }));

      try {
        const res = await updateSlug(formData);
        if (res?.data?.success) {
          toast.success("Slug updated successfully");
          goTo(`/${inputValue}`);
        }
      } catch (error) {
        console.log(error);
      }

      setIsEditing(false);
    }
  };

  return {
    isEditing,
    setIsEditing,
    inputValue,
    handleChange,
    handleSave,
    handleCancel,
    inputRef,
    editAreaRef,
    isSlugAlreadyExist,
    isChecking,
    isUpdatingSlug,
    isEmpty,
    debouncedSlug,
  };
};
