import React, { useEffect, useState } from "react";
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
import UpdateProfile from "./component/user/UpdateProfile.js";
import PrivateRoutes from "./component/Route/PrivateRoutes.js";
import Dashboard from "./component/admin/Dashboard.js";
import ProductList from "./component/admin/ProductList.js";
import NewProduct from "./component/admin/NewProduct.js";
import Cart from "./component/cart/cart.js";
import Shipping from "./component/cart/Shipping.js";
import ConfirmOrder from "./component/cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/cart/Payment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/cart/OrderSuccess.js";
import UpdateProduct from './component/admin/UpdateProduct';
import OrderList from "./component/admin/OrderList.js";
import ProcessOrder from './component/admin/ProcessOrder';
import OrderDetails from "./component/orders/orderDetails.js";
import MyOrders from "./component/orders/myOrders.js";
import UsersList from "./component/admin/UsersList.js";
import UpdateUser from './component/admin/UpdateUser';
import ProductReviews from "./component/admin/ProductReviews.js";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  const getStripeApiKey = async () => {
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    dispatch(loaduser());
    getStripeApiKey();
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
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/cart" element={<Cart/>}/>
        {/* //Add PrivateRoutes below */}

        <Route
          element={<PrivateRoutes />}
        >
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product" element={<NewProduct />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/admin/products/:id" element={<UpdateProduct/>} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/order/:id" element={<ProcessOrder />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/reviews" element={<ProductReviews />} />
        </Route>

      <Route path="/process/payment" element={
      stripeApiKey && (
      <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment />
      </Elements>
        )
        } />
    <Route path="/order/:id" element={<OrderDetails />} />
    <Route exact path="/orders" element={<MyOrders/>} />
      <Route
          path="*"
          element={
            <div>
              <h1>Page Not Found!!!!</h1>
            </div>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
