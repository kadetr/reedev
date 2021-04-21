import styled from "styled-components";
import { Link } from "react-router-dom";

export const H1 = styled.h1`
   font-size: 20px;
   font-weight: 400;
   text-align: center;
`;

export const Table = styled.table`
   color: #000;
`;
export const Thead = styled.thead``;
export const Tr = styled.tr``;
export const Tbody = styled.tbody``;
export const Td = styled.td`
   width: 10%;
   padding: 2px;
`;
export const Th = styled.th``;
export const GoToPdfLink = styled(Link)``;
export const DeleteUserBtn = styled.button`
   border: none;
   background: #000;
   font-family: inherit;
   font-size: inherit;
   cursor: pointer;
`;
