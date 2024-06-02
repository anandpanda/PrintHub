import React from "react";
import { Link } from "react-router-dom";
import  Rating  from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const options = {
    size : "large" ,
    value: product.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      {product.images && product.images.length > 0 && <img src={product.images[0].url} alt={product.name} />}
      <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan"> ({product.numOfReviews} Reviews)</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
