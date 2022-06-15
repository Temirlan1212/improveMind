import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCard from "./components/CRUD/AddCard/AddCard";
import CardList from "./components/CRUD/CardList/CardList";
import Details from "./components/Details/Details";
import Home from "./components/Home/Home";
import MainRoutes from "./components/MainRoutes/MainRoutes";
import { menuToggleMiddle } from "./components/slices/MenuToggleSlice/MenuToggleSlice";
import { langToggleMiddle } from "./components/slices/MenuToggleSlice/MenuToggleSlice";

function App() {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.menuToggle.menuToggle);
  const toggle2 = useSelector((state) => state.menuToggle.langToggle);
  const menuToggle = () => {
    if (toggle) {
      dispatch(menuToggleMiddle(false));
    } else if (toggle2) {
      dispatch(langToggleMiddle(false));
    }
  };

  let currentLanguage = localStorage.getItem("i18nextLng");
  console.log(document.body.lang);

  const { t } = useTranslation();

  return (
    <div onClick={() => menuToggle()}>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
