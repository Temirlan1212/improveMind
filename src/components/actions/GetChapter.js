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
    console.log("this is action get chapter");
    const firestore = fire.firestore();
    let list = [];

    try {
      // const querySnapshot = await getDocs(collection(firestore, "chapter"));
      const citiesRef = firestore.collection("chapter");
      const querySnapshot = await citiesRef.orderBy("chapter", "desc").get();

      querySnapshot.forEach((doc) => {
        list.unshift({ id: doc.id, ...doc.data() });
      });
      dispatch(getChapter(list));
    } catch (err) {
      console.log(err);
    }
  }
);
