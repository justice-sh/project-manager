import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import ProjectType from "../types/projectType";

const slice = createSlice({
  name: "types",
  initialState: [],
  reducers: {
    typesAdded: (state, action: PayloadAction<{ types: ProjectType[] }>) => {
      return action.payload.types;
    },

    typeAdded: (state, action: PayloadAction<{ type: ProjectType }>) => {
      state.push(action.payload.type);
    },

    typesCleared: (state, action) => [],
  },
});

export default slice.reducer;

export const { typesAdded, typesCleared, typeAdded } = slice.actions;
