import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthAvaAdd from "../Authentification/AuthAvaAdd/AuthAvaAdd";
import AuthUpdateAva from "../Authentification/AuthAvaAdd/AuthUpdateAva";
import Authentification from "../Authentification/Authentification";
import AuthModal from "../Authentification/AuthModal/AuthModal";
import AuthWithPhoneNumber from "../Authentification/AuthWithPhoneNumber";
import SignIn from "../Authentification/SignIn";
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
      path: "/:id/:user",
      element: <Details />,
      id: 3,
    },
    {
      path: "/:id/:user/:id2/:index",
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
      path: "/authphone",
      element: <AuthWithPhoneNumber />,
      id: 7,
    },
    {
      path: "/signin",
      element: <SignIn />,
      id: 8,
    },
    {
      path: "/register/:user",
      element: <AuthAvaAdd />,
      id: 9,
    },
    {
      path: "/update/:user",
      element: <AuthUpdateAva />,
      id: 10,
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
