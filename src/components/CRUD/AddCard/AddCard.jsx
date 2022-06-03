import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getCard } from "../../actions/GetCards";
import { getOneCard } from "../../actions/GetOneProduct";
import { addCard } from "../../slices/CardSlices/CardSlices";

const AddCard = () => {
  const [text, setText] = useState();
  const [description, setDescription] = useState();
  const [img, setImg] = useState();
  const cards = useSelector((state) => state.card.cards);
  console.log(img);

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
      <button onClick={() => handleValues()}>add card</button>
      <button onClick={() => dispatch(getCard())}>get card</button>
    </div>
  );
};

export default AddCard;
