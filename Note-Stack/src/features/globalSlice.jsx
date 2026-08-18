import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectNoteId: null,
  isCreateTaskModalOpen: false,
  isDeleteTaskModalOpen: false,
  isEditTaskModalOpen: false,
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

    setSelectedNoteId: (state, action) => {
      state.selectedNoteId = action.payload;
    },
  },
});

export const {
  setCreateTaskModal,
  setDeleteTaskModal,
  setEditModal,
  setSearchQuery,
  setSelectedNoteId,
} = globalSlice.actions;
export default globalSlice.reducer;
