import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: null,
  items: Array<string[]>(),
  error: null,
  status: "idle",
};

export const fetchInventory = createAsyncThunk(
  "auth/fetchInventory",
  async (items: any) => {
      console.log(items)
    try {
      const res = axios.post("http://127.0.0.1:5000/api/v1/items", items);
      const item = (await res).data;
      return item;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchInventoryItems = createAsyncThunk(
  "auth/fetchInventoryItems",
  async () => {
    try {
      const res = axios.get("http://127.0.0.1:5000/api/v1/items");
      const item = (await res).data;
      return item;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const fetchInventoryCategories = createAsyncThunk(
  "auth/fetchInventoryCategories",
  async () => {
    try {
      const res = axios.get("http://127.0.0.1:5000/api/v1/categories");

      const categories = (await res).data;
      return categories;
    } catch (error) {
      return error.response.data;
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchInventory.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.items.push(action.payload);
      }
    );
    builder.addCase(fetchInventory.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchInventory.rejected, (state) => {
      state.status = "reject";
    });
    builder.addCase(
      fetchInventoryItems.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.items = action.payload;
      }
    );
    builder.addCase(fetchInventoryItems.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchInventoryItems.rejected, (state) => {
      state.status = "reject";
    });
    builder.addCase(
      fetchInventoryCategories.fulfilled,
      (state, action: { payload: any }) => {
        state.status = "success";
        state.categories = action.payload;
      }
    );
    builder.addCase(fetchInventoryCategories.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchInventoryCategories.rejected, (state) => {
      state.status = "reject";
    });
  },
});

export const inventoryAction = inventorySlice.actions;
export default inventorySlice;