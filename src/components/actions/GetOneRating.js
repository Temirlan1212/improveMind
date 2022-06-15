import { createAsyncThunk } from "@reduxjs/toolkit";
import fire from "../../fire";
import { getOneRating } from "../slices/RatingSlice/RatingSlice";

export const getOneRatingAsync = createAsyncThunk(
  "get/OneRating",

  async (id, { __, dispatch }) => {
    const firestore = fire.firestore();
    const snapshot = await firestore.collection("ratings").doc(id).get();

    console.log(snapshot.exists);
    if (!snapshot.exists) {
      console.log("No matching documents.");
      return;
    }

    const data = snapshot.data();
    console.log(data);

    dispatch(getOneRating(data));
  }
);
