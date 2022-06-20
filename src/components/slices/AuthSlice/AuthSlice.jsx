import { alertClasses, alertTitleClasses } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import fire from "../../../fire";

let AuthSlice = createSlice({
  name: "auth",
  initialState: {
    email: [],
    error: [],
    stateAdd: false,
  },
  reducers: {
    signUp(state, action) {
      const auth = fire.auth();

      createUserWithEmailAndPassword(
        auth,
        action.payload.email,
        action.payload.password
      )
        .then((userCredential) => {
          let user = userCredential.user;
          alert(user.email);
          action.payload.setIsCreateAcc(true);
        })
        .catch((error) => {
          // state.error = error.message;
          console.log(error.message);
        });
    },
    signIn(state, action) {
      const auth = fire.auth();

      signInWithEmailAndPassword(
        auth,
        action.payload.email,
        action.payload.password
      )
        .then((userCredential) => {
          let user = userCredential.user;
          alert(user.email);
        })
        .catch((err) => /*(state.error = err.message),*/ alert(err.message));
      console.log("this is signIn");
    },

    onAuthChange(state, action) {
      console.log("this is on auth");
      state.email = action.payload;
    },
  },
});

export const { signUp, signIn, onAuthChange } = AuthSlice.actions;
export default AuthSlice.reducer;
