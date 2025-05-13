import type React from "react";
import { Check, Edit2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSlugEditor } from "../hooks/useSlugEditor";
import { UrlEditorProps } from "../type";
import { truncateText } from "@/utils/turncateText";

export const RestaurantUrlEditor = ({
  baseUrl = "/",
  res_id,
  defaultSlug = "",
}: UrlEditorProps) => {
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
  } = useSlugEditor(res_id, defaultSlug);

  return (
    <div
      ref={editAreaRef as React.RefObject<HTMLDivElement>}
      className="flex flex-col space-y-2 w-full"
    >
      <div className="flex items-center w-full">
        {!isEditing ? (
          <div className="flex items-center w-full">
            <div className="text-sm text-gray-600 flex items-center min-w-0">
              <span className="text-gray-400 whitespace-nowrap">{baseUrl}</span>
              <span className="font-medium truncate">
                {truncateText(`${inputValue}`, 20)}
              </span>
            </div>
            <Button
              variant="ghost"
              aria-label="Edit URL"
              size="icon"
              className="ml-2 p-0 flex-shrink-0"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="h-4 w-4" />
              <span className="sr-only">Edit URL</span>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0 animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex-1 flex items-center border rounded-md sm:rounded-r-none bg-muted/40">
              <span className="pl-3 text-sm text-gray-500 whitespace-nowrap">
                {baseUrl}
              </span>
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={handleChange}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-full min-w-[120px]"
                placeholder="restaurant-url"
              />
            </div>
            <div className="flex justify-end sm:justify-normal">
              <Button
                size="sm"
                variant="ghost"
                className="rounded-r-none border h-10 sm:rounded-none sm:border-y sm:border-r"
                onClick={handleCancel}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Cancel</span>
              </Button>
              <Button
                size="sm"
                className={cn(
                  "rounded-l-none border h-10 sm:border-y sm:border-r",
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
                  <>
                    <Check className="h-4 w-4 mr-1 hidden sm:block" />
                    <span>Save</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
      {isEditing && (
        <div className="text-xs animate-in fade-in-0 slide-in-from-top-1 duration-200">
          {isChecking && (
            <p className="text-gray-500 flex items-center gap-1">
              <LoadingSpinner className="size-3 sm:size-4" /> Checking availability...
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