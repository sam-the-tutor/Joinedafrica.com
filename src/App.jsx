import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateProfile from "./components/auth/createprofile/index.jsx";
import Body from "./components/home/index.jsx";
import MyAccount from "./components/myAccount/index.jsx.jsx";
import ViewCategory from "./components/views/category/index.jsx";
import ViewPost from "./components/views/post/index.jsx";
import { onValue, ref } from "firebase/database";
import Admin from "./components/admin/index.jsx";
import Header from "./components/navigation/header/index.jsx";
import Page404 from "./components/page404.jsx";
import ViewSubcategory from "./components/views/subcategory/index.jsx";
import FAQs from "./components/welcomeToJoinedAfrica/FAQ/index.jsx";
import Aboutus from "./components/welcomeToJoinedAfrica/aboutus/index.jsx";
import Contactus from "./components/welcomeToJoinedAfrica/contactus/index.jsx";
import WelcomePage from "./components/welcomeToJoinedAfrica/index.jsx";
import startFirebase from "./config/firebase.jsx";
import { AppContext } from "./context";
import { getFromSessionStorage, isAdmin } from "./util/functions.jsx";
import ProtectedRoute from "./util/reuseableComponents/ProtectedRoute.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    getFromSessionStorage("isLoggedIn", false) != null
  );
  const [firebaseDB, setFirebaseDB] = useState(null);
  const [newMessageNotifications, setNewMessageNotifications] = useState([]);
  const [reloadProfileIcon, setReloadProfileIcon] = useState(false);
  const stateValues = {
    isUserLoggedIn,
    setIsUserLoggedIn,
    firebaseDB,
    setFirebaseDB,
    newMessageNotifications,
    setNewMessageNotifications,
    reloadProfileIcon,
    setReloadProfileIcon,
  };

  useEffect(() => {
    if (isUserLoggedIn) {
      function checkForMessageNotificationsFromFirebase() {
        const database = startFirebase();
        setFirebaseDB(database);
        const loggedInUserPrincipal = getFromSessionStorage(
          "principalId",
          true
        );
        //listen for new messages
        onValue(ref(database, `${loggedInUserPrincipal}`), (snapshot) => {
          if (snapshot.exists()) {
            const messages = [];
            snapshot.forEach((child) =>
              messages.push({ id: child.key, ...child.val() })
            );
            setNewMessageNotifications(messages);
          }
        });
      }
      checkForMessageNotificationsFromFirebase();
    }
  }, [isUserLoggedIn]);
  return (
    <AppContext.Provider value={stateValues}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path="/" element={<WelcomePage />}></Route>
            <Route exact path="home" element={<Body />}></Route>
            <Route
              exact
              path="my-account"
              element={
                <ProtectedRoute
                  redirectPath="../home"
                  isUserAuthorized={isUserLoggedIn}
                >
                  <MyAccount />
                </ProtectedRoute>
              }
            />
            <Route exact path="view/post/:postId" element={<ViewPost />} />
            <Route exact path="aboutus" element={<Aboutus />} />
            <Route exact path="contactus" element={<Contactus />} />
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
            <Route
              exact
              path="admin"
              element={
                <ProtectedRoute
                  redirectPath="../home"
                  isUserAuthorized={
                    isUserLoggedIn &&
                    isAdmin(getFromSessionStorage("principalId", true))
                  }
                >
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route exact path="create-profile" element={<CreateProfile />} />
            <Route exact path="faq" element={<FAQs />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
