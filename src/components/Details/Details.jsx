import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getChapterAction } from "../actions/GetChapter";
import { getOneCard } from "../actions/GetOneProduct";
import Navbar from "../Navbar/Navbar";
import BasicRating from "../Rating/Rating";
import { addChapter } from "../slices/ChapterSlices/ChapterSlices";
import { addSwitch } from "../slices/SwitchSlices/SwitchSlices";

const Details = () => {
  const [chapter, setChapter] = useState("");
  const navigate = useNavigate();

  const params = useParams();
  const dispatch = useDispatch();

  const card = useSelector((state) => state.card.cards);
  const chapterFromStore = useSelector((state) => state.chapter.chapter);

  useEffect(() => {
    dispatch(getOneCard(params.id));
    dispatch(addSwitch());
  }, []);

  useEffect(() => {
    dispatch(getChapterAction());
  }, []);

  console.log(chapterFromStore);

  const handleValues = () => {
    dispatch(addChapter({ chapter, id: params.id }));

    dispatch(getChapterAction());
    setChapter("");
  };

  console.log(card);

  return (
    <div>
      <Navbar />
      {chapterFromStore.map((elem) => (
        <>
          {elem.id === params.id ? (
            <li
              onClick={() =>
                navigate(
                  `/${params.id}/${params.user}/${elem.id}/${elem.chapter}`
                )
              }
              style={{ cursor: "pointer" }}
            >
              {elem.chapter}
            </li>
          ) : (
            ""
          )}
        </>
      ))}

      {card.text}
      <input onChange={(e) => setChapter(e.target.value)} value={chapter} />
      <button onClick={() => handleValues()}>add chapter</button>

      <BasicRating />
    </div>
  );
};

export default Details;
