import React, { useState, useEffect } from "react";
import {
   Table,
   Th,
   Thead,
   Tr,
   Td,
   H1,
   Tbody,
   EditUserLink,
   DeleteUserBtn,
} from "./userListAdminElements";

const UserListAdmin = ({ users = [], adminId, deleteHandler }) => {
   return (
      <>
         <H1>Users</H1>
         <Table>
            <Thead>
               <Tr>
                  <Th>NAME</Th>
                  <Th>EMAIL</Th>
                  <Th>USER TYPE</Th>
               </Tr>
            </Thead>
            <Tbody>
               {users.map((user) => (
                  <Tr key={user._id}>
                     <Td>{user.name}</Td>
                     <Td>{user.email}</Td>
                     <Td>{user.isAdmin ? "admin" : "customer"}</Td>
                     <Td>
                        <EditUserLink
                           to={
                              user._id === adminId
                                 ? "/profile"
                                 : `/admin/users/${user._id}/edit`
                           }
                        >
                           edit icon
                        </EditUserLink>
                     </Td>
                     <Td>
                        <DeleteUserBtn onClick={() => deleteHandler(user._id)}>
                           delete icon
                        </DeleteUserBtn>
                     </Td>
                  </Tr>
               ))}
            </Tbody>
         </Table>
      </>
   );
};

export default UserListAdmin;
