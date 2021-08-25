import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

import { getLastProject } from "./projects";

class Store {
  private store = configureStore({ reducer });

  configureStore() {}

  getState() {
    return this.store.getState();
  }

  dispatch(action, payload) {
    this.store.dispatch({ type: action.type, payload });
  }

  getLastProject() {
    return getLastProject(this.store.getState());
  }
}

const store = new Store();
export default store;
