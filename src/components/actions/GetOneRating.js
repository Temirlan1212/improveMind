import { createAsyncThunk } from "@reduxjs/toolkit";
import fire from "../../fire";
import {
  getOneRating,
  getOneRatingSubCollection,
} from "../slices/RatingSlice/RatingSlice";

export const getOneSubCollectionRatingAction = createAsyncThunk(
  "get/OneRating",

  async (id, { __, dispatch }) => {
    const firestore = fire.firestore();
    const querySnapshot = await firestore
      .collection(`messages/${id.id}/ratings`)
      .where("email", "==", id.currentUser)
      .get();

    let list = [];
    querySnapshot.forEach((queryDocumentSnapshot) => {
      list.push(queryDocumentSnapshot.data());
    });

    dispatch(getOneRatingSubCollection(list));
  }
);
