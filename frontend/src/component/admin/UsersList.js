import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "./../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar.js";
import { useNavigate } from "react-router-dom";
// import adminproductSlice from './../../redux/slices/adminproductDetailsSlice';
import { getAllUsers ,clearErrors} from './../../redux/slices/getallUsersSlice';
import { deleteUser ,resetDelete} from "../../redux/slices/deleteUserSlice.js";


const UsersList = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  const { users,error } = useSelector((state) => state.allUsers);

  //Doubt here which store to use
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.deleteUser);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
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
      alert.success(message);
      navigate('/admin/users');
     dispatch(resetDelete());
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error,deleteError,isDeleted,navigate,message]);

  const columns = [
    {
      field: "id",
      headerName: "User ID",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
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
      field: "role",
      headerName: "Role",
      minWidth: 200,
      flex: 0.3,
      cellClassName: (params) => {
        return params.row.status === "admin"
          ? "greenColor"
          : "redColor";
      },
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
            <Link to={`/admin/user/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={()=> deleteUserHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`All Users - Admin `} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">All Users</h1>

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

export default UsersList;
