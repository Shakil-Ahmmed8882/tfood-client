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
import {  useState } from "react";
import { useLocation} from "react-router-dom";
import { truncateText } from "@/utils/turncateText";
import { ReusableModal } from "@/components/custom-ui/ReusableModal";
import { MenuDetailPage } from "@/pages/home/MenuDetailsPage";

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  // const navigate = useNavigate();



  const showActions = location.pathname.includes("shop_owner");

  return (
    <Card  onClick={() => !showActions &&setIsModalOpen(!isModalOpen)} className="overflow-hidden pt-0 group gap-4 w-full transition-all duration-300  hover:shadow-md hover:scale-[1.02] cursor-pointer ">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={menu.related_images[0] || menufallbackUrl}
          alt={menu.title}
          onError={(e) => (e.currentTarget.src = menufallbackUrl)}
          className="object-cover w-full h-full"
        />


        <span className="font-semibold absolute bottom-4 right-2 bg-white    px-3 py-1 rounded-md text-sm">৳ {menu.price}</span>
        {/* <span className="absolute bg-[#fff] bottom-4 left-4   px-3 py-1 rounded-md text-sm">
          {menu.status}
        </span> */}

        {/* Action buttons */}
        {showActions && (
          <ActionDropdown menu={menu} />
        )}
      </div>
      <CardContent className="">
      <h2 className=" text-[18px] sm:text-[20px] md:text-xl mt-2 font-semibold text-[#555] rounded-sm inline-block">{menu.title }</h2>

        <div className="flex items-start justify-between gap-5">
          <h3 className="mt-2  text-gray-500 text-sm">{menu?.restaurant_name}</h3>
          {/* <span className="font-semibold">৳ {menu.price}</span> */}
        </div>
        <p className="text-sm text-muted-foreground pt-2">{menu?.food_category}</p>
      </CardContent>
      <CardFooter>
        {/* {
          menu.description &&
          <p className="text-sm text-muted-foreground line-clamp-2">
          {truncateText(menu.description, 35)}
          <span className="font-semibold text-sm mt-1">{menu.description.length < 35 && "..."}See more</span>
          </p>
        } */}
        <p className="text-sm text-muted-foreground line-clamp-2">
        {truncateText(menu.description, 35)}
        <span className="font-semibold text-sm mt-1">{menu.description.length < 35 && "..."}See more</span>
        </p>
      </CardFooter>
      <ReusableModal open={isModalOpen} onOpenChange={setIsModalOpen} >
        <MenuDetailPage id={menu.id} />
      </ReusableModal>
    </Card>
  );
};

// this dropdown only shows to shop owner
const ActionDropdown  =({menu}:{menu:TMenu})=>{
  const [menuDelete] = useDeleteMenuMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { isModalOpen, setIsModalOpen } = useMenuModal();
  const handleDelete = async () => {
    try {
      await menuDelete(menu.id);
    } catch (error) {
      console.log(error);
    }
  };
  return(
  <>
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
  </>
  )
}