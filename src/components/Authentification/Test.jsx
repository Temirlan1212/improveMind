import React from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

const AuthWithPhoneNumber = () => {
  const auth = getAuth();
  console.log(document.defaultView);

  const registerByPhoneNumber = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );

    const phoneNumber = +"+996771539610";
    console.log(phoneNumber);

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log(confirmationResult);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };

  return (
    <div>
      <button id="sign-in-button" onClick={() => registerByPhoneNumber()}>
        register by phone number
      </button>
    </div>
  );
};
