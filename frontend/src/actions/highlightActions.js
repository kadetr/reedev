import axios from "axios";
import {
   VIEW_HIGHLIGHTS_REQUEST,
   VIEW_HIGHLIGHTS_SUCCESS,
   VIEW_HIGHLIGHTS_FAIL,
   VIEW_HIGHLIGHTS_BY_PDF_FAIL,
   VIEW_HIGHLIGHTS_BY_PDF_SUCCESS,
   VIEW_HIGHLIGHTS_BY_PDF_REQUEST,
   ADD_HIGHLIGHT_SUCCESS,
   ADD_HIGHLIGHT_FAIL,
   ADD_HIGHLIGHT_REQUEST,
} from "../constants/highlightConstants";
import { logout } from "./userActions";

export const showHighlights = () => async (dispatch, getState) => {
   try {
      dispatch({ type: VIEW_HIGHLIGHTS_REQUEST });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`/api/highlights`, config);

      dispatch({
         type: VIEW_HIGHLIGHTS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: VIEW_HIGHLIGHTS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const showHighlightsByPdf = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: VIEW_HIGHLIGHTS_BY_PDF_REQUEST });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`/api/highlights/${id}`, config);

      dispatch({
         type: VIEW_HIGHLIGHTS_BY_PDF_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: VIEW_HIGHLIGHTS_BY_PDF_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const addHighlight = (content, position, comment, pdfId) => async (
   dispatch,
   getState
) => {
   try {
      dispatch({
         type: ADD_HIGHLIGHT_REQUEST,
      });

      const {
         userLogin: { userInfo },
      } = getState();

      let userId = userInfo._id;
      let name = userInfo.name;

      const config = {
         headers: {
            Authorization: `Bearer ${userInfo.token}`,
         },
      };
      const { data } = await axios.post(
         "/api/highlights",
         { content, position, comment, pdfId, userId, name },
         config
      );
      dispatch({
         type: ADD_HIGHLIGHT_SUCCESS,
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
         type: ADD_HIGHLIGHT_FAIL,
         payload: message,
      });
   }
};
