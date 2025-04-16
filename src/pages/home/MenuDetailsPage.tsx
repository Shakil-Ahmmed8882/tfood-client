import { TMenu } from "@/features/menu";
import { MenuDetails } from "@/features/menu/components/MenuDetails";


export const MenuDetailPage = () => {
  const menu: TMenu = {
    id: "56c7dccb-484e-495c-bc85-92dab721189f",
    restaurant: "237c774c-f393-45bd-a68b-d531fcea8bc8",
    title: "Neque aut est nobis",
    related_images: [
      "https://res.cloudinary.com/dmg3ltri6/image/upload/v1744441624/download-1744441623616.jpg",
      "https://res.cloudinary.com/dmg3ltri6/image/upload/v1744441624/another-image.jpg", // Example second image
    ],
    price: 888,
    description: "Possimus eveniet a",
    restaurant_name: "Ella Riley",
    creator: "shopowner@gmail.com",
    food_category: "Candace Mcconnell",
  };

  return <MenuDetails menu={menu} />;
};

MenuDetailPage.displayName = "MenuDetailPage";