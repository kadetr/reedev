import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { Link as LinkR } from "react-router-dom";

export const SidebarContainer = styled.aside`
   position: fixed;
   z-index: 999;
   width: 100%;
   height: 100%;
   background: #f8d948;
   display: grid;
   align-items: center;
   top: 0;
   left: 0;
   transition: 0.3s ease-in-out;
   opacity: ${({ isOpen }) => (isOpen ? "100%" : "0")};
   top: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
`;

export const CloseIcon = styled(FaTimes)`
   color: #939597;

   &:hover {
      color: #926aa2;
   }
`;

export const Icon = styled.div`
   position: absolute;
   top: 1.2rem;
   right: 1.5rem;
   background: transparent;
   font-size: 2rem;
   cursor: pointer;
   outline: none;
`;

export const SidebarWrapper = styled.div`
   color: #fff;
`;

export const SidebarMenu = styled.ul`
   display: grid;
   grid-template-columns: 1fr;
   grid-template-rows: repeat(6, 80px);
   text-align: center;

   @media screen and (max-width: 480) {
      grid-template-rows: repeat(6, 60px);
   }
`;

export const SidebarLink = styled(LinkR)`
   display: flex;
   align-items: center;
   justify-content: center;
   font-size: 1.5rem;
   text-decoration: none;
   list-style: none;
   transition: 0.2s ease-in-out;
   color: #939597;
   cursor: pointer;

   &:hover {
      color: #926aa2;
      transition: 0.2s ease-in-out;
   }
`;

export const SidebarBtnWrap = styled.div`
   display: flex;
   justify-content: center;
`;

export const SidebarRoute = styled(LinkR)`
   border-radius: 20px;
   background: #939597;
   white-space: nowrap;
   padding: 16px 64px;
   color: #f8d948;
   font-size: 16px;
   outline: none;
   border: none;
   cursor: pointer;
   text-decoration: none;
   transition: all 0.2s ease-in-out;
   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);

   &:hover {
      transition: all 0.1s ease-in-out;
      transform: scale(1.02);
      font-size: 18px;
      background: #926aa2;
      color: #f8d948;
   }
`;
