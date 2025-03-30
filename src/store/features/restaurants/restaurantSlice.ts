import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { TRestaurant } from "@/features/restaurants/type.restaurant";
/**
 * restaurantSlice.ts : Manages restaurant state using Redux Toolkit.
 *
 * Features:
 * - Stores restaurant details in the Redux store.
 * - Provides actions to update restaurant data.
 * - Includes a selector to retrieve the current restaurant from the state.
 */

type restaurantState = {
  restaurant: TRestaurant | null;
};

/**
 * initialState : Defines the default state with `restaurant` set to null.
 */

// Initial state for the auth slice
const initialState: restaurantState = {
  restaurant: null,
};

// Create a slice for authentication with reducers
const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {
    /**
     * setRestaurant : Redux action to update the restaurant state.
     * - Accepts restaurant data as payload.
     * - Updates the state with the new restaurant information.
     */
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurant } = restaurantSlice.actions;
// Export reducer to be used in the store
export const restaurantReducer = restaurantSlice.reducer;

/**
 * selectCurrentRestaurant : Selector to retrieve the current restaurant from the Redux store.
 * - Accesses `state.restaurant?.restaurant`.
 */
export const selectCurrentRestaurant = (state: RootState) =>
  state.restaurant?.restaurant;
