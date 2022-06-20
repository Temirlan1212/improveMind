import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCard } from "../../actions/GetCards";
import { deleteProduct } from "../../slices/CardSlices/CardSlices";
import {
  getRatingsAction,
  getRatingSubCollectionAction,
} from "../../actions/GetRatings";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import "./Card.css";

const Card = ({ elem }) => {
  const { user: currentUser } = useSelector((state) => state.auth.email);
  // const rating = useSelector((state) => state.rating.ratings);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteProductInList = (id) => {
    dispatch(deleteProduct(id));
  };

  const RatingColor = () => {
    if (elem.averageMark >= 4 && elem.averageMark <= 5) {
      return (
        <div className="ratingCard">
          <StarPurple500SharpIcon sx={{ opacity: "0.5", fontSize: "17px" }} />{" "}
          &nbsp;
          {elem.averageMark ? elem.averageMark.toFixed(1) : 0}
        </div>
      );
    } else if (elem.averageMark >= 3 && elem.averageMark <= 4) {
      return (
        <div className="ratingCard2">
          <StarPurple500SharpIcon sx={{ opacity: "0.5", fontSize: "17px" }} />{" "}
          &nbsp;
          {elem.averageMark ? elem.averageMark.toFixed(1) : 0}
        </div>
      );
    } else if (elem.averageMark >= 0 && elem.averageMark <= 3) {
      return (
        <div className="ratingCard3">
          <StarPurple500SharpIcon sx={{ opacity: "0.5", fontSize: "17px" }} />{" "}
          &nbsp;
          {elem.averageMark ? elem.averageMark.toFixed(1) : 0}
        </div>
      );
    }
  };

  console.log(elem.averageMark);
  return (
    <div class="cards">
      <div
        class="card one"
        style={{
          backgroundImage: `url(${elem.img})`,
        }}
      >
        <RatingColor />

        <div class="details">
          <div class="content">
            <h2>{elem.text}</h2>

            <a
              href="#"
              class="button"
              onClick={() => navigate(`/${elem.id}/${currentUser}`)}
            >
              {" "}
              read
            </a>
            <p onClick={() => deleteProductInList(elem.id)}>delete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
