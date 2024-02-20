import { React, Fragment } from "react";
import { BsMouse } from "react-icons/bs";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import { useDispatch } from "react-redux";

const product = {
  name: "Yellow Tshirt",
  images: [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkSc3ZToMF1uZok6IaK1Rw7WoggerqhRtMBw&usqp=CAU",
    },
  ],
  price: "$10",
  _id: "tshirt1",
};
const Home = () => {
  const dispatch = useDispatch();

  return (
    <Fragment>
      <MetaData title={"PrintHub"} />

      <div className="banner">
        <p>Welcome to PrintHub</p>
        <h1>YOUR GO TO STATIONARY APP</h1>
        <a href="#container">
          <button>
            Scroll <BsMouse />
          </button>
        </a>
      </div>
      <h2 className="homeheading">Featured Products</h2>

      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />

        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
      </div>
    </Fragment>
  );
};

export default Home;
