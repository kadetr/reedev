import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import Profile from "../components/Profile";

const ProfileScreen = ({ location, history }) => {
   const dispatch = useDispatch();

   // const userDetails = useSelector((state) => state.userDetails);
   // const { loading, error, user } = userDetails;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const userUpdate = useSelector((state) => state.userUpdate);
   const { success } = userUpdate;

   useEffect(() => {
      if (!userInfo) {
         history.push("/login");
      } else {
         // if (user._id) dispatch(getUserDetails("profile"));
         if (!userInfo || !userInfo.name || success) {
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(getUserDetails(userInfo._id));
         }
      }
   }, [dispatch, history, userInfo, success]);

   const submitHandler = (event, name, email, password, confirmPassword) => {
      event.preventDefault();
      if (password !== confirmPassword) {
         //setMessage("Passwords do not match");
         console.log("password not matched");
      } else {
         dispatch(updateUser({ id: userInfo._id, name, email, password }));
      }
   };

   return <Profile submitHandler={submitHandler} user={userInfo} />;
};

export default ProfileScreen;
