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
  },

  reducers: {
    addRating(state, action) {
      const firestore = fire.firestore();
      console.log(action.payload);
      const addRating2 = async () => {
        try {
          await setDoc(
            doc(
              firestore,
              "ratings",
              `${action.payload.id}${action.payload.currentUser}`
            ),
            action.payload.user
          );
          console.log("successfully added");
        } catch (error) {
          console.log(error);
        }
      };
      addRating2();
    },

    getOneRating(state, action) {
      state.rating = action.payload;
      console.log(action.payload);
    },
    getRatings(state, action) {
      state.ratings = action.payload;
    },
  },
});

export const { addRating, getOneRating, getRatings } = RatingSlice.actions;
export default RatingSlice.reducer;
