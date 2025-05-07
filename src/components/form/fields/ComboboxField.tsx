import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FieldValues, Path, PathValue, useFormContext } from "react-hook-form";

export type ComboboxOption = {
  value: string;
  label: string;
};

type ComboboxFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: ComboboxOption[];
  required?: boolean;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (value: string) => void;
  onInputValueChange?: (value: string) => void;
  defaultValue?: string;
};

export function ComboboxField<T extends FieldValues>({
  name,
  label,
  placeholder = "Select an item...",
  options,
  required,
  className,
  disabled,
  loading,
  onChange,
  onInputValueChange,
  defaultValue,
}: ComboboxFieldProps<T>) {
  const { control } = useFormContext<T>();
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      name={name}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={disabled}
                  aria-expanded={open}
                  className={cn(
                    "w-full justify-between",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  {field.value
                    ? options.find((opt) => opt.value === field.value)?.label
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-full p-0"
              align="start"
              style={{ width: "var(--radix-popover-trigger-width)" }}
              collisionPadding={16}
            >
              <Command>
                <CommandInput
                  placeholder={`Search ${label?.toLowerCase() || ""}...`}
                  className="h-9"
                  onValueChange={onInputValueChange}
                />
                <CommandList className="max-h-[300px] overflow-auto">
                  <div
                    className="overflow-y-auto"
                    onWheel={(e) => {
                      e.currentTarget.scrollTop += e.deltaY;
                      e.stopPropagation();
                    }}
                  >
                    {loading ? (
                      <CommandItem disabled value="loading">
                        Loading...
                      </CommandItem>
                    ) : options.length === 0 ? (
                      <CommandEmpty>No result found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem
                            key={option.value}
                            value={option.label}
                            disabled={disabled}
                            onSelect={(selectedLabel) => {
                              const selectedOption = options.find(
                                (opt) => opt.label === selectedLabel
                              );
                              const finalValue = selectedOption?.value ?? "";
                              field.onChange(finalValue);
                              onChange?.(finalValue);
                              setOpen(false);
                            }}
                          >
                            {option.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                field.value === option.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </div>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
