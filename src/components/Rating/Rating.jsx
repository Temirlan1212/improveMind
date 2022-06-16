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
import { getOneRatingAction } from "../actions/GetOneRating";
import { getFilteredRatingByIdAction } from "../actions/GetFilteredRatingById";
import { updateProduct } from "../slices/CardSlices/CardSlices";

export default function BasicRating({ item }) {
  const firestore = fire.firestore();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useParams();

  const { user: currentUser } = useSelector((state) => state.auth.email);
  const ratings = useSelector((state) => state.rating.ratings);
  const ratingOne = useSelector((state) => state.rating.rating);
  const filteredById = useSelector((state) => state.rating.filtered);
  const createdId = id + user;

  useEffect(() => {
    dispatch(getRatingsAction());
    dispatch(getOneRatingAction(createdId));
    dispatch(getFilteredRatingByIdAction(id));
  }, []);

  // useEffect(() => {}, []);

  const { mark } = ratingOne;

  console.log(mark);
  console.log(ratingOne);
  console.log(filteredById);

  const updateRatings = async (id, update) => {
    firestore
      .collection("ratings")
      .where("customId", "==", createdId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (document) {
          document.ref.update({ mark: update });
          dispatch(getRatingsAction());
          dispatch(getOneRatingAction(createdId));
          dispatch(getFilteredRatingByIdAction(id));
        });
      })
      .catch((err) => {
        console.log("err", "=>", err);
      });

    await dispatch(getFilteredRatingByIdAction(id));

    let totalMark = 0;
    let averageMark = 0;
    await filteredById.forEach((item) => {
      if (item.mark === null) return;
      totalMark += +item?.mark;
      averageMark = totalMark / filteredById.length;
      console.log(totalMark);
      console.log(item?.mark);
    });
    // await firestore.collection("ratings").doc(id).update({ mark: update });
    console.log(averageMark);
    console.log(totalMark);

    dispatch(updateProduct({ id, updates: { averageMark: averageMark } }));
  };

  const putRating = async (id, newValue) => {
    let totalMark = 0;
    let averageMark = 0;
    await filteredById.forEach((item) => {
      totalMark += +item.mark;
      averageMark = totalMark / filteredById.length;
    });

    let user = {
      customId: createdId,
      email: currentUser,
      mark: newValue,
      id,
    };

    let checkUser = ratings.some(
      (item) => item.id === id && item.email === currentUser
    );
    console.log(checkUser);

    if (checkUser) {
      updateRatings(id, newValue);
    } else {
      dispatch(addRating(user));
    }

    dispatch(getRatingsAction());
    dispatch(getOneRatingAction(createdId));
    dispatch(getFilteredRatingByIdAction(id));
    dispatch(updateProduct({ id, updates: { averageMark: averageMark } }));
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
