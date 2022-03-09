import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPdf } from "../actions/pdfActions";
import PdfUpload from "../components/PdfUpload";

const PdfUploadScreen = ({history}) => {
   const dispatch = useDispatch();

    const pdfUpload = useSelector((state) => state.pdfUpload);
   //  const { loading, error, success, pdf } = pdfUpload;
    const { success } = pdfUpload;

   // useEffect(() => {
   //       history.push("/");
   // }, [ success]);


   const submitHandler = (event, name, file) => {
      event.preventDefault();
      dispatch(uploadPdf(name, file));
      history.push("/");
   };

   return <PdfUpload submitHandler={submitHandler} />;
};

export default PdfUploadScreen;
