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
import {
  addRating,
  addSubCollectionRating,
} from "../slices/RatingSlice/RatingSlice";
import {
  getRatingsAction,
  getRatingSubCollectionAction,
} from "../actions/GetRatings";
import {
  getOneRatingAction,
  getOneSubCollectionRatingAction,
} from "../actions/GetOneRating";
import { getFilteredRatingByIdAction } from "../actions/GetFilteredRatingById";
import { updateProduct } from "../slices/CardSlices/CardSlices";

export default function BasicRating({ item }) {
  const [update, setUpdate] = useState(false);
  const firestore = fire.firestore();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useParams();
  const { user: currentUser } = useSelector((state) => state.auth.email);

  useEffect(() => {
    dispatch(getOneSubCollectionRatingAction({ id, currentUser }));
    dispatch(getRatingSubCollectionAction(id));
  }, []);

  const rating = useSelector((state) => state.rating.rating);
  const ratings = useSelector((state) => state.rating.ratings);
  let { mark } = rating;
  console.log(ratings);
  if (rating.length === 0) return;

  const handleOnChange = async (event, newValue) => {
    await Promise.all([
      dispatch(addSubCollectionRating({ id, newValue, currentUser })),
      dispatch(getOneSubCollectionRatingAction({ id, currentUser })),
      dispatch(getRatingSubCollectionAction(id)),
    ]).then(() => {
      setUpdate(true);
    });
  };

  if (update) {
    let totalCount = 0;
    ratings.map((elem) => {
      totalCount += +elem.mark;
    });
    let averageMark = totalCount / ratings.length;
    console.log(averageMark);

    dispatch(
      updateProduct({
        id,
        updates: { averageMark: averageMark, qVotes: ratings.length },
      })
    );
    setTimeout(() => {
      setUpdate(false);
    }, 1000);
  }

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
          handleOnChange(event, newValue);
        }}
      />
      <button
        onClick={() =>
          dispatch(updateProduct({ id, updates: { averageMark: 4 } }))
        }
      >
        get
      </button>
    </Box>
  );
}
