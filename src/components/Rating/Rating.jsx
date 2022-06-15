import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import fire from "../../fire";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCard } from "../actions/GetCards";
import { getOneCard } from "../actions/GetOneProduct";
import { createNextState } from "@reduxjs/toolkit";
import firebase from "firebase/compat/app";

export default function BasicRating({ item }) {
  const firestore = fire.firestore();
  const [value, setValue] = useState(2);
  const [valueFromFire, setValueFromFire] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();

  const card = useSelector((state) => state.card.cards);
  useEffect(() => {
    dispatch(getOneCard(id));
    fetchData();
  }, []);

  const { user: currentUser } = useSelector((state) => state.auth.email);
  console.log(card);
  console.log(currentUser);

  const fetchData = async () => {
    const doc = await firestore.collection("messages").doc(id).get();

    const product = {
      id: doc.id,
      ...doc.data(),
    };

    let oneMark = product.rating.filter((elem) => elem.email === currentUser);
    console.log(oneMark);
    setValueFromFire(oneMark[0].mark);
  };

  const updateRatings = async (id, update) => {
    await firestore.collection("messages").doc(id).update({ rating: update });
    fetchData();
  };

  const putRating = (id, newValue) => {
    let user = {
      email: currentUser,
      mark: newValue,
    };

    let checkUser = card?.rating.some((item) => item?.email === currentUser);
    console.log(checkUser);

    if (checkUser) {
      //   let filteredRating = card.rating.filter((elem) => {
      //     return elem.email !== currentUser;
      //   });
      //   console.log(filteredRating);
      // updateRatings(id, user);
    } else {
      let ratings = [...card.rating, user];
      console.log(ratings);
      updateRatings(id, ratings);
    }

    dispatch(getOneCard(id));
  };

  console.log(valueFromFire);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={valueFromFire}
        onChange={(event, newValue) => {
          putRating(id, newValue);
        }}
      />
      <button onClick={() => fetchData3(id, value)}>click</button>
    </Box>
  );
}
