import React from "react";
import "./Footer.css";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <div className="footer-section-1">
      <div className="container-footer">
        <div className="right-block-footer">
          <div className="right-block-footer-child">
            <div className="footer-block-text">О проекте</div>
            <div className="footer-block-text">Наша команда</div>
            <div className="footer-block-text">Правовая информация</div>
            <div className="footer-block-text">Правообладателям</div>
            <div className="footer-block-text">Обратная связь</div>
            <div className="footer-block-text">Мобильное приложение</div>
          </div>
          <div className="right-block-footer-child">
            Manga live - любимые и популярные манги
          </div>
          <div className="right-block-footer-child">
            <div className="right-block-footer-child-text">
              <TelegramIcon /> &nbsp; Telegram
            </div>{" "}
            <div className="right-block-footer-child-text">
              <InstagramIcon />
              &nbsp; Instagram
            </div>
          </div>
          <div className="right-block-footer-child">
            <img
              src="https://doramalive.ru/images/app.png"
              style={{ width: "260px" }}
            />
          </div>
        </div>

        <div className="left-block-footer">
          <span className="left-block-footer-text">18+</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
