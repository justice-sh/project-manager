import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from ".";

import Project from "../types/project";

type PayloadProject = PayloadAction<{ project: Project }>;

const slice = createSlice({
  name: "projects",
  initialState: [] as Project[],
  reducers: {
    projectAdded: (state, action: PayloadProject) => {
      state.push(action.payload.project);
    },

    projectUpdated: (state, action: PayloadProject) => {
      const index = state.findIndex((p) => p.id === action.payload.project.id);
      state[index] = action.payload.project;
    },

    projectDeleted: (state, action: PayloadProject) => {
      return state.filter((p) => p.id !== action.payload.project.id);
    },

    projectsAdded: (state, action: PayloadAction<{ projects: [] }>) => {
      return action.payload.projects;
    },
  },
});

export const { projectAdded, projectDeleted, projectUpdated, projectsAdded } =
  slice.actions;

export default slice.reducer;

export const projectSelector = (state: RootState) => ({
  projects: state.entities.projects,
});

export const getLastProject = (state: RootState): Project => {
  const { length } = state.entities.projects;
  return state.entities.projects[length - 1];
};

export const getProject = (id: string, state: RootState): Project => {
  return state.entities.projects.find((p) => p.id === id);
};
