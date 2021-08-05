import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import inventorySlice from "./slices/inventory";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    inventory: inventorySlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
