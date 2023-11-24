import graphPageReducer from "./reducers/graphPageSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    graphPageStore: graphPageReducer,
  },
});
