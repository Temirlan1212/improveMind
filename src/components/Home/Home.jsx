import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Switch from "./Switch/Switch";

const Home = () => {
  const themeColor = useSelector((state) => state.switch.switch);

  useEffect(() => {
    localStorage.setItem("switch", "light");
  }, []);

  const navigate = useNavigate();
  return (
    <div
      style={
        themeColor === "light"
          ? { backgroundColor: "black" }
          : { backgroundColor: "white" }
      }
    >
      <button onClick={() => navigate("/add")}>add</button>
      <button onClick={() => navigate("/list")}>list</button>

      <Switch />
    </div>
  );
};

export default Home;
