import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "types",
  initialState: [],
  reducers: {
    typesAdded: (state, action) => {
      return action.payload.types;
    },

    typesCleared: (state, action) => [],
  },
});

export default slice.reducer;

export const { typesAdded, typesCleared } = slice.actions;
