import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { fetchadminProductDetails } from "../../redux/slices/adminproductDetailsSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
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
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
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
