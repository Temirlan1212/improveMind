import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Switch from "./Switch/Switch";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import "../../Background.css";
import { useDispatch } from "react-redux";
import { addSwitch } from "../slices/SwitchSlices/SwitchSlices";
import Card from "../CRUD/Card/Card";
import { getCard } from "../actions/GetCards";
import { getRatingsAction } from "../actions/GetRatings";
import { GetAuthEmail } from "../actions/GetAuthEmail";
import { getByAverageMarkAction } from "../actions/FilterCards/GetAverageMarkProducts";
import { getByYearAction } from "../actions/FilterCards/GetByYear";
import Footer from "../Footer/Footer";

const Home = () => {
  const dispatch = useDispatch();
  const themeColor = useSelector((state) => state.switch.switch);
  const user = useSelector((state) => state.auth.email);
  let cards = useSelector((state) => state.card.cards);
  let fBAverageMark = useSelector((state) => state.card.byAverageMark);
  let byYear = useSelector((state) => state.card.byYear);

  useEffect(() => {
    dispatch(getCard());
    dispatch(GetAuthEmail());
    dispatch(getByAverageMarkAction());
    dispatch(getByYearAction());
  }, []);

  console.log(fBAverageMark);

  console.log(user);

  if (cards.length === 0) {
    return <div>loading...</div>;
  }

  let cards5 = cards.filter((elem, index) => index <= 4);

  return (
    <div>
      <Navbar />

      <div
        class={
          themeColor === "dark"
            ? "parallax-home img-home-2"
            : "parallax-home img-home-1"
        }
      >
        <div className="home-section1-container">
          <div className="left-block-home">
            <div className="par-home par-main-text-home_box">
              <div className="par-main-text-home">
                Манги читать онлайн на Manga Live
              </div>
              <div className="par-text-home">
                Ма́нга - это японские комиксы, иногда называемые комикку . Манга
                в форме, в которой она существует в настоящее время, начала
                развиваться после окончания Второй мировой войны, испытав
                сильное влияние западных традиций. Однако манга имеет глубокие
                корни в раннем японском искусстве.
              </div>
            </div>
            <div className="par-text-filter">Популярные сейчас</div>
            <div class="par-home overflow-xScroll">
              {fBAverageMark.map((elem) => (
                <Card elem={elem} />
              ))}
            </div>

            <div className="par-text-filter">
              Манги читать онлайн на Manga Live
            </div>
            <div class="par-home overflow-xScroll">
              {cards.map((elem) => (
                <Card elem={elem} />
              ))}
            </div>

            <div className="par-text-filter">Манга новинки</div>
            <div class="par-home par-home-3 overflow-xScroll">
              {byYear.map((elem) => (
                <Card elem={elem} />
              ))}
            </div>
          </div>
          <div className="right-block-home">
            <div className="right-block-home-firstBlock"></div>
            <div className="right-block-home-secondBlock"></div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
