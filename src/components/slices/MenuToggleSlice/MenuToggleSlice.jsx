import { createSlice } from "@reduxjs/toolkit";

let MenuToggleSlice = createSlice({
  name: "toggle",
  initialState: {
    menuToggle: false,
    langToggle: false,
  },
  reducers: {
    menuToggleMiddle(state, action) {
      console.log("toggleMenu");
      state.menuToggle = action.payload;
    },
    langToggleMiddle(state, action) {
      console.log("toggleLang");
      state.langToggle = action.payload;
    },
  },
});
export const { menuToggleMiddle, langToggleMiddle } = MenuToggleSlice.actions;
export default MenuToggleSlice.reducer;
