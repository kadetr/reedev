import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import PdfView from "../components/PDFView/PdfView.js";
import { showHighlights } from "../actions/highlightActions";
import { getPdfDetails, listPdfs } from "../actions/pdfActions";
import PdfList from "../components/PdfList";

const HomeScreen = ({ history }) => {
   const dispatch = useDispatch();

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   const pdfList = useSelector((state) => state.pdfList);
   const { loading: loadingPdf, error: errorPdf, pdfs } = pdfList;

   const highlightView = useSelector((state) => state.highlightView);
   const { loading, error, highlights } = highlightView;

   useEffect(() => {
      // dispatch(showHighlights());
      if (!userInfo) {
         history.push("/login");
      } else {
         dispatch(listPdfs());
      }
   }, [dispatch]);
   //console.log(highlights);
   return (
      <div>
         {/* <PDFComp highlights={highlights} url={pdf.url} /> */}

         <PdfList pdfs={pdfs} />
      </div>
   );
};

export default HomeScreen;
