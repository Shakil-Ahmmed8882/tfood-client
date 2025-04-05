import { z } from "zod";

export const RestaurantSchema = z.object({
  id: z.string({
    required_error: "Restaurant ID is required.",
    invalid_type_error: "Restaurant ID must be a string.",
  }).optional(),
  user: z.string({
    required_error: "User ID is required.",
    invalid_type_error: "User ID must be a string.",
  }).optional(),
  name: z.string({
    required_error: "Restaurant name is required.",
    invalid_type_error: "Restaurant name must be a string.",
  }),
  website: z.string({
    required_error: "Restaurant website is required.",
    invalid_type_error: "Restaurant website must be a string.",
  }).optional(),
  contact: z.string({
    required_error: "Restaurant contact is required.",
    invalid_type_error: "Restaurant contact must be a string.", 
  }),
  location: z.string({
    required_error: "Restaurant location is required.",
    invalid_type_error: "Restaurant location must be a string.",
  }),
  rating: z.string({
    required_error: "Restaurant rating is required.",
    invalid_type_error: "Restaurant rating must be a string.",
  }).optional(),
  description: z.string({
    required_error: "Restaurant description is required.",
    invalid_type_error: "Restaurant description must be a string.",
  }),
  logo: z.string({
    required_error: "Restaurant logo URL is required.",
    invalid_type_error: "Restaurant logo URL must be a string.",
  }).nullable(),
  type: z
    .string({
      invalid_type_error: "Restaurant type must be a string.",
    })
    .optional(),
  category: z.string({
    required_error: "Restaurant category is required.",
    invalid_type_error: "Restaurant category must be a string.",
  }),
  related_images: z.string().array().optional(),
  totalMenus: z
    .number({
      invalid_type_error: "Total menus must be a number.",
    })
    .optional(),
  subscription: z
    .object({
      endDate: z.string({
        required_error: "Subscription end date is required.",
        invalid_type_error: "Subscription end date must be a string.",
      }),
      startDate: z.string({
        required_error: "Subscription start date is required.",
        invalid_type_error: "Subscription start date must be a string.",
      }),
    })
    .optional(),
    status: z.enum(["inactive", "active",'blocked'], {
    required_error: "Restaurant status is required.",
    invalid_type_error: "Restaurant status must be 'inactive' or 'active'.",
  }).optional(),
});

export type TRestaurantFromValues = z.infer<typeof RestaurantSchema> 



export const initialRestaurantValues: Partial<TRestaurantFromValues> = {
  name: "",
  location: "",
  description: "",
  category: "",
  type: "",
  status: "active",
};
