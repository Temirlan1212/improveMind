import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getChapterAction } from "../actions/GetChapter";
import { getOneCard } from "../actions/GetOneProduct";
import { addChapter } from "../slices/ChapterSlices/ChapterSlices";

const Details = () => {
  const [chapter, setChapter] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();

  const card = useSelector((state) => state.card.cards);
  const chapterFromStore = useSelector((state) => state.chapter.chapter);
  console.log(chapterFromStore);

  useEffect(() => {
    dispatch(getOneCard(params.id));
  }, []);

  useEffect(() => {
    dispatch(getChapterAction());
  }, []);

  const handleValues = () => {
    dispatch(addChapter(chapter));
    setChapter("");
  };

  console.log(card);

  return (
    <div>
      {chapterFromStore.map((elem) => (
        <li
          onClick={() =>
            navigate(`/list/${params.id}/${elem.id}/${elem.chapter}`)
          }
          style={{ cursor: "pointer" }}
        >
          {elem.chapter}
        </li>
      ))}

      {card.text}
      <input onChange={(e) => setChapter(e.target.value)} value={chapter} />
      <button onClick={() => handleValues()}>add chapter</button>
    </div>
  );
};

export default Details;
