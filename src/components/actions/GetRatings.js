import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import fire from "../../fire";
import {
  getRatings,
  getRatingSubCollection,
} from "../slices/RatingSlice/RatingSlice";

export const getRatingSubCollectionAction = createAsyncThunk(
  "get/ratings",

  async (id, { __, dispatch }) => {
    const firestore = fire.firestore();
    const querySnapshot = await firestore
      .collection(`messages/${id}/ratings`)
      .get();

    let list = [];
    querySnapshot.forEach((queryDocumentSnapshot) => {
      list.push(queryDocumentSnapshot.data());
    });
    console.log(list);

    dispatch(getRatingSubCollection(list));
  }
);
