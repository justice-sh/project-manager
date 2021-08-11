import { combineReducers } from "redux";
import projectsReducer from "./projects";
import typesReducer from "./projectTypes";

export default combineReducers({
  projects: projectsReducer,
  types: typesReducer,
});
