import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCard from "./components/CRUD/AddCard/AddCard";
import CardList from "./components/CRUD/CardList/CardList";
import Details from "./components/Details/Details";
import Home from "./components/Home/Home";
import MainRoutes from "./components/MainRoutes/MainRoutes";

function App() {
  const { t } = useTranslation();
  return (
    <div>
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
