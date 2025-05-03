import {z} from 'zod'

export const menuFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  food_category: z.string().min(1, "Food category is required"),
  restaurant: z.string().min(1, "Restaurant is required"),
});

export type TMenuFormValues = z.infer<typeof menuFormSchema>

export const initialMenuFormValues: TMenuFormValues = {
  title: "",
  price: 0,
  description: "",
  food_category: "",
  restaurant: "",
};




export const menuCategoryFormSchema = z.object({
  restaurant: z.string().uuid().min(1, "Restaurant is required"),
  creator: z.string().email().min(1, "Creator is required"),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

export type TMenuCategoryFormValues = z.infer<typeof menuCategoryFormSchema>

export const initialMenuCategoryFormValues: TMenuCategoryFormValues = {
  restaurant: "",
  creator: "example@me.com",
  name: "",
  description: "",
};