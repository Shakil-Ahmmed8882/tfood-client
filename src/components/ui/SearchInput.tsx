import React, { ChangeEvent } from "react";
import { SearchIcon } from "@/assets/icons/Icons";
import { Input } from "./input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceDelay?: number;
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`relative flex w-full ${className}`}>
      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        <SearchIcon size={20} className="text-gray-400" />
      </div>
      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-white pl-9 h-11 border border-[#fec91c] rounded-md "
      />
    </div>
  );
};
