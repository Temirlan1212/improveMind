import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";

import { collection, getDocs } from "firebase/firestore";
import fire, { auth1 } from "../../fire";
import { getOneProduct, getPoducts } from "../slices/CardSlices/CardSlices";
import { getChapter } from "../slices/ChapterSlices/ChapterSlices";
import { onAuthChange } from "../slices/AuthSlice/AuthSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const GetAuthEmail = createAsyncThunk(
  "get/auth",

  async (_, { __, dispatch }) => {
    const auth = fire.auth();
    onAuthStateChanged(auth, (user) => {
      console.log();
      if (user) {
        dispatch(onAuthChange({ user: user.email, photoUrl: user.photoURL }));
      } else {
        console.log("no email");
      }
    });
  }
);
