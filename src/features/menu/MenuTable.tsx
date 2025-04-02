import { useTableContext } from "@/components/table/hooks/useTableContext";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TableActionButtons } from "@/components/table/TableActionButtons";
import { TMenu } from "./menu.type";
import { useDeleteMenuMutation } from "@/store/features/menu/menuApi";
import { useState } from "react";
import { ConfirmModal } from "@/components/custom-ui/ConfirmModal";
import { MenuModalForm } from "./components/MenuModalForm";
import { truncateText } from "@/utils/turncateText";

const MenuTable = () => {
  const { data, pagination } = useTableContext<TMenu>();
  return (
    <>
      <TableBody>
        {data.map((menu, index) => (
          <TableRow key={menu.id}>
            <TableCell className="px-5">
              {(pagination?.currentPage - 1) * pagination?.itemsPerPage +
                index +
                1}
            </TableCell>
            <TableCell>{truncateText(menu.title, 10)}</TableCell>
            <TableCell>
              <img
                className="size-8 rounded-full"
                src={menu.related_images[0]}
                alt=""
              />
            </TableCell>
            <TableCell>{menu.food_category}</TableCell>
            <TableCell>{menu.price}</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>
              <TableActionWrapper menu={menu} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default MenuTable;

const TableActionWrapper = ({ menu }: { menu: TMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteMenu] = useDeleteMenuMutation();

  const onDelete = async () => {
    await deleteMenu(menu.id);
    // console.log("___________>>>>res<<<<", res);
  };

  return (
    <>
      <TableActionButtons
        onEdit={() => setIsModalOpen(true)}
        onDelete={() => setIsConfirmModalOpen(true)}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onOpenChange={setIsConfirmModalOpen}
        onConfirm={onDelete}
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
    </>
  );
};
