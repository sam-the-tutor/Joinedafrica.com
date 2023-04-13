import React, { useEffect, useState } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MyAccount from "./components/MyAccount/MyAccount";
import { AppContext } from "./context";
import Body from "./components/appStructure/Body";
import WelcomePage from "./components/welcomeToJoinedAfrica/WelcomePage";
import CreateProfile from "./components/auth/CreateProfile";
import ViewPost from "./components/views/ViewPost";
import ViewListOfPost from "./components/views/ViewListOfPost";
import ViewCategory from "./components/views/ViewCategory";
import ViewSubcategory from "./components/views/ViewSubcategory";

export default function App() {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const stateValues = { authenticatedUser, setAuthenticatedUser };

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
