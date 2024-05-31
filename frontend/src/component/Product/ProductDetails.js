import React, { Fragment, useEffect , useState } from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductDetails } from "../../redux/slices/productDetailsSlice";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.js";
import Loader from "./../layout/Loader/Loader";
import { addToCart , removeFromCart } from "../../redux/slices/cartSlice.js";
// import { useAlert } from "react-alert";

//Sliders Testing
// import AwesomeSlider from 'react-awesome-slider';
// import Carousel from "react-material-ui-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      return alert.error(error);
    } else if (params) {
      dispatch(fetchProductDetails(params.id));
    }
  }, [dispatch, params, error]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true,
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [quantity , setQuantity] = useState(1) ;

  const increaseQuantity = () => {
    console.log(product.stock , quantity)
    if(product.stock <= quantity) return ;
    const qty = quantity + 1 ;
    setQuantity(qty);
  }

  const decreaseQuantity = () => {
    if (quantity === 1 ) return ;
    const qty = quantity - 1 ;
    setQuantity(qty);
  }

  const addToCartHandler = () => {
    console.log(params._id , quantity);
    dispatch(addToCart({id : params.id , quantity : quantity}));
  }

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              {/* <Carousel className="carousel">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={${i} Slide}
                    />
                  ))}
              </Carousel> */}
              <Slider {...settings}>
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Slider>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product #{product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>{product.numOfReviews} Reviews</span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity} >-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>{" "}
                  <button onClick={addToCartHandler} >Add to Cart</button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                <p>Description:</p> <p>{product.description}</p>
              </div>
              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;