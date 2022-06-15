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
import { getRatingsAction } from "../actions/GetRatings";

export default function BasicRating({ item }) {
  const firestore = fire.firestore();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useParams();

  const { user: currentUser } = useSelector((state) => state.auth.email);
  const ratings = useSelector((state) => state.rating.ratings);
  const createdId = id + user;

  useEffect(() => {
    dispatch(getRatingsAction());
  }, []);

  console.log(ratings);

  const updateRatings = async (id, update) => {
    // await firestore.collection("ratings").doc(id).update({ mark: update });

    firestore
      .collection("ratings")
      .where("customId", "==", createdId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (document) {
          document.ref.update({ mark: update });
        });
      })
      .catch((err) => {
        console.log("err", "=>", err);
      });

    dispatch(getRatingsAction());
  };

  const putRating = (id, newValue) => {
    let user = {
      customId: createdId,
      email: currentUser,
      mark: newValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let checkUser = ratings.some((item) => item.email === currentUser);
    console.log(checkUser);

    if (checkUser) {
      updateRatings(id, newValue);
    } else {
      dispatch(addRating({ user, id }));
    }

    dispatch(getRatingsAction(id));
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
        // value={mark === undefined ? 0 : mark}
        onChange={(event, newValue) => {
          putRating(id, newValue);
        }}
      />
      <button>click</button>
    </Box>
  );
}
