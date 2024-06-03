import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { fetchadminProductDetails } from "../../redux/slices/adminproductDetailsSlice";
import { Chart, CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getAllOrders } from "../../redux/slices/orderSlice.js";
import { getAllUsers } from "../../redux/slices/getallUsersSlice.js";

Chart.register(CategoryScale, ArcElement, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  // console.log(products);
  let outofStock = 0;
  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outofStock += 1;
      }
    });

  useEffect(() => {
    dispatch(fetchadminProductDetails());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197,72,49)"],
        data: [0, 4000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outofStock, products.length - outofStock],
      },
    ],
  };
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount
              <br />
              ₹2000
            </p>
          </div>

          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="linechart">
          <Line
            data={lineState}
            options={{
              scales: {
                x: {
                  type: "category",
                  labels: ["Initial Amount", "Amount Earned"],
                },
              },
            }}
          />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
