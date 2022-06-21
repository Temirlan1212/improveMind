import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCard } from "../../actions/GetCards";
import { getOneCard } from "../../actions/GetOneProduct";
import { addCard } from "../../slices/CardSlices/CardSlices";
import { useNavigate } from "react-router-dom";

const AddCard = () => {
  const [text, setText] = useState();
  const [description, setDescription] = useState();
  const [img, setImg] = useState();
  const [year, setYear] = useState(null);
  const cards = useSelector((state) => state.card.cards);
  console.log(img);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleValues = () => {
    let obj = {
      text,
      description,
      img,
    };

    dispatch(addCard(obj));
    dispatch(getCard());
    setText("");
    setDescription("");
    setImg("");
    setYear("");
    navigate("/");
  };

  return (
    <div>
      <input
        onChange={(e) => setText(e.target.value)}
        value={text}
        placeholder="text"
      />

      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="description"
      />

      <input
        onChange={(e) => setImg(e.target.value)}
        value={img}
        placeholder="img"
      />

      <input
        onChange={(e) => setYear(+e.target.value)}
        value={year}
        placeholder="year"
      />

      <button onClick={() => handleValues()}>add card</button>
      <button onClick={() => dispatch(getCard())}>get card</button>
    </div>
  );
};

export default AddCard;
