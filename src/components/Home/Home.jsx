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

const Home = () => {
  // const themeColor = useSelector((state) => state.switch.switch);
  const themeColor = useSelector((state) => state.switch.switch);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let cards = useSelector((state) => state.card.cards);

  console.log(themeColor);
  useEffect(() => {
    dispatch(getCard());
    dispatch(addSwitch());
  }, []);

  if (cards.length === 0) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Navbar />

      <div>
        <div class={themeColor === "dark" ? "parallax img2" : "parallax img1"}>
          <div class="par">
            <Card />
          </div>
        </div>
        <div>
          <div
            class={themeColor === "dark" ? "parallax img2" : "parallax img1"}
          >
            <div class="par">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
        <div class={themeColor === "dark" ? "parallax img2" : "parallax img1"}>
          <div class="par par3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
        <div class={themeColor === "dark" ? "parallax img2" : "parallax img1"}>
          <div class="par">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
