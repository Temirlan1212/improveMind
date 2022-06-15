import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import Switch from "../Home/Switch/Switch";
import { useSelector } from "react-redux";
import { GetAuthEmail } from "../actions/GetAuthEmail";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { getCard } from "../actions/GetCards";
import "./Navbar.css";
import { menuToggleMiddle } from "../slices/MenuToggleSlice/MenuToggleSlice";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import { signOut } from "firebase/auth";
import fire from "../../fire";
import { useTranslation } from "react-i18next";
import Lang from "./Lang/Lang";
import Drawer from "../Drawer/Drawer";
import TemporaryDrawer from "../Drawer/Drawer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "rgba(255, 255, 255, 10)",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  height: "36px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1, 0, 1),
  borderRadius: "3px",
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#d9534f",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuToggle = useSelector((state) => state.menuToggle.menuToggle);
  let cards = useSelector((state) => state.card.cards);

  const toggleBtn = () => {
    if (menuToggle) {
      dispatch(menuToggleMiddle(false));
    } else {
      dispatch(menuToggleMiddle(true));
    }
  };
  console.log(menuToggle);
  console.log(cards);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  React.useEffect(() => {
    dispatch(GetAuthEmail());
    dispatch(getCard());
  }, []);

  console.log(user);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const signOut1 = () => {
    let auth = fire.auth();
    signOut(auth)
      .then(() => {
        console.log(auth);
        if (auth === "no email") {
          alert("sussecfully signed out");
        } else {
          alert("you already has signed out");
        }
      })
      .catch((error) => {
        alert(`doesn't signed out: ${error}`);
      });
  };
  const menuId = "primary-search-account-menu";
  // const renderMenu = (

  // );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Box
        sx={{
          display: "flex",
          marginLeft: "10px",
          flexDirection: "column",
        }}
      >
        <Box
          edge="start"
          sx={{
            fontSize: "18px",
            color: "white",
            cursor: "pointer",
            marginTop: "5px",
            "&:hover": {
              color: "#d9534f",
            },
            display: "flex",
            mr: "20px",
            fontFamily: "'PT Sans Narrow', sans-serif",
            color: "black",
          }}
          onClick={() => navigate("/signin")}
        >
          <div>
            <PersonIcon
              fontSize="small"
              sx={{ marginTop: "2px", fontSize: "20px" }}
            />{" "}
          </div>{" "}
          {t("signIn")}
          {}
        </Box>
        <Box
          edge="start"
          sx={{
            fontSize: "18px",
            color: "white",
            cursor: "pointer",
            marginTop: "5px",
            display: "flex",
            "&:hover": {
              color: "#d9534f",
            },
            color: "black",
            fontFamily: "'PT Sans Narrow', sans-serif",
          }}
          onClick={() => navigate("/register")}
        >
          <div>
            <ExitToAppIcon sx={{ marginTop: "5px", fontSize: "15px" }} />
            &nbsp;
          </div>
          {t("signUp")}
        </Box>
      </Box>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="absolute"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          height: "60px",
          marginTop: "-5px",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: "1200px",
            width: "90%",
            margin: "0 auto",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            edge="start"
            sx={{
              fontSize: "18px",
              color: "white",
              cursor: "pointer",
              marginTop: "5px",
              display: "flex",
              alignItems: "center",
              "&:hover": {
                color: "#d9534f",
              },
            }}
            onClick={() => navigate("/list")}
          >
            {t("manga")}
            <IconButton
              color="inherit"
              sx={{
                fontSize: "20px",
                marginBottom: "12px",
                marginLeft: "-8px",
              }}
            >
              ⌄
            </IconButton>
          </Box>

          <Search sx={{ display: { xs: "none", md: "flex" } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t("search")}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <TemporaryDrawer />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ marginTop: "10px" }}
            >
              <Badge badgeContent={0} color="error">
                <Switch />
              </Badge>
            </IconButton>
          </Box>
          <Lang />
          <Box>
            {user.length !== 0 ? (
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={toggleBtn}
                color="inherit"
                sx={{ position: "relative" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={user.photoUrl}
                  sx={{ width: "30px", height: "30px" }}
                />
              </IconButton>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  marginLeft: "30px",
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Box
                  edge="start"
                  sx={{
                    fontSize: "18px",
                    color: "white",
                    cursor: "pointer",
                    marginTop: "5px",
                    "&:hover": {
                      color: "#d9534f",
                    },
                    display: "flex",
                    mr: "20px",
                    fontFamily: "'PT Sans Narrow', sans-serif",
                  }}
                  onClick={() => navigate("/signin")}
                >
                  <div>
                    <PersonIcon
                      fontSize="small"
                      sx={{ marginTop: "2px", fontSize: "20px" }}
                    />{" "}
                  </div>{" "}
                  {t("signIn")}
                  {}
                </Box>
                <Box
                  edge="start"
                  sx={{
                    fontSize: "18px",
                    color: "white",
                    cursor: "pointer",
                    marginTop: "5px",
                    display: "flex",
                    "&:hover": {
                      color: "#d9534f",
                    },
                    fontFamily: "'PT Sans Narrow', sans-serif",
                  }}
                  onClick={() => navigate("/register")}
                >
                  <div>
                    <ExitToAppIcon
                      sx={{ marginTop: "5px", fontSize: "15px" }}
                    />
                    &nbsp;
                  </div>
                  {t("signUp")}
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="false"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

      <div
        className="menu-nav-open"
        style={{ display: menuToggle ? "block" : "none" }}
      >
        <div className="menu-nav-open-text" onClick={() => signOut1()}>
          sign out
        </div>
        <div
          className="menu-nav-open-text"
          onClick={(handleMenuClose, () => navigate("/add"))}
        >
          adming page
        </div>
      </div>
    </Box>
  );
}
