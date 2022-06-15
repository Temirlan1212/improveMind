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

  const deleteProductInList = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getCard());
  };

  let cards5 = cards.filter((elem, index) => index <= 4);

  console.log(cards5);
  return (
    <div class="cards">
      {cards5.map((elem) => (
        <div
          class="card one"
          style={{
            backgroundImage: `url(${elem.img})`,
          }}
        >
          <div class="details">
            <div class="content">
              <h2>{elem.text}</h2>

              <a
                href="#"
                class="button"
                onClick={() => navigate(`/list/${elem.id}`)}
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
