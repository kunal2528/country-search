import { createSlice, configureStore } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    allItems: [], // Full fetched list of items from the API
    paginatedItems: [], // Items displayed in the UI (pagination chunks)
    page: 1, // Current page for pagination
    pageSize: 20, // Number of items per page
    searchTerm: '', // Search input
    allItemsLoaded: false, // Flag to track if all items are loaded
  },
  reducers: {
    setItems(state, action) {
      state.allItems = action.payload;
      state.paginatedItems = action.payload.slice(0, state.pageSize);
      state.allItemsLoaded = state.paginatedItems.length >= state.allItems.length;
    },
    loadMoreItems(state) {
      const start = state.page * state.pageSize;
      const end = start + state.pageSize;
      const moreItems = state.allItems.slice(start, end);
      
      if (moreItems.length > 0) {
        state.paginatedItems = [...state.paginatedItems, ...moreItems];
        state.page += 1;
      }

      state.allItemsLoaded = state.paginatedItems.length >= state.allItems.length;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.page = 1;
      const filteredItems = state.allItems.filter(item =>
        item.label.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
      state.paginatedItems = filteredItems.slice(0, state.pageSize);
      state.allItemsLoaded = state.paginatedItems.length >= filteredItems.length;
    },
  },
});

export const { setItems, loadMoreItems, setSearchTerm } = itemsSlice.actions;
export const itemsReducer = itemsSlice.reducer;

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
  },
});

export default store;
