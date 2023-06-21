import { createSlice } from "@reduxjs/toolkit";
import { getUser, removeUser, setUser } from "./localStorage";

const initialState = {
  userDetail: getUser(),
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    addUserDetail: (state, action) => {
      state.userDetail = action.payload;
      setUser(state.userDetail);
    },
    removeUserDetail: (state, action) => {
      state.userDetail = null;
      removeUser();
    },
  },
});

export const { addUserDetail, removeUserDetail } = userSlice.actions;
export default userSlice.reducer;
