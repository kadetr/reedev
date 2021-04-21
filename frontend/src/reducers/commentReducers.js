import {
   VIEW_COMMENTS_REQUEST,
   VIEW_COMMENTS_SUCCESS,
   VIEW_COMMENTS_FAIL,
   ADD_COMMENT_REQUEST,
   ADD_COMMENT_SUCCESS,
   ADD_COMMENT_FAIL,
   VIEW_COMMENTS_BY_HIGHLIGHT_REQUEST,
   VIEW_COMMENTS_BY_HIGHLIGHT_SUCCESS,
   VIEW_COMMENTS_BY_HIGHLIGHT_FAIL,
} from "../constants/commentConstants";

export const commentViewReducer = (state = { comments: [] }, action) => {
   switch (action.type) {
      case VIEW_COMMENTS_REQUEST:
         return { loading: true, comments: [] };
      case VIEW_COMMENTS_SUCCESS:
         return {
            loading: false,
            comments: action.payload,
         };
      case VIEW_COMMENTS_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const commentAddReducer = (state = {}, action) => {
   switch (action.type) {
      case ADD_COMMENT_REQUEST:
         return { loading: true };
      case ADD_COMMENT_SUCCESS:
         return { loading: false, success: true, comment: action.payload };
      case ADD_COMMENT_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const commentsViewByHighlightReducer = (
   state = { comments: [] },
   action
) => {
   switch (action.type) {
      case VIEW_COMMENTS_BY_HIGHLIGHT_REQUEST:
         return { loading: true, comments: [] };
      case VIEW_COMMENTS_BY_HIGHLIGHT_SUCCESS:
         return {
            loading: false,
            comments: action.payload,
         };
      case VIEW_COMMENTS_BY_HIGHLIGHT_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};
