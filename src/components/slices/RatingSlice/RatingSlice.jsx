import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import fire from "../../../fire";
import firebase from "firebase/compat/app";
import { doc, setDoc } from "firebase/firestore";

const RatingSlice = createSlice({
  name: "rating",
  initialState: {
    rating: {},
    ratings: [],
    filtered: [],
  },

  reducers: {
    addRating(state, action) {
      const firestore = fire.firestore();
      console.log(action.payload);
      const addRating2 = async () => {
        try {
          await addDoc(collection(firestore, "ratings"), {
            customId: action.payload.customId,
            email: action.payload.email,
            mark: action.payload.mark,
            id: action.payload.id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          console.log("successfully added");
        } catch (error) {
          console.log(error);
        }
      };
      addRating2();
    },

    getOneRating(state, action) {
      state.rating = action.payload[0];
      console.log("this is get one Rating", action.payload);
    },
    getRatings(state, action) {
      state.ratings = action.payload;
    },
    getFilteredRatingById(state, action) {
      state.filtered = action.payload;
    },
  },
});

export const { addRating, getOneRating, getRatings, getFilteredRatingById } =
  RatingSlice.actions;
export default RatingSlice.reducer;
