import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import fire from "../../fire";
import { getRatings } from "../slices/RatingSlice/RatingSlice";

export const getRatingsAction = createAsyncThunk(
  "get/ratings",

  async (_, { __, dispatch }) => {
    const firestore = fire.firestore();
    let list = [];

    try {
      const querySnapshot = await getDocs(collection(firestore, "ratings"));

      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      dispatch(getRatings(list));
    } catch (err) {
      console.log(err);
    }
  }
);
