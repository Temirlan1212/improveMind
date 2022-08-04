import { CheckCircleOutline } from "@mui/icons-material";
import { Box, ImageListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { v4 as uuidv4 } from "uuid";
import uploadFileProgress from "./uploadFileProgress";
import { GetAuthEmail } from "../actions/GetAuthEmail";
import { useSelector, useDispatch } from "react-redux";

const   ProgressItem = ({ file }) => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.email);

  useEffect(() => {
    dispatch(GetAuthEmail());
  }, []);

  
  useEffect(() => {
    const uploadImage = async () => {
      const imageName = uuidv4() + "." + file.name.split(".").pop();

      const url = await uploadFileProgress(
        file,
        `gallery/${currentUser?.uid}`,
        imageName,
        setProgress
      );

      setImageURL(null);
    };
    setImageURL(URL.createObjectURL(file));
    uploadImage();
  }, [file]);
  return (
    imageURL && (
      <ImageListItem cols={1} rows={1}>
        <img src={imageURL} alt="gallery" loading="lazy" />
        <Box sx={backDrop}>
          {progress < 100 ? (
            <CircularProgressWithLabel value={progress} />
          ) : (
            <CheckCircleOutline
              sx={{ width: 60, height: 60, color: "lightgreen" }}
            />
          )}
        </Box>
      </ImageListItem>
    )
  );
};

export default ProgressItem;

const backDrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0, .5)",
};
