import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCard } from "../../actions/GetCards";
import { deleteProduct } from "../../slices/CardSlices/CardSlices";
import "./Card.css";

const Card = () => {
  let cards = useSelector((state) => state.card.cards);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCard());
  }, []);
  console.log(cards[0].id);

  const deleteProductInList = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getCard());
  };

  return (
    <div class="cards">
      {cards.map((elem) => (
        <div
          class="card one"
          style={{
            backgroundImage: `url(${elem.img})`,
          }}
        >
          <div class="details">
            <div class="content">
              <h2>Blue</h2>
              <p onClick={() => deleteProductInList(elem.id)}>delete</p>
              <a
                href="#"
                class="button"
                onClick={() => navigate(`/list/${elem.id}`)}
              >
                {" "}
                read
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
