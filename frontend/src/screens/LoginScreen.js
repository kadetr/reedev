import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Message from '../components/Message'
// import Loader from '../components/Loader'

import { login } from "../actions/userActions";
import Login from "../components/Login";

const LoginScreen = ({ location, history }) => {
   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin);
   // const { loading, error, userInfo } = userLogin;
   const { userInfo } = userLogin;

   // const redirect = location.search ? location.search.split("=")[1] : "/";

   useEffect(() => {
      if (userInfo) {
         history.push("/");
      }
   }, [history, userInfo]);

   const submitHandler = (event, email, password) => {
      event.preventDefault();
      dispatch(login(email, password));
   };

   return <Login submitHandler={submitHandler} />;
};

export default LoginScreen;
