import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Register from "../components/Register";

const RegisterScreen = ({ location, history }) => {
   const dispatch = useDispatch();

   const userRegister = useSelector((state) => state.userRegister);
   const { loading, error, userInfo } = userRegister;

   const redirect = location.search ? location.search.split("=")[1] : "/";

   useEffect(() => {
      if (userInfo) {
         history.push(redirect);
      }
   }, [history, userInfo, redirect]);

   const submitHandler = (event, name, email, password, confirmPassword) => {
      event.preventDefault();
      if (password !== confirmPassword) {
         //setMessage('Passwords do not match')
      } else {
         dispatch(register(name, email, password));
      }
   };

   return <Register submitHandler={submitHandler} />;
};

export default RegisterScreen;
