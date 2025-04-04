import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, Path, useFormContext } from "react-hook-form";
import { ReactElement } from "react";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: { value: string; text: string }[];
  required?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (value: string) => void;
  defaultValue?: string;
};

/**
 * SelectField component
 *
 * @param {Path<T>} name - The name of the field
 * @param {string} label - The label of the field
 * @param {string} placeholder - The placeholder of the field
 * @param {Array<{ value: string, text: string }>} options - The options of the field
 * @param {boolean} required - Whether the field is required
 * @param {string} className - The class name of the field
 * @param {boolean} disabled - Whether the field is disabled
 * @param {boolean} loading - Whether the field is in a loading state
 * @param {(value: string) => void} onChange - The onChange handler of the field
 * @param {string} defaultValue - The default value of the field
 *
 * @returns {ReactElement} - The select field component
 *
 * @example
 * ```tsx
 * <SelectField
 *  name="publishedStatus"
 *  label="Published Status"
 *  options={PublishedOptions}
 *  disabled={isLoading}
 *  loading={isLoading}
 * />
 * ```
 */

export const SelectField = <T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  required = false,
  className,
  disabled = false,
  loading = false,
  onChange,
  defaultValue,
}: Props<T>): ReactElement => {
  const { control } = useFormContext<T>();
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && (
            <FormLabel>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <Select
            defaultValue={defaultValue}
            onValueChange={(value) => {
              field.onChange(value); // Update form state
              if (onChange) onChange(value); // Call parent's onChange
            }}
            value={field.value}
            disabled={disabled || loading}
          >
            <FormControl>
              <SelectTrigger
                className={
                  disabled || loading ? "opacity-50 cursor-not-allowed" : ""
                }
              >
                <SelectValue placeholder={placeholder ?? "Select an item"} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {loading ? (
                <SelectItem value="null" disabled>
                  Loading...
                </SelectItem>
              ) : options.length === 0 ? (
                <SelectItem value="null" disabled>
                  No options available
                </SelectItem>
              )  : (
                options.map((option, index) => (
                  <SelectItem
                    key={option.value + index}
                    value={option.value}
                    disabled={disabled}
                  >
                    {option.text}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

SelectField.displayName = "SelectField";
