import React, { useState, useEffect } from "react";
import Painterro from "painterro"
import { getPdfDetails } from "../actions/pdfActions";
import { showHighlightsByPdf, addHighlight } from "../actions/highlightActions";
import { addComment } from "../actions/commentActions";
import { useDispatch, useSelector } from "react-redux";
import PdfView from "../components/PdfView/PdfView.js";
import CommentBar from "../components/PdfView/CommentBar.js";

const PdfViewScreen = ({ match, history }) => {
   const pdfId = match.params.id;
   const [area, setArea] = useState(false);
   const [highlight, setHighlight] = useState();

   const dispatch = useDispatch();

   const pdfDetails = useSelector((state) => state.pdfDetails);
   const { loading, error,success, pdf } = pdfDetails;
   const highlightViewByPdf = useSelector((state) => state.highlightViewByPdf);
   const { loadingH, errorH, highlights } = highlightViewByPdf;
   const highlightAdd = useSelector((state) => state.highlightAdd);
 


   const chooseText = () => {
      setArea(false);
   };

   const chooseArea = () => {
      setArea(true);
   };

   const chooseDraw = () => {
      Painterro().show()
   };


   const selectHighlight = (_highlight) => {
      setHighlight(_highlight);
   };

   useEffect(() => {
      dispatch(getPdfDetails(pdfId));
      dispatch(showHighlightsByPdf(pdfId));
   }, []);
   useEffect(() => {
         dispatch(showHighlightsByPdf(pdfId));   
   }, [highlightAdd]);

   const submitHighlightHandler = (content, position, comment, pdfId) => {
      setArea(false);
      dispatch(addHighlight(content, position, comment, pdfId));
      dispatch(showHighlightsByPdf(pdfId));
      
      
      
   };
   const submitCommentHandler = (comment, parentId) => {
      if (comment) {
         dispatch(addComment(comment, parentId));
      }
   };

   return (
      <div style={{ display: "flex" }}>
         {success ? <PdfView
            url={pdf.url}
            pdfId={pdfId}
            area={area}
            highlights={highlights}
            submitHighlightHandler={submitHighlightHandler}
            selectHighlight={selectHighlight}
         />: null}
         <CommentBar
            chooseArea={chooseArea}
            chooseText={chooseText}
            chooseDraw ={chooseDraw}
            highlight={highlight}
            submitCommentHandler={submitCommentHandler}
         />
      </div>
   );
};

export default PdfViewScreen;
