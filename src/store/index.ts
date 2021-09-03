import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

import { getLastProject, getProject } from "./projects";

class Store {
  private store = configureStore({ reducer });

  getStore() {
    return this.store;
  }

  getState() {
    return this.store.getState();
  }

  dispatch(action, payload) {
    this.store.dispatch({ type: action.type, payload: payload });
  }

  getLastProject() {
    return getLastProject(this.store.getState());
  }

  getProject(projectId: string) {
    return getProject(projectId, this.store.getState());
  }
}

const store = new Store();

export type RootState = ReturnType<typeof store.getState>;

export default store;
