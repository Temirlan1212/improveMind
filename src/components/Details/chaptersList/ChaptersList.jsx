import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ChaptersList.css";

const ChaptersList = ({ chapterFromStore }) => {
  const toggleChap = useSelector((state) => state.menuToggle.chapterToggle);
  const navigate = useNavigate();
  const params = useParams();

  console.log(chapterFromStore);
  if (chapterFromStore.length === 0) {
    <>loading...</>;
  }
  return (
    <div
      className="chapterlist-main-container"
      style={{ display: toggleChap ? "block" : "none" }}
    >
      {/* <div className="menu-nav-open-line" /> */}

      {chapterFromStore.map((elem) => (
        <div
          className="chapterlist-text"
          onClick={() =>
            navigate(`/${params.id}/${params.user}/${elem.id}/${elem.chapter}`)
          }
        >
          {elem.chapter} глава
        </div>
      ))}
    </div>
  );
};

export default ChaptersList;
