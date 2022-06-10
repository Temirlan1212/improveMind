import React from "react";
import { useDispatch } from "react-redux";
import { addSwitch } from "../../slices/SwitchSlices/SwitchSlices";
import "./Switch.css";

const Switch = () => {
  const dispatch = useDispatch();
  let color = localStorage.getItem("switch");
  console.log(color);

  return (
    <div>
      <div class="btn-container">
        <label class="switch btn-color-mode-switch">
          <input
            type="checkbox"
            name="color_mode"
            id="color_mode"
            value="1"
            onClick={() => dispatch(addSwitch())}
          />
          <label
            // for="color_mode"
            data-on="Dark"
            data-off="Light"
            class="btn-color-mode-switch-inner"
          ></label>
        </label>
      </div>
    </div>
  );
};

export default Switch;
