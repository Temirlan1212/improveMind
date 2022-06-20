import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  getByYear,
  getOneProduct,
  getPoducts,
} from "../../slices/CardSlices/CardSlices";
import { getByAverageMark } from "../../slices/CardSlices/CardSlices";
import fire from "../../../fire";

export const getByYearAction = createAsyncThunk(
  "get/byByYear",

  async (_, { __, dispatch }) => {
    const firestore = fire.firestore();
    let list = [];

    try {
      const querySnapshot = firestore.collection("messages");
      const snapshot = await querySnapshot
        .orderBy("year", "desc")
        .limit(5)
        .get();

      snapshot.forEach((doc) => {
        console.log(doc.data());
        list.push({ id: doc.id, ...doc.data() });
      });
      dispatch(getByYear(list));
    } catch (err) {
      console.log(err);
    }

    console.log(list);
  }
);
