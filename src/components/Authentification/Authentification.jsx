import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCrateAcc, setIsCreateAcc] = useState(false);
  const [file, setFile] = useState([]);

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.email);
  console.log(user);

  let currUser = fire.auth().currentUser;

  const addProfile = () => {
    currUser.updateProfile({
      photoURL: file[0],
    });
  };
  console.log(file);

  const handleImageChange = (e) => {
    // console.log(e.target.files[])
    if (e.target.files) {
      console.log(e.target.files);
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setFile((prevImages) => prevImages.concat(filesArray));

      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    dispatch(GetAuthEmail());
  }, []);

  const signUpInJsx = () => {
    if (user.length !== 0) {
      alert("you have already in account");
      return;
    }
    dispatch(
      signUp({
        email: email,
        password: password,
      })
    );
    if (email.trim() === "" && password.trim() === "") {
      alert("pleas fill the all inputs");
      return;
    }
    if (email.trim() !== "" && password.trim() !== "" && password.length > 4) {
      return setTimeout(() => {
        setIsCreateAcc(true);
      }, 1000);
    }
    // setTimeout(() => {
    //   navigate("/authmodal");
    // }, 2000);
  };

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
              {isCrateAcc ? (
                <>
                  {t("uploadAva")}
                  <input type="file" onChange={(e) => handleImageChange(e)} />
                  <button onClick={() => addProfile()}>add photo</button>
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
