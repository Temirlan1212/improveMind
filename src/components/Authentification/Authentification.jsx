import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import fire from "../../fire";
import { GetAuthEmail } from "../actions/GetAuthEmail";
import { onAuthChange, signIn, signUp } from "../slices/AuthSlice/AuthSlice";
import { signOut } from "firebase/auth";
import "./Authentification.css";
import AuthModal from "./AuthModal/AuthModal";
import AuthWithGoogle from "./AuthWithGoogle";
import AuthWithPhoneNumber from "./AuthWithPhoneNumber";
import { Box } from "@mui/material";
import Lang from "../Navbar/Lang/Lang";
import { useTranslation } from "react-i18next";

const Authentification = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCrateAcc, setIsCreateAcc] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const user = useSelector((state) => state.auth.email);
  const stateAdd = useSelector((state) => state.auth.stateAdd);
  let currUser = fire.auth().currentUser;

  useEffect(() => {
    dispatch(GetAuthEmail());
  }, []);

  const signUpInJsx = async () => {
    if (user.length !== 0) {
      alert("you have already in account");
      return;
    }

    if (email.trim() === "" && password.trim() === "") {
      alert("pleas fill the all inputs");
      return;
    }

    dispatch(
      signUp({
        email: email,
        password: password,
        setIsCreateAcc,
      })
    );
  };
  console.log(user);
  console.log(isCrateAcc);

  return (
    <div className="registrationMainblock">
      <div class="content">
        <section>
          <div class="register-wrapper">
            <div class="register-block">
              <h3 class="register-title">{t("signup")}</h3>
              <p>{t("signUpUsingTheBelow")}</p>
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
                    value="Create an account"
                    onClick={() => signUpInJsx()}
                  />
                </>
              </div>
              {/* {isCrateAcc ? (
                <>
                  {t("uploadAva")}
                  <input
                    type="file"
                    onChange={(e) => setImageUpload(e.target.files)}
                  />
                  <button onClick={() => UploadImage()}>add photo</button>

                  <div
                    onClick={() => {
                      navigate("/");
                      document.location.reload(false);
                    }}
                    style={{ color: "black" }}
                  >
                    continue...
                  </div>
                </>
              ) : (
                ""
              )} */}
              {isCrateAcc ? (
                <>
                  {t("uploadAva")}

                  <button
                    onClick={() => {
                      navigate(`/register/${user.user}`);
                      document.location.reload(false);
                    }}
                    style={{ color: "black" }}
                  >
                    add avatar
                  </button>
                </>
              ) : (
                ""
              )}

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
                  {t("changeLanguage")}: &nbsp; <Lang />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Authentification;
