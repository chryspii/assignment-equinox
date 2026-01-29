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
  selected?: Item;
  hydrated: boolean;
};

const initialState: ListState = {
  page: 1,
  limit: 10,
  search: "",
  selected: undefined,
  hydrated: false
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<ListState>) {
      return {
        ...action.payload,
        hydrated: true,
      };
    },
    markHydrated(state) {
      state.hydrated = true;
    },
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
    },
    setSelected(state, action: PayloadAction<Item>) {
      state.selected = action.payload;
    },
    clearSelected(state) {
      state.selected = undefined;
    }
  },
});

export const { hydrate, markHydrated, setPage, setLimit, setSearch, setSelected, clearSelected } = listSlice.actions;
export default listSlice.reducer;
