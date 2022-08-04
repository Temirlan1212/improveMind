import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getChapterAction } from "../../actions/GetChapter";
import { addChapter } from "../../slices/ChapterSlices/ChapterSlices";

const AddChapter = ({ params }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [chapter, setChapter] = useState("");
  const chapterFromStore = useSelector((state) => state.chapter.chapter);

  const handleValues = () => {
    dispatch(addChapter({ chapter, id: params.id }));

    dispatch(getChapterAction());
    setChapter("");
  };

  useEffect(() => {
    dispatch(getChapterAction());
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
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
      <input onChange={(e) => setChapter(e.target.value)} value={chapter} />
      <button onClick={() => handleValues()}>add chapter</button>
    </div>
  );
};

export default AddChapter;
