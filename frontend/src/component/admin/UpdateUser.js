import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "./../layout/MetaData";
import Sidebar from "./Sidebar.js";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate,useParams } from "react-router-dom";
import { resetUpdate,clearErrors, updateUser } from "../../redux/slices/updateUserSlice.js";
import { getUserDetails } from "../../redux/slices/getUserDetailsSlice.js";
import Loader from "../layout/Loader/Loader.js";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { loading: updateLoading, error:updateError, isUpdated } = useSelector((state) => state.updateUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId= params.id;
 

  useEffect(() => {
    if (user && user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      navigate("/admin/users");
      dispatch(resetUpdate());
    }
  }, [dispatch, alert, error, navigate,isUpdated,updateError,userId,user]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role",role);

    dispatch(updateUser(userId,formData));
  };

  
  return (
    <Fragment>
      <MetaData title={"Update User"} />
      <div className="dashboard">
        <Sidebar />
        <div className="newProductContainer">
          { //loading ?<Loader/>:    //Some error with loading so commented ..loading is toggling between true and false so it is not working
          <form
            className="createProductForm"
            onSubmit={updateUserSubmitHandler}
          >
            <h1>Update User</h1>
            <div>
              <PersonIcon />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <EmailIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>


            <div>
              <VerifiedUserIcon/>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            
            <Button
              id="createProductBtn"
              type="submit"
              disabled={updateLoading ? true : false || role===""?true:false}
            >
              Update
            </Button>
          </form>
          }
        </div>
      </div>
    </Fragment>
  );
};


export default UpdateUser;
