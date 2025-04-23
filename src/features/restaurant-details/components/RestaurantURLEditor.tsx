import type React from "react";
import { Check, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSlugEditor } from "../hooks/useSlugEditor";
import { UrlEditorProps } from "../type";

export const RestaurantUrlEditor = ({
  baseUrl = "/",
  res_id,
}: UrlEditorProps) => {
  /**
   * =====================================
   * SLUG EDITOR HOOK INTEGRATION
   * =====================================
   * Purpose: Manages the state and logic for the restaurant URL editing functionality.
   * Use Case: Handles editing the URL slug, checking its availability, and saving the new slug.
   * Output: Provides various state variables and handler functions to control the UI and behavior of the URL editor.
   */
  const {
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
  } = useSlugEditor(res_id);

  return (
    <div
      ref={editAreaRef as React.RefObject<HTMLDivElement>}
      className="flex flex-col space-y-2"
    >
      <div className="flex items-center">
        {/**
         * =====================================
         * DISPLAY URL OR EDIT BUTTON
         * =====================================
         * Purpose: Renders either the current URL or the "Edit" button based on the `isEditing` state.
         * Use Case: Shows the existing URL when not editing and provides an option to enter edit mode.
         * Output: Displays the URL as text with an edit icon, or the edit icon itself.
         */}
        {!isEditing ? (
          <>
            <div className="text-sm text-gray-600 flex items-center">
              <span className="text-gray-400">{baseUrl}</span>
              <span className="font-medium ">{inputValue}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 h-7 w-7 p-0"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-3.5 w-3.5" />
              <span className="sr-only">Edit URL</span>
            </Button>
          </>
        ) : (
          /**
           * =====================================
           * URL INPUT AND ACTION BUTTONS
           * =====================================
           * Purpose: Displays the input field for editing the URL and the "Cancel" and "Save" buttons.
           * Use Case: Allows users to modify the URL slug and either discard or confirm their changes.
           * Output: An input field with the current slug and buttons to cancel or save the new slug.
           */
          <div className="flex items-center w-full animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex-1 flex items-center border rounded-l-md bg-muted/40">
            
              <span className="pl-3 text-sm text-gray-500">{baseUrl}</span>
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={handleChange}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="restaurant-url"
              />
            </div>
            <div className="flex">
              
              <Button
                size="sm"
                variant="ghost"
                className="rounded-none border-y border-r h-10"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cancel</span>
              </Button>
              <Button
                size="sm"
                className={cn(
                  "rounded-l-none border-y border-r h-10",
                  isSlugAlreadyExist || isChecking || isEmpty
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                )}
                onClick={handleSave}
                disabled={
                  isSlugAlreadyExist || isEmpty || isChecking || !debouncedSlug
                }
              >
                {isUpdatingSlug ? (
                  <LoadingSpinner className="size-5" />
                ) : (
                  <Check className="h-4 w-4 mr-1" />
                )}
                Save
              </Button>
            </div>
          </div>
        )}
      </div>
      {/**
       * =====================================
       * FEEDBACK MESSAGES
       * =====================================
       * Purpose: Displays real-time feedback to the user regarding the slug's availability and loading state.
       * Use Case: Informs the user if the entered slug is being checked, is already taken, or is available.
       * Output: Conditional rendering of loading indicators and status messages (available or already exists).
       */}
      {isEditing && (
        <div className="text-xs animate-in fade-in-0 slide-in-from-top-1 duration-200">
          {isChecking && (
            <p className="text-gray-500 flex items-center gap-[4x]">
              <LoadingSpinner className="size-5" /> Checking availability...
            </p>
          )}
          {isSlugAlreadyExist && (
            <p className="text-red-500">This URL already exists.</p>
          )}
          {!isSlugAlreadyExist && debouncedSlug && !isChecking && (
            <p className="text-green-500">URL is available!</p>
          )}
        </div>
      )}
    </div>
  );
};
