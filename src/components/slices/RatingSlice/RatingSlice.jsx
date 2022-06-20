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
    addSubCollectionRating(state, action) {
      const firestore = fire.firestore();
      console.log(action.payload);
      const addSubCollection2 = async () => {
        // firestore
        //   .collection("messages")
        //   .doc(id)
        //   .collection("ratings")
        //   .add({
        //     email: currentUser,
        //     mark: 3,
        //   })
        //   .then(function () {
        //     console.log("Document Added ");
        //   })
        //   .catch(function (error) {
        //     console.error("Error adding document: ", error);
        //   });

        firestore
          .collection("messages")
          .doc(action.payload.id)
          .collection("ratings")
          .doc(action.payload.currentUser)
          .set({
            email: action.payload.currentUser,
            mark: action.payload.newValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            console.log("subcollection updated successfully");
          })
          .catch((err) => {
            console.log("err", "=>", err);
          });
      };
      addSubCollection2();
    },

    getOneRatingSubCollection(state, action) {
      state.rating = action.payload[0];
      console.log("this is get one Rating", action.payload);
    },
    getRatingSubCollection(state, action) {
      state.ratings = action.payload;
    },
    getFilteredRatingById(state, action) {
      state.filtered = action.payload;
    },
  },
});

export const {
  addSubCollectionRating,
  getOneRatingSubCollection,
  getRatingSubCollection,
  getFilteredRatingById,
} = RatingSlice.actions;
export default RatingSlice.reducer;
