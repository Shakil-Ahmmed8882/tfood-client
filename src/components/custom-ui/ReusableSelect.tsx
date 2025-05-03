import React from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select'; // Assuming you are using Radix UI or a similar library
import { truncateText } from '@/utils/turncateText';

interface SelectOption {
  value: string;
  text: string;
}

interface ReusableSelectProps {
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  defaultValue?: string ;
  onValueChange: (value: string ) => void;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  groupClassName?: string;
  labelClassName?: string;
  itemClassName?: string;
}

const ReusableSelect: React.FC<ReusableSelectProps> = ({
  options,
  placeholder = 'Select an option',
  label,
  defaultValue,
  onValueChange,
  triggerClassName,
  contentClassName,
  groupClassName,
  labelClassName,
  itemClassName,
}) => {
  return (
    <Select  onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className={`w-[180px] ${triggerClassName}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={contentClassName}>
        <SelectGroup className={groupClassName}>
          {label && <SelectLabel className={labelClassName}>{label}</SelectLabel>}
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className={itemClassName}
            >
              {
                truncateText(option.text, 15) // Truncate text to 20 characters
              }

            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ReusableSelect;