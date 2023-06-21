import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import userSlice from "./userSlice";
import { jobApi } from "./jobApi";
export const store = configureStore({
  reducer: {
    userInfo: userSlice,
    [userApi.reducerPath]: userApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat([userApi.middleware, jobApi.middleware]),
});
