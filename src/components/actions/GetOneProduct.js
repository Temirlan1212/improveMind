import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axios from "axios";

import { collection, getDocs } from "firebase/firestore";
import fire from "../../fire";
import { getOneProduct } from "../slices/CardSlices/CardSlices";

export const getOneCard = createAsyncThunk(
  "get/OneCard",

  async (id, { __, dispatch }) => {
    let list = [];
    const firestore = fire.firestore();
    const snapshot = await firestore.collection("messages").doc(id).get();
    console.log(snapshot);
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }

    const data = snapshot.data();

    dispatch(getOneProduct(data));
  }
);
