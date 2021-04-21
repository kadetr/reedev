import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsersAdmin, deleteUserAdmin } from "../actions/userActions";
import UserListAdmin from "../components/UserListAdmin";
import Loader from "../components/Loader";

const UserListScreen = ({ history }) => {
   const dispatch = useDispatch();

   const userListAdmin = useSelector((state) => state.userListAdmin);
   const { loading, error, users } = userListAdmin;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const userDeleteAdmin = useSelector((state) => state.userDeleteAdmin);
   const { success: successDelete } = userDeleteAdmin;

   useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
         dispatch(listUsersAdmin());
      } else {
         history.push("/login");
      }
   }, [dispatch, history, successDelete, userInfo]);

   const deleteHandler = (id) => {
      if (window.confirm("Are you sure")) {
         dispatch(deleteUserAdmin(id));
      }
   };

   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <UserListAdmin
               users={users}
               adminId={userInfo._id}
               deleteHandler={deleteHandler}
            />
         )}
      </>
   );
};

export default UserListScreen;
