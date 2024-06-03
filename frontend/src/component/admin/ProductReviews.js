import React, { Fragment, useEffect,useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productReview.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "./../layout/MetaData";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar.js";
import { useNavigate } from "react-router-dom";
import { deleteReview,resetDelete,clearErrors } from './../../redux/slices/deleteReviewSlice';
import Star from "@material-ui/icons/Star";
import { getAllReviews } from "../../redux/slices/getallReviewsSlice.js";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();

  //if any error watch this line again change the state name form adminproductDetails to product
  
  const { error, reviews, loading } = useSelector(
      (state) => state.allReviews
    );

    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.deleteReview
    );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview({reviewId, productId}));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };


  useEffect(() => {
    if (productId.length === 24) {
        dispatch(getAllReviews(productId));
      }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success("Review deleted successfully");
      navigate('/admin/reviews');
     dispatch(resetDelete());
    }

  }, [dispatch, alert, error,deleteError,isDeleted,navigate,productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.id >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.id)
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};


export default ProductReviews;
