import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateProfile from "./components/auth/createprofile/index.jsx";
import Body from "./components/home/index.jsx";
import MyAccount from "./components/myAccount/index.jsx.jsx";
import ViewCategory from "./components/views/category/index.jsx";
import ViewPost from "./components/views/post/index.jsx";
import ViewSubcategory from "./components/views/subcategory/index.jsx";
import WelcomePage from "./components/welcomeToJoinedAfrica/index.jsx";
import { AppContext } from "./context";

export default function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const stateValues = {};
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
