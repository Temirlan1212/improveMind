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
import { styled } from "@mui/system";
import { InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useEffect } from "react";
import fire from "../../fire";
import "./Drawer.css";
import Navbar from "../Navbar/Navbar";

export default function TemporaryDrawer() {
  const firestore = fire.firestore();
  const { t } = useTranslation();
  const [searchProduct, setSearchProduct] = useState("");
  const [products, setProducts] = useState([]);

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

    console.log(anchor);
    setState({ ...state, [anchor]: open });
  };

  const fetchData = async () => {
    if (searchProduct === "") return;
    console.log(searchProduct);
    const citiesRef = firestore.collection("messages");
    const snapshot = await citiesRef
      .where("text", ">=", searchProduct)
      .orderBy("text", "asc")
      .limit(5)
      .get();

    const snapshot2 = await citiesRef.where("text", "==", searchProduct).get();

    // const snapshot = await citiesRef
    // .where("text" && "description", ">=", searchProduct)
    // .get();

    if (snapshot.empty) {
      console.log("no matching documents");
      return;
    }

    const list = [];

    if (!snapshot2.empty) {
      snapshot2.forEach((doc) => {
        console.log(doc.data());

        list.push(doc.data());
      });
    } else {
      snapshot.forEach((doc) => {
        console.log(doc.data());

        list.push(doc.data());
      });
    }

    setProducts(list);
  };

  useEffect(() => {
    fetchData();
  }, [searchProduct]);

  console.log(products);
  console.log(searchProduct);

  const list = (anchor) => (
    <Box
      className={
        searchProduct === "" ? "main-section-drawer1" : "main-section-drawer2"
      }
    >
      <Box
        sx={{
          backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <div className="main-search_input-Drawer">
          <input
            className="search_input-Drawer"
            onChange={(e) => setSearchProduct(e.target.value)}
            value={searchProduct}
          />{" "}
          <div className="search_icon_box-Drawer">
            <SearchIcon className="search_icon-Drawer" />
          </div>
        </div>
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 500 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List></List>
          <Divider />
          <List>
            {/* {products.map((text, index) => (
            
          ))} */}
            {searchProduct !== "" ? (
              products?.map((item) => (
                <ListItem>
                  <ListItemButton className="card_main-drawer">
                    <ListItemIcon>
                      <img src={item.img} className="card_img-drawer" />
                      &nbsp;
                      <Typography className="card_text-drawer">
                        {item.text}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <></>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      {["top"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            {" "}
            <SearchIcon
              sx={{
                display: { xs: "flex", md: "flex", lg: "flex" },
                color: "white",
              }}
            />
          </Button>
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
