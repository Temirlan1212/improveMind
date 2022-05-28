import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCard } from "../../actions/GetCards";
import { getOneCard } from "../../actions/GetOneProduct";

const CardList = () => {
  let cards = useSelector((state) => state.card.cards);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCard());
  }, []);
  return (
    <div>
      {cards.map((elem) => (
        <li
          onClick={() => navigate(`/list/${elem.id}`)}
          style={{ cursor: "pointer" }}
        >
          {elem.text}
        </li>
      ))}
    </div>
  );
};

export default CardList;
