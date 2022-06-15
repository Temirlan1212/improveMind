import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import fire from "../../fire";
import { GetAuthEmail } from "../actions/GetAuthEmail";
import { onAuthChange, signIn, signUp } from "../slices/AuthSlice/AuthSlice";
import "./Authentification.css";
import AuthWithGoogle from "./AuthWithGoogle";
import { Box } from "@mui/material";
import Lang from "../Navbar/Lang/Lang";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState([]);

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.email);
  console.log(user);

  let currUser = fire.auth().currentUser;

  useEffect(() => {
    dispatch(GetAuthEmail());
  }, []);

  const signInInJsx = () => {
    if (user.length !== 0) {
      alert("you have already in account");
      return;
    } else if (email.trim() === "" && password.trim() === "") {
      alert("pleas fill the all inputs");
      return;
    }

    dispatch(
      signIn({
        email: email,
        password: password,
      })
    );

    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <div className="registrationMainblock">
        <div class="content">
          <section>
            <div class="register-wrapper">
              <div class="register-block">
                <h3 class="register-title">{t("signin")}</h3>
                <p>{t("signinusingthebelow")}</p>
                <div className="form">
                  <input
                    type="email"
                    placeholder={t("enterEmail")}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <input
                    type="password"
                    placeholder={t("enterPassword")}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />

                  <>
                    <input
                      type="submit"
                      value={t("signin")}
                      onClick={() => signInInJsx()}
                    />
                  </>
                </div>

                <div className="line-before-additional-register" />

                <div className="main-additional-register">
                  <div className="additional-register">
                    <Box onClick={() => navigate("/authphone")}>
                      {/* <PhoneAndroidIcon sx={{ fontSize: "50px" }} /> */}
                      <img src="https://img.icons8.com/bubbles/50/undefined/phone--v1.png" />
                    </Box>
                    <Box>
                      {/* <PhoneAndroidIcon sx={{ fontSize: "50px" }} /> */}
                      <AuthWithGoogle />
                    </Box>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      position: "absolute",
                      bottom: "0",
                      right: "20px",
                    }}
                  >
                    {t("changeLanguage")} : &nbsp; <Lang />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
