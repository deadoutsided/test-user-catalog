import { combineReducers } from "redux";
import { userDataReducer } from "./user-data";
import { usersCatalogReducer } from "./users-catalog";

export const rootReducer = combineReducers({
  userData: userDataReducer,
  usersCatalog: usersCatalogReducer,
})