import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";

import { collection, getDocs } from "firebase/firestore";
import fire from "../../fire";
import { getOneProduct, getPoducts } from "../slices/CardSlices/CardSlices";

export const getCard = createAsyncThunk(
  "get/cards",

  async (_, { __, dispatch }) => {
    const firestore = fire.firestore();
    let list = [];

    try {
      const querySnapshot = await getDocs(collection(firestore, "messages"));

      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      dispatch(getPoducts(list));
    } catch (err) {
      console.log(err);
    }
  }
);
