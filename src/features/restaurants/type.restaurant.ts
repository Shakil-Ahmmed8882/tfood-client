export type TRestaurant = { // ... 
  id: string;
  user: string;
  name: string;
  location: string;
  rating: string;
  description: string;
  logo: string;
  type?: string;
  category: string;
  related_images: string[];
  totalMenus?: number;
  subscription?: {
    endDate: string;
    startDate: string;
  };
  status: "inactive" | "active";
} ;
