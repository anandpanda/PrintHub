import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchadminProductDetails,
  clearErrors,
} from "../../redux/slices/adminproductDetailsSlice";
import { deleteProduct, reset } from "../../redux/slices/deleteProductSlice.js";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "./../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar.js";
import { useNavigate } from "react-router-dom";
// import adminproductSlice from './../../redux/slices/adminproductDetailsSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  //if any error watch this line again change the state name form adminproductDetails to product
  const { products, error } = useSelector((state) => state.product);


  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteproduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if(isDeleted){
      alert.success("Product deleted successfully");
      navigate('/admin/dasboard');
     dispatch(reset());
    }

    dispatch(fetchadminProductDetails());
  }, [dispatch, alert, error,deleteError,isDeleted,navigate]);

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.5,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/products/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={()=> deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        price: item.price,
        stock: item.stock,
      });
    });
  return (
    <Fragment>
      <MetaData title={`All Products - Admin `} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Products</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            className="productListTable"
            disableSelectionOnClick
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
