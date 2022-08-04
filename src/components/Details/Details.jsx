import { PanoramaVerticalSelectSharp } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOneCard } from "../actions/GetOneProduct";
import Navbar from "../Navbar/Navbar";
import BasicRating from "../Rating/Rating";
import AddChapter from "./addChapter/AddChapter";

import "./Details.css";
import PersonageList from "./PersonageList&&WriterList/PersonageList";
import { updateProduct } from "../slices/CardSlices/CardSlices";
import DescrUpdate from "./DescrUpdate/DescrUpdate";
import { getCard } from "../actions/GetCards";
import InfoSection from "./InfoSection/InfoSection";
import FullWidthTabs from "./Comments/Comments";
import { getChapterAction } from "../actions/GetChapter";
import ChaptersList from "./chaptersList/ChaptersList";
import { chpaterToggleMiddle } from "../slices/MenuToggleSlice/MenuToggleSlice";

const Details = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const themeColor = useSelector((state) => state.switch.switch);
  const card = useSelector((state) => state.card.card);
  const cards = useSelector((state) => state.card.cards);
  const admin = useSelector((state) => state.auth.admin);
  const chapterFromStore = useSelector((state) => state.chapter.chapter);
  const toggleChap = useSelector((state) => state.menuToggle.chapterToggle);

  const toggleChapter = () => {
    if (toggleChap) {
      dispatch(chpaterToggleMiddle(false));
    } else {
      dispatch(chpaterToggleMiddle(true));
    }
  };

  useEffect(() => {
    dispatch(getChapterAction());
    dispatch(getOneCard(params.id));
    dispatch(getCard());
  }, []);

  console.log(chapterFromStore);

  return (
    <div>
      <Navbar />
      {/* <AddChapter params={params} /> */}

      <div
        className={
          themeColor === "dark"
            ? "Details-section-1_night"
            : "Details-section-1_day"
        }
      >
        <div className="Details-container">
          <div className="Details-main_box">
            <div className="Details-top_box">
              <div className="Details-top_box-child1">
                <div>Главная &nbsp; /</div>
                <div>Манга &nbsp;/</div>
                <div>{card.text}</div>
              </div>
              <div className="Details-top_box-child2">{card.text}</div>
            </div>

            <div className="Details-bottom_box">
              <div className="Details-btm-left_box">
                <div className="Details-btm-left_box-child1">
                  {cards.map(
                    (item) =>
                      item.id === params.id && (
                        <InfoSection card={item} admin={admin} />
                      )
                  )}

                  <div className="Details-btm-left_box-child1-info2">
                    <div className="box-child1-info2-block1 color-opacity">
                      <div>Детективы</div>
                      <div>Драмы</div>
                      <div>Мелодрамы</div>
                      <div>Фантастика</div>
                    </div>
                    <div className="box-child1-info2-block2 color-opacity">
                      <div
                        style={{ position: "relative" }}
                        onClick={() => toggleChapter()}
                      >
                        <div className="box-child1-info2-block2-child-1">
                          <div>Читать</div>
                          <div>^</div>
                        </div>
                        <ChaptersList chapterFromStore={chapterFromStore} />
                      </div>
                      <div className="box-child1-info2-block2-child-2">
                        <div>доп</div>
                        <div></div>
                      </div>

                      <div className="box-child1-info2-block2-child-2">
                        <div>Читать</div>
                        <div></div>
                      </div>

                      <div className="box-child1-info2-block2-child-2">
                        <div>Читать</div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                  <div></div>
                  {cards.map(
                    (item) =>
                      item.id === params.id && (
                        <DescrUpdate descr={item?.description} admin={admin} />
                      )
                  )}
                  <PersonageList admin={admin} />
                  <FullWidthTabs />
                </div>
              </div>

              <div className="Details-btm-right_box">
                <div className="Details-btm-right_firstBlock"></div>
                <div className="Details-btm-right_secondBlock"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <BasicRating /> */}
    </div>
  );
};

export default Details;
