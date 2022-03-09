import React, { useState, useEffect } from "react";
import Painterro from "painterro"
import { getPdfDetails } from "../actions/pdfActions";
import { showHighlightsByPdf, addHighlight, addDrawHighlight } from "../actions/highlightActions";
import { addComment } from "../actions/commentActions";
import { useDispatch, useSelector } from "react-redux";
import PdfView from "../components/PdfView/PdfView.js";
import CommentBar from "../components/PdfView/CommentBar.js";
import { ADD_DRAW_HIGHLIGHT_RESET, ADD_HIGHLIGHT_RESET } from "../constants/highlightConstants";

const PdfViewScreen = ({ match }) => {
   const pdfId = match.params.id;
   const [area, setArea] = useState(false);
   const [highlight, setHighlight] = useState();
   const [draw,setDraw] = useState(false)

   const dispatch = useDispatch();

   const pdfDetails = useSelector((state) => state.pdfDetails);
   const { loading: loadingDetails, error: errorDetails,success: successDetails, pdf } = pdfDetails;

   const highlightViewByPdf = useSelector((state) => state.highlightViewByPdf);
   const { loading: loadingHighlights, error: errorHighlights, highlights } = highlightViewByPdf;

   const highlightAdd = useSelector((state) => state.highlightAdd);
   const { loading: loadingAdd, error: errorAdd, success } = highlightAdd;

   const drawHighlightAdd = useSelector((state) => state.drawHighlightAdd);
   const { loading: loadingDrawAdd, error: errorDrawAdd, success: successDrawAdd } = drawHighlightAdd


   useEffect(()=>{
         dispatch(getPdfDetails(pdfId));
         dispatch(showHighlightsByPdf(pdfId));
   },[])
  
   // useEffect(() => {
   //       if(success){
   //          dispatch(showHighlightsByPdf(pdfId)); 
   //          dispatch({ type: ADD_HIGHLIGHT_RESET });
   //       }    
   //       console.log(success) 
   // }, [success]);

   useEffect(() => {
       if(successDrawAdd){
         dispatch(showHighlightsByPdf(pdfId));
         dispatch({ type: ADD_DRAW_HIGHLIGHT_RESET });
      }        
}, [ successDrawAdd]);

   const selectHighlight = (_highlight) => {
      setHighlight(_highlight);
   };

   const chooseText = () => {
      setArea(false);
   };

   const chooseArea = () => {
      setArea(true);
   };

   const openDraw = (content, position, pdfId) => {
      setDraw(true)
      Painterro({
         saveHandler: function (image, done) {
            dispatch(addDrawHighlight(content, position, pdfId, image))
            setDraw(false)
            done(true);     
         },
         onClose: {
         function (){setDraw(false)},   
         },
         
         hiddenTools: ['crop', 'line', 'arrow', 'rect', 'ellipse' ], 
         toolbarPosition: "top",
         defaultSize: "640x480"}).show()
   };

   

   const submitHighlightHandler = (content, position, comment, pdfId) => {
      setArea(false);
      dispatch(addHighlight(content, position, comment, pdfId));
      setTimeout(() => {
         dispatch(showHighlightsByPdf(pdfId))
       }, 1000)
      // dispatch(showHighlightsByPdf(pdfId)); 
      
   };
   const submitCommentHandler = (comment, parentId) => {
      if (comment) {
         dispatch(addComment(comment, parentId));
      }
   };

   return (
      <div style={{ display: "flex"}}>
         {successDetails&&!draw ? <PdfView
            url={pdf.url}
            pdfId={pdfId}
            area={area}
            highlights={highlights}
            openDraw={openDraw}
            submitHighlightHandler={submitHighlightHandler}
            selectHighlight={selectHighlight}
            
         />: null}
         <CommentBar
            chooseArea={chooseArea}
            chooseText={chooseText}
            // chooseDraw ={chooseDraw}
            highlight={highlight}
            submitCommentHandler={submitCommentHandler}
         />
      </div>
   );
};

export default PdfViewScreen;
