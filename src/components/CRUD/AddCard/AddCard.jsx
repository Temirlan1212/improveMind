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
  const cards = useSelector((state) => state.card.cards);
  console.log(cards);

  const dispatch = useDispatch();

  const handleValues = () => {
    let obj = {
      text,
      description,
    };

    dispatch(addCard(obj));
    dispatch(getCard());
    setText("");
    setDescription("");
  };

  return (
    <div>
      <input onChange={(e) => setText(e.target.value)} value={text} />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button onClick={() => handleValues()}>add card</button>
      <button onClick={() => dispatch(getCard())}>get card</button>
    </div>
  );
};

export default AddCard;
