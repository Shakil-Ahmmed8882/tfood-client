import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { menufallbackUrl } from "@/constants";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { TMenu } from "../menu.type";
import { useMenuModal } from "../hooks/useMenuModal";
import { MenuModalForm } from "./MenuModalForm";
import { useDeleteMenuMutation } from "@/store/features/menu/menuApi";
import { ConfirmModal } from "@/components/custom-ui/ConfirmModal";
import { useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * MenuCard: A visually appealing card component to display menu items.
 *
 * Props:
 * - menu (MenuCardProps) - Contains details like title,
 * image, category, price, and description.
 *
 * Features:
 * - Displays an image with a fallback URL for broken images.
 * - Shows menu title, category, price, and description in a structured layout.
 * - Responsive and optimized for different screen sizes.
 */

export const MenuCard: React.FC<{ menu: TMenu }> = ({ menu }) => {
  const [menuDelete] = useDeleteMenuMutation();
  const { isModalOpen, setIsModalOpen } = useMenuModal();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const location = useLocation();

  const handleDelete = async () => {
    try {
      const response = await menuDelete(menu.id);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const showActions = location.pathname.includes("shop_owner");

  return (
    <Card className="overflow-hidden pt-0 group gap-4 ">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={menu.related_images[0] || menufallbackUrl}
          alt={menu.title}
          onError={(e) => (e.currentTarget.src = menufallbackUrl)}
          className="object-cover w-full h-full"
        />

        <span className="absolute bottom-4 left-4 bg-black/15  px-3 py-1 rounded-md text-sm">
          Menu
        </span>

        {/* Action buttons */}
        {showActions && (
          <div className="absolute top-4 right-4 cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 hover:bg-white cursor-pointer"
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
      <CardContent className="">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{menu.title}</h3>
          <span className="font-semibold">৳ {menu.price}</span>
        </div>
        <p className="text-sm text-muted-foreground">{menu.food_category}</p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {menu.description}
        </p>
      </CardFooter>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        onConfirm={handleDelete}
        title="Are you sure?"
        description="This action cannot be undone."
        confirmText="Yes, delete it"
        cancelText="No, cancel"
      />

      {/* Modal for editing menu items */}
      <MenuModalForm
        menuItem={menu && menu}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Card>
  );
};