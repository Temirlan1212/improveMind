import React from "react";
import { Route, Routes } from "react-router-dom";
import Authentification from "../Authentification/Authentification";
import AuthModal from "../Authentification/AuthModal/AuthModal";
import AddCard from "../CRUD/AddCard/AddCard";
import CardList from "../CRUD/CardList/CardList";
import Details from "../Details/Details";
import Home from "../Home/Home";
import OneChapterList from "../OneChapterList/OneChapterList";

const MainRoutes = () => {
  const ROUTES = [
    {
      path: "/",
      element: <Home />,
      id: 1,
    },
    {
      path: "/list",
      element: <CardList />,
      id: 2,
    },
    {
      path: "/list/:id",
      element: <Details />,
      id: 3,
    },
    {
      path: "/list/:id/:id2/:index",
      element: <OneChapterList />,
      id: 4,
    },

    {
      path: "/register",
      element: <Authentification />,
      id: 5,
    },
    {
      path: "/authmodal",
      element: <AuthModal />,
      id: 6,
    },
    {
      path: "/test for git",
      element: <AuthModal />,
      id: 7,
    },
  ];
  const PRIVATE_ROUTES = [
    {
      path: "/add",
      element: <AddCard />,
      id: 1,
    },
  ];

  return (
    <div>
      <Routes>
        {ROUTES.map((elem) => (
          <Route path={elem.path} element={elem.element} />
        ))}

        {PRIVATE_ROUTES.map((elem) => (
          <Route path={elem.path} element={elem.element} />
        ))}
      </Routes>
    </div>
  );
};

export default MainRoutes;
