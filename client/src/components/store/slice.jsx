import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userid: "",
  token: "",
};
const tokenReducer = createSlice({
  name: "token",
  initialState,
  reducers: {
    adduserid(state, action) {
      state.userid = action.payload;
    },
    addusertoken(state, action) {
      state.token = action.payload;
    },
    removeuser(state, action) {
      state.userid = "";
      state.token = "";
    },
  },
});
export const { adduserid, addusertoken, removeuser } = tokenReducer.actions;
export default tokenReducer.reducer;
