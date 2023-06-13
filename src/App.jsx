import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import CreateProfile from "./components/auth/createprofile/index.jsx";
import Body from "./components/home/index.jsx";
import MyAccount from "./components/myAccount/index.jsx.jsx";
import ViewCategory from "./components/views/category/index.jsx";
import ViewPost from "./components/views/post/index.jsx";

import ViewSubcategory from "./components/views/subcategory/index.jsx";
import WelcomePage from "./components/welcomeToJoinedAfrica/index.jsx";
import Aboutus from "./components/welcomeToJoinedAfrica/aboutus/index.jsx";
import Contactus from "./components/welcomeToJoinedAfrica/contactus/index.jsx";
import { AppContext } from "./context";
import { ref, onValue } from "firebase/database";
import { getFromSessionStorage } from "./util/functions.jsx";
import startFirebase from "./config/firebase.jsx";
import Header from "./components/navigation/header/index.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [firebaseDB, setFirebaseDB] = useState(null);
  const [newMessageNotifications, setNewMessageNotifications] = useState([]);
  const stateValues = {
    isUserLoggedIn,
    setIsUserLoggedIn,
    firebaseDB,
    setFirebaseDB,
    newMessageNotifications,
    setNewMessageNotifications,
  };

  useEffect(() => {
    if (
      isUserLoggedIn ||
      getFromSessionStorage("isLoggedIn", false) == "true"
    ) {
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
            <Route exact path="my-account" element={<MyAccount />} />
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

            <Route exact path="create-profile" element={<CreateProfile />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}
