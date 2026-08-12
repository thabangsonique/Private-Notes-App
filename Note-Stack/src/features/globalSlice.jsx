import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectTaskId: null,
  isCreatTaskModalOpen: false,
  isDeleteTaskModalOpen: false,
  isEditTaskModalOpen: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setCreateTaskModal: (state, action) => {
      state.isCreatTaskModalOpen = action.payload;
    },

    setDeleteTaskModal: (state, action) => {
      state.isDeleteTaskModalOpen = action.payload;
    },

    setEditModal: (state, action) => {
      state.isEditTaskModalOpen = action.payload;
    },
  },
});

export const { setCreateTaskModal, setDeleteTaskModal, setEditModal } =
  globalSlice.actions;
export default globalSlice.reducer;
