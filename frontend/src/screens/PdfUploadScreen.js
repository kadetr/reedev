import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPdf } from "../actions/pdfActions";
import PdfUpload from "../components/PdfUpload";

const PdfUploadScreen = () => {
   const dispatch = useDispatch();

   const pdfUpload = useSelector((state) => state.pdfUpload);
   const { loading, error, success, pdf } = pdfUpload;

   const submitHandler = (event, name, file) => {
      event.preventDefault();
      dispatch(uploadPdf(name, file));
   };

   return <PdfUpload submitHandler={submitHandler} />;
};

export default PdfUploadScreen;
