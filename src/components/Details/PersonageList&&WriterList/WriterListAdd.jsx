import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { TextField } from "@mui/material";
import { useState } from "react";
import { WorkHistoryRounded } from "@mui/icons-material";
import fire from "../../../fire";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function WriterListAdd({ card, getPersonage }) {
  const params = useParams();
  const firestore = fire.firestore();
  const [writer, setWriter] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const addPersonage = () => {
    firestore
      .collection("messages")
      .doc(params.id)
      .collection("writer")
      .add({
        writer,
        name,
      })
      .then(function () {
        console.log("Document Added ");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    setName("");
    setWriter("");
    getPersonage();
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
              <TextField
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="name"
              />
              <TextField
                onChange={(e) => setWriter(e.target.value)}
                value={writer}
                placeholder="writer url"
              />

              <Button onClick={addPersonage}>add</Button>
            </ListItemIcon>
            <ListItemText />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div
            onClick={toggleDrawer(anchor, true)}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddCircleIcon /> <div style={{ marginLeft: "10px" }}>автор</div>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </>
  );
}
