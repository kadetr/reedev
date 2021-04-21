import axios from "axios";
import {
   VIEW_COMMENTS_REQUEST,
   VIEW_COMMENTS_SUCCESS,
   VIEW_COMMENTS_FAIL,
   ADD_COMMENT_REQUEST,
   ADD_COMMENT_SUCCESS,
   ADD_COMMENT_FAIL,
   VIEW_COMMENTS_BY_HIGHLIGHT_FAIL,
   VIEW_COMMENTS_BY_HIGHLIGHT_SUCCESS,
   VIEW_COMMENTS_BY_HIGHLIGHT_REQUEST,
} from "../constants/commentConstants";
import { logout } from "./userActions";

export const showComments = () => async (dispatch, getState) => {
   try {
      dispatch({ type: VIEW_COMMENTS_REQUEST });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`/api/comments`, config);

      dispatch({
         type: VIEW_COMMENTS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: VIEW_COMMENTS_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};

export const addComment = (comment, parentId) => async (dispatch, getState) => {
   try {
      dispatch({
         type: ADD_COMMENT_REQUEST,
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
         "/api/comments",
         { comment, userId, name, parentId },
         config
      );

      dispatch({
         type: ADD_COMMENT_SUCCESS,
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
         type: ADD_COMMENT_FAIL,
         payload: message,
      });
   }
};

export const showCommentsByHighlight = (id) => async (dispatch, getState) => {
   try {
      dispatch({ type: VIEW_COMMENTS_BY_HIGHLIGHT_REQUEST });

      const {
         userLogin: { userInfo },
      } = getState();

      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
         },
      };

      const { data } = await axios.get(`/api/comments/${id}`, config);

      dispatch({
         type: VIEW_COMMENTS_BY_HIGHLIGHT_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: VIEW_COMMENTS_BY_HIGHLIGHT_FAIL,
         payload:
            error.response && error.response.data.message
               ? error.response.data.message
               : error.message,
      });
   }
};
