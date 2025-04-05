"use client"

import { cn } from "@/lib/utils"
import { type FieldValues, type Path, useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

type RadioOption = {
  value: string
  label: string
}

type RadioGroupFieldProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  options: RadioOption[]
  required?: boolean
  className?: string
  radioGroupClass?: string
  disabled?: boolean
}

/**
 * A radio group field component that integrates with React Hook Form.
 * @param name The name of the field.
 * @param label The label of the field.
 * @param options Array of radio options with value and label.
 * @param required If the field is required.
 * @param className The class name of the form item.
 * @param radioGroupClass The class name of the radio group container.
 * @param disabled If the field is disabled.
 *
 * @returns The radio group field component.
 *
 * @example
 * ```tsx
 * <RadioGroupField
 *   name="role"
 *   label="Choose Your Role!"
 *   options={[
 *     { value: 'visitor', label: 'Visitor' },
 *     { value: 'owner', label: 'Restaurant Owner' }
 *   ]}
 * />
 * ```
 */
export const RadioGroupField = <T extends FieldValues>({
  name,
  label,
  options,
  required = false,
  className,
  radioGroupClass,
  disabled = false,
}: RadioGroupFieldProps<T>) => {
  const { control } = useFormContext<T>()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel htmlFor={name} className="block mb-2 font-medium">
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className={cn("flex gap-4", radioGroupClass)}>
              {options.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    id={`${name}-${option.value}`}
                    value={option.value}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    disabled={disabled}
                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-primary"
                  />
                  <label
                    htmlFor={`${name}-${option.value}`}
                    className="ml-2 text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </FormControl>
          <FormMessage className="line-clamp-1 text-xs mt-1" />
        </FormItem>
      )}
    />
  )
}

RadioGroupField.displayName = "RadioGroupField"

