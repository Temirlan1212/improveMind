import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import fire from "../../../fire";
import { useDispatch, useSelector } from "react-redux";
import { GetAuthEmail } from "../../actions/GetAuthEmail";
import { useNavigate, useParams } from "react-router-dom";
import { addSwitch } from "../../slices/SwitchSlices/SwitchSlices";

const AuthUpdateAva = () => {
  const params = useParams();
  const storage = fire.storage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let currUser = fire.auth().currentUser;
  useEffect(() => {
    dispatch(GetAuthEmail());
    dispatch(addSwitch());
  }, []);

  const user = useSelector((state) => state.auth.email);
  const [file, setFile] = useState({ url: "", bool: false });
  const [imageUpload, setImageUpload] = useState(null);
  const [bool, setBool] = useState(false);
  const [isTypeAva, setIsTypeAva] = useState("");

  const starsRef = ref(storage, `images${params.user}/`);
  const getUploadImages = () => {
    getDownloadURL(starsRef)
      .then((url) => {
        setFile({ url, bool: true });
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            console.log(" File doesn't exist");
            break;
          case "storage/unauthorized":
            console.log(" User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            console.log("User canceled the upload");
            break;

          // ...

          case "storage/unknown":
            console.log("Unknown error occurred, inspect the server response");
            break;
        }
      });
  };

  if (bool) {
    getUploadImages();
  }

  const UploadImage = async () => {
    if (imageUpload === null) return;
    const imageRef = ref(storage, `images${params.user}/`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      setTimeout(() => {
        setBool(true);
      }, 1000);
    });
  };

  console.log(file);

  if (file.bool) {
    currUser.updateProfile({
      photoURL: file.url,
    });

    setFile({ url: "", bool: false });
    setBool(false);
    dispatch(GetAuthEmail());

    if (user.photoUrl) {
      alert("successfully updated avatar");
      navigate("/");
    }
  }

  console.log(user.photoUrl);

  return (
    <div>
      <input type="file" onChange={(e) => setImageUpload(e.target.files[0])} />
      <button onClick={() => UploadImage()}>add photo</button>
    </div>
  );
};

export default AuthUpdateAva;
