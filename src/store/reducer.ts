import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import uiReducer from "./ui";

export default combineReducers({
  entities: entitiesReducer,
  ui: uiReducer,
});
