import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
   position: fixed;
   bottom: 0;
   left: 0;
   right: 0;
   top: 0;
   z-index: 0;
   overflow: hidden;
   background: #f0f0f0;
`;

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content; center;

    @media scree and (max-width: 400px){
        height: 80px
    }
`;

export const Icon = styled(Link)`
   margin-left: 32px;
   margin-top: 32px;
   text-decoration: none;
   color: #926aa6;
   font-weight: 700;
   font-size: 32px;

   @media screen and (max-width: 480px) {
      margin-left: 16px;
      margin-top: 8px;
   }
`;

export const FormContent = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   justify-content: center;
`;

export const Form = styled.form`
   background: #888888;
   max-width: 400px;
   height: auto;
   width: 100%;
   z-index: 1;
   display: grid;
   margin: 0 auto;
   padding: 40px 32px;
   border-radius: 4px;
   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.9);

   @media screen and (max-width: 400px) {
      padding: 32px 32px;
   }
`;

export const FormH1 = styled.h1`
   margin-bottom: 40px;
   color: #010101;
   font-size: 20px;
   font-weight: 400;
   text-align: center;
`;

export const FormLabel = styled.label`
   margin-bottom: 8px;
   font-size: 14px;
   color: #010101;
`;

export const FormInput = styled.input`
   margin-bottom: 32px;
   padding: 16px 16px;
   border: none;
   border-radius: 4px;
   outline: none;
`;

export const FormButton = styled.button`
   background: #f8d948;
   padding: 16px 0;
   border: none;
   border-radius: 4px;
   color: #010101;
   font-size: 20px;
   font-weight: 500;
   cursor: pointer;
   outline: none;
   box-shadow: 0 1px 2px rgba(0, 0, 0, 0.9);
`;

export const Text = styled.span`
   text-align: center;
   margin-top: 24px;
   color: #010101;
   font-size: 14px;
   text-decoration: underline;
`;
