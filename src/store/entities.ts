import { combineReducers } from "redux";

import projectsReducer from "./projects";
import typesReducer from "./projectTypes";
import featuredReducer from "./featured";

export default combineReducers({
  projects: projectsReducer,
  types: typesReducer,
  featured: featuredReducer,
});
