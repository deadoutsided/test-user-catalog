import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import * as thunkMiddleware from "redux-thunk";
import { rootReducer } from "./services/reducers/index.ts";
import { composeWithDevTools } from "@redux-devtools/extension";

//const middlewareEnhancer = applyMiddleware(thunkMiddleware)

export const store = createStore(
  rootReducer,
  undefined,
  composeWithDevTools(applyMiddleware(thunkMiddleware.thunk))
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
