import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
   userLoginReducer,
   userRegisterReducer,
   userDetailsReducer,
   userUpdateReducer,
   userListAdminReducer,
   userDeleteAdminReducer,
   userUpdateAdminReducer,
} from "./reducers/userReducers";

import {
   commentViewReducer,
   commentAddReducer,
   commentsViewByHighlightReducer,
} from "./reducers/commentReducers";
import {
   highlightViewReducer,
   highlightViewByPdfReducer,
   highlightAddReducer,
} from "./reducers/highlightReducers";
import {
   pdfUploadReducer,
   pdftDetailsReducer,
   pdfListReducer,
} from "./reducers/pdfReducers";

const reducer = combineReducers({
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userDetails: userDetailsReducer,
   userUpdate: userUpdateReducer,
   userListAdmin: userListAdminReducer,
   userDeleteAdmin: userDeleteAdminReducer,
   userUpdateAdmin: userUpdateAdminReducer,
   commentView: commentViewReducer,
   commentsViewByHighlight: commentsViewByHighlightReducer,
   commentAdd: commentAddReducer,
   highlightView: highlightViewReducer,
   highlightViewByPdf: highlightViewByPdfReducer,
   highlightAdd: highlightAddReducer,
   pdfDetails: pdftDetailsReducer,
   pdfUpload: pdfUploadReducer,
   pdfList: pdfListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
   ? JSON.parse(localStorage.getItem("userInfo"))
   : null;

const initialState = {
   userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
   reducer,
   initialState,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
