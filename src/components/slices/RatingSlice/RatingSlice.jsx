import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import fire from "../../../fire";
import firebase from "firebase/compat/app";

const RatingSlice = createSlice({
  name: "rating",
  initialState: {
    rating: [],
  },

  reducers: {
    addRating(state, action) {
      const addRating2 = async () => {
        try {
          await addDoc(collection(firestore, "ratings"), action.payload);
        } catch (error) {
          console.log(error);
        }
      };
      addRating2();
    },
  },
});

export const { addRating } = RatingSlice.actions;
export default RatingSlice.reducer;
