import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "types",
  initialState: [],
  reducers: {
    typesAdded: (state, action) => {
      return action.payload.types;
    },

    typesCleared: (state, action) => {
      return [];
    },
  },
});

export default slice.reducer;

export const { typesAdded, typesCleared } = slice.actions;
