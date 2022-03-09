// import React, { useState, useEffect } from "react";
import {
   Table,
   Th,
   Thead,
   Tr,
   Td,
   H1,
   Tbody,
   GoToPdfLink,
} from "./pdfListElements";

const PdfList = ({ pdfs = [] }) => {
   return (
      <>
         <H1>Pdfs</H1>
         <Table>
            <Thead>
               <Tr>
                  <Th>Name</Th>
               </Tr>
            </Thead>
            <Tbody>
               {pdfs.map((pdf) => (
                  <Tr key={pdf._id}>
                     <Td>
                        <GoToPdfLink to={`/pdfs/${pdf._id}`}>
                           {pdf.name}
                        </GoToPdfLink>
                     </Td>
                  </Tr>
               ))}
            </Tbody>
         </Table>
      </>
   );
};

export default PdfList;
