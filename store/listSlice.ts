import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Item = {
  id: number;
  name: string;
  url: string;
};

type ListState = {
  page: number;
  limit: number;
  search: string;
};

const initialState: ListState = {
  page: 1,
  limit: 10,
  search: ""
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      state.limit = action.payload;
      state.page = 1;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
    }
  },
});

export const { setPage, setLimit, setSearch } = listSlice.actions;
export default listSlice.reducer;
