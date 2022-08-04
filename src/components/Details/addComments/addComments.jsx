import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box } from "@mui/material";
import "./addComment.css";
import fire from "../../../fire";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function AddComments({ getComments }) {
  const firestore = fire.firestore();
  const params = useParams();
  const [com, setCom] = useState("");
  const [open, setOpen] = React.useState(false);

  const user = useSelector((state) => state.auth.email);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addPersonage = () => {
    firestore
      .collection("messages")
      .doc(params.id)
      .collection("comments")
      .add({
        user: params.user,
        com,
        userPhoto: user?.photoUrl,
      })
      .then(function () {
        console.log("Document Added ");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    setCom("");
    getComments();
  };
  console.log(typeof user?.user);

  return (
    <div>
      <Box onClick={handleClickOpen} className="addComm-open">
        Добавить комментарий
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <DialogTitle>добавить</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Добавить комментарий"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setCom(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>

          {typeof user?.user === typeof "tima" ? (
            <Button
              onClick={() => {
                addPersonage();
                handleClose();
              }}
            >
              Добавить
            </Button>
          ) : (
            <Button>зарегестрируйтесь чтобы оставить комментарий</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
