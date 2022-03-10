import React, { useEffect, useState } from "react";
import {
  Container,
  FormButton,
  FormContent,
  FormH1,
  Form,
  FormInput,
  FormWrap,
} from "./userEditAdminElements";

const UserEditAdmin = ({ submitHandler, user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isInstructor, setIsInstructor] = useState(false);

  useEffect(() => {
    if (user.name && user.email) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsInstructor(user.isInstructor);
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
                type="text"
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
              <div style={{ display: "flex" }}>
                <FormInput
                  type="checkbox"
                  checked={isInstructor}
                  onChange={() => {
                    setIsInstructor(!isInstructor);
                  }}
                  required
                />
                Instructor
              </div>
              <FormButton
                type="submit"
                onClick={(event) =>
                  submitHandler(event, name, email, isAdmin, isInstructor)
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
