import { createSlice } from "@reduxjs/toolkit";
import { addDoc, collection } from "firebase/firestore";
import fire from "../../../fire";
import firebase from "firebase/compat/app";
import { getCard, GetCard, GetCards } from "../../actions/GetCards";

let CardSlices = createSlice({
  name: "card",
  initialState: {
    cards: [],
    card: [],
    byAverageMark: [],
    byYear: [],
  },

  reducers: {
    addCard(state, action) {
      const firestore = fire.firestore();
      async function addCard2() {
        try {
          await addDoc(collection(firestore, "messages"), {
            text: action.payload.text,
            description: action.payload.description,
            img: action.payload.img,
            year: +action.payload.year,
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
    getByAverageMark(state, action) {
      state.byAverageMark = action.payload;
    },
    getByYear(state, action) {
      state.byYear = action.payload;
    },
    getOneProduct(state, action) {
      console.log("this is one product");
      state.card = action.payload;
    },
    updateProduct(state, action) {
      console.log(action.payload);
      const firestore = fire.firestore();
      async function updateProduct2() {
        await firestore
          .collection("messages")
          .doc(action.payload.id)
          .update(action.payload.updates)
          .then(() => console.log("updated successfully"))
          .catch((err) => {
            console.log("err", "=>", err);
          });
      }
      updateProduct2();
    },
    deleteProduct(state, action) {
      const firestore = fire.firestore();
      console.log("this is delete product");
      const deleteProduct2 = async () => {
        const res = await firestore
          .collection("messages")
          .doc(action.payload)
          .delete();
      };
      deleteProduct2();
    },
  },
});

export const {
  addCard,
  getPoducts,
  getOneProduct,
  deleteProduct,
  updateProduct,
  getByYear,
  getByAverageMark,
} = CardSlices.actions;
export default CardSlices.reducer;
