import React from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import MuiPhoneNumber from "material-ui-phone-number";
import { Navigate, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { t } from "i18next";

const AuthWithPhoneNumber = () => {
  // const [number, setNumber] = useState("+996771539610");
  const navigate = useNavigate();
  const [bool, setBool] = useState(false);
  const [verific, setVerific] = useState("");
  const [confirmObj, setConfirmObj] = useState("");
  const [countryNumber, setCountryNumber] = useState({ phone: "kg" });

  const auth = getAuth();
  const user = auth.currentUser;
  console.log();

  // function setUpRecatcha(number1) {
  //   console.log(number1);
  //   const recaptchaVerifier = new RecaptchaVerifier("signIn", {}, auth);
  //   recaptchaVerifier.render();
  //   signInWithPhoneNumber(auth, number1, recaptchaVerifier);
  // }

  function setUpRecatcha(number1) {
    const recaptchaVerifier = new RecaptchaVerifier("signIn", {}, auth);

    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number1, recaptchaVerifier);
  }

  const getOtp = async (e) => {
    e.preventDefault();
    // const phoneNumber = +"996771539610";
    if (countryNumber === "" || countryNumber === undefined) {
      return alert("Please enter a valid phone number");
    } else if (user !== null) {
      alert("You has already in your account");

      return;
    }

    try {
      const response = await setUpRecatcha(countryNumber);
      console.log(response);
      setConfirmObj(response);
      setCountryNumber("kg");

      setBool(true);
    } catch (err) {
      alert(err.message);
    }
    console.log(countryNumber);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      await confirmObj.confirm(verific);
      setVerific("");
      alert("succesfully signed in");
      navigate("/");
    } catch (err) {
      setVerific("");
      alert(err);
    }
  };

  function handleOnChange(value) {
    setCountryNumber(value);
  }

  console.log(countryNumber);

  const signOutWithButton = () => {
    signOut(auth)
      .then(() => {
        alert("succesfully signed out");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="registrationMainblock" style={{ paddingTop: "100px" }}>
        <div class="content">
          <section>
            {/*  */}
            <div class="register-wrapper">
              <div
                class="register-block"
                style={{ display: bool ? "none" : "block" }}
              >
                <h3 class="register-title">{t("signUpWithPhone")}</h3>
                <p>{t("signUpWithPhoneBelow")}</p>
                <div className="form">
                  <MuiPhoneNumber
                    style={{ marginBottom: "10px" }}
                    defaultCountry={countryNumber.phone}
                    onChange={handleOnChange}
                  />

                  <input
                    type="submit"
                    value={t("SendMessageToNumber")}
                    onClick={(e) => getOtp(e)}
                    style={{ marginBottom: "20px" }}
                  />
                </div>
                <center id="signIn"></center>
              </div>

              {/* second part */}

              <div
                class="register-block"
                style={{ display: bool ? "block" : "none" }}
              >
                <h3 class="register-title">{t("verifyCode")}</h3>
                <div className="form">
                  <input
                    onChange={(e) => setVerific(e.target.value)}
                    value={verific}
                    placeholder={t("secretCode")}
                  />

                  <input
                    type="submit"
                    value={t("verifyCode")}
                    onClick={(e) => verifyOtp(e)}
                  />
                </div>
                {/* <a
                  onClick={() => setBool(false)}
                  style={{ color: "black", listStyleType: "none" }}
                >
                  try to enter new number
                </a> */}
              </div>

              {/*  */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AuthWithPhoneNumber;
