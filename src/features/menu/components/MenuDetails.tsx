import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menufallbackUrl } from "@/constants";
import { MoreVertical, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { TMenu } from "../menu.type";
import { useMenuModal } from "../hooks/useMenuModal";
import { MenuModalForm } from "./MenuModalForm";
import { useDeleteMenuMutation } from "@/store/features/menu/menuApi";
import { ConfirmModal } from "@/components/custom-ui/ConfirmModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * MenuDetails: A visually appealing component to display detailed information about a food menu item.
 *
 * Props:
 * - menu (TMenu) - Contains details like id, title, related_images, price, description,
 *   food_category, restaurant_name, and creator.
 *
 * Features:
 * - Displays all menu item images in a responsive carousel with navigation.
 * - Shows full details (title, price, category, description, restaurant, creator) in an elegant layout.
 * - Includes edit and delete actions for shop owners.
 * - Optimized for food menus with vibrant imagery and appetizing presentation.
 * - Responsive and accessible across screen sizes.
 */

export const MenuDetails: React.FC<{ menu: TMenu }> = ({ menu }) => {
  const [menuDelete] = useDeleteMenuMutation();
  const { isModalOpen, setIsModalOpen } = useMenuModal();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();

  const images = menu.related_images.length > 0 ? menu.related_images : [menufallbackUrl];

  const handleDelete = async () => {
    try {
      await menuDelete(menu.id);
    } catch (error) {
      console.log(error);
    }
  };

  const showActions = location.pathname.includes("shop_owner");

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="overflow-hidden w-full max-w-3xl mx-auto shadow-lg">
      {/* Image Carousel */}
      <CardHeader className="p-0 relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            src={images[currentImageIndex]}
            alt={`${menu.title} - Image ${currentImageIndex + 1}`}
            onError={(e) => (e.currentTarget.src = menufallbackUrl)}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          {/* Carousel Navigation */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          {/* Shop Owner Actions */}
          {showActions && (
            <div className="absolute top-4 right-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsDeleteModalOpen(true)}
                    className="text-red-500 focus:text-red-500"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </CardHeader>

      {/* Menu Details */}
      <CardContent className="pt-6 px-6">
        <h2 className="text-3xl font-bold text-gray-800">{menu.title}</h2>
        <p className="text-2xl font-semibold text-primary mt-2">৳ {menu.price}</p>
        <div className="mt-4 space-y-2">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Category:</span> {menu.food_category}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Restaurant:</span> {menu.restaurant_name}
          </p>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Created by:</span> {menu.creator}
          </p>
        </div>
      </CardContent>

      {/* Description */}
      <CardFooter className="px-6 pb-6 flex flex-col items-start">
        <h3 className="text-lg font-semibold text-gray-800">Description</h3>
        <p className="text-base text-muted-foreground mt-2 leading-relaxed">
          {menu.description}
        </p>
      </CardFooter>

      {/* Modals */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        title="Are you sure?"
        description="This action cannot be undone."
        confirmText="Yes, delete it"
        cancelText="No, cancel"
      />

      <MenuModalForm
        menuItem={menu}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Card>
  );
};