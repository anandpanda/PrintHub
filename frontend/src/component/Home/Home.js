import { React, Fragment, useEffect } from "react";
import { BsMouse } from "react-icons/bs";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { loading, products, error, productsCount } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

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
                {products &&
                    products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
            </div>
        </Fragment>
    );
};

export default Home;
