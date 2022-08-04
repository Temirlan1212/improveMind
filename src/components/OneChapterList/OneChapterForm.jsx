import React from "react";
import OneChapterList from "./OneChapterList";

const OneChapterForm = () => {
  return (
    <div>
      <input
        type="file"
        onChange={(e) => setImageUpload(e.target.files)}
        multiple
      />
      <OneChapterList />
    </div>
  );
};

export default OneChapterForm;
