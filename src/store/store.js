import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./blogSlice";
import authReducer from "./authSlice";
// import authSlice from "./authSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    // blogs: blogReducer,
  },
});
