import { Loader } from "@/components/custom-ui/Loader";
import { TMenu } from "@/features/menu";
import { MenuDetails } from "@/features/menu/components/MenuDetails";
import { useGetMenuByIdQuery } from "@/store/features/menu/menuApi";
// import { useParams } from "react-router-dom";

export const MenuDetailPage = ({id}:{id:string}) => {
  // const { id } = useParams();
  const { data, isLoading, isFetching } = useGetMenuByIdQuery(id);

  return (
    <>
      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <MenuDetails menu={data?.data as TMenu} />
      )}
    </>
  );
};
// export default MenuDetailPage;
// MenuDetailPage.displayName = "MenuDetailPage";
