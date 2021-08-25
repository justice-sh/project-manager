import { createSlice } from "@reduxjs/toolkit";

import Featured from "../types/featured";

const slice = createSlice({
  name: "featured",
  initialState: [] as Featured[],
  reducers: {
    featuredAdded: (state, action) => {
      state.push(action.payload.featured);
    },

    featuredUpdated: (state, action) => {
      const { featured } = action.payload;
      const index = state.findIndex((p) => p.id === featured.id);
      state[index] = featured;
    },

    featuredRemoved: (state, action) => {
      return state.filter((p) => p.id !== action.payload.featured.id);
    },

    featuredsAdded: (state, action) => action.payload.featureds,

    cleared: (state, action) => [],
  },
});

export const {
  featuredAdded,
  featuredRemoved,
  featuredUpdated,
  cleared,
  featuredsAdded,
} = slice.actions;

export default slice.reducer;
