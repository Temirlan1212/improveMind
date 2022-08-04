import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import StarPurple500SharpIcon from "@mui/icons-material/StarPurple500Sharp";
import { updateProduct } from "../../slices/CardSlices/CardSlices";
import { Button } from "@mui/material";
import "./InfoSection.css";
import { getCard } from "../../actions/GetCards";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const InfoSection = ({ card, admin }) => {
  const dispatch = useDispatch();
  console.log(card);
  const params = useParams();
  const [diffNames, setDiffNames] = useState(card.diffNames);
  const [country, setCountry] = useState(card.country);
  const [releaseDay, setReleaseDay] = useState(card.releaseDay);
  const [totalChapter, setTotalChapter] = useState(card.totalChapter);
  const [schedule, setSchedule] = useState(card.schedule);
  const [img, setImg] = useState(card.img);

  const [isImgEdit, setIsImgEdit] = useState(false);

  console.log(admin);
  const handleSave = async () => {
    let obj = {
      diffNames,
      country,
      releaseDay,
      totalChapter,
      schedule,
      img,
    };

    await Promise.all([
      dispatch(
        updateProduct({
          id: params.id,
          updates: obj,
        })
      ),
    ]).then(async () => {
      alert("updated successfully");
      await dispatch(getCard());
      setIsImgEdit(false);
    });
  };

  // useEffect(() => {
  //   dispatch(
  //     updateProduct({
  //       id: params.id,
  //       updates: { description: text },
  //     })
  //   );
  // }, [text]);

  const RatingColor = () => {
    if (card.averageMark >= 4 && card.averageMark <= 5) {
      return (
        <div className="main-ratingCard">
          <div className="ratingCard">
            <StarPurple500SharpIcon sx={{ opacity: "0.5", fontSize: "17px" }} />{" "}
            &nbsp;
            {card.averageMark ? card.averageMark.toFixed(1) : 0}
          </div>
          <div className="qVotes">{card.qVotes} оценок</div>
        </div>
      );
    } else if (card.averageMark >= 3 && card.averageMark <= 4) {
      return (
        <div className="main-ratingCard">
          <div className="ratingCard2">
            <StarPurple500SharpIcon sx={{ opacity: "0.5", fontSize: "17px" }} />{" "}
            &nbsp;
            {card.averageMark ? card.averageMark.toFixed(1) : 0}
          </div>
          <div className="qVotes">{card.qVotes} оценок</div>
        </div>
      );
    } else if (card.averageMark >= 0 && card.averageMark <= 3) {
      return (
        <div className="main-ratingCard">
          <div className="ratingCard3">
            <StarPurple500SharpIcon sx={{ opacity: "0.5", fontSize: "17px" }} />{" "}
            &nbsp;
            {card.averageMark ? card.averageMark.toFixed(1) : 0}
          </div>
          <div className="qVotes">{card.qVotes} оценок</div>
        </div>
      );
    }
  };

  const textarea = document.querySelectorAll("textarea");
  textarea.forEach((elem) => {
    elem.addEventListener("input", function (e) {
      this.style.height = "auto";
      this.style.height = this.scrollHeight - 10 + "px";
    });
  });

  return (
    <div className="Details-btm-left_box-child1-info1">
      <div className="box-child1-info1-img">
        <div style={{ position: "relative" }}>
          <img src={card.img} />
          <ModeEditIcon
            className="box-child1-info-edit-img"
            onClick={() => setIsImgEdit(true)}
          />
        </div>
        <textarea
          className="box-child1-info1-descr-info  color-opacity"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          disabled={admin ? false : true}
          style={{
            display: admin && isImgEdit ? "block" : "none",
            width: "100%",
            height: "50px",
          }}
        />
      </div>
      <div className="box-child1-info1-descr">
        <div className="box-child1-info1-descr_box">
          <p className="box-child1-info1-descr-text color-white">
            Другие названия
          </p>
          <textarea
            className="box-child1-info1-descr-info  color-opacity"
            value={diffNames}
            onChange={(e) => setDiffNames(e.target.value)}
            disabled={admin ? false : true}
            style={{ height: "60px" }}
          />
        </div>

        <div className="box-child1-info1-descr_box">
          <p className="box-child1-info1-descr-text color-white">Страна</p>
          {/* <p className="box-child1-info1-descr-info color-opacity">Япония</p> */}
          <textarea
            className="box-child1-info1-descr-info color-opacity"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={admin ? false : true}
          />
        </div>

        <div className="box-child1-info1-descr_box">
          <p className="box-child1-info1-descr-text color-white">
            Дата премьеры
          </p>
          {/* <p className="box-child1-info1-descr-info color-opacity">
            6 июня 2022
          </p> */}
          <textarea
            className="box-child1-info1-descr-info color-opacity"
            value={releaseDay}
            onChange={(e) => setReleaseDay(e.target.value)}
            disabled={admin ? false : true}
          />
        </div>

        <div className="box-child1-info1-descr_box">
          <p className="box-child1-info1-descr-text color-white">Кол-во глав</p>
          <textarea
            className="box-child1-info1-descr-info color-opacity"
            value={totalChapter}
            onChange={(e) => setTotalChapter(e.target.value)}
            disabled={admin ? false : true}
          />
        </div>

        <div className="box-child1-info1-descr_box">
          <p className="box-child1-info1-descr-text color-white">
            Глав выпущено
          </p>
          <p className="box-child1-info1-descr-info color-opacity">240 гл.</p>
        </div>

        <div className="box-child1-info1-descr_box">
          <p className="box-child1-info1-descr-text color-white">
            Расписание выпуска
          </p>
          {/* <p className="box-child1-info1-descr-info color-opacity">
            Понедельник
          </p> */}
          <textarea
            className="box-child1-info1-descr-info color-opacity"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            disabled={admin ? false : true}
          />
        </div>
        <div className="box-child1-info1-descr_box">
          <p className="box-child1-info1-descr-text color-white">Рейтинг</p>
          <p className="box-child1-info1-descr-info color-opacity">
            <RatingColor />
          </p>
        </div>
        <Button
          style={{ display: admin ? "block" : "none" }}
          onClick={() => handleSave()}
          className="box-child1-info1-descr_box-button"
        >
          save
        </Button>
      </div>
    </div>
  );
};

export default InfoSection;
