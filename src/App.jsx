import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import MyAccount from "./components/MyAccount/MyAccount";
import Body from "./components/appStructure/Body";
import CreateProfile from "./components/auth/CreateProfile";
import ViewCategory from "./components/views/ViewCategory";
import ViewPost from "./components/views/ViewPost";
import ViewSubcategory from "./components/views/ViewSubcategory";
import WelcomePage from "./components/welcomeToJoinedAfrica/WelcomePage";
import { AppContext } from "./context";
import { getFromSessionStorage } from "./util/functions";
import { messageWorker } from "./util/webworkers/messageWorker";
import Header from "./components/appStructure/Header";

export default function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const [newMessageNotification, setNewMessageNotification] = useState([]);
  const [currentPage, setCurrentPage] = useState("");

  //once the user logs in or creates an account, start pulling for message notifications
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const stateValues = {
    authenticatedUser,
    newMessageNotification,
    setAuthenticatedUser,
    setNewMessageNotification,
  };

  return (
    <AppContext.Provider value={stateValues}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<WelcomePage />}></Route>
            <Route exact path="home" element={<Body />}></Route>
            <Route exact path="my-account" element={<MyAccount />} />
            <Route exact path="view/post/:postId" element={<ViewPost />} />
            <Route
              exact
              path="view/category/:categoryName"
              element={<ViewCategory />}
            />
            <Route exact path="search?" element={<ViewSubcategory />} />
            <Route
              exact
              path="view/:categoryName/:subcategoryName"
              element={<ViewSubcategory />}
            />

            <Route exact path="create-profile" element={<CreateProfile />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
