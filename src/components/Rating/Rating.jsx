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
import { addRating } from "../slices/RatingSlice/RatingSlice";
import { getOneRatingAsync } from "../actions/GetOneRating";

export default function BasicRating({ item }) {
  const firestore = fire.firestore();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useParams();

  const { user: currentUser } = useSelector((state) => state.auth.email);
  const ratingOne = useSelector((state) => state.rating.rating);
  const { mark } = useSelector((state) => state.rating.rating);

  const idCreated = id + user;

  console.log(idCreated);

  useEffect(() => {
    dispatch(getOneRatingAsync(id + user));
  }, []);

  console.log(ratingOne);

  const updateRatings = async (id, update) => {
    await firestore.collection("ratings").doc(id).update({ mark: update });
    dispatch(getOneRatingAsync(id));
  };

  const putRating = (id, newValue) => {
    let user = {
      email: currentUser,
      mark: newValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let checkUser = ratingOne.email === currentUser;
    console.log(checkUser);

    if (checkUser) {
      updateRatings(idCreated, newValue);
    } else {
      dispatch(addRating({ user, id, currentUser }));
    }

    dispatch(getOneRatingAsync(idCreated));
  };

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
      }}
    >
      <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={mark === undefined ? 0 : mark}
        onChange={(event, newValue) => {
          putRating(id, newValue);
        }}
      />
      <button>click</button>
    </Box>
  );
}
