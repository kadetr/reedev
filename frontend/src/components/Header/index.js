import React from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import {
   MobileIcon,
   Nav,
   NavbarContainer,
   NavItem,
   NavLinks,
   NavMenu,
   Icon,
   NavDropdownItem,
   NavDropdownBtn,
   NavDropdownContent,
   NavDropdownContentLink,
} from "./headerElements.js";

const Header = ({ toggle }) => {
   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const logoutHandler = () => {
      dispatch(logout());
   };

   return (
      <Nav>
         <NavbarContainer>
            <MobileIcon onClick={toggle}>
               <FaBars />
            </MobileIcon>
            <Icon to="/">reedy.</Icon>
            <NavMenu>
            
               {!userInfo ? (
                  <>
                  
                     <NavItem>
                        <NavLinks to="/register">Register</NavLinks>
                     </NavItem>

                     <NavItem>
                        <NavLinks to="/login">Login</NavLinks>
                     </NavItem>
                  </>
               ) : (
                  <>
                  <NavDropdownItem>
                     <NavDropdownBtn>Profile</NavDropdownBtn>
                     <NavDropdownContent>
                        <NavDropdownContentLink to="/profile">
                           Account
                        </NavDropdownContentLink>
                        <NavDropdownContentLink onClick={logoutHandler} to="/">
                           Logout
                        </NavDropdownContentLink>
                     </NavDropdownContent>
                  </NavDropdownItem>
                  </>
               )}
               {userInfo && userInfo.isAdmin && (
                  <NavDropdownItem>
                     <NavDropdownBtn>Admin</NavDropdownBtn>
                     <NavDropdownContent>
                        <NavDropdownContentLink to="/admin/userlist">
                           Users
                        </NavDropdownContentLink>
                        <NavDropdownContentLink to="/instructor/uploadpdf">
                           Upload
                        </NavDropdownContentLink>
                     </NavDropdownContent>
                  </NavDropdownItem>
               )}
                {userInfo && userInfo.isInstructor && (
                  <NavDropdownItem>
                     <NavDropdownBtn>Instructor</NavDropdownBtn>
                     <NavDropdownContent>
                        <NavDropdownContentLink to="/instructor/uploadpdf">
                           Upload
                        </NavDropdownContentLink>
                     </NavDropdownContent>
                  </NavDropdownItem>
               )}

            </NavMenu>
         </NavbarContainer>
      </Nav>
   );
};

export default Header;
