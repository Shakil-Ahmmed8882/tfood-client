export { 
  useGetAllUsersQuery, 
  useUpdateUserMutation, 
  useDeleteUserMutation 
} from "@/store/features/user/userApi";




// ____________________ contants _______________________
export const userOptions = [
    {name: "admin", value: "admin"},
    {name: "customer", value: "customer"},
    {name: "shop_owner", value: "shop_owner"}
  
]
export const userTableHeadsOptions = ["Sl No.", "Name", "Email", "Role","Status"]
