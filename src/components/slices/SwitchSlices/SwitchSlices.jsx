import { createSlice } from "@reduxjs/toolkit";

const SwitchSlices = createSlice({
  name: "switch",

  initialState: {
    switch: "",
  },

  reducers: {
    addSwitch(state, action) {
      console.log("this is switch");

      let color = localStorage.getItem("switch");
      if (color === "light") {
        localStorage.setItem("switch", "dark");
      } else if (color === "dark") {
        localStorage.setItem("switch", "light");
      }
      state.switch = color;
    },
  },
});

export const { addSwitch } = SwitchSlices.actions;

export default SwitchSlices.reducer;
