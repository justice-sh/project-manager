import { createSlice } from "@reduxjs/toolkit";

import Project from "../types/project";

const slice = createSlice({
  name: "projects",
  initialState: [] as Project[],
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

    projectsAdded: (state, action) => action.payload.projects,

    projectsCleared: (state, action) => [],
  },
});

export const {
  projectAdded,
  projectDeleted,
  projectUpdated,
  projectsAdded,
  projectsCleared,
} = slice.actions;

export default slice.reducer;

export const projectSelector = (state) => ({
  projects: state.entities.projects,
});

export const getLastProject = (state) => {
  const { length } = state.entities.projects;
  return state.entities.projects[length - 1];
};
