import { createAsyncThunk } from "@reduxjs/toolkit";
import fire from "../../fire";
import { getOneRating } from "../slices/RatingSlice/RatingSlice";

export const getOneRatingAction = createAsyncThunk(
  "get/OneRating",

  async (id, { __, dispatch }) => {
    const firestore = fire.firestore();

    const citiesRef = firestore.collection("ratings");
    const snapshot = await citiesRef.where("customId", "==", id).get();
    console.log(snapshot);

    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    let list = [];

    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      list.push(doc.data());
    });

    dispatch(getOneRating(list));
  }
);
