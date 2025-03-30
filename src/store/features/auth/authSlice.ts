import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { USER_ROLE_TYPE } from "@/constants";

// Define a type for the user object
export type TUser = {
  email: string;
  userId: string;
  role: USER_ROLE_TYPE;
  iat: number; // Issued at timestamp
  exp: number; // Expiration timestamp
};

// Define a type for the authentication state
type TAuthState = {
  user: null | TUser; // User object or null if not authenticated
  token: null | string; // Authentication token or null
};

// Initial state for the auth slice
const initialState: TAuthState = {
  user: null,
  token: null,
};

// Create a slice for authentication with reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user data and token
    setUser: (state, action) => {
      try {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        // console.log("User set successfully", action.payload);
      } catch (error) {
        console.error("Error setting user:", error);
      }
    },
    // Action to clear user data and token (logout)
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

// Export actions for use in components
export const { setUser, logout } = authSlice.actions;

// Export reducer to be used in the store
export const authReducer = authSlice.reducer;

// Selector to get the current user from the state
export const selectCurrentUser = (state: RootState) => state.auth.user;

// Selector to get the current token from the state
export const selectCurrentToken = (state: RootState) => state.auth.token;
