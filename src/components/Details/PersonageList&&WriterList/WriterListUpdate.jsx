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
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function WriterListUpdate({ card, getWriter, item }) {
  const params = useParams();
  const firestore = fire.firestore();
  const [personage, setPersonage] = useState();
  const [writer, setWriter] = useState(item.writer);
  const [name, setName] = useState(item.name);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  console.log(item.id);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  async function updatePersonage() {
    await firestore
      .collection("messages")
      .doc(params.id)
      .collection("writer")
      .doc(item.id)
      .update({
        writer,
        name,
      })
      .then(() => console.log("updated successfuly"))
      .catch((err) => {
        console.log("err", "=>", err);
      });
    setName("");
    setWriter("");
    getWriter();
  }

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
                placeholder="writer"
              />

              <Button onClick={updatePersonage}>update</Button>
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
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <div
            onClick={toggleDrawer(anchor, true)}
            style={{
              backgroundColor: "rgba(19, 115, 19, 0.8)",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "30px",
              height: "30px",
            }}
          >
            <ModeEditIcon />
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
    </div>
  );
}
