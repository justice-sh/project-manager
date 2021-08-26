import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import Featured from "../types/featured";

type PayloadFeatured = PayloadAction<{ featured: Featured }>;

const slice = createSlice({
  name: "featured",
  initialState: [] as Featured[],
  reducers: {
    featuredAdded: (state, action: PayloadFeatured) => {
      state.push(action.payload.featured);
    },

    featuredUpdated: (state, action: PayloadFeatured) => {
      const { featured } = action.payload;
      const index = state.findIndex((p) => p.id === featured.id);
      state[index] = featured;
    },

    featuredRemoved: (state, action: PayloadFeatured) => {
      return state.filter((p) => p.id !== action.payload.featured.id);
    },

    featuredsAdded: (state, action: PayloadAction<{ list: Featured[] }>) => {
      return action.payload.list;
    },

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
