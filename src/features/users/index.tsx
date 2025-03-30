export { 
  useGetAllUsersQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from "@/store/features/user/userApi";




// ____________________ contants _______________________
export const userOptions = ["admin", "customer", "shop_owner"]
export const userTableHeadsOptions = ["Sl No.", "Name", "Email", "Role","Status"]
