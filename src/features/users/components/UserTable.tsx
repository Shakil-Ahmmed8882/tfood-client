import { useTableContext } from "@/components/table/hooks/useTableContext";
import { Badge } from "@/components/ui/badge";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { RenderTableBody } from "@/components/table/RenderTableBody";
import { TUser } from "@/types/user.type";

const UserTable = () => {
  const { data, pagination } = useTableContext<TUser>();


  
  return (
    <>
      <RenderTableBody>
        <TableBody>
          {data.map(
            ({ id, name,email,role, status }, index) => (
              <TableRow key={id}>
                <TableCell className="px-5">
                  {(pagination?.currentPage - 1) * pagination?.itemsPerPage +
                    index +
                    1}
                </TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{role}</TableCell>
                <TableCell>
                  <Badge className="bg-emerald-100 text-emerald-600">
                    {status}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </RenderTableBody>
    </>
  );
};

export default UserTable;



