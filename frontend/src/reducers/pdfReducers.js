import {
   PDF_DETAILS_REQUEST,
   PDF_DETAILS_SUCCESS,
   PDF_DETAILS_FAIL,
   PDF_UPLOAD_REQUEST,
   PDF_UPLOAD_SUCCESS,
   PDF_UPLOAD_FAIL,
   PDF_UPLOAD_RESET,
   PDF_LIST_REQUEST,
   PDF_LIST_SUCCESS,
   PDF_LIST_FAIL,
} from "../constants/pdfConstants";

export const pdfUploadReducer = (state = {}, action) => {
   switch (action.type) {
      case PDF_UPLOAD_REQUEST:
         return { loading: true };
      case PDF_UPLOAD_SUCCESS:
         return { loading: false, success: true, pdf: action.payload };
      case PDF_UPLOAD_FAIL:
         return { loading: false, error: action.payload };
      case PDF_UPLOAD_RESET:
         return {};
      default:
         return state;
   }
};

export const pdftDetailsReducer = (state = { pdf: {} }, action) => {
   switch (action.type) {
      case PDF_DETAILS_REQUEST:
         return { ...state, loading: true };
      case PDF_DETAILS_SUCCESS:
         return { loading: false, success:true, pdf: action.payload };
      case PDF_DETAILS_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};

export const pdfListReducer = (state = { pdfs: [] }, action) => {
   switch (action.type) {
      case PDF_LIST_REQUEST:
         return { ...state, loading: true };
      case PDF_LIST_SUCCESS:
         return { loading: false, pdfs: action.payload };
      case PDF_LIST_FAIL:
         return { loading: false, error: action.payload };
      default:
         return state;
   }
};
