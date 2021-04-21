import React, { useEffect, useState } from "react";
import {
   Container,
   FormButton,
   FormContent,
   FormH1,
   Form,
   FormInput,
   FormWrap,
   Icon,
} from "./userEditAdminElements";

const UserEditAdmin = ({ submitHandler, user }) => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [isAdmin, setIsAdmin] = useState(false);

   useEffect(() => {
      if (user.name && user.email) {
         setName(user.name);
         setEmail(user.email);
         setIsAdmin(user.isAdmin);
      }
   }, [user]);

   return (
      <>
         <Container>
            <FormWrap>
               {/* <Icon to="/">techfind.</Icon> */}
               <FormContent>
                  <Form>
                     <FormH1>update user profile!</FormH1>
                     {/* <FormLabel htmlFor="o">Name</FormLabel> */}
                     <FormInput
                        type="name"
                        value={name}
                        onChange={(e) => {
                           setName(e.target.value);
                        }}
                        required
                     />
                     {/* <FormLabel htmlFor="o">Email</FormLabel> */}
                     <FormInput
                        type="email"
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                        }}
                        required
                     />
                     {/* <FormLabel htmlFor="o">Password</FormLabel> */}
                     <div style={{ display: "flex" }}>
                        <FormInput
                           type="checkbox"
                           checked={isAdmin}
                           onChange={() => {
                              setIsAdmin(!isAdmin);
                           }}
                           required
                        />
                        Admin
                     </div>
                     <FormButton
                        type="submit"
                        onClick={(event) =>
                           submitHandler(event, name, email, isAdmin)
                        }
                     >
                        Continue
                     </FormButton>
                  </Form>
               </FormContent>
            </FormWrap>
         </Container>
      </>
   );
};

export default UserEditAdmin;
