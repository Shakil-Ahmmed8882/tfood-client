import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReusableModal } from "@/components/custom-ui/ReusableModal";
import { cn } from "@/lib/utils";

// Define the TMenu type
export type TMenu = {
  id: string;
  title: string;
  food_category: string;
  price: number;
  description: string;
  related_images: string[];
};

// Define the form schema using Zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  food_category: z.string().min(1, "Food category is required"),
});

type FormValues = z.infer<typeof formSchema>;

// Props for the EditMenuForm component
interface EditMenuFormProps {
  menuItem: TMenu;
  onSave?: (formData: FormData) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const EditMenuModalForm: React.FC<EditMenuFormProps> = ({
  menuItem,
isModalOpen,
setIsModalOpen,
}) => {
  const [images, setImages] = useState<string[]>(menuItem.related_images || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [removeImages, setRemoveImages] = useState<string[]>([]);

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: menuItem.title,
      price: menuItem.price,
      description: menuItem.description,
      food_category: menuItem.food_category,
    },
  });

  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const files = Array.from(e.target.files);
    setNewImages((prevImages) => [...prevImages, ...files]);
  };

  // Remove an existing image
  const handleRemoveExistingImage = (index: number) => {
    const imageToRemove = images[index];
    setRemoveImages((prev) => [...prev, imageToRemove]);
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove a newly added image
  const handleRemoveNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    const formData = new FormData();

    // Add form values and images to remove
    const dataWithRemoveImages = {
      ...values,
      relatedImagesToRemove: removeImages,
    };

    formData.append("data", JSON.stringify(dataWithRemoveImages));

    // Add new images
    newImages.forEach((image) => {
      formData.append("related_images", image);
    });
    console.log(Object.fromEntries(formData));
    console.log(formData.get("related_images"));
    // return
    // onSave(formData);
  };

  return (
    <ReusableModal
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      title="Edit Menu Item"
      subtitle="Update the details of the menu item."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter price"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="food_category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Food Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter food category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel htmlFor="image-upload">Images</FormLabel>
            <Input
              id="image-upload"
              type="file"
              multiple
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>

          {/* Image Previews */}
          <div className="space-y-4">
            {images.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Existing Images</h4>
                <div className="flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <div key={`existing-${index}`} className="relative">
                      <img
                        src={image}
                        alt={`Menu Item ${index}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveExistingImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {newImages.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">New Images</h4>
                <div className="flex flex-wrap gap-2">
                  {newImages.map((image, index) => (
                    <div key={`new-${index}`} className="relative">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`New Image ${index}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveNewImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className={cn(
                "border-red-500 text-red-500 hover:bg-red-50 hover:text-red-500"
              )}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-yellow-400 text-black hover:bg-yellow-500 cursor-pointer"
            >
              {/* {isCreating ||
                              (isUpdating && (
                                <LoadingSpinner className="mr-2 h-4 w-4 animate-spin" />
                              ))} */}
              {menuItem ? "Save Changes" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </ReusableModal>
  );
};

export default EditMenuModalForm;
