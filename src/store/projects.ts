import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (state, action) => {
      state.push(action.payload.project);
    },

    projectUpdated: (state, action) => {
      const index = state.findIndex((p) => p.id === action.payload.project.id);
      state[index] = action.payload.project;
    },

    projectDeleted: (state, action) => {
      return state.filter((p) => p.id !== action.payload.project.id);
    },

    projectsAdded: (state, action) => {
      return action.payload.projects;
    },

    projectsCleared: (state, action) => {
      return [];
    },
  },
});

export default slice.reducer;

export const {
  projectAdded,
  projectDeleted,
  projectUpdated,
  projectsAdded,
  projectsCleared,
} = slice.actions;

export const projectSelector = (state) => ({
  projects: state.entities.projects,
});
