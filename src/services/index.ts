/* import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import * as reducers from './exports.ts';

export default function createStoreRedux(services: unknown, config = {}){
  return createStore(combineReducers(reducers), undefined, applyMiddleware(thunk.withExtraArgument(services)))
} */