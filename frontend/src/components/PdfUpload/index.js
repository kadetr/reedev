import React, { useState } from "react";
import axios from "axios";
import {
   Container,
   FormButton,
   FormContent,
   FormH1,
   Form,
   FormInput,
   FormWrap,
   Icon,
} from "./pdfUploadElements";

const PdfUpload = ({ submitHandler }) => {
   const [name, setName] = useState("");
   const [file, setFile] = useState("");

   const uploadFileHandler = async (e) => {
      setFile(e.target.files[0]);
   };

   return (
      <>
         <Container>
            <FormWrap>
               <FormContent>
                  <Form enctype="multipart/form-data">
                     <FormH1>upload a pdf!</FormH1>
                     <FormInput
                        type="name"
                        placeholder="Enter file name"
                        value={name}
                        onChange={(e) => {
                           setName(e.target.value);
                           //    onEmailChange(e.target.value);
                        }}
                        required
                     />
                     <FormInput
                        type="file"
                        id="pdf"
                        name="pdfFile"
                        label="choose file"
                        onChange={uploadFileHandler}
                     />

                     <FormButton
                        type="submit"
                        onClick={(event) => submitHandler(event, name, file)}
                     >
                        Continue
                     </FormButton>
                  </Form>
               </FormContent>
            </FormWrap>
         </Container>
      </>
   );
};

export default PdfUpload;
