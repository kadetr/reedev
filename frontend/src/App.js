import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import Header from "./components/Header"
// import Footer from "./components/Footer"
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import PdfUploadScreen from "./screens/PdfUploadScreen";
import PdfViewScreen from "./screens/PdfViewScreen";

const App = () => {
   const [isOpen, setIsOpen] = useState(false);
   // const [isOpenAdminBtn, setIsOpenAdminBtn] = useState(false);

   const toggle = () => {
      setIsOpen(!isOpen);
   };
   // useEffect(() => {});

   return (
      <Router>
         <Sidebar isOpen={isOpen} toggle={toggle} />
         <Header toggle={toggle} />
         <Route path="/login" component={LoginScreen} />
         <Route path="/register" component={RegisterScreen} />
         <Route path="/profile" component={ProfileScreen} />
         <Route path="/instructor/uploadpdf" component={PdfUploadScreen} />
         <Route path="/pdfs/:id" component={PdfViewScreen} />
         <Route path="/admin/userlist" component={UserListScreen} />
         <Route path="/admin/users/:id/edit" component={UserEditScreen} />
         {/*<Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          /> */}
         <Route path="/" component={HomeScreen} exact />
      </Router>
   );
};

export default App;
