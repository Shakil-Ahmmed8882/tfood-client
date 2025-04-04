import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
  } from '@/components/ui/form';
  import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from '@/components/ui/select';
  import { FieldValues, Path, useFormContext } from 'react-hook-form';
  
  type Props<T extends FieldValues> = {
	name: Path<T>;
	label?: string;
	placeholder?: string;
	options: { value: string; text: string }[];
	required?: boolean;
	className?: string;
	disabled?: boolean;
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
  }: Props<T>) => {
	const { control } = useFormContext<T>();
	// const formValues = useWatch()
	// console.log(formValues.restaurant);
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
			  onValueChange={field.onChange} 
			  value={field.value}
			  disabled={disabled}
			>
			  <FormControl>
				<SelectTrigger className={disabled ? 'opacity-50 cursor-not-allowed' : ''}>
				  <SelectValue placeholder={placeholder ?? 'Select an item'} />
				</SelectTrigger>
			  </FormControl>
  
			  <SelectContent>
				{options.map((option,index) => (
				  <SelectItem 
					key={option.value + index} 
					value={option.value}
					disabled={disabled}
				  >
					{option.text}
				  </SelectItem>
				))}
			  </SelectContent>
			</Select>
  
			<FormMessage />
		  </FormItem>
		)}
	  />
	);
  };
  
  SelectField.displayName = 'SelectField';