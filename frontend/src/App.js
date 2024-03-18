import React from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home/Home.js";
import WebFont from "webfontloader";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/user/LoginSignUp.js";
import { useDispatch, useSelector } from "react-redux";
import { loaduser } from "./redux/slices/userSlice";
import UserOptions from "./component/layout/Header/UserOptions.js";
import Profile from "./component/user/Profile.js";
// import WithAuth from "./component/Route/WithAuth.js";
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loaduser());
  }, [dispatch]);
  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/account" element={<Profile />} />
        <Route
          path="*"
          element={
            <div>
              <h1>Page Not Found!!!!</h1>
            </div>
          }
        />
        {/* <Route
        //Working but not properly implemented a protected route
          path="/account"
          element={
            <WithAuth
              isAuthenticated={isAuthenticated}
              user={user}
              isAdmin={true}
            >
              <Profile />
            </WithAuth>
          }
        /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
