import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";

import { collection, getDocs } from "firebase/firestore";
import fire from "../../fire";
import { getOneProduct, getPoducts } from "../slices/CardSlices/CardSlices";
import { getChapter } from "../slices/ChapterSlices/ChapterSlices";

export const getChapterAction = createAsyncThunk(
  "get/chapter",

  async (_, { __, dispatch }) => {
    const firestore = fire.firestore();
    let list = [];

    try {
      const querySnapshot = await getDocs(collection(firestore, "chapter"));

      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      dispatch(getChapter(list));
    } catch (err) {
      console.log(err);
    }
  }
);
