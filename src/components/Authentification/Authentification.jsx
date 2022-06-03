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

const Authentification = () => {
  const dispatch = useDispatch();
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
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // console.log("filesArray: ", filesArray);

      setFile((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  useEffect(() => {
    dispatch(GetAuthEmail());
  }, []);

  const signUpInJsx = () => {
    dispatch(
      signUp({
        email: email,
        password: password,
      })
    );

    setEmail("");
    setPassword("");
    setIsCreateAcc(true);
    // setTimeout(() => {
    //   navigate("/authmodal");
    // }, 2000);
  };

  const signInInJsx = () => {
    dispatch(
      signIn({
        email: email,
        password: password,
      })
    );

    setEmail("");
    setPassword("");
  };

  const signOut1 = () => {
    let auth = fire.auth();
    signOut(auth)
      .then(() => {
        alert("sussecfully signed out");
      })
      .catch((error) => {
        alert(`doesn't signed out: ${error}`);
      });
  };

  return (
    <div className="registrationMainblock">
      <div class="content">
        <section>
          <div class="register-wrapper">
            <div class="register-block">
              <h3 class="register-title">Create an account</h3>
              <p>Create an account using the form below.</p>
              <div className="form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {isLogIn ? (
                  <>
                    <input
                      type="submit"
                      value="Sign In"
                      onClick={() => signInInJsx()}
                    />
                    <p
                      onClick={() => setIsLogIn(false)}
                      style={{ cursor: "pointer" }}
                    >
                      Don't have an account?
                    </p>
                  </>
                ) : (
                  <>
                    <input
                      type="submit"
                      value="Create an account"
                      onClick={() => signUpInJsx()}
                    />
                    <p
                      onClick={() => setIsLogIn(true)}
                      style={{ cursor: "pointer" }}
                    >
                      Already has an account?
                    </p>
                  </>
                )}
              </div>
              {isCrateAcc ? (
                <>
                  you can upload your ava
                  <input type="file" onChange={(e) => handleImageChange(e)} />
                  <button onClick={() => addProfile()}>add photo</button>
                </>
              ) : (
                ""
              )}

              <button onClick={() => signOut1()}>sign out</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Authentification;
