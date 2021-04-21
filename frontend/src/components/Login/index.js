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
   Text,
} from "./loginElements";

const Login = ({ submitHandler }) => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   return (
      <>
         <Container>
            <FormWrap>
               {/* <Icon to="/">techfind.</Icon> */}
               <FormContent>
                  <Form>
                     <FormH1>Sign in to access you account</FormH1>
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
                     <FormButton
                        type="submit"
                        onClick={(event) =>
                           submitHandler(event, email, password)
                        }
                     >
                        Continue
                     </FormButton>
                     <Text>Register | Forgot Password</Text>
                  </Form>
               </FormContent>
            </FormWrap>
         </Container>
      </>
   );
};

export default Login;
