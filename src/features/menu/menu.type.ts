export type TMenu = {
    
    id: string;
    restaurant: string;
    title: string;
    related_images: string[]
    price: number;
    description: string;
    restaurant_name: string;
    creator: string;
    food_category: string;
    status: "active" | "inactive";
  }
  
export type TMenuCategory = {
    
    id: string;
    restaurant: string;
    name: string;
    description: string
  }
  
