import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Switch from "./Switch/Switch";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import "../../Background.css";

const Home = () => {
  const themeColor = useSelector((state) => state.switch.switch);

  useEffect(() => {
    localStorage.setItem("switch", "light");
  }, []);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />

      <div>
        <div class={themeColor === "light" ? "parallax img2" : "parallax img1"}>
          <div class="par">
            This is an example of how Parallax background works. If you see this
            code from a mobile device you won't experience the outcome as
            Parallax usually doesn't work on devices with a smaller width unless
            specified.
          </div>
        </div>
        <div>
          <div
            class={themeColor === "light" ? "parallax img2" : "parallax img1"}
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
        <div class={themeColor === "light" ? "parallax img2" : "parallax img1"}>
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
        <div class={themeColor === "light" ? "parallax img2" : "parallax img1"}>
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
