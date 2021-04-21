import axios from "axios";
import {
   PDF_DETAILS_REQUEST,
   PDF_DETAILS_SUCCESS,
   PDF_DETAILS_FAIL,
   PDF_UPLOAD_REQUEST,
   PDF_UPLOAD_SUCCESS,
   PDF_UPLOAD_FAIL,
   PDF_LIST_REQUEST,
   PDF_LIST_SUCCESS,
   PDF_LIST_FAIL,
} from "../constants/pdfConstants";
import { logout } from "./userActions";

export const uploadPdf = (name, file) => async (dispatch, getState) => {
   try {
      dispatch({
         type: PDF_UPLOAD_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
            
         },
      };

      const formData = new FormData();
      formData.append("name", name);
      formData.append("pdfFile", file);

      const { data } = await axios.post("/api/uploads", formData, config);
      dispatch({
         type: PDF_UPLOAD_SUCCESS,
         payload: data,
      });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (message === "Not authorized, token failed") {
         dispatch(logout());
      }
      dispatch({
         type: PDF_UPLOAD_FAIL,
         payload: message,
      });
   }
};

export const getPdfDetails = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: PDF_DETAILS_REQUEST });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`/api/pdfs/${id}`, config);

      dispatch({
         type: PDF_DETAILS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: PDF_DETAILS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const listPdfs = () => async (dispatch, getState) => {
   try {
      dispatch({
         type: PDF_LIST_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`/api/pdfs`, config);

      dispatch({
         type: PDF_LIST_SUCCESS,
         payload: data,
      });
   } catch (error) {
      const message =
         error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
      if (message === "Not authorized, token failed") {
         dispatch(logout());
      }
      dispatch({
         type: PDF_LIST_FAIL,
         payload: message,
      });
   }
};
