import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./features/auth/authSlice";

import { authReducer } from "./features/auth/authSlice";
import { baseApi } from "./api/baseApi";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { restaurantApi } from "./features/restaurants/restaurantApi";
import { menuApi } from "./features/menu/menuApi";
import { restaurantReducer } from "./features/restaurants/restaurantSlice";
import { analyticsApi } from "./features/analytics/analyticsApi";
import { menuCategoryApi } from "./features/menu-category/menuCategoryApi";

const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const persistedReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedReducer,
    restaurant: restaurantReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      baseApi.middleware,
      restaurantApi.middleware,
      menuApi.middleware,
      analyticsApi.middleware,
      menuCategoryApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
