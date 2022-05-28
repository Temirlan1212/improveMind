import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import firebase from "firebase/compat/app";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { useParams } from "react-router-dom";
import fire from "../../fire";

const OneChapterList = () => {
  const storage = fire.storage();
  const params = useParams();

  const [imageUpload, setImageUpload] = useState(null);
  const [imageList, setImageList] = useState([]);
  console.log(imageList);

  const imageListRef = ref(storage, `images${params.id}${params.index}/`);

  const getUploadImages = () => {
    listAll(imageListRef).then((images) => {
      images.items.forEach((images) => {
        getDownloadURL(images).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  };

  const UploadImage = async () => {
    if (imageUpload === null) return;

    for (let key in imageUpload) {
      const imageRef = ref(
        storage,
        `images${params.id}${params.index}/${imageUpload[key].name + v4()}`
      );

      console.log(imageRef);

      console.log(imageUpload[key]);
      uploadBytes(imageRef, imageUpload[key]);
    }
    getUploadImages();
  };

  useEffect(() => {
    getUploadImages();
  }, []);

  return (
    <>
      <div style={{ position: "fixed", top: "0" }}>
        <input
          type="file"
          onChange={(e) => setImageUpload(e.target.files)}
          multiple
        />
        <button onClick={UploadImage}>Upload Image</button>
      </div>
      {imageList.map((items) =>
        items === null ? "" : <img src={items} style={{ width: "400px" }} />
      )}
    </>
  );
};

export default OneChapterList;
