import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectTaskId: null,
  isCreateTaskModalOpen: false,
  isDeleteTaskModalOpen: false,
  isEditTaskModalOpen: false,

  searchQuery: "",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCreateTaskModal: (state, action) => {
      state.isCreateTaskModalOpen = action.payload;
    },

    setDeleteTaskModal: (state, action) => {
      state.isDeleteTaskModalOpen = action.payload;
    },

    setEditModal: (state, action) => {
      state.isEditTaskModalOpen = action.payload;
    },

    setSideBarCollapsed: (state, action) => {
      state.sideBarCollapsed = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const {
  setCreateTaskModal,
  setDeleteTaskModal,
  setEditModal,
  setSearchQuery,
} = globalSlice.actions;
export default globalSlice.reducer;
