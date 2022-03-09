import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PdfView from "../components/PDFView/PdfView.js";
import { showHighlights } from "../actions/highlightActions";
import { getPdfDetails, listPdfs } from "../actions/pdfActions";
import PdfList from "../components/PdfList";
import {PDF_DETAILS_RESET} from "../constants/pdfConstants"

const HomeScreen = ({ history }) => {
   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const pdfList = useSelector((state) => state.pdfList);
   const { loading: loadingPdf, error: errorPdf, pdfs } = pdfList;

   useEffect(() => {
      if (!userInfo) {
         history.push("/login");
      } else {
         dispatch({type: PDF_DETAILS_RESET})
         dispatch(listPdfs());
      }
   }, [dispatch, history]);
   return (
      <div>
         <PdfList pdfs={pdfs} />
      </div>
   );
};

export default HomeScreen;
