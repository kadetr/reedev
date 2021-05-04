import {
   VIEW_HIGHLIGHTS_REQUEST,
   VIEW_HIGHLIGHTS_SUCCESS,
   VIEW_HIGHLIGHTS_FAIL,
   VIEW_HIGHLIGHTS_BY_PDF_REQUEST,
   VIEW_HIGHLIGHTS_BY_PDF_SUCCESS,
   VIEW_HIGHLIGHTS_BY_PDF_FAIL,
   ADD_HIGHLIGHT_REQUEST,
   ADD_HIGHLIGHT_SUCCESS,
   ADD_HIGHLIGHT_FAIL,
   ADD_DRAW_HIGHLIGHT_SUCCESS,
   ADD_DRAW_HIGHLIGHT_REQUEST,
   ADD_DRAW_HIGHLIGHT_FAIL,
} from "../constants/highlightConstants";

export const highlightViewReducer = (state = { highlights: [] }, action) => {
   switch (action.type) {
      case VIEW_HIGHLIGHTS_REQUEST:
         return { loading: true, highlights: [] };
      case VIEW_HIGHLIGHTS_SUCCESS:
         return {
            loading: false,
            highlights: action.payload,
         };
      case VIEW_HIGHLIGHTS_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const highlightViewByPdfReducer = (
   state = { highlights: [] },
   action
) => {
   switch (action.type) {
      case VIEW_HIGHLIGHTS_BY_PDF_REQUEST:
         return { loading: true, highlights: [] };
      case VIEW_HIGHLIGHTS_BY_PDF_SUCCESS:
         return {
            loading: false,
            highlights: action.payload,
         };
      case VIEW_HIGHLIGHTS_BY_PDF_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const highlightAddReducer = (state = {}, action) => {
   switch (action.type) {
      case ADD_HIGHLIGHT_REQUEST:
         return { loading: true };
      case ADD_HIGHLIGHT_SUCCESS:
         return { loading: false, success: true, highlight: action.payload };
      case ADD_HIGHLIGHT_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const drawHighlightAddReducer = (state = {}, action) => {
   switch (action.type) {
      case ADD_DRAW_HIGHLIGHT_REQUEST:
         return { loading: true };
      case ADD_DRAW_HIGHLIGHT_SUCCESS:
         return { loading: false, success: true, highlight: action.payload };
      case ADD_DRAW_HIGHLIGHT_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};
