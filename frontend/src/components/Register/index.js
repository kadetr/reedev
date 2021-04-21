import React, { useState } from "react";
import {
   Container,
   FormButton,
   FormContent,
   FormH1,
   Form,
   FormInput,
   FormWrap,
   Icon,
} from "./registerElements";

const Register = ({ submitHandler }) => {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   // const [message, setMessage] = useState(null)

   return (
      <>
         <Container>
            <FormWrap>
               {/* <Icon to="/">techfind.</Icon> */}
               <FormContent>
                  <Form>
                     <FormH1>Sign up to get discounts!</FormH1>
                     {/* <FormLabel htmlFor="o">Name</FormLabel> */}
                     <FormInput
                        type="name"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => {
                           setName(e.target.value);
                           //    onEmailChange(e.target.value);
                        }}
                        required
                     />
                     {/* <FormLabel htmlFor="o">Email</FormLabel> */}
                     <FormInput
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => {
                           setEmail(e.target.value);
                           //    onEmailChange(e.target.value);
                        }}
                        required
                     />
                     {/* <FormLabel htmlFor="o">Password</FormLabel> */}
                     <FormInput
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => {
                           setPassword(e.target.value);
                           //    onPasswordChange(e.target.value);
                        }}
                        required
                     />
                     {/* <FormLabel htmlFor="o">Confirm password</FormLabel> */}
                     <FormInput
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => {
                           setConfirmPassword(e.target.value);
                           //    onPasswordChange(e.target.value);
                        }}
                        required
                     />
                     <FormButton
                        type="submit"
                        onClick={(event) =>
                           submitHandler(
                              event,
                              name,
                              email,
                              password,
                              confirmPassword
                           )
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

export default Register;
