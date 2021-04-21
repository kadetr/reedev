import React from "react";
import {
   CloseIcon,
   Icon,
   SidebarBtnWrap,
   SidebarContainer,
   SidebarLink,
   SidebarMenu,
   SidebarRoute,
   SidebarWrapper,
} from "./sidebarElements";

const Sidebar = ({ isOpen, toggle }) => {
   return (
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
         <Icon onClick={toggle}>
            <CloseIcon />
         </Icon>
         <SidebarWrapper>
            <SidebarMenu>
               <SidebarLink to="/about" onClick={toggle}>
                  About
               </SidebarLink>
               <SidebarLink to="/discover" onClick={toggle}>
                  Discover
               </SidebarLink>
               <SidebarLink to="/services" onClick={toggle}>
                  Services
               </SidebarLink>
               <SidebarLink to="/register" onClick={toggle}>
                  Register
               </SidebarLink>
            </SidebarMenu>
            <SidebarBtnWrap>
               <SidebarRoute to="/login">Login</SidebarRoute>
            </SidebarBtnWrap>
         </SidebarWrapper>
      </SidebarContainer>
   );
};

export default Sidebar;
