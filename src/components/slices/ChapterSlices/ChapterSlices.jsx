import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import fire from "../../../fire";
import firebase from "firebase/compat/app";

let ChapterSlices = createSlice({
  name: "chapter",
  initialState: {
    chapter: [],
  },

  reducers: {
    addChapter(state, action) {
      const firestore = fire.firestore();

      async function addChapter2() {
        console.log(action.payload);
        try {
          await addDoc(collection(firestore, "chapter"), {
            chapter: action.payload,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        } catch (error) {
          console.log(error);
        }
      }
      addChapter2();
    },
    getChapter(state, action) {
      console.log("this is getChpater");
      state.chapter = action.payload;
    },
  },
});

export const { addChapter, getChapter } = ChapterSlices.actions;

export default ChapterSlices.reducer;
