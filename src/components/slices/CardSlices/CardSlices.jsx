import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import fire from "../../../fire";
import firebase from "firebase/compat/app";
import { getCard, GetCard, GetCards } from "../../actions/GetCards";

let CardSlices = createSlice({
  name: "card",
  initialState: {
    cards: [],
  },

  reducers: {
    addCard(state, action) {
      const firestore = fire.firestore();
      async function addCard2() {
        try {
          await addDoc(collection(firestore, "messages"), {
            text: action.payload.text,
            description: action.payload.description,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        } catch (error) {
          console.log(error);
        }
      }
      addCard2();
    },
    getPoducts(state, action) {
      console.log("this is getProducts");
      state.cards = action.payload;
    },
    getOneProduct(state, action) {
      console.log("this is one product");
      state.cards = action.payload;
    },
  },
});

export const { addCard, getPoducts, getOneProduct } = CardSlices.actions;
export default CardSlices.reducer;
