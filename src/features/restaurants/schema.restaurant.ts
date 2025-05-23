import {  z } from "zod";

export const RestaurantSchema = z.object({
  id: z
    .string({
      required_error: "Restaurant ID is required.",
      invalid_type_error: "Restaurant ID must be a string.",
    })
    .optional(),
  user: z
    .string({
      required_error: "User ID is required.",
      invalid_type_error: "User ID must be a string.",
    })
    .optional(),
    name: z
    .string({
      required_error: "Restaurant name is required.",
      invalid_type_error: "Restaurant name must be a string.",
    })
    .min(1, { message: "Restaurant name is required." }),
    website: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^(https?:\/\/|www\.)[^\s]+$/.test(val),
      { message: "Website must start with 'http://', 'https://', or 'www.'." }
    ),
  
  
    contact: z.string({
    required_error: "Restaurant contact is required.",
    invalid_type_error: "Restaurant contact must be a string.",
  }),
  location: z.string({
    required_error: "Restaurant location is required.",
    invalid_type_error: "Restaurant location must be a string.",
  }),
  rating: z
    .string({
      required_error: "Restaurant rating is required.",
      invalid_type_error: "Restaurant rating must be a string.",
    })
    .optional(),
  description: z.string().optional(),
  logo: z
    .string({
      required_error: "Restaurant logo URL is required.",
      invalid_type_error: "Restaurant logo URL must be a string.",
    })
    .nullable(),
  // type: z
  //   .string({
  //     invalid_type_error: "Restaurant type must be a string.",
  //   })
  //   .optional(),
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
    subscription: z.object({
      startDate: z.date({
          message: "Please enter a valid date",
      }).nullable().optional(), // Allow null for optional dates
      endDate: z.date({
          message: "Please enter a valid date",
      }).nullable().optional(), // Allow null for optional dates
  }),
  //     subscription: z.object({
  //     startDate: z.string().nullable().optional(), // Allow null for optional dates
  //     endDate: z.string().nullable().optional(), // Allow null for optional dates
  // }),
  operating_hours: z.object({
    open: z.string().nullable().optional(), // Allow null for optional dates
    close: z.string().nullable().optional(), // Allow null for optional dates
  }),

  status: z
    .enum(["inactive", "active", "blocked"], {
      required_error: "Restaurant status is required.",
      invalid_type_error: "Restaurant status must be 'inactive' or 'active'.",
    })
    .optional(),
});

export type TRestaurantFromValues = z.infer<typeof RestaurantSchema>;

export const initialRestaurantValues: Partial<TRestaurantFromValues> = {
  name: "",
  location: "",
  description: "",
  category: "",
  subscription: {
    startDate: null,
    endDate: null,
  },
  operating_hours: {
    open: '',
    close: '',
  },
  status: "inactive",
};
