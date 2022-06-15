import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSwitch } from "../../slices/SwitchSlices/SwitchSlices";
import "./Switch.css";

const Switch = () => {
  const dispatch = useDispatch();
  // let color = localStorage.getItem("switch");
  const color = useSelector((state) => state.switch.switch);

  useEffect(() => {
    dispatch(addSwitch(color));
  }, []);
  console.log(color);

  return (
    <div>
      <input
        className={color === "light" ? "switch" : "switch2"}
        onClick={() => dispatch(addSwitch())}
        type="checkbox"
      />
    </div>
  );
};

export default Switch;
