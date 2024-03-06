import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../redux/slices/productSlice";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "./../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const Products = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.product);

  const keyword = params.keyword;

  useEffect(() => {
    dispatch(fetchProducts(keyword, currentPage, resultPerPage));
  }, [dispatch, keyword, currentPage, resultPerPage]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
