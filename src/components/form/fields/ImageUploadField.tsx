import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { cn } from '@/lib/utils';
import { Image, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

type ImageUploadFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  onUpload?: (file: File) => string | void; // Updated to explicitly return a string or void
};

export const ImageUploadField = <T extends FieldValues>({
  name,
  label,
  required = false,
  className,
  disabled = false,
  onUpload,
}: ImageUploadFieldProps<T>) => {
  const { control } = useFormContext<T>();
  const { loading, handleFileChange } = useImageLinkField();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel>
              <span>{label}</span>
              {required && <span className="ml-1 text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="flex flex-col gap-4">
              {value ? (
<div className="relative group h-48 w-48">
  <img
    src={value}
    alt="Preview"
    className="h-full w-full rounded-lg object-cover"
  />
  <div className="
    absolute inset-x-0 bottom-0
    h-full bg-black/50
    transition-all duration-300
    rounded-lg flex items-center justify-center
    sm:h-0 sm:group-hover:h-full
  ">
    <Button
      type="button"
      variant="destructive"
      size="icon"
      className="
        opacity-100
        sm:opacity-0
        sm:group-hover:opacity-100
        transition-opacity duration-300
      "
      onClick={() => onChange(null)}
      disabled={disabled}
    >
      <X className="h-4 w-4" />
    </Button>
  </div>
</div>

              ) : (
                <div className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <div
                      onClick={() => document.getElementById(name)?.click()}
                      className="flex h-48 w-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <Image className="h-8 w-8 text-gray-400" />
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, onChange, onUpload)}
                        id={name}
                        disabled={disabled}
                      />
                      <Button
                        type="button"
                        variant="secondary"
                        className="cursor-pointer"
                        // onClick={(e) => e.stopPropagation()}
                        disabled={disabled}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

ImageUploadField.displayName = 'ImageUploadField';

const useImageLinkField = () => {
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (...event: unknown[]) => void,
    onUpload?: (file: File) => string | void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (onUpload) {
        const uploadedUrl = onUpload(file); // Expect a URL or void
        onChange(uploadedUrl || URL.createObjectURL(file)); // Fallback to local URL if onUpload doesn't return a value
      } else {
        onChange(URL.createObjectURL(file)); // Default behavior if no onUpload
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleFileChange };
};