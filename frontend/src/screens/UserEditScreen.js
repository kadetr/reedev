import React, { useState, useEffect } from "react";
import { getUserDetails, updateUserAdmin } from "../actions/userActions";
import { USER_UPDATE_RESET_ADMIN } from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import UserEditAdmin from "../components/UserEditAdmin";

const UserEditScreen = ({ match, history }) => {
   const userId = match.params.id;

   const dispatch = useDispatch();

   const userDetails = useSelector((state) => state.userDetails);
   const { loading, error, user } = userDetails;

   const userUpdateAdmin = useSelector((state) => state.userUpdateAdmin);
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = userUpdateAdmin;

   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: USER_UPDATE_RESET_ADMIN });
         history.push("/admin/userlist");
      } else {
         if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId));
         }
      }
   }, [dispatch, history, userId, user, successUpdate]);

   const submitHandler = (event, name, email, isAdmin) => {
      event.preventDefault();
      dispatch(updateUserAdmin({ id: user._id, name, email, isAdmin }));
   };

   return <UserEditAdmin submitHandler={submitHandler} user={user} />;
};

export default UserEditScreen;
