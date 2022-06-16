import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCard } from "../../actions/GetCards";
import { deleteProduct } from "../../slices/CardSlices/CardSlices";
import { getRatingsAction } from "../../actions/GetRatings";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import "./Card.css";

const Card = () => {
  let cards = useSelector((state) => state.card.cards);
  let marks = useSelector((state) => state.rating.ratings);
  const { user: currentUser } = useSelector((state) => state.auth.email);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCard());
    dispatch(getRatingsAction());
  }, []);

  const deleteProductInList = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getCard());
  };

  let cards5 = cards.filter((elem, index) => index <= 4);
  if (cards5.length === 0) {
    return <>loading</>;
  }

  return (
    <div class="cards">
      {cards5.map((elem) => (
        <div
          class="card one"
          style={{
            backgroundImage: `url(${elem.img})`,
          }}
        >
          <div className="ratingCard">
            <StarPurple500SharpIcon sx={{ color: "yellow" }} /> &nbsp;
            {elem.averageMark}
          </div>
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
      ))}
    </div>
  );
};

export default Card;
