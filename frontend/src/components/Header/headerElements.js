import styled from "styled-components";
import { Link } from "react-router-dom";

export const Nav = styled.nav`
   background: transparent;
   height: 80px;
   margin-top: 0px;
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 1rem;
   position: relative;
   top: 0;
   z-index: 0;

   @media screen and (max-width: 960px) {
      transition: 0.8s all ease;
   }
`;

export const NavbarContainer = styled.div`
   display: flex;
   justify-content: center;
   height: 80px;
   z-index: 1;
   width: 100%;
   padding: 0 24px;
   max-width: 1100px;
`;

export const MobileIcon = styled.div`
   display: none;

   @media screen and (max-width: 768px) {
      display: block;
      position: absolute;
      color: #888888;
      top: 0;
      right: 0;
      transform: translate(-100%, 60%);
      font-size: 1.8rem;
      cursor: pointer;
   }
`;

export const Icon = styled(Link)`
   margin-left: 32px;
   margin-top: 32px;
   text-decoration: none;
   color: #888888;
   font-weight: 700;
   font-size: 32px;

   @media screen and (max-width: 480px) {
      margin-left: 16px;
      margin-top: 8px;
   }
`;

export const NavMenu = styled.ul`
   display: flex;
   align-items: center;
   list-style: none;
   text-align: center;
   // margin-right: -22px;

   @media screen and (max-width: 760px) {
      display: none;
   }
`;

export const NavItem = styled.li`
   margin-top: 32px;
   height: 40px;

   @media screen and (max-height: 600px) {
      margin-top: 16px;
   }
`;

export const NavLinks = styled(Link)`
   color: #888888;
   font-size: 1.2rem;
   display: flex;
   align-items: center;
   text-decoration: none;
   padding: 0 1rem;
   height: 100%;
   cursor: pointer;
   border-bottom: 3px solid transparent;

   &:hover,
   &:active {
      border-bottom: 3px solid #888888;
   }
`;

export const NavDropdownBtn = styled.button`
   font-size: 1.2rem;
   border: none;
   outline: none;
   color: #888888;

   background-color: inherit;
   font-family: inherit;
   cursor: pointer;

   margin-top: 32px;
   height: 40px;

   @media screen and (max-height: 600px) {
      margin-top: 16px;
   }
`;

export const NavDropdownContent = styled.div`
   display: none;
   position: absolute;
   background-color: #f8d948;
   min-width: 160px;
   box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
   z-index: 1;
`;

export const NavDropdownContentLink = styled(Link)`
   float: none;
   color: black;
   padding: 12px 16px;
   text-decoration: none;
   display: block;
   text-align: left;

   &:hover {
      background-color: #ddd;
   }
`;

export const NavDropdownItem = styled.li`
   float: left;
   overflow: hidden;

   &:hover ${NavDropdownContent} {
      display: block;
   }
`;
