import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCard } from "../../actions/GetCards";
import { getOneCard } from "../../actions/GetOneProduct";
import { deleteProduct } from "../../slices/CardSlices/CardSlices";
import "../../../Background.css";
import Navbar from "../../Navbar/Navbar";
import Card from "../Card/Card";

const CardList = () => {
  const dispatch = useDispatch();
  let cards = useSelector((state) => state.card.cards);
  const themeColor = useSelector((state) => state.switch.switch);

  useEffect(() => {
    dispatch(getCard());
  }, []);

  return cards.length !== 0 ? (
    <div>
      <div>
        <div>
          <Navbar />
          <div
            class={themeColor === "light" ? "parallax img2" : "parallax img1"}
          >
            <div class="par">
              {/* {cards.map((elem) => (
                <>
                  <li
                    onClick={() => navigate(`/list/${elem.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {elem.text}
                  </li>
                  <button onClick={() => deleteProductInList(elem.id)}>
                    delete
                  </button>
                </>
              ))} */}
              <Card />
            </div>
          </div>
          <div>
            <div
              class={themeColor === "light" ? "parallax img2" : "parallax img1"}
            >
              <div class={themeColor === "light" ? "par2" : "par"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </div>
            </div>
          </div>
          <div
            class={themeColor === "light" ? "parallax img2" : "parallax img1"}
          >
            <div class="par par3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
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
      </div>
    </div>
  ) : (
    "you have no internet.. or you we have a problem with server"
  );
};

export default CardList;
