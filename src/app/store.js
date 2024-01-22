import { configureStore } from "@reduxjs/toolkit";
import jokesSliceReducer from "./jokesSlice";

const store = configureStore({
  reducer: {
    jokes: jokesSliceReducer,
  },
});

export default store;
