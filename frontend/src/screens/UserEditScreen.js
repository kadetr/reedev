import React, { useState, useEffect } from "react";
import { getUserDetailsAdmin, updateUserAdmin } from "../actions/userActions";
import { USER_UPDATE_RESET_ADMIN } from "../constants/userConstants";
import { useDispatch, useSelector } from "react-redux";
import UserEditAdmin from "../components/UserEditAdmin";

const UserEditScreen = ({ match, history }) => {
   const userId = match.params.id;

   const dispatch = useDispatch();

   const userDetailsAdmin = useSelector((state) => state.userDetailsAdmin);
   // const { loading, error, user } = userDetails;
   const { user } = userDetailsAdmin;

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
         
             dispatch(getUserDetailsAdmin(userId));
         
      }
   }, [dispatch, history, user, successUpdate]);

   const submitHandler = (event, name, email, isAdmin, isInstructor) => {
      event.preventDefault();
      dispatch(updateUserAdmin({ id: userId, name, email, isAdmin, isInstructor }));
   };

   return <UserEditAdmin submitHandler={submitHandler} user={user} />;
};

export default UserEditScreen;
