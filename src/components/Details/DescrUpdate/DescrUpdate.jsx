import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOneCard } from "../../actions/GetOneProduct";
import { updateProduct } from "../../slices/CardSlices/CardSlices";
import "./DescrUpdate.css";
const DescrUpdate = ({ descr, admin }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [text, setText] = useState(descr);

  useEffect(() => {
    dispatch(
      updateProduct({
        id: params.id,
        updates: { description: text },
      })
    );
  }, [text]);

  console.log(descr);

  return (
    <div>
      <textarea
        className="Details-btm-left_box-child1-info3 color-opacity"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={admin ? false : true}
      />
    </div>
  );
};

export default DescrUpdate;
