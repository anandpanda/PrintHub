import React from "react";
import "./sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="PrintHub" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon />
          Dashboard
        </p>
      </Link>
      <Link>
        <Box sx={{ minWidth: 250 }}>
          <SimpleTreeView
            aria-label="file system navigator"
          >
            <TreeItem itemId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem itemId="2" label="All" icon={<PostAddIcon />} />
              </Link>
              <Link to="/admin/product">
                <TreeItem itemId="3" label="Create" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </SimpleTreeView>
        </Box>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> RateReviewIcon
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
