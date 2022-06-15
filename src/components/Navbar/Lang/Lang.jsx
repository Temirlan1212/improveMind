import React, { useEffect } from "react";
import GTranslateIcon from "@mui/icons-material/GTranslate";

import "./Lang.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { langToggleMiddle } from "../../slices/MenuToggleSlice/MenuToggleSlice";
import { languageSwitch } from "../../slices/SwitchSlices/SwitchSlices";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const Lang = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const toggleL = useSelector((state) => state.menuToggle.langToggle);
  console.log(toggleL);

  // const lang = localStorage.getItem("i18nextLng");

  // useEffect(() => {
  //   localStorage.getItem("i18nextLng");
  //   // window.location.reload(false);
  // }, [lang]);

  return (
    <div style={{ position: "relative" }}>
      <GTranslateIcon
        sx={{
          marginTop: "6px",
          "&:hover": {
            color: "#d9534f",
          },
          fontSize: "20px",
          marginRight: "10px",
        }}
        onClick={() => dispatch(langToggleMiddle(true))}
      />

      <div
        className="langTogglePaper"
        style={{ display: toggleL ? "block" : "none" }}
      >
        <div className="lang-description">{t("choose_lang")} </div>
        <div className="line-in-the-lang" />
        <div
          className="langToggleCountry"
          onClick={() => i18next.changeLanguage("ru")}
        >
          <img
            src="https://img.icons8.com/color/30/undefined/russian-federation.png"
            style={{ marginRight: "10px" }}
          />
          {t("russian")}
        </div>{" "}
        <div
          className="langToggleCountry"
          onClick={() => i18next.changeLanguage("en")}
        >
          <img
            src="https://img.icons8.com/color/30/undefined/usa.png"
            style={{ marginRight: "10px" }}
          />
          {t("english")}
        </div>
      </div>
    </div>
  );
};

export default Lang;
